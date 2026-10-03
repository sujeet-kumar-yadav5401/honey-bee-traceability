import Hive from '../models/Hive.js';
import HiveInspection from '../models/HiveInspection.js';
import HoneyHarvest from '../models/HoneyHarvest.js';

// @desc    Create a new Hive
// @route   POST /api/hives
// @access  Private (BEEKEEPER, ADMIN)
export const createHive = async (req, res, next) => {
  try {
    const {
      hiveId,
      hiveName,
      apiaryLocation,
      latitude,
      longitude,
      beeSpecies,
      queenStatus,
      colonyStrength,
      installationDate,
      healthStatus,
      temperature,
      humidity,
      hiveWeight,
      framesCount,
      notes
    } = req.body;

    const existing = await Hive.findOne({ hiveId: hiveId?.toUpperCase().trim() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Hive with ID '${hiveId}' already exists`
      });
    }

    const hive = await Hive.create({
      hiveId: hiveId?.toUpperCase().trim(),
      beekeeperId: req.user._id,
      hiveName: hiveName || `Hive ${hiveId}`,
      apiaryLocation: apiaryLocation || 'Coorg Apiaries, Karnataka',
      latitude: latitude || 12.4244,
      longitude: longitude || 75.7382,
      beeSpecies: beeSpecies || 'Apis mellifera',
      queenStatus: queenStatus || 'Active',
      colonyStrength: colonyStrength || 'Strong',
      installationDate: installationDate || new Date(),
      lastInspectionDate: new Date(),
      healthStatus: healthStatus || 'Healthy',
      temperature: temperature || '34.8°C',
      humidity: humidity || '58%',
      hiveWeight: hiveWeight || '42.0 KG',
      framesCount: Number(framesCount) || 10,
      notes: notes || ''
    });

    res.status(201).json({
      success: true,
      message: 'Hive registered successfully',
      hive
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all Hives (Filtered by user or all for admin)
// @route   GET /api/hives
// @access  Public or Protected
export const getHives = async (req, res, next) => {
  try {
    const query = {};
    if (req.query.healthStatus) {
      query.healthStatus = req.query.healthStatus;
    }
    if (req.query.beekeeperId) {
      query.beekeeperId = req.query.beekeeperId;
    }

    const hives = await Hive.find(query)
      .populate('beekeeperId', 'name email location')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: hives.length,
      hives
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single Hive by hiveId or Mongo _id
// @route   GET /api/hives/:id
// @access  Public or Protected
export const getHiveById = async (req, res, next) => {
  try {
    const identifier = req.params.id;
    let hive;

    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      hive = await Hive.findById(identifier).populate('beekeeperId', 'name email location');
    } else {
      hive = await Hive.findOne({ hiveId: identifier.toUpperCase().trim() }).populate('beekeeperId', 'name email location');
    }

    if (!hive) {
      return res.status(404).json({
        success: false,
        message: `Hive '${identifier}' not found`
      });
    }

    // Fetch related inspections and harvests
    const inspections = await HiveInspection.find({ hiveId: hive.hiveId }).sort({ inspectionDate: -1 });
    const harvests = await HoneyHarvest.find({ hiveId: hive.hiveId }).sort({ harvestDate: -1 });

    res.status(200).json({
      success: true,
      hive,
      inspections,
      harvests
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update Hive
// @route   PUT /api/hives/:id
// @access  Private (BEEKEEPER, ADMIN)
export const updateHive = async (req, res, next) => {
  try {
    const identifier = req.params.id;
    let hive = await Hive.findOne({
      $or: [
        { _id: identifier.match(/^[0-9a-fA-F]{24}$/) ? identifier : null },
        { hiveId: identifier.toUpperCase().trim() }
      ]
    });

    if (!hive) {
      return res.status(404).json({
        success: false,
        message: 'Hive not found'
      });
    }

    // Only owner or admin can update
    if (req.user.role !== 'ADMIN' && hive.beekeeperId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this hive'
      });
    }

    hive = await Hive.findByIdAndUpdate(hive._id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Hive updated successfully',
      hive
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete Hive
// @route   DELETE /api/hives/:id
// @access  Private (ADMIN, BEEKEEPER owner)
export const deleteHive = async (req, res, next) => {
  try {
    const identifier = req.params.id;
    const hive = await Hive.findOne({
      $or: [
        { _id: identifier.match(/^[0-9a-fA-F]{24}$/) ? identifier : null },
        { hiveId: identifier.toUpperCase().trim() }
      ]
    });

    if (!hive) {
      return res.status(404).json({
        success: false,
        message: 'Hive not found'
      });
    }

    if (req.user.role !== 'ADMIN' && hive.beekeeperId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this hive'
      });
    }

    await Hive.findByIdAndDelete(hive._id);

    res.status(200).json({
      success: true,
      message: 'Hive removed successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add inspection record to a hive
// @route   POST /api/hives/:id/inspections
// @access  Private (BEEKEEPER, ADMIN)
export const addHiveInspection = async (req, res, next) => {
  try {
    const identifier = req.params.id;
    const hive = await Hive.findOne({
      $or: [
        { _id: identifier.match(/^[0-9a-fA-F]{24}$/) ? identifier : null },
        { hiveId: identifier.toUpperCase().trim() }
      ]
    });

    if (!hive) {
      return res.status(404).json({
        success: false,
        message: 'Hive not found'
      });
    }

    const {
      inspectionDate,
      colonyStrength,
      queenPresent,
      broodCondition,
      foodAvailability,
      diseaseObservation,
      pestObservation,
      temperature,
      humidity,
      notes,
      inspector
    } = req.body;

    const count = await HiveInspection.countDocuments();
    const inspectionId = `INSP-${Date.now().toString().slice(-6)}-${count + 1}`;

    const inspection = await HiveInspection.create({
      inspectionId,
      hiveId: hive.hiveId,
      hiveRef: hive._id,
      inspectionDate: inspectionDate || new Date(),
      colonyStrength: colonyStrength || hive.colonyStrength,
      queenPresent: queenPresent !== undefined ? queenPresent : true,
      broodCondition: broodCondition || 'Healthy',
      foodAvailability: foodAvailability || 'High Stores',
      diseaseObservation: diseaseObservation || 'None',
      pestObservation: pestObservation || 'None',
      temperature: temperature || hive.temperature,
      humidity: humidity || hive.humidity,
      notes: notes || '',
      inspector: inspector || req.user.name
    });

    // Update hive's last inspection date and health status
    hive.lastInspectionDate = inspection.inspectionDate;
    if (req.body.healthStatus) {
      hive.healthStatus = req.body.healthStatus;
    }
    await hive.save();

    res.status(201).json({
      success: true,
      message: 'Inspection logged successfully',
      inspection
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get inspections for a hive
// @route   GET /api/hives/:id/inspections
// @access  Public or Protected
export const getHiveInspections = async (req, res, next) => {
  try {
    const identifier = req.params.id;
    const inspections = await HiveInspection.find({
      $or: [
        { hiveId: identifier.toUpperCase().trim() },
        { hiveRef: identifier.match(/^[0-9a-fA-F]{24}$/) ? identifier : null }
      ]
    }).sort({ inspectionDate: -1 });

    res.status(200).json({
      success: true,
      count: inspections.length,
      inspections
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createHive,
  getHives,
  getHiveById,
  updateHive,
  deleteHive,
  addHiveInspection,
  getHiveInspections
};

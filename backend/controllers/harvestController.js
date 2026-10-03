import HoneyHarvest from '../models/HoneyHarvest.js';
import Hive from '../models/Hive.js';

// @desc    Record a new Honey Harvest
// @route   POST /api/harvest
// @access  Private (BEEKEEPER, ADMIN)
export const recordHarvest = async (req, res, next) => {
  try {
    const {
      harvestId,
      hiveId,
      harvestDate,
      honeyType,
      quantity,
      unit,
      floralSource,
      location,
      moistureLevel,
      initialQuality,
      notes
    } = req.body;

    // Verify hive exists if provided
    let hiveRef = null;
    if (hiveId) {
      const foundHive = await Hive.findOne({ hiveId: hiveId.toUpperCase().trim() });
      if (foundHive) {
        hiveRef = foundHive._id;
      }
    }

    const count = await HoneyHarvest.countDocuments();
    const generatedId = harvestId || `HRV-2026-${String(count + 1).padStart(3, '0')}`;

    const harvest = await HoneyHarvest.create({
      harvestId: generatedId.toUpperCase().trim(),
      hiveId: hiveId ? hiveId.toUpperCase().trim() : 'HIVE-001',
      hiveRef,
      beekeeperId: req.user._id,
      harvestDate: harvestDate || new Date(),
      honeyType: honeyType || 'Raw Honey',
      quantity: Number(quantity),
      unit: unit || 'KG',
      floralSource: floralSource || 'Wild Forest Flora',
      location: location || 'Coorg Apiaries, Karnataka',
      moistureLevel: moistureLevel || '17.8%',
      initialQuality: initialQuality || 'Grade A+ (Premium)',
      notes: notes || ''
    });

    res.status(201).json({
      success: true,
      message: 'Honey harvest logged successfully',
      harvest
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all Honey Harvests
// @route   GET /api/harvest
// @access  Public or Protected
export const getHarvests = async (req, res, next) => {
  try {
    const query = {};
    if (req.query.honeyType) {
      query.honeyType = req.query.honeyType;
    }
    if (req.query.hiveId) {
      query.hiveId = req.query.hiveId.toUpperCase();
    }

    const harvests = await HoneyHarvest.find(query)
      .populate('beekeeperId', 'name email')
      .sort({ harvestDate: -1 });

    const totalQuantity = harvests.reduce((acc, h) => acc + h.quantity, 0);

    res.status(200).json({
      success: true,
      count: harvests.length,
      totalQuantityKg: totalQuantity,
      harvests
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single Honey Harvest
// @route   GET /api/harvest/:id
// @access  Public or Protected
export const getHarvestById = async (req, res, next) => {
  try {
    const identifier = req.params.id;
    let harvest;

    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      harvest = await HoneyHarvest.findById(identifier).populate('beekeeperId', 'name email');
    } else {
      harvest = await HoneyHarvest.findOne({ harvestId: identifier.toUpperCase().trim() }).populate('beekeeperId', 'name email');
    }

    if (!harvest) {
      return res.status(404).json({
        success: false,
        message: `Harvest '${identifier}' not found`
      });
    }

    res.status(200).json({
      success: true,
      harvest
    });
  } catch (error) {
    next(error);
  }
};

export default {
  recordHarvest,
  getHarvests,
  getHarvestById
};

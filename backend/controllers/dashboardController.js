import Hive from '../models/Hive.js';
import HoneyHarvest from '../models/HoneyHarvest.js';
import ProductBatch from '../models/ProductBatch.js';

// @desc  Get dashboard stats for logged-in beekeeper
// @route GET /api/dashboard
// @access Private
export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const isAdmin = req.user.role === 'ADMIN';
    const filter = isAdmin ? {} : { beekeeperId: userId };
    const batchFilter = isAdmin ? {} : { producerId: userId };

    const [
      totalHives,
      activeHives,
      totalBatches,
      verifiedBatches,
      harvestAgg,
    ] = await Promise.all([
      Hive.countDocuments(filter),
      Hive.countDocuments({ ...filter, healthStatus: { $in: ['Healthy', 'Strong'] } }),
      ProductBatch.countDocuments(batchFilter),
      ProductBatch.countDocuments({ ...batchFilter, verificationStatus: 'Verified' }),
      HoneyHarvest.aggregate([
        ...(isAdmin ? [] : [{ $match: { beekeeperId: userId } }]),
        { $group: { _id: null, total: { $sum: '$quantityKg' } } },
      ]),
    ]);

    res.json({
      success: true,
      stats: {
        totalHives,
        activeHives,
        totalBatches,
        verifiedBatches,
        totalHoneyProduced: Math.round(harvestAgg[0]?.total || 0),
      },
    });
  } catch (error) {
    next(error);
  }
};

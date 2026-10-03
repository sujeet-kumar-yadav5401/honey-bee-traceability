import User from '../models/User.js';
import Hive from '../models/Hive.js';
import ProductBatch from '../models/ProductBatch.js';
import HoneyHarvest from '../models/HoneyHarvest.js';

// @desc  Get all users
// @route GET /api/admin/users
// @access Private (Admin)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    next(error);
  }
};

// @desc  Update user role
// @route PUT /api/admin/users/:id/role
// @access Private (Admin)
export const updateUserRole = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true }
    ).select('-password');

    if (!user) {
      res.status(404);
      throw new Error('User not found.');
    }
    res.json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete user
// @route DELETE /api/admin/users/:id
// @access Private (Admin)
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404);
      throw new Error('User not found.');
    }
    res.json({ success: true, message: 'User deleted.' });
  } catch (error) {
    next(error);
  }
};

// @desc  Get system-wide stats
// @route GET /api/admin/stats
// @access Private (Admin)
export const getSystemStats = async (req, res, next) => {
  try {
    const [totalUsers, totalHives, totalBatches, verifiedBatches, totalHarvest] =
      await Promise.all([
        User.countDocuments(),
        Hive.countDocuments(),
        ProductBatch.countDocuments(),
        ProductBatch.countDocuments({ verificationStatus: 'Verified' }),
        HoneyHarvest.aggregate([
          { $group: { _id: null, total: { $sum: '$quantityKg' } } },
        ]),
      ]);

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalHives,
        totalBatches,
        verifiedBatches,
        totalHoneyProduced: totalHarvest[0]?.total || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};

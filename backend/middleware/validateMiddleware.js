export const validateRegister = (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ success: false, message: 'Name is required' });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
  }

  // Section 6 requirement: Do not allow users to create ADMIN accounts through normal public registration
  if (role && role.toUpperCase() === 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'ADMIN accounts cannot be created via public registration'
    });
  }

  next();
};

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both email and password'
    });
  }

  next();
};

export const validateBatch = (req, res, next) => {
  const { batchId, productName, quantity, location } = req.body;

  if (!batchId || !batchId.trim()) {
    return res.status(400).json({ success: false, message: 'Batch ID is required' });
  }

  if (!productName || !productName.trim()) {
    return res.status(400).json({ success: false, message: 'Product Name is required' });
  }

  if (quantity === undefined || quantity === null || Number(quantity) <= 0) {
    return res.status(400).json({ success: false, message: 'Valid quantity greater than zero is required' });
  }

  if (!location || !location.trim()) {
    return res.status(400).json({ success: false, message: 'Location is required' });
  }

  next();
};

export default {
  validateRegister,
  validateLogin,
  validateBatch
};

import Product from '../models/Product.js';

// @desc  Create a new product
// @route POST /api/products
// @access Private (Beekeeper, Producer, Admin)
export const createProduct = async (req, res, next) => {
  try {
    const { productId, productName, productCategory, description, origin } = req.body;

    const exists = await Product.findOne({ productId });
    if (exists) {
      res.status(400);
      throw new Error('Product ID already exists.');
    }

    const product = await Product.create({
      productId,
      productName,
      productCategory: productCategory?.toUpperCase() || 'HONEY',
      description,
      origin,
      producerId: req.user._id,
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc  Get all products
// @route GET /api/products
// @access Private
export const getProducts = async (req, res, next) => {
  try {
    const filter = {};
    if (req.user.role !== 'ADMIN') {
      filter.producerId = req.user._id;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: products.length, products });
  } catch (error) {
    next(error);
  }
};

// @desc  Get product by id
// @route GET /api/products/:id
// @access Private
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found.');
    }
    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc  Update product
// @route PUT /api/products/:id
// @access Private
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      res.status(404);
      throw new Error('Product not found.');
    }
    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete product
// @route DELETE /api/products/:id
// @access Private (Admin only)
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found.');
    }
    res.json({ success: true, message: 'Product deleted.' });
  } catch (error) {
    next(error);
  }
};

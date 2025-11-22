import Product from '../models/Product.js';

// @desc    Get all products with optional filters
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, condition, status, search } = req.query;
    let query = {};

    // Build filter query
    if (category) query.category = category;
    if (condition) query.condition = condition;
    if (status) query.status = status;
    else query.status = 'available'; // Default to available products

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$text = { $search: search };
    }

    const products = await Product.find(query)
      .populate('seller', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'firstName lastName email phoneNumber studentId');

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res) => {
  try {
    const { title, description, category, price, condition, images, location } = req.body;

    const product = await Product.create({
      title,
      description,
      category,
      price,
      condition,
      images,
      location,
      seller: req.user._id
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(400).json({ error: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if user is the seller
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'You can only update your own products' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(400).json({ error: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if user is the seller
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'You can only delete your own products' });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get user's products
// @route   GET /api/products/user/:userId
// @access  Public
const getUserProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.params.userId })
      .populate('seller', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    console.error('Get user products error:', error);
    res.status(500).json({ error: error.message });
  }
};

export {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getUserProducts
};


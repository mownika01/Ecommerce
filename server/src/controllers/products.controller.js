const Product = require('../models/Product');
const { successResponse } = require('../utils/response');
const Category = require('../models/Category')


const create = async (req, res, next) => {
  try {
    const cat = await Category.findById(req.body.category);
    if (!cat) {
      return res.status(400).json({ success: false, message: "Category not found" });
    }
    const product = await Product.create(req.body);
    return successResponse(res, product, "Product created", 201);
  } catch (err) {
    next(err);
  }
}

const getProducts = async (req, res, next) => {
  try {
    // const { search, category } = req.query;
    let filter = { isActive: true }

    // if (search) {
    //     filter.title = {
    //         $regex: search, $options: 'i'
    //     }
    // }
    // if (category) {
    //     filter.category = category;
    // }
    const products = await Product.find(filter).populate("category", "name slug");
    return successResponse(res, products);

  } catch (err) {
    next(err);
  }
}

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      return next(error);
    }

    return successResponse(res, product);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      return next(error);
    }

    return successResponse(res, product, "Product updated");
  } catch (err) {
    next(err);
  }
};


const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      return next(error);
    }

    return successResponse(res, {}, "Product deleted");
  } catch (err) {
    next(err);
  }
};

module.exports = { create, getProductById, getProducts, updateProduct, deleteProduct }
const Category = require("../models/Category");
const { successResponse } = require("../utils/response");

const createCategory = async (req, res, next) => {
  try {
    const { name, slug, image, parentCategory } = req.body;

    if (parentCategory) {
      const parent = await Category.findById(parentCategory);
      if (!parent) {
        const error = new Error("Parent category not found");
        error.statusCode = 400;
        return next(error);
      }
    }

    const category = await Category.create({ name, slug, image, parentCategory });
    return successResponse(res, category, "Category created", 201);
  } catch (err) {
    next(err);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).populate("parentCategory", "name slug");
    return successResponse(res, categories);
  } catch (err) {
    next(err);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id).populate("parentCategory", "name slug");
    if (!category) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      return next(error);
    }
    return successResponse(res, category);
  } catch (err) {
    next(err);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { parentCategory } = req.body;

    if (parentCategory) {
      const parent = await Category.findById(parentCategory);
      if (!parent) {
        const error = new Error("Parent category not found");
        error.statusCode = 400;
        return next(error);
      }
    }

    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      return next(error);
    }

    return successResponse(res, category, "Category updated");
  } catch (err) {
    next(err);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!category) {
      const error = new Error("Category not found");
      error.statusCode = 404;
      return next(error);
    }
    return successResponse(res, {}, "Category deleted");
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
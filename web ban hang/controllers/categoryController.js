const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const SuccessResponse = require("../models/SuccessResponse");
const Category = require("../database/models/Category");
const l = console.log;
//----------------
exports.getAllCategory = asyncMiddleware(async (req, res, next) => {
  const categories = await Category.find();
  l(categories);
  res.status(200).json(new SuccessResponse(200, categories));
});
exports.createNewCategory = asyncMiddleware(async (req, res, next) => {
  const { name, description } = req.body;
  const newCategory = new Category({ name, description });
  const category = await newCategory.save();
  l(category);
  res.status(201).json(new SuccessResponse(201, category));
});
exports.deleteCategoryById = asyncMiddleware(async (req, res, next) => {
  const { categoryId } = req.params;
  const doc = await Category.findByIdAndDelete(categoryId);
  if (!doc) {
    return next(new ErrorResponse(404, "Category is not found"));
  }
  res
    .status(200)
    .json(
      new SuccessResponse(200, `category has id ${categoryId} was deleted`)
    );
});

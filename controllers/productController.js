const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const SuccessResponse = require("../models/SuccessResponse");
const Product = require("../database/models/Product");
//----------------
exports.getAllProducts = asyncMiddleware(async (req, res, next) => {
  const products = await Product.find().populate("category_detail");
  res.status(200).json(new SuccessResponse(200, products));
});
exports.createNewProduct = asyncMiddleware(async (req, res, next) => {
  const { name, price, sku, quantity, description, category } = req.body;
  const newProduct = new Product({
    name,
    price,
    sku,
    quantity,
    description,
    category,
    image: req.file.filename,
  });
  const product = await newProduct.save();
  res.status(201).json(new SuccessResponse(201, product));
});
exports.deleteProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;
  const doc = await Product.findByIdAndDelete(productId);
  if (!doc) {
    return next(new ErrorResponse(404, "Product is not found"));
  }
  res
    .status(200)
    .json(new SuccessResponse(200, `product has id ${productId} was deleted`));
});
exports.getProductById = asyncMiddleware(async (req, res, next) => {
  const { productId } = req.params;
  const doc = await Product.findById(productId).populate("category_detail");
  if (!doc) {
    return next(new ErrorResponse(404, "Product is not found"));
  }
  res.status(200).json(new SuccessResponse(200, doc));
});

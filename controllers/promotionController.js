const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const SuccessResponse = require("../models/SuccessResponse");
const ErrorResponse = require("../models/ErrorResponse");
const Promotion = require("../database/models/Promotion");

//KHUYẾN MÃI

//thêm khuyến mãi(promotion)
// id sản phẩm, giá khuyến mãi
exports.addPromotion = asyncMiddleware(async (req, res, next) => {
  const { idProduct, promotionalPrice } = req.body;
  const newPromotion = new Promotion({ idProduct, promotionalPrice });
  const promotion = await newPromotion.save();
  res.status(201).json(new SuccessResponse(201, promotion));
});
//lấy khuyến mãi theo id sản phẩm
exports.getPromotionByIdProduct = asyncMiddleware(async (req, res, next) => {
  const { idProduct } = req.body;
  const doc = await Promotion.find({ idProduct });
  if (!doc) {
    return next(new ErrorResponse(404, "Promotion is not found"));
  }
  res.status(200).json(new SuccessResponse(200, doc));
});
//lấy toàn bộ khuyến mãi
exports.getAllPromotion = asyncMiddleware(async (req, res, next) => {
  const promotion = await Promotion.find();
  res.status(200).json(new SuccessResponse(200, promotion));
});
//cập nhật khuyến mãi theo id sản phẩm
exports.updatePromotionByIdProduct = asyncMiddleware(async (req, res, next) => {
  const { idProduct } = req.body;
  if (!idProduct.trim())
    return next(new ErrorResponse(400, "idProduct is empty"));
  const updatePromotion = await Promotion.findOneAndUpdate(
    { idProduct },
    req.body,
    {
      new: true,
    }
  );
  if (!updatePromotion) return next(new ErrorResponse(400, "can not update"));
  res.status(200).json(new SuccessResponse(200, updatePromotion));
});
//xóa khuyến mãi theo id sản phẩm
exports.deletePromotionByIdProduct = asyncMiddleware(async (req, res, next) => {
  const { idProduct } = req.body;
  if (!idProduct.trim())
    return next(new ErrorResponse(400, "idUsidProducter is empty"));
  const deletePromotion = await Promotion.findOneAndDelete(idProduct);
  if (!deletePromotion) return next(new ErrorResponse(400, "can not delete"));
  res.status(200).json(new SuccessResponse(200));
});

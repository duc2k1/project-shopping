// Importing the required modules
const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const SuccessResponse = require("../models/SuccessResponse");
const ErrorResponse = require("../models/ErrorResponse");
const Billing = require("../database/models/Billing");

// Billing

// Add new billing
//id người mua, id sản phẩm, giá tiền, số lượng
exports.addBilling = asyncMiddleware(async (req, res, next) => {
  const { idUser, idProduct, price, count } = req.body;
  const newBilling = new Billing({ idUser, idProduct, price, count });
  const billing = await newBilling.save();
  res.status(201).json(new SuccessResponse(201, billing));
});

//lấy khuyến mãi theo id người mua
exports.getBillingByIdUser = asyncMiddleware(async (req, res, next) => {
  const { idUser } = req.body;
  const doc = await Billing.find({ idUser });
  if (!doc) {
    return next(new ErrorResponse(404, "billing is not found"));
  }
  res.status(200).json(new SuccessResponse(200, doc));
});

//lấy toàn bộ hóa dơn
exports.getAllBilling = asyncMiddleware(async (req, res, next) => {
  const billing = await Billing.find();
  res.status(200).json(new SuccessResponse(200, billing));
});

//cập nhật hóa đơn theo id user
exports.updateBillingByIdUser = asyncMiddleware(async (req, res, next) => {
  const { idUser } = req.body;
  if (!idUser.trim()) return next(new ErrorResponse(400, "idUser is empty"));

  const updateBilling = await Billing.findOneAndUpdate({ idUser }, req.body, {
    new: true,
  });
  if (!updateBilling) return next(new ErrorResponse(400, "can not update"));
  res.status(200).json(new SuccessResponse(200, updateBilling));
});

//xóa hóa đơn theo id user
exports.deleteBillingByIdUser = asyncMiddleware(async (req, res, next) => {
  const { idUser } = req.body;
  if (!idUser.trim()) return next(new ErrorResponse(400, "idUser is empty"));
  const deleteBilling = await Billing.findOneAndDelete({ idUser });
  if (!deleteBilling) return next(new ErrorResponse(400, "can not delete"));
  res.status(200).json(new SuccessResponse(200));
});

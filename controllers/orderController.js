const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const SuccessResponse = require("../models/SuccessResponse");
const ErrorResponse = require("../models/ErrorResponse");
const Order = require("../database/models/Order");

// ĐƠN HÀNG

//thêm đơn hàng(order)
//id người mua, số tiền
exports.addOrder = asyncMiddleware(async (req, res, next) => {
  const { idUser, price } = req.body;
  const newOrder = new Order({ idUser, price });
  const order = await newOrder.save();
  res.status(201).json(new SuccessResponse(201, order));
});
//lấy đơn hàng theo id người mua
exports.getOrderByIdUser = asyncMiddleware(async (req, res, next) => {
  const { idUser } = req.body;
  const doc = await Order.find({ idUser });
  if (!doc) {
    return next(new ErrorResponse(404, "Order is not found"));
  }
  res.status(200).json(new SuccessResponse(200, doc));
});
//lấy toàn bộ đơn hàng
exports.getAllOrder = asyncMiddleware(async (req, res, next) => {
  const order = await Order.find();
  res.status(200).json(new SuccessResponse(200, order));
});
//cập nhật đon hàng theo id user
exports.updateOrderByIdUser = asyncMiddleware(async (req, res, next) => {
  const { idUser } = req.body;
  if (!idUser.trim()) return next(new ErrorResponse(400, "idUser is empty"));
  const updateOrder = await Order.findOneAndUpdate({ idUser }, req.body, {
    new: true,
  });
  if (!updateOrder) return next(new ErrorResponse(400, "can not update"));
  res.status(200).json(new SuccessResponse(200, updateOrder));
});
//xóa đơn hàng theo id user
exports.deleteOrderByIdUser = asyncMiddleware(async (req, res, next) => {
  const { idUser } = req.body;
  if (!idUser.trim()) return next(new ErrorResponse(400, "idUser is empty"));
  const deleteOrder = await Order.findOneAndDelete({ idUser });
  if (!deleteOrder) return next(new ErrorResponse(400, "can not delete"));
  res.status(200).json(new SuccessResponse(200));
});

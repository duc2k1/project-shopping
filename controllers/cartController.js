const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const Cart = require("../database/models/Cart");
const SuccessResponse = require("../models/SuccessResponse");
const ErrorResponse = require("../models/ErrorResponse");
//GIỎ HÀNG
//id người mua, id sản phẩm, giá tiền,số lượng
//output
//id người mua, mảng sản phẩm, thành tiền
exports.addItemCart = asyncMiddleware(async (req, res, next) => {
  const { idUser, idProduct, price, count } = req.body;
  const newCart = new Cart({ idUser, idProduct, price, count });
  const cart = await newCart.save();
  res.status(201).json(new SuccessResponse(201, cart));
});
exports.getCartByIdUser = asyncMiddleware(async (req, res, next) => {
  const { idUser } = req.body;
  const cart = await Cart.find({ idUser }).catch(
    (err) => new ErrorResponse(404, "user is not found")
  );
  if (cart) res.status(200).json(new SuccessResponse(200, cart));
});
exports.getTotalCountByIdUser = asyncMiddleware(async (req, res, next) => {
  const { idUser } = req.body;
  const cart = await Cart.find({ idUser }).catch(
    (err) => new ErrorResponse(404, "user is not found")
  );
  let sum = 0;
  cart.forEach((e) => {
    sum += e.price * e.count;
  });
  if (cart) res.status(200).json(new SuccessResponse(200, sum));
});

//cập nhật cart theo id user
exports.updateCartByIdUser = asyncMiddleware(async (req, res, next) => {
  const { idUser } = req.body;
  if (!idUser.trim()) return next(new ErrorResponse(400, "idUser is empty"));
  const updateCart = await Cart.findOneAndUpdate({ idUser }, req.body, {
    new: true,
  });
  if (!updateCart) return next(new ErrorResponse(400, "can not update"));
  res.status(200).json(new SuccessResponse(200, updateCart));
});
//xóa cart theo id user
exports.deleteCartByIdUser = asyncMiddleware(async (req, res, next) => {
  const { idUser } = req.body;
  if (!idUser.trim()) return next(new ErrorResponse(400, "idUser is empty"));
  const deleteCart = await Cart.findOneAndDelete({ idUser });
  if (!deleteCart) return next(new ErrorResponse(400, "can not delete"));
  res.status(200).json(new SuccessResponse(200));
});

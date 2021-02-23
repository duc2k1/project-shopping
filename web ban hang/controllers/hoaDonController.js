const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const SuccessResponse = require("../models/SuccessResponse");
const ErrorResponse = require("../models/ErrorResponse");
const HoaDon = require("../database/models/HoaDon");

// HÓA ĐƠN

//thêm hóa đơn
//id người mua, id sản phẩm, giá tiền, số lượng
exports.addHoaDon = asyncMiddleware(async (req, res, next) => {
  const { idUser, idProduct, giaTien, soLuong } = req.body;
  const newHoaDon = new HoaDon({ idUser, idProduct, giaTien, soLuong });
  const hoaDon = await newHoaDon.save();
  res.status(201).json(new SuccessResponse(201, hoaDon));
});
//lấy khuyến mãi theo id người mua
exports.getHoaDonByIdUser = asyncMiddleware(async (req, res, next) => {
  const { idUser } = req.body;
  const doc = await HoaDon.find({ idUser: idUser });
  if (!doc) {
    return next(new ErrorResponse(404, "Hoa don is not found"));
  }
  res.status(200).json(new SuccessResponse(200, doc));
});
//lấy toàn bộ hóa dơn
exports.getAllHoaDon = asyncMiddleware(async (req, res, next) => {
  const hoaDon = await HoaDon.find();
  res.status(200).json(new SuccessResponse(200, hoaDon));
});
//cập nhật hóa đơn theo id user
exports.updateHoaDonByIdUser = asyncMiddleware(async (req, res, next) => {
  const { idUser } = req.body;
  if (!idUser.trim()) return next(new ErrorResponse(400, "idUser is empty"));

  const updateHoaDon = await HoaDon.findOneAndUpdate(
    { idUser: idUser },
    req.body,
    {
      new: true,
    }
  );
  if (!updateHoaDon) return next(new ErrorResponse(400, "can not update"));
  res.status(200).json(new SuccessResponse(200, updateHoaDon));
});
//xóa hóa đơn theo id user
exports.deleteHoaDonByIdUser = asyncMiddleware(async (req, res, next) => {
  const { idUser } = req.body;
  if (!idUser.trim()) return next(new ErrorResponse(400, "idUser is empty"));
  const deleteHoaDon = await HoaDon.findOneAndDelete({ idUser: idUser });
  if (!deleteHoaDon) return next(new ErrorResponse(400, "can not delete"));
  res.status(200).json(new SuccessResponse(200));
});

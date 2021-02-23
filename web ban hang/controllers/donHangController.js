const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const SuccessResponse = require("../models/SuccessResponse");
const ErrorResponse = require("../models/ErrorResponse");
const DonHang = require("../database/models/DonHang");

// ĐƠN HÀNG

//thêm đơn hàng
//id người mua, số tiền
exports.addDonHang = asyncMiddleware(async (req, res, next) => {
  const { idUser, soTien } = req.body;
  const newDonHang = new DonHang({ idUser, soTien });
  const donHang = await newDonHang.save();
  res.status(201).json(new SuccessResponse(201, donHang));
});
//lấy đơn hàng theo id người mua
exports.getDonHangByIdUser = asyncMiddleware(async (req, res, next) => {
  const { idUser } = req.body;
  const doc = await DonHang.find({ idUser: idUser });
  if (!doc) {
    return next(new ErrorResponse(404, "Don hang is not found"));
  }
  res.status(200).json(new SuccessResponse(200, doc));
});
//lấy toàn bộ đơn hàng
exports.getAllDonHang = asyncMiddleware(async (req, res, next) => {
  const donHang = await DonHang.find();
  res.status(200).json(new SuccessResponse(200, donHang));
});
//cập nhật đon hàng theo id user
exports.updateDonHangByIdUser = asyncMiddleware(async (req, res, next) => {
  const { idUser } = req.body;
  if (!idUser.trim()) return next(new ErrorResponse(400, "idUser is empty"));
  const updateDonHang = await DonHang.findOneAndUpdate(
    { idUser: idUser },
    req.body,
    {
      new: true,
    }
  );
  if (!updateDonHang) return next(new ErrorResponse(400, "can not update"));
  res.status(200).json(new SuccessResponse(200, updateDonHang));
});
//xóa đơn hàng theo id user
exports.deleteDonHangByIdUser = asyncMiddleware(async (req, res, next) => {
  const { idUser } = req.body;
  if (!idUser.trim()) return next(new ErrorResponse(400, "idUser is empty"));
  const deleteDonHang = await DonHang.findOneAndDelete({ idUser: idUser });
  if (!deleteDonHang) return next(new ErrorResponse(400, "can not delete"));
  res.status(200).json(new SuccessResponse(200));
});

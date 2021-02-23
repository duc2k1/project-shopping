const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const SuccessResponse = require("../models/SuccessResponse");
const ErrorResponse = require("../models/ErrorResponse");
const KhuyenMai = require("../database/models/KhuyenMai");

//KHUYẾN MÃI

//thêm khuyến mãi
// id sản phẩm, giá khuyến mãi
exports.addKhuyenMai = asyncMiddleware(async (req, res, next) => {
  const { idProduct, promotionalPrice } = req.body;
  const newKhuyenMai = new KhuyenMai({ idProduct, promotionalPrice });
  const khuyenMai = await newKhuyenMai.save();
  res.status(201).json(new SuccessResponse(201, khuyenMai));
});
//lấy khuyến mãi theo id sản phẩm
exports.getKhuyenMaiByIdProduct = asyncMiddleware(async (req, res, next) => {
  const { idProduct } = req.body;
  const doc = await KhuyenMai.find({ idProduct: idProduct });
  console.log(doc);
  if (!doc) {
    return next(new ErrorResponse(404, "Danh gia is not found"));
  }
  res.status(200).json(new SuccessResponse(200, doc));
});
//lấy toàn bộ khuyến mãi
exports.getAllKhuyenMai = asyncMiddleware(async (req, res, next) => {
  const khuyenMai = await KhuyenMai.find();
  console.log(khuyenMai);
  res.status(200).json(new SuccessResponse(200, khuyenMai));
});
//cập nhật khuyến mãi theo id sản phẩm
exports.updateKhuyenMaiByIdProduct = asyncMiddleware(async (req, res, next) => {
  const { idProduct } = req.body;
  if (!idProduct.trim())
    return next(new ErrorResponse(400, "idProduct is empty"));

  const updateKhuyenMai = await KhuyenMai.findOneAndUpdate(
    { idProduct: idProduct },
    req.body,
    {
      new: true,
    }
  );
  if (!updateKhuyenMai) return next(new ErrorResponse(400, "can not update"));
  res.status(200).json(new SuccessResponse(200, updateKhuyenMai));
});
//xóa khuyến mãi theo id sản phẩm
exports.deleteKhuyenMaiByIdProduct = asyncMiddleware(async (req, res, next) => {
  const { idProduct } = req.body;
  if (!idProduct.trim())
    return next(new ErrorResponse(400, "idUsidProducter is empty"));
  const deleteKhuyenMai = await KhuyenMai.findOneAndDelete(idProduct);
  if (!deleteKhuyenMai) return next(new ErrorResponse(400, "can not delete"));
  res.status(200).json(new SuccessResponse(200));
});

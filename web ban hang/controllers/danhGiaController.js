const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const SuccessResponse = require("../models/SuccessResponse");
const ErrorResponse = require("../models/ErrorResponse");
const DanhGia = require("../database/models/DanhGia");

//ĐÁNH GIÁ

//thêm đánh giá
//id người mua, id sản phẩm, đánh giá, số sao
exports.addDanhGia = asyncMiddleware(async (req, res, next) => {
  const { idUser, idProduct, feedBack, star } = req.body;
  const newDanhGia = new DanhGia({ idUser, idProduct, feedBack, star });
  const danhGia = await newDanhGia.save();
  res.status(201).json(new SuccessResponse(201, danhGia));
});
//lấy đánh giá theo id user và id sản phẩm
exports.getDanhGiaByIdUserAndIdProduct = asyncMiddleware(
  async (req, res, next) => {
    const { idUser, idProduct } = req.body;
    const doc = await DanhGia.find({ idUser: idUser, idProduct: idProduct });
    if (!doc) {
      return next(new ErrorResponse(404, "Danh gia is not found"));
    }
    res.status(200).json(new SuccessResponse(200, doc));
  }
);
//cập nhật đánh giá theo  id user và id sản phẩm
exports.updateDanhGiaByIdUserAndIdProduct = asyncMiddleware(
  async (req, res, next) => {
    const { idUser, idProduct } = req.body;
    if (!idProduct.trim() || !idUser.trim())
      return next(new ErrorResponse(400, "idProduct or idUser is empty"));
    const updateDanhGia = await DanhGia.findOneAndUpdate(
      { idUser: idUser, idProduct: idProduct },
      req.body,
      {
        new: true,
      }
    );
    if (!updateDanhGia) return next(new ErrorResponse(400, "can not update"));
    res.status(200).json(new SuccessResponse(200, updateDanhGia));
  }
);
//xóa đánh giá theo id user và id sản phẩm
exports.deleteDanhGiaByIdUserAndIdProduct = asyncMiddleware(
  async (req, res, next) => {
    const { idUser, idProduct } = req.body;
    if (!idProduct.trim() || !idUser.trim())
      return next(new ErrorResponse(400, "idProduct or idUser is empty"));
    const deleteDanhGia = await DanhGia.findOneAndDelete({
      idUser: idUser,
      idProduct: idProduct,
    });
    if (!deleteDanhGia) return next(new ErrorResponse(400, "can not delete"));
    res.status(200).json(new SuccessResponse(200));
  }
);

const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const SuccessResponse = require("../models/SuccessResponse");
const ErrorResponse = require("../models/ErrorResponse");
const FeedBack = require("../database/models/FeedBack");

//ĐÁNH GIÁ

//thêm đánh giá(feedback)
//id người mua, id sản phẩm, đánh giá(feedback), số sao
exports.addFeedBack = asyncMiddleware(async (req, res, next) => {
  const { idUser, idProduct, feedBackOfUser, star } = req.body;
  const newFeedBack = new DanhGia({ idUser, idProduct, feedBackOfUser, star });
  const feedBack = await newFeedBack.save();
  res.status(201).json(new SuccessResponse(201, feedBack));
});
//lấy đánh giá theo id user và id sản phẩm
exports.getFeedBackByIdUserAndIdProduct = asyncMiddleware(
  async (req, res, next) => {
    const { idUser, idProduct } = req.body;
    const doc = await FeedBack.find({ idUser, idProduct });
    if (!doc) {
      return next(new ErrorResponse(404, "Feed back is not found"));
    }
    res.status(200).json(new SuccessResponse(200, doc));
  }
);
//cập nhật đánh giá theo  id user và id sản phẩm
exports.updateFeedBackByIdUserAndIdProduct = asyncMiddleware(
  async (req, res, next) => {
    const { idUser, idProduct } = req.body;
    if (!idProduct.trim() || !idUser.trim())
      return next(new ErrorResponse(400, "idProduct or idUser is empty"));
    const updateFeedBack = await FeedBack.findOneAndUpdate(
      { idUser, idProduct },
      req.body,
      {
        new: true,
      }
    );
    if (!updateFeedBack) return next(new ErrorResponse(400, "can not update"));
    res.status(200).json(new SuccessResponse(200, updateFeedBack));
  }
);
//xóa đánh giá theo id user và id sản phẩm
exports.deleteFeedBackByIdUserAndIdProduct = asyncMiddleware(
  async (req, res, next) => {
    const { idUser, idProduct } = req.body;
    if (!idProduct.trim() || !idUser.trim())
      return next(new ErrorResponse(400, "idProduct or idUser is empty"));
    const deleteFeedBack = await FeedBack.findOneAndDelete({
      idUser,
      idProduct,
    });
    if (!deleteFeedBack) return next(new ErrorResponse(400, "can not delete"));
    res.status(200).json(new SuccessResponse(200));
  }
);

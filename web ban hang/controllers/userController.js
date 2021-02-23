const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const User = require("../database/models/User");
const SuccessResponse = require("../models/SuccessResponse");
const ErrorResponse = require("../models/ErrorResponse");
//---------------------------
//ACTIVE
//mac dinh isActive = false, user có role = admin co quyen active user khac
//thay doi isActive dua vao email
exports.activeUserByName = asyncMiddleware(async (req, res, next) => {
  const { name } = req.body;
  const update = await User.findOneAndUpdate(
    { name: name },
    { isActive: true },
    {
      new: true,
    }
  );
  if (!update) return next(new ErrorResponse(400, "can not update"));
  res.status(200).json(new SuccessResponse(200, update));
});
//--
exports.getAllUsers = asyncMiddleware(async (req, res, next) => {
  const user = await User.find()
    .populate({
      path: "role_detail",
      select: "role_name role_desc",
    })
    .select("-password");
  if (!user.length) return next(new ErrorResponse(404, "no users"));
  res.status(200).json(new SuccessResponse(200, user));
});
//---------------------------
exports.getUserById = asyncMiddleware(async (req, res, next) => {
  const { userId } = req.params;
  if (!userId.trim()) return next(new ErrorResponse(400, "userId is empty"));
  const user = await User.findById(userId)
    .select("-password")
    .catch((err) => new ErrorResponse(404, "user is not found"));
  if (user) res.status(200).json(new SuccessResponse(200, user));
});
//---------------------------
exports.deleteUserById = asyncMiddleware(async (req, res, next) => {
  const { userId } = req.params;
  if (!userId.trim()) return next(new ErrorResponse(400, "userId is empty"));
  const deleteUser = await User.findByIdAndDelete(userId);
  if (!deleteUser) return next(new ErrorResponse(400, "can not delete"));
  res.status(200).json(new SuccessResponse(200));
});
//---------------------------
exports.updateUserById = asyncMiddleware(async (req, res, next) => {
  const { userId } = req.params;
  if (!userId.trim()) return next(new ErrorResponse(400, "userId is empty"));
  const updateUser = await User.findOneAndUpdate({ _id: userId }, req.body, {
    new: true,
  });
  if (!updateUser) return next(new ErrorResponse(400, "can not update"));
  res.status(200).json(new SuccessResponse(200, updateUser));
});

const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const User = require("../database/models/User");
const SuccessResponse = require("../models/SuccessResponse");
const ErrorResponse = require("../models/ErrorResponse");
//---------------------------
//UPDATE PASSWORD

//old password, new password, confirm password
exports.updatePassword = asyncMiddleware(async (req, res, next) => {
  //bạn nhập mật khẩu cũ, mật khẩu mới, xác nhận mật khẩu mới
  const { email, oldPassword, newPassword, confirmPassword } = req.body;
  //so sánh 2 newPassword và confirmPassword
  if (newPassword !== confirmPassword)
    return next(
      new ErrorResponse(400, "newPassword and confirmPassword must same")
    );
  //ss oldPass và password
  const isExistEmail = await User.findOne({ email });
  if (isExistEmail) {
    const isMatchPassword = await User.comparePassword(
      oldPassword /*chưa hash*/,
      isExistEmail.password /*đã hash*/
    );
    if (isMatchPassword) {
      const update = await User.findOneAndUpdate(
        { email },
        { password: newPassword },
        {
          new: true,
        }
      );
      if (!update) return next(new ErrorResponse(400, "can not update"));
      res.status(200).json(new SuccessResponse(200, update));
    } else return next(new ErrorResponse(400, "oldPassword is incorrect!"));
  } else return next(new ErrorResponse(400, "email is not found!"));
});
//ACTIVE
//mac dinh isActive = false, user có role = admin co quyen active user khac
//thay doi isActive dua vao email
exports.activeUserByName = asyncMiddleware(async (req, res, next) => {
  const { name } = req.body;
  const update = await User.findOneAndUpdate(
    { name },
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

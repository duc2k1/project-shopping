const ErrorResponse = require("../models/ErrorResponse");
//--
exports.authorize = (...roles) => (req, res, next) => {
  if (!req.user) {
    return next(
      new ErrorResponse(401, "Unauthorization,vao dc nhung ko lam dc")
    );
  }
  if (!roles.includes(req.user.role)) {
    return next(
      new ErrorResponse(
        401,
        "Don't have permission to access this route,Không có quyền truy cập vào tuyến đường này"
      )
    );
  }
  next();
};

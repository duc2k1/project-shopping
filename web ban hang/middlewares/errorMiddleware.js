const ErrorResponse = require("../models/ErrorResponse");
//---------------------------------------------------------------------------------------------------------------------------------------
const errorMiddleware = (err, req, res, next) => {
  let errors = { ...err };
  if (!err.code && err.message) {
    errors.code = 500;
    errors.message = err.message;
  }
  if (err.code === 11000) {
    errors = new ErrorResponse(400, err.keyValue);
    for (let i in errors.message) {
      errors.message[i] = `${i} is already exist`;
    }
  }
  //object Id validator
  if (err.name === "CastError") {
    errors.code = 400;
    errors.message = "Id is invalid";
  }
  //------------------
  if (err.name === "ValidationError") {
    errors = new ErrorResponse(400, err.errors);
    for (let i in errors.message) {
      errors.message[i] = errors.message[i].message;
    }
  }
  res.status(errors.code).json({
    success: false,
    code: errors.code,
    message: errors.message,
  });
  next();
};
//---------------------------------------------------------------------------------------------------------------------------------------
exports.errorMiddleware = errorMiddleware;

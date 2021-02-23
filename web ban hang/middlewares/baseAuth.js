const dotenv = require("dotenv");
dotenv.config();
const ErrorResponse = require("../models/ErrorResponse");
exports.baseAuth = async (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;
  //kiem tra co token tren header chua
  if (!token) return next(new ErrorResponse(401, "base token is required"));
  //neu ton tai token
  const decode = new Buffer.from(token, "base64").toString();
  if (
    `${process.env.BASEAUTH_USER}:${process.env.BASEAUTH_PASSWORD}` === decode
  ) {
    console.log("base");
    next();
  } else {
    return next(new ErrorResponse(401, "base token is invalid"));
  }
};

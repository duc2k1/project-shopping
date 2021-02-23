const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const SuccessResponse = require("../models/SuccessResponse");
const ErrorResponse = require("../models/ErrorResponse");
const User = require("../database/models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
//----------------------
//QUÊN MẬT KHẨU
exports.forgetPass = asyncMiddleware(async (req, res, next) => {
  const { email } = req.body;
  const isExistEmail = await User.findOne({ email });
  if (isExistEmail) {
    //
    const option = {
      service: "gmail",
      auth: {
        user: "duc.phan622@gmail.com", // email hoặc username
        pass: "duc0978051135", // password
      },
    };
    const transporter = nodemailer.createTransport(option);
    //random mật khẩu tu tren 6 chu so
    const pass = (Math.floor(Math.random() * 1000000) + 100000).toString();
    const mail = {
      from: "duc.phan622@gmail.com", // Địa chỉ email của người gửi
      to: `${email}`, //email user
      subject: "Thay đổi mật khẩu", // Tiêu đề mail
      text: `Mật khẩu mới của bạn:${pass} `, // Nội dung mail dạng text
      html: `<h1>Mật khẩu mới của bạn:${pass}</h1>`, // Nội dung mail dạng html
    };
    //Tiến hành gửi email
    transporter.sendMail(mail, function (error, info) {
      if (error) {
        // nếu có lỗi
        console.log(error);
      } else {
        //nếu thành công
        console.log("Email sent: " + info.response);
      }
    });
    //cập nhật mật khẩu user by email
    console.log(req.body);
    const updateUser = await User.findOneAndUpdate(
      { email: email },
      { password: pass },
      {
        new: true,
      }
    );
    if (!updateUser) return next(new ErrorResponse(400, "can not update"));
    res.status(200).json(new SuccessResponse(200, updateUser));
  }
});
//ĐĂNG KÝ TÀI KHOẢN
exports.register = asyncMiddleware(async (req, res, next) => {
  const { email, name, password } = req.body;
  const newUser = new User({ email, name, password });
  const saved_user = await newUser.save();
  res.status(201).json(new SuccessResponse(201, saved_user));
});
//ĐĂNG NHẬP
exports.login = asyncMiddleware(async (req, res, next) => {
  const { email, password } = req.body;
  const isExistEmail = await User.findOne({ email });
  if (isExistEmail) {
    const isMatchPassword = await User.comparePassword(
      password,
      isExistEmail.password
    );
    if (isMatchPassword) {
      const token = jwt.sign(
        {
          name: isExistEmail.name,
          email: isExistEmail.email,
          role: isExistEmail.role,
        },
        process.env.JWT_KEY
      );
      return res.status(200).json(new SuccessResponse(200, token));
    } else return next(new ErrorResponse(400, "Password is incorrect!"));
  } else return next(new ErrorResponse(404, "Email is not found"));
});

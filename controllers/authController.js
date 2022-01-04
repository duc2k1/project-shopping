// Importing the required modules
const { asyncMiddleware } = require("../middlewares/asyncMiddleware");
const SuccessResponse = require("../models/SuccessResponse");
const ErrorResponse = require("../models/ErrorResponse");
const User = require("../database/models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Forget password
exports.forgetPass = asyncMiddleware(async (req, res, next) => {
  const { email } = req.body;
  const isExistEmail = await User.findOne({ email });
  if (isExistEmail) {
    const option = {
      service: "gmail",
      auth: {
        user: "duc.phan622@gmail.com", // email or userName
        pass: "*********", // password
      },
    };
    const transporter = nodemailer.createTransport(option);

    //random password > 6 characters
    const pass = (Math.floor(Math.random() * 1000000) + 100000).toString();
    const mail = {
      from: "duc.phan622@gmail.com", // Email address of sender
      to: `${email}`, // Email address of receiver
      subject: "Thay đổi mật khẩu", // Subject of the mail
      text: `Mật khẩu mới của bạn:${pass} `, // Plain text body
      html: `<h1>Mật khẩu mới của bạn:${pass}</h1>`, // HTML body
    };

    // Send mail with defined transport object
    transporter.sendMail(mail, function (error, info) {
      if (error) {
        // If have error
        console.log(error);
      } else {
        // If success
        console.log("Email sent: " + info.response);
      }
    });

    // Update password by email
    const updateUser = await User.findOneAndUpdate(
      { email: email },
      { password: pass },
      {
        new: true,
      }
    );

    // If can't update password
    if (!updateUser) return next(new ErrorResponse(400, "can not update"));

    // If success
    res.status(200).json(new SuccessResponse(200, updateUser));
  }
});

// Register account
exports.register = asyncMiddleware(async (req, res, next) => {
  const { email, name, password } = req.body;
  const newUser = new User({ email, name, password });
  const saved_user = await newUser.save();
  res.status(201).json(new SuccessResponse(201, saved_user));
});

// Login account
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

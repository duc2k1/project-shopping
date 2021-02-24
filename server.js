const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { ConnectMongo } = require("./database/connectMongo");
const app = express();
const PORT = 3000;
const auth = require("./route/api/auth");
const user = require("./route/api/user");
const role = require("./route/api/role");
const product = require("./route/api/product");
const category = require("./route/api/category");
const cart = require("./route/api/cart");
const order = require("./route/api/order");
const billing = require("./route/api/billing");
const promotion = require("./route/api/promotion");
const feedBack = require("./route/api/feedBack");
const { errorMiddleware } = require("./middlewares/errorMiddleware");
//----------------------------------
ConnectMongo.getConnect();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use("/api/v1/auth", auth); //dang ky,dang nhap, quen mk
app.use("/api/v1/user", user); //active tk,...
app.use("/api/v1/role", role); //phân quyền
app.use("/api/v1/product", product); //get product(by id ,all) , thêm product, xóa product
app.use("/api/v1/category", category); //(loại)
app.use("/api/v1/cart", cart); //(giỏ hàng)
app.use("/api/v1/order", order);
app.use("/api/v1/billing", billing);
app.use("/api/v1/promotion", promotion);
app.use("/api/v1/feedBack", feedBack);
app.use(errorMiddleware);
//---------------------------------------------------------------------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
//---------------------------------------------------------------------------------------------------------------------------------------
//🌏 🌊	🌉 🌈

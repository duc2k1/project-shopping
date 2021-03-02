const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/orderController");
const { jwtAuth } = require("../../middlewares/jwtAuth");
//-----------------------
router.get("/getAllOrder", jwtAuth, orderController.getAllOrder); //body
router.get("/getOrderByIdUser", jwtAuth, orderController.getOrderByIdUser); //body
router.post("/addOrder", jwtAuth, orderController.addOrder); //body
router.post(
  "/deleteOrderByIdUser",
  jwtAuth,
  orderController.deleteOrderByIdUser
); //body
router.post(
  "/updateOrderByIdUser",
  jwtAuth,
  orderController.updateOrderByIdUser
); //body
//-----------------------
module.exports = router;

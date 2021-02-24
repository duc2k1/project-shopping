const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/orderController");
//-----------------------
router.get("/getAllOrder", orderController.getAllOrder); //body
router.get("/getOrderByIdUser", orderController.getOrderByIdUser); //body
router.post("/addOrder", orderController.addOrder); //body
router.post("/deleteOrderByIdUser", orderController.deleteOrderByIdUser); //body
router.post("/updateOrderByIdUser", orderController.updateOrderByIdUser); //body
//-----------------------
module.exports = router;

const express = require("express");
const router = express.Router();
const hoaDonController = require("../../controllers/hoaDonController");
//-----------------------
router.get("/getAllHoaDon", hoaDonController.getAllHoaDon); //body
router.get("/getHoaDonByIdUser", hoaDonController.getHoaDonByIdUser); //body
router.post("/addHoaDon", hoaDonController.addHoaDon); //body
router.post("/deleteHoaDonByIdUser", hoaDonController.deleteHoaDonByIdUser); //body
router.post("/updateHoaDonByIdUser", hoaDonController.updateHoaDonByIdUser); //body
//-----------------------
module.exports = router;

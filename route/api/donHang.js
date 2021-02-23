const express = require("express");
const router = express.Router();
const donHangController = require("../../controllers/donHangController");
//-----------------------
router.get("/getAllDonHang", donHangController.getAllDonHang); //body
router.get("/getDonHangByIdUser", donHangController.getDonHangByIdUser); //body
router.post("/addDonHang", donHangController.addDonHang); //body
router.post("/deleteDonHangByIdUser", donHangController.deleteDonHangByIdUser); //body
router.post("/updateDonHangByIdUser", donHangController.updateDonHangByIdUser); //body
//-----------------------
module.exports = router;

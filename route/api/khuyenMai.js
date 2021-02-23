const express = require("express");
const router = express.Router();
const khuyenMaiController = require("../../controllers/khuyenMaiController");
//-----------------------
router.get("/getAllKhuyenMai", khuyenMaiController.getAllKhuyenMai); //body
router.get(
  "/getKhuyenMaiByIdProduct",
  khuyenMaiController.getKhuyenMaiByIdProduct
); //body
router.post("/addKhuyenMai", khuyenMaiController.addKhuyenMai); //body
router.post(
  "/deleteKhuyenMaiByIdProduct",
  khuyenMaiController.deleteKhuyenMaiByIdProduct
); //body
router.post(
  "/updateKhuyenMaiByIdProduct",
  khuyenMaiController.updateKhuyenMaiByIdProduct
); //body
//-----------------------
module.exports = router;

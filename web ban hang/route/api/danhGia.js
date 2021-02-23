const express = require("express");
const router = express.Router();
const danhGiaController = require("../../controllers/danhGiaController");
//-----------------------
router.get(
  "/getDanhGiaByIdUserAndIdProduct",
  danhGiaController.getDanhGiaByIdUserAndIdProduct
); //body
router.post("/addDanhGia", danhGiaController.addDanhGia); //body
router.post(
  "/deleteDanhGiaByIdUserAndIdProduct",
  danhGiaController.deleteDanhGiaByIdUserAndIdProduct
); //body
router.post(
  "/updateDanhGiaByIdUserAndIdProduct",
  danhGiaController.updateDanhGiaByIdUserAndIdProduct
); //body
//-----------------------
module.exports = router;

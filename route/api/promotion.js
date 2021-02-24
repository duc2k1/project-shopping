const express = require("express");
const router = express.Router();
const promotionController = require("../../controllers/promotionController");
//-----------------------
router.get("/getAllPromotion", promotionController.getAllPromotion); //body
router.get(
  "/getPromotionByIdProduct",
  promotionController.getPromotionByIdProduct
); //body
router.post("/addPromotion", promotionController.addPromotion); //body
router.post(
  "/deletePromotionByIdProduct",
  promotionController.deletePromotionByIdProduct
); //body
router.post(
  "/updatePromotionByIdProduct",
  promotionController.updatePromotionByIdProduct
); //body
//-----------------------
module.exports = router;

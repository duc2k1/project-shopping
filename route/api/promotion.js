const express = require("express");
const router = express.Router();
const promotionController = require("../../controllers/promotionController");
const { jwtAuth } = require("../../middlewares/jwtAuth");
//-----------------------
router.get("/getAllPromotion", jwtAuth, promotionController.getAllPromotion); //body
router.get(
  "/getPromotionByIdProduct",
  jwtAuth,
  promotionController.getPromotionByIdProduct
); //body
router.post("/addPromotion", jwtAuth, promotionController.addPromotion); //body
router.post(
  "/deletePromotionByIdProduct",
  jwtAuth,
  promotionController.deletePromotionByIdProduct
); //body
router.post(
  "/updatePromotionByIdProduct",
  jwtAuth,
  promotionController.updatePromotionByIdProduct
); //body
//-----------------------
module.exports = router;

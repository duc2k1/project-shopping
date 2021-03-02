const express = require("express");
const router = express.Router();
const feedBackController = require("../../controllers/feedBackController");
const { jwtAuth } = require("../../middlewares/jwtAuth");
//-----------------------
router.get(
  "/getFeedBackByIdUserAndIdProduct",
  jwtAuth,
  feedBackController.getFeedBackByIdUserAndIdProduct
); //body
router.post("/addFeedBack", jwtAuth, feedBackController.addFeedBack); //body
router.post(
  "/deleteFeedBackByIdUserAndIdProduct",
  jwtAuth,
  feedBackController.deleteFeedBackByIdUserAndIdProduct
); //body
router.post(
  "/updateFeedBackByIdUserAndIdProduct",
  jwtAuth,
  feedBackController.updateFeedBackByIdUserAndIdProduct
); //body
//-----------------------
module.exports = router;

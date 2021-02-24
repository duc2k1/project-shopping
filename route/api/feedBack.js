const express = require("express");
const router = express.Router();
const feedBackController = require("../../controllers/feedBackController");
//-----------------------
router.get(
  "/getFeedBackByIdUserAndIdProduct",
  feedBackController.getFeedBackByIdUserAndIdProduct
); //body
router.post("/addFeedBack", feedBackController.addFeedBack); //body
router.post(
  "/deleteFeedBackByIdUserAndIdProduct",
  feedBackController.deleteFeedBackByIdUserAndIdProduct
); //body
router.post(
  "/updateFeedBackByIdUserAndIdProduct",
  feedBackController.updateFeedBackByIdUserAndIdProduct
); //body
//-----------------------
module.exports = router;

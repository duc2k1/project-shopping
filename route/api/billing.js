const express = require("express");
const router = express.Router();
const billingController = require("../../controllers/billingController");
const { jwtAuth } = require("../../middlewares/jwtAuth");
//-----------------------
router.get("/getAllBilling", jwtAuth, billingController.getAllBilling); //body
router.get(
  "/getBillingByIdUser",
  jwtAuth,
  billingController.getBillingByIdUser
); //body
router.post("/addBilling", jwtAuth, billingController.addBilling); //body
router.post(
  "/deleteBillingByIdUser",
  jwtAuth,
  billingController.deleteBillingByIdUser
); //body
router.post(
  "/updateBillingByIdUser",
  jwtAuth,
  billingController.updateBillingByIdUser
); //body
//-----------------------
module.exports = router;

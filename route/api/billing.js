const express = require("express");
const router = express.Router();
const billingController = require("../../controllers/billingController");
//-----------------------
router.get("/getAllBilling", billingController.getAllBilling); //body
router.get("/getBillingByIdUser", billingController.getBillingByIdUser); //body
router.post("/addBilling", billingController.addBilling); //body
router.post("/deleteBillingByIdUser", billingController.deleteBillingByIdUser); //body
router.post("/updateBillingByIdUser", billingController.updateBillingByIdUser); //body
//-----------------------
module.exports = router;

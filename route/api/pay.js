const express = require("express");
const router = express.Router();
const payController = require("../../controllers/payController");
//--
router.get("/pay", payController.pay); //query
router.get("/success", payController.success); //return result
router.get("/cancel", payController.cancel); //return result
//--
module.exports = router;

const express = require("express");
const router = express.Router();
const roleController = require("../../controllers/roleController");
const { authorize } = require("../../middlewares/authorize");
const { jwtAuth } = require("../../middlewares/jwtAuth");
//---------------
router.use(jwtAuth, authorize("admin"));
//---------------
router
  .route("/")
  .post(roleController.createNewRole)
  .get(roleController.getAllRoles);
module.exports = router;

const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/categoryController");
const { jwtAuth } = require("../../middlewares/jwtAuth");
//-----------------------
router
  .route("/")
  .get(jwtAuth, categoryController.getAllCategory)
  .post(jwtAuth, categoryController.createNewCategory);
router
  .route("/:categoryId")
  .delete(jwtAuth, categoryController.deleteCategoryById);
//-----------------------
module.exports = router;

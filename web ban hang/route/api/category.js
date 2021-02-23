const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/categoryController");
//-----------------------
router
  .route("/")
  .get(categoryController.getAllCategory)
  .post(categoryController.createNewCategory);
router.route("/:categoryId").delete(categoryController.deleteCategoryById);
//-----------------------
module.exports = router;

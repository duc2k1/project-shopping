const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");
//-----------------------
router.route("/").get(productController.getAllProducts);
router.route("/").post(productController.createNewProduct); //body
router.route("/:productId").delete(productController.deleteProductById); //param
router.route("/:productId").get(productController.getProductById); //param
//-----------------------
module.exports = router;

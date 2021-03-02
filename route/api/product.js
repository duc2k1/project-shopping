const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productController");
const { jwtAuth } = require("../../middlewares/jwtAuth");
//-----------------------
router.get("/", jwtAuth, productController.getAllProducts);
router.post("/", jwtAuth, productController.createNewProduct); //body
router.delete("/:productId", jwtAuth, productController.deleteProductById); //param
router.get("/:productId", jwtAuth, productController.getProductById); //param
//-----------------------
module.exports = router;

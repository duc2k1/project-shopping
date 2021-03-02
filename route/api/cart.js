const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/cartController");
const { jwtAuth } = require("../../middlewares/jwtAuth");
//-----------------------
router
  .route("/")
  .get(jwtAuth, cartController.getCartByIdUser)
  .post(jwtAuth, cartController.addItemCart);
router.get("/getTotal", jwtAuth, cartController.getTotalCountByIdUser); //body
router.post("/update", jwtAuth, cartController.updateCartByIdUser); //body
router.post("/delete", jwtAuth, cartController.deleteCartByIdUser); //body
//-----------------------
module.exports = router;

const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/cartController");
//-----------------------
router
  .route("/")
  .get(cartController.getCartByIdUser)
  .post(cartController.addItemCart);
router.get("/getTotal", cartController.getTotalCountByIdUser); //body
router.post("/update", cartController.updateCartByIdUser); //body
router.post("/delete", cartController.deleteCartByIdUser); //body
//-----------------------
module.exports = router;

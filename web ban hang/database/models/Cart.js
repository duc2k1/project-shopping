const mongoose = require("mongoose");
const { Schema } = mongoose;
//--
const CartSchema = new Schema({
  idUser: String,
  idProduct: String,
  price: Number,
  count: Number,
});
module.exports = mongoose.model("Cart", CartSchema);

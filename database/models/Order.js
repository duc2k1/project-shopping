const mongoose = require("mongoose");
const { Schema } = mongoose;
//--
const OrderSchema = new Schema({
  idUser: String,
  price: Number,
});
module.exports = mongoose.model("Order", OrderSchema);

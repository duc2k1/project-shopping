const mongoose = require("mongoose");
const { Schema } = mongoose;
//--
const BillingSchema = new Schema({
  idUser: String,
  idProduct: String,
  price: Number,
  count: Number,
});
module.exports = mongoose.model("Billing", BillingSchema);

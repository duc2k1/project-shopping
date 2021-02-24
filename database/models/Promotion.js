const mongoose = require("mongoose");
const { Schema } = mongoose;
//--
const PromotionSchema = new Schema({
  idProduct: String,
  promotionalPrice: Number,
});
module.exports = mongoose.model("Promotion", PromotionSchema);

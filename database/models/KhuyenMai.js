const mongoose = require("mongoose");
const { Schema } = mongoose;
//--
const KhuyenMaiSchema = new Schema({
  idProduct: String,
  promotionalPrice: Number,
});
module.exports = mongoose.model("KhuyenMai", KhuyenMaiSchema);

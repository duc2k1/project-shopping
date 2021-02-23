const mongoose = require("mongoose");
const { Schema } = mongoose;
//--
const DanhGiaSchema = new Schema({
  idUser: String,
  idProduct: String,
  feedBack: String,
  star: Number,
});
module.exports = mongoose.model("DanhGia", DanhGiaSchema);

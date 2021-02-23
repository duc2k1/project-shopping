const mongoose = require("mongoose");
const { Schema } = mongoose;
//--
const HoaDonSchema = new Schema({
  idUser: String,
  idProduct: String,
  giaTien: Number,
  soLuong: Number,
});
module.exports = mongoose.model("HoaDon", HoaDonSchema);

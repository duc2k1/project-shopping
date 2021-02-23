const mongoose = require("mongoose");
const { Schema } = mongoose;
//--
const DonHangSchema = new Schema({
  idUser: String,
  soTien: Number,
});
module.exports = mongoose.model("DonHang", DonHangSchema);

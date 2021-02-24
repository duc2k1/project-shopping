const mongoose = require("mongoose");
const { Schema } = mongoose;
//--
const FeedBackSchema = new Schema({
  idUser: String,
  idProduct: String,
  feedBackOfUser: String,
  star: Number,
});
module.exports = mongoose.model("FeedBack", FeedBackSchema);

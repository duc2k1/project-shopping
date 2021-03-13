const mongoose = require("mongoose");
const { Schema } = mongoose;
//--
const TokenSchema = new Schema({
  token: String,
  id: String,
  email: String,
  name: String,
  role: String,
});
module.exports = mongoose.model("Token", TokenSchema);

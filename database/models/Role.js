const mongoose = require("mongoose");
const { Schema } = mongoose;
const roleSchema = new Schema(
  {
    role_name: {
      type: String,
      unique: true,
      required: [true, "role name is required"],
    },
    role_desc: {
      type: String,
      required: [true, "role desc is required"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Role", roleSchema);

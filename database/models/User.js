const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
//---------------------------------------------------------------------------------------------------------------------------------------
mongoose.set("runValidators", true);
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minlength: [6, "name must be at least 6 characters"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "password must be at least 6 characters"],
    },
    role: {
      type: String,
      default: "guest",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    timestamps: true,
  }
);
UserSchema.virtual("role_detail", {
  ref: "Role",
  localField: "role",
  foreignField: "role_name",
  justOne: true,
  // options: {
  //   $project: { 'role_detail.role_name:1', role_desc: 1 }
  // }
});
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(12);
  if (this._update.password != undefined)
    this.password = await bcrypt.hash(this.password, salt);
  next();
});
UserSchema.pre("findOneAndUpdate", async function (next) {
  const salt = await bcrypt.genSalt(12);
  if (this._update.password != undefined)
    this._update.password = await bcrypt.hash(this._update.password, salt);
  next();
});
UserSchema.statics.comparePassword = async function (password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
};
//---------------------------------------------------------------------------------------------------------------------------------------
module.exports = mongoose.model("User", UserSchema);

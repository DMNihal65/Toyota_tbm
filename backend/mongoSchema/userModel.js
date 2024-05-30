const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter user name"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please enter password"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  level: {
    type: Number,
    default: 10,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

userSchema.methods.getJsonWebToken = async function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000,
  });
};

module.exports = mongoose.model("users", userSchema);

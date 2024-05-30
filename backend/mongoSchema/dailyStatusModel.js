const mongoose = require("mongoose");

const dailyStatusSchema = new mongoose.Schema({
  checkItem: {
    type: mongoose.Schema.ObjectId,
    ref: "checkitems",
    required: true,
  },
  checkedAt: {
    type: Date,
    default: Date.now,
  },
  entryFor: {
    type: String,
    required: true,
  },
  pS: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: [true, "please enter the result judgement"],
  },
  remarks: {
    type: String,
  },
  value: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
  tl: {
    type: Boolean,
    default: false,
  },
  gl: {
    type: Boolean,
    default: false,
  },
  checkedBy: {
    type: String,
  },
});

module.exports = mongoose.model("dailystatus", dailyStatusSchema);

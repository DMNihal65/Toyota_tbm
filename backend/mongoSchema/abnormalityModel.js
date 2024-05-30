const mongoose = require("mongoose");

const abnormalityListSchema = new mongoose.Schema({
  checkItem: {
    type: mongoose.Schema.ObjectId,
    ref: "checkitems",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },

  abnormality: {
    type: String,
    required: [true, "please write the description of problem"],
  },
  countermeasure: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  targetDate: {
    type: Date,
  },
  pic: {
    type: String,
  },
  status: {
    type: String,
  },

  line: {
    type: String,
  },
  processNo: {
    type: String,
  },
  spare: {
    type: String,
  },
  image: {
    type: String,
  },
  pS: {
    type: String,
  },
});

module.exports = mongoose.model("abnormalities", abnormalityListSchema);

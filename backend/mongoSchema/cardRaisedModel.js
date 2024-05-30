const mongoose = require("mongoose");

const cardRaisedSchema = new mongoose.Schema({
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

  cardType: {
    type: String,
    required: [true, "please select card type"],
  },

  abnormality: {
    type: String,
    required: [true, "please write about abnormaility details"],
  },
  line: {
    type: String,
    required: [true, "please enter Line"],
  },
  processNo: {
    type: String,
    required: [true, "please enter Process No"],
  },

  countermeasure: {
    type: String,
  },

  targetDate: {
    type: Date,
  },
  pic: {
    type: String,
  },
  status: {
    type: String,
    required: [true, "please enter Status"],
  },
  image: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  pS: {
    type: String,
  },
});

module.exports = mongoose.model("cards", cardRaisedSchema);

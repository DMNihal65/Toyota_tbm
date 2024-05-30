const mongoose = require("mongoose");

const checkItemSchema = new mongoose.Schema({
  line: {
    type: String,
    required: [true, "please enter Line name"],
  },

  processNo: {
    type: String,
    required: [true, "please enter Process No "],
  },
  model: {
    type: String,
  },
  workDetail: {
    type: String,
    required: [true, "please enter Work detail"],
  },
  
  methodWssNo: {
    type: String,
  },

  cycle: {
    type: String,   
  },
  tool: {
    type: String,  
  },

 
  workManpower: {
    type: String,
  },
  areaToInspect:{
    type:String,
  },

  workTime: {
    type: String,

  },

  pS: {
    type: String,
    required: [true, "please enter P/S"],
  },
  rS: {
    type: String,
    required: [true, "please enter R/S"],
  },
 
  entryDate: {
    type: Date,

  },
  y: [
    {
      type: Number,
      required: [true, "please enter Year"],
    },
  ],
  m: [
    {
      type: Number,
      required: [true, "please enter Month"],
    },
  ],
  w: [
    {
      type: Number,
      required: [true, "please enter Week"],
    },
  ],
  d: [
    {
      type: Number,
      required: [true, "please enter Day"],
    },
  ],
  cardNo: {
    type: String,
  },
  images: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },

  holidayOperation: {
    type: String,
    required: [false, "please enter Holiday operation"],
  },
  workOnePoint: {
    type: String,
  },
  safetyOnePoint: {
    type: String,
  },
  qualityOnePoint: {
    type: String,
  },
  remark: {
    type: String,
  },
  reason: {
    type: String,
  },
  action: {
    type: String,
  },
  prepManHr: {
    type: String,
  },
  wHr: {
    type: String,
  },
  criterion: {
    type: String,
  
  },
  categoryCtrl: {
    type: String,
  },
  commonItem: {
    type: String,
  },
  group:{
    type:String,
  }
});

module.exports = mongoose.model("checkitems", checkItemSchema);

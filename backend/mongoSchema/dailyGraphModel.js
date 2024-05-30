const mongoose = require("mongoose");

const dailyGraphSchema = new mongoose.Schema(
    {
        line: {
            type: String,
            required: true
        },
        pS: {
            type: String,
            required: true
        },
        dateString:{
            type:String,
            required:true,
        },
        graphFor: {
            type: Date,
            default: Date.now,
        },
        total: {
            type: Number,
            required: true,
        },
        totalOK: {
            type: Number,
            required: true,
        },
        totalNG: {
            type: Number,
            required: true,
        },
        totalPending: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("dailyGraph", dailyGraphSchema);
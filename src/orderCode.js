const mongoose = require("mongoose");

//Shape data
const ordercodeSchema = new mongoose.Schema(
    {
        orderCode: Number
    },
)
const orderCode = mongoose.model("ordercode", ordercodeSchema);

module.exports = orderCode;
const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema(
    {
nameid: {type: String, required:true},
address: { type: Object, required:true},
emails: { type: String, required:true},
phone: { type: Number, required:true },
    },
    {timestamps: true}, 
    );

    module.exports = mongoose.model("Hospital", HospitalSchema);
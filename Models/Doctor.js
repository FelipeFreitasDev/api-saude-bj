const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
    {
nameid: {type: String, required:true},
crm: { type: String, required:true, unique:true},
phone: { type: Number, required:true}

    });

    module.exports = mongoose.model("Doctor", DoctorSchema);
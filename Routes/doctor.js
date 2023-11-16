const Doctor = require("../models/Doctor");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newDoctor = new Doctor(req.body);
    try {
        const savedDoctor = await newDoctor.save();
        res.status(200).json(savedDoctor);
    } catch (err) {
        res.status(500).json(err);
    }

});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true }
        );
        res.status(200).json(updatedDoctor);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Doctor.findByIdAndDelete(req.params.id);
        res.status(200).json("Doctor has been deleted!");
    } catch (err) {
        res.status(500).json(err)
    };
});


//GET ALL DOCTORS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.Category;
    try {
        let doctor;
        if (qNew) {
            doctor = await Doctor.find().sort({ createdAt: -1 }).limit(5);
        } else if (qCategory) {
            doctor = await Doctor.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            doctor = await Doctor.find();
        }

        res.status(200).json(doctor);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router
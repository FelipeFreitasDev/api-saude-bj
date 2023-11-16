const Hospital = require("../Models/Hospital");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newHospital = new Hospital(req.body);
    try {
        const savedHospital = await newHospital.save();
        res.status(200).json(savedHospital);
    } catch (err) {
        res.status(500).json(err);
    }

});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedHospital = await Hospital.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
            { new: true }
        );
        res.status(200).json(updatedHospital);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Hospital.findByIdAndDelete(req.params.id);
        res.status(200).json("Hospital has been deleted!");
    } catch (err) {
        res.status(500).json(err)
    };
});


//GET ALL HOSPITALS
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.Category;
    try {
        let hospital;
        if (qNew) {
            hospital = await Hospital.find().sort({ createdAt: -1 }).limit(5);
        } else if (qCategory) {
            hospital = await Hospital.find({
                categories: {
                    $in: [qCategory],
                },
            });
        } else {
            hospital = await Hospital.find();
        }

        res.status(200).json(hospital);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router
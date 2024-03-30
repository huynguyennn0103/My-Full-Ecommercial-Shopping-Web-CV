const router = require("express").Router();
const Rating = require("../models/Rating");
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")
//[POST]/
router.post("/",verifyTokenAndAuthorization, async (req,res) =>{
    const newRating = new Rating(req.body)
    try {
        const savedRating = await newRating.save();
        res.status(200).json(savedRating)
    } catch (error) {
        res.status(500).json(error)
    }
})

//[GET]/stats
router.get("/stats", verifyTokenAndAdmin, async(req,res) =>{
    try {
        const data = await Rating.aggregate([
            {
                $group: {
                    _id: "$star",
                    total: {$sum: 1}
                }
            },
            {
                $sort: {_id: 1}
            }
        ])
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router
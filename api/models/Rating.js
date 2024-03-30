const mongoose = require('mongoose')
const RatingSchema = new mongoose.Schema({
    userId: {type: String, require: true},
    star:{type: Number, required: true},
},
{timestamps: true})// create createdAt and updatedAt
module.exports = mongoose.model("Rating",RatingSchema)
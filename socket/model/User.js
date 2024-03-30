const mongoose = require('mongoose')
const UserSocketSchema = new mongoose.Schema({
    username:{type: String, required: true, unique: true},
    socketId:{type: String, required: true, unique: true},
    noti: [
        {
            username: {
                type: String
            },  
            time: {
                type: Date, default: new Date()
            },
            isRead:{
                type: Boolean, default: false
            }        
        }
    ]
},
{timestamps: true})// create createdAt and updatedAt
module.exports = mongoose.model("UserSocket",UserSocketSchema)
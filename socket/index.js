require('dotenv').config()
const UserSocket =  require("../socket/model/User")
const mongoose = require('mongoose')
const {Server} = require("socket.io")
const { findOneAndUpdate } = require('../socket/model/User')
const io = new Server({
    cors: {
        origin: ["http://localhost:3000","http://localhost:3001","http://localhost:3002"]// let only this url access 
    }
})
//setup mongoose
mongoose.set('strictQuery', false);
 mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true })
    .then(()=>{console.log("Connect to cloud db successfully")})
io.on("connection", (socket)=>{
    console.log("Connect to socket.io successfully")
    socket.on("updateSender",async ({sender}) =>{
        try {
            const upsert = await UserSocket.findOneAndUpdate({username: sender.username},{socketId: socket.id},{
                new: true,
                upsert: true
            })
            console.log("Sender join", socket.id)
            socket.join(socket.id)
            //The room is identified by a unique name, and clients can join multiple rooms if needed.
            //When a client joins a room, it receives all the messages emitted to that specific room by other clients or the server. 
        } catch (error) {
            console.log("Error in updating sender")
        }
    })
    socket.on("firstLogin", async({sender}) =>{
        console.log("First Login: ", sender.username)
        try {
            const getOne = await UserSocket.findOne({username: sender.username})
            socket.emit("getNotiList",{
                noti: getOne.noti
            })
        } catch (error) {
            console.log("Error in getting ")
        }
    })
    socket.on("sendInputChat",async ({sender,receiver}) =>{
        console.log(`Socket ${socket.id} is in rooms: ${JSON.stringify(Array.from(socket.rooms))}`);
        console.log("All rooms", io.sockets.adapter.rooms)
        console.log("sender: ", sender.username)
        console.log("receiver: ", receiver.username)
        console.log("Socket id: " + socket.id)// not change
        try {
            const receiveOne = await UserSocket.findOne({username: receiver.username})
            console.log("SocketId of receiver: ", receiveOne.socketId)
            io.in(receiveOne.socketId).emit("getNotification",{
                sender,           
            })
        } catch (error) {           
        }

    })
    socket.on("increaseNoti", async ({receiver,sender}) =>{
        console.log(`Socket ${socket.id} is in rooms: ${JSON.stringify(Array.from(socket.rooms))}`);
        console.log("All rooms", io.sockets.adapter.rooms)
        console.log("Increase noti of: ", receiver.username)
        try {
            const increaseOne = await UserSocket.findOneAndUpdate({username: receiver.username},{$push: {noti: {username: sender.username, time: new Date()}}},{
                new: true
            })
            console.log("Data after increase 1 in noti: ", increaseOne.socketId)
            socket.emit("getNotiList",{
                noti: increaseOne.noti
            })
        } catch (error) {
            console.log("Error in increase notification")
        }
    })
    socket.on("readNoti",async({sender, id})=>{
        try {
            const readOne = await UserSocket.findOneAndUpdate({username: sender.username, 'noti._id':id},{ $set:{"noti.$.isRead": true}},{new: true});
            socket.emit("getNotiList",{
                noti: readOne.noti
            })
        } catch (error) {
            
        }
    })
    socket.on("deleteNoti", async({sender, id}) =>{
        try {
            console.log("id to delete: ", id)
            const deleteOne = await UserSocket.findOneAndUpdate({username: sender.username},{ $pull:{noti:{_id: id}}},{new: true});
            socket.emit("getNotiList",{
                noti: deleteOne.noti
            })
        } catch (error) {
            
        }
    })
    // socket.on("decreaseNoti", async ({receiver}) =>{
    //     console.log("2: ",socket.rooms)
    //     console.log("Decrease noti of: ", receiver.username)
    //     try {
    //         const decreaseOne = await UserSocket.findOneAndUpdate({username: receiver.username},{$push: {noti: {username: receiver.username, time: new Date()}}},{
    //             new: true
    //         })
    //         console.log("Data after decrease 1 in noti: ", decreaseOne)
    //     } catch (error) {
    //         console.log("Error in decrease notification")
    //     }
    // })
    socket.on("disconnect",()=>{
        console.log("Someone has left")
    })
})
io.listen(5003);
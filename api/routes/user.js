const router = require("express").Router();
var CryptoJS = require("crypto-js");
const User = require("../models/User");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")
//[PUT]/:id or [PUT]/:id?isActive=true
router.put("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    const querry = req.query;
    if(!querry){
        if(req.body.password){// user my change/ update password => need to encrypt
            console.log(req.body)
            req.body.password =  CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString() 
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set: req.body
            },{new:true})
            res.status(200).json(updatedUser)
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    else{
        const isActive = querry.isActive;
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id,{isActive: isActive})
            res.status(200).json(updateUser)
        } catch (err) {
            res.status(500).json(err);
        }
    }
})
//[DELETE]/:id
router.delete("/:id",verifyTokenAndAuthorization,async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Delete success")
    }
    catch(err){
        res.status(500).json(err);
    }
})

//[GET]/find/:id
router.get("/find/:id",verifyTokenAndAdmin,async (req,res)=>{
    try{
       const user =  await User.findById(req.params.id)
       const {password,...others} = user._doc;

        res.status(200).json(others)
    }
    catch(err){
        res.status(500).json(err);
    }
})

//[GET]/ or [GET]?new=true
router.get("/",verifyTokenAndAdmin,async (req,res)=>{
    const query = req.query.new//check return first 5 users
    try{
       const users =query?await User.find().sort({_id: -1}).limit(5): await User.find()
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json(err);
    }
})
//[GET]/findName?username=...
router.get("/findName",verifyTokenAndAdmin, async(req,res)=>{
    const query = req.query.username;
    try {
        const user = await User.findOne({username:query})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)        
    }
})
//[GET] /stats
router.get("/stats",verifyTokenAndAdmin, async (req,res)=>{
    const queryMonth = req.query? req.query.isToday:false
    const queryWeek = req.query? req.query.isMonday:false
    const queryYear = req.query?req.query.isYear:false
    // console.log(query)
    //---------------stats of user according to month
    if(queryMonth){
        const firstDay = new Date()
        firstDay.setMinutes(0)
        firstDay.setSeconds(1)
        firstDay.setHours(0)
        // console.log(new Date() - firstDay)
        try{
            const data = await User.aggregate([
                {$match: {createdAt:{$gte: firstDay}}},
                {
                    $project:{
                        isAdmin: "$isAdmin",
                        createdAt: "$createdAt"
                    }
                },
                {
                    $group:{
                        _id: "$isAdmin",// group theo month
                        total: {$sum: 1},// tao them field total
                        newest: {$max: "$createdAt"}
                    }
                }
    
            ])
            res.status(200).json(data)
        }
        //=>[{_id:1,total:2},{_id:2, total:3},....]
        catch(err){
            res.status(500).json(err);
        }
    
    }
    //---------------stats of user according to isYear
    else if(queryYear){
        const firstDay = new Date()
        firstDay.setMonth(0)
        firstDay.setDate(1)
        firstDay.setHours(0)
        firstDay.setMinutes(0)
        firstDay.setSeconds(1)
        // console.log(new Date() - firstDay)
        try{
            const data = await User.aggregate([
                {$match: {createdAt:{$gte: firstDay}}},
                {
                    $project:{
                        isAdmin: "$isAdmin",
                        createdAt: "$createdAt"
                    }
                },
                {
                    $group:{
                        _id: "$isAdmin",// group theo month
                        total: {$sum: 1},// tao them field total
                    }
                }
    
            ])
            res.status(200).json(data)
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    //---------------stats of user according to week
    else if(queryWeek){
        function getMonday(d) {
            var day = d.getDay(),
                diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
                d.setMinutes(0)
                d.setHours(0)
                d.setSeconds(1)
            return new Date(d.setDate(diff));
          }          
        const firstDay = getMonday(new Date())
        try{
            const data = await User.aggregate([
                {$match: {createdAt:{$gte: firstDay}}},
                {
                    $project:{
                        isAdmin: "$isAdmin",
                        createdAt: "$createdAt"
                    }
                },
                {
                    $group:{
                        _id: "$isAdmin",// group theo month
                        total: {$sum: 1},// tao them field total
                    }
                }
    
            ])
            res.status(200).json(data)
        }
        //=>[{_id:1,total:2},{_id:2, total:3},....]
        catch(err){
            res.status(500).json(err);
        }
    
    }
    else{
    const firstDay = new Date()
    firstDay.setDate(1)
    firstDay.setMonth(0)
    try{
        //https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/
        const data = await User.aggregate([
            {$match: {createdAt:{$gte: firstDay}}},// tim cac docs cos createdAt > lastyear =>vd: 5 docs
            {
                $project:{
                    month: {$month: "$createdAt"}// tu 5 docs do cau hinh project lai thanh {month:...},{month:...},{month:...},month{:...}
                }
            },
            {
                $group:{
                    _id: "$month",// group theo month
                    total: {$sum: 1}// tao them field total
                }
            }

        ])
        res.status(200).json(data)
    }
    //=>[{_id:1,total:2},{_id:2, total:3},....]
    catch(err){
        res.status(500).json(err);
    }
    }
})

module.exports = router
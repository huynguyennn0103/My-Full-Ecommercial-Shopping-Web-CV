const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
//Register&&Login
//[POST] /register
router.post("/register",async (req,res)=>{
    const newUser = new User({
        username: req.body.username,
        email:req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString() ,
        img: req.body.img,
        address: req.body.address,
        fullName: req.body.fullName,
        isAdmin: req.body.isAdmin? true : false,
        phone: req.body.phone
    })
    try{
        const savedUser = await newUser.save()// wait for save successfully because db cloud is slow
        res.status(201).json(savedUser)
    }
    catch(err){
        res.status(500).json(err)
    }
})
//[POST] /login
router.post("/login",async(req,res)=>{
    try{
      const user = await User.findOne({ username: req.body.username });
      //if not found
      if (!user) {
        res.status(401).json("Wrong username!!");
      } else {
        const hashedPassword = CryptoJS.AES.decrypt(
          user.password,
          process.env.PASS_SEC
        );
        const Stringpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        //if not match
        if (Stringpassword !== req.body.password) {
          res.status(401).json("Wrong password!!");
        } else {
          //if success
          console.log(user.isAdmin)
          const accessToken = jwt.sign(
            {
              id: user._id,
              isAdmin: user.isAdmin,
            },
            process.env.JWT_SEC,
            { expiresIn: "1d" }
          ); //after 3 days => token is useless => login again
          //musn't show password so seperate them
          const { password, ...others } = user._doc; //something weird but need to ._doc
          res.status(200).json({ ...others, accessToken });
          //"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDdlYTJjMTBiY2ViZDhmZWZlMDFhZiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzUwOTYzMjMsImV4cCI6MTY3NTM1NTUyM30.f19lwf8JiySeRIMZSkT55Ix1XD5jSMCiMnZG4SKbqL8"
        }
      }
    }
    catch(err){
        res.status(500).json(err)
    }
})
module.exports = router
const jwt = require("jsonwebtoken")
//middleware
const verifyToken = (req,res,next)=>{//co token(login r)
    const authHeader = req.headers.token// token luu o header
    console.log(authHeader)
    if(authHeader){
        //Ex:authHeader =  Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDdlYTJjMTBiY2ViZDhmZWZlMDFhZiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzUwOTYzOTgsImV4cCI6MTY3NTM1NTU5OH0.OsMdwK-KZAtxR6qvspIw-mwO7p6QmVkJne4DxZ8K6V0
        const token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.JWT_SEC,(err,user)=>{
            if(err instanceof jwt.TokenExpiredError)res.status(401).json("Token is invalid");
            //if success
            else{
            req.user = user;// create new props req.user
            next();
            }
        })
    }
    else{
        return res.status(401).json("You are not authenticated")
    }
}
const verifyTokenAndAuthorization= (req,res,next) =>{//co token(login r) va (co truyen/:id hoac la admin)
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin ){
            next();
        }
        else{
            res.status(403).json("You are not allowed to do that")
        }
    })
}
const verifyTokenAndAdmin= (req,res,next) =>{// co token(login r) va la admin
    verifyToken(req,res,()=>{
        // console.log(user)
        if(req.user.isAdmin ){
            next();
        }
        else{
            res.status(403).json("You are not allowed to do that")
        }
    })
}
module.exports={verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin}
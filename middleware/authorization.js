const jwt = require("jsonwebtoken")
const jwt_key = process.env.JWT_SECRET
const user = require("../models/user")
const authorization = async(req,res,next)=>{
try{const cookie = req.cookies.usercookie;
if(!cookie){
   return res.status(401).json({
    "message":"no cookie was found"
    })
    }
    const decode = jwt.verify(cookie,jwt_key)
    const finduser =await user.findById(decode._id)
    if(!finduser){
    return res.status(401).json({
    "message":"user details not found in token"
    })
    }
    req.user=finduser
    next()
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

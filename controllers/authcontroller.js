const user = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require('dotenv').config();
const jwt_key = process.env.JWT_SECRET
// adding user 
const signup = async(req,res)=>{
    try{
        const usersignupinformation = Object.keys(req.body)
 const allowedFields= ["username","emailid","password","phoneNo","role"]
   const isvalid= usersignupinformation.every(element => 
        allowedFields.includes(element)
    );
if(!isvalid){
   return res.status(400).json({
        "message":"enter valid fields",
    })
}
if(Object.keys(req.body.length)===0){
return res.status(400).json({"message":"fields are empty"})
}
const {username,emailid,password,phoneNo,role}= req.body
if(!username || !password){
    return res.json({
        "message":"pls enter username and password"
    })
}
const hashpassword =await bcrypt.hash(password,10)
 const savedUser = await user.create({
    name:username,
    emailid:emailid,
    password:hashpassword,
    phoneNo:phoneNo,
    role:role
 })
 return res.status(200).json({
    "message":"user created succesfully"
 })
    }
 catch(err){
    res.status(500).json({ message: err.message })
 }
}
// login user 
const login = async(req,res)=>{
    const {emailid,password}= req.body
    if(!emailid || !password) {
        return res.status(400).json({
            "message":"pls enter emailid and password"
        })
    }
    const userrecords =await user.findOne({emailid})
    if(!userrecords===0){
        return res.status(400).json({
            "message":"no records found"
        })
    }
    const hashpassword = userrecords.password
    const ispaswword =await bcrypt.compare(password,hashpassword)
    if(!ispaswword){
        return res.json({
            "message":"pls enter a valid password"
        })
    }
   const token=await jwt.sign({_id:userrecords._id},jwt_key,{expiresIn:"9hr"})
    res.cookie("usercookie",token)
    res.status(200).json({
        "message":"login succesully"
    })
}
module.exports={
    signup,
    login
}
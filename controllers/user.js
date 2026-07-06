
const user = require("../models/user")


const getUser = async(req,res)=>{
 const cookieUser = req.user 
 if(!cookieUser){
   return res.status(401).json({
        "message":"unable to find user"
    })
 }
 res.json({
    message:"user fetched correctly",
    user:cookieUser
 })
}
 const updateUser = async(req,res)=>{
try{ const fieldsToBEUpdated= Object.keys(req.body)
    if(fieldsToBEUpdated.length<=0){
        return res.status(400).json({
            "message":"fields to be updated are empty"
        })
    }
    const allowedFields = ["name","phoneNo"]
    const isAllowedFields= fieldsToBEUpdated.every(fields=> allowedFields.includes(fields))
    if(!isAllowedFields) {
        return res.status(400).json({
            "message":"fields are outside updated scope"
        })
    }
    const userUpdated =await user.findById(req.user._id)
    if(!userUpdated){
       return res.status(404).json({
            message:"user not found"
        })
    }
    if(req.body.name != null){
        userUpdated.name = req.body.name
    }
    if(req.body.phoneNo != null ){
        userUpdated.phoneNo = req.body.phoneNo
    }
    await userUpdated.save();
    res.json({
        "message":"user details updated succesfully",
        user:userUpdated
    })}
    catch(err){
    return res.status(500).json({
        message: err.message
    });
}
 }

const deleteUser = async(req,res)=>{
    try{
    const isDeleted=await user.deleteOne({_id:req.user._id})
    if(isDeleted.deletedCount===1){
        res.clearCookie("usercookie")
      return  res.json({
        "message":"user deleted succesfully"
    })
    }
     if(isDeleted.deletedCount===0){
      return  res.status(404).json({
        "message":"unable to deleted the user"
    })
    }
}catch(err){
       return res.status(500).json({
            message:err.message
        })
    }
}
module.exports={
    getUser,
    updateUser,
    deleteUser
}
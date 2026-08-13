
const user = require("../models/user")
const Userprofile = require("../models/profile")

const getUser = async (req, res) => {
    try {
        const cookieUser = req.user
        if (!cookieUser) {
            return res.status(401).json({ message: "unable to find user" })
        }

        let fullUser = await Userprofile.findOne({ userId: req.user._id }).populate("userId")

        if (!fullUser) {
            fullUser = await Userprofile.create({ userId: req.user._id })
            fullUser = await fullUser.populate("userId")
        }

        res.json({
            message: "user fetched correctly",
            user: fullUser
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
 const updateUser = async(req,res)=>{
try{ const fieldsToBEUpdated= Object.keys(req.body)
    if(fieldsToBEUpdated.length==0){
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
    if(req.body.name != null && req.body.name.trim()!==""){
        userUpdated.name = req.body.name
    }
    if(req.body.phoneNo != null && req.body.phoneNo.trim()!==""){
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

 const userProfileUpdate = async(req,res)=>{
    try{const allowedFields=["bio","skills","resume","profilephoto"]
    const toBeUpdatedFields=Object.keys(req.body)
    if(toBeUpdatedFields.length==0 && !req.file.path){
        return res.status(404).json({
            "message":"pls enter fields"
        })
    }
   const isFieldValid=toBeUpdatedFields.every((field)=>allowedFields.includes(field))
   if(!isFieldValid){
    return res.status(400).json({
        "message":"pls enter valid fields"
    })
   }
   const updates={}
   if(req.body.bio != undefined && req.body.bio.trim()!==""){
     updates.bio = req.body.bio
   }
   if(req.body.skills != undefined && req.body.skills.trim()!==""){
      updates.skills = JSON.parse(req.body.skills)
   }
   if(req.body.resume != undefined){
      updates.resume = req.body.resume
   }
   if(req.file != undefined){
      updates.profilephoto = req.file
   }
   const updateUserProfile = await Userprofile.findOneAndUpdate(
    {userId:req.user._id},
        updates,
        {returnDocument:"after",
        upsert:true
        }
    )
   if(!updateUserProfile){
    return res.status(404).json({
        "message":"no user found"
    })
   }
    return res.status(200).json({
        "message":"user updated succesfully",
        newuser:updateUserProfile
    })}catch(err){
        res.status(500).json({
            "message":"server error"
        })
    }
 }

const logoutUSer=async(req,res)=>{
    try{
        const isLog=await user.findById(req.user._id)
        if(!isLog){
            return res.status(404).json({
            message:"no user Found"
        })
        }
        res.clearCookie("usercookie")
         return res.status(200).json({
        message: "logout successful"
    });
    }catch(err){
        res.status(500).json({
            message:"server error"
        })
    }
}
const deleteUser = async(req,res)=>{
    try{
    const isDeleted=await user.deleteOne({_id:req.user._id})
    if(isDeleted.deletedCount===1){
        res.clearCookie("usercookie")
      return  res.status(200).json({
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
    userProfileUpdate,
    logoutUSer,
    deleteUser
}
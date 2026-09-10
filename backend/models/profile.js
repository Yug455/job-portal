const mongoose=require("mongoose");

const userprofileschema=new mongoose.Schema({
    bio:{
        type:String,
    },
    skills:[{
        type:String,
    }],
    resume:{
        type:String,
    },
    profilephoto:{
        type:String,
        default:""
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})
const Userprofile = mongoose.model("userprofile",userprofileschema)
module.exports=Userprofile
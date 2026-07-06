const mongoose=require("mongoose");

const userprofileschema=new mongoose.connect({
    user:{
        ref:"user",
        type:mongoose.Schema.Types.ObjectId,
    },
    bio:{
        type:String,
    },
    skills:[{
        type:String,
    }],
    resume:{
        type:String,
    },
    resumeoriginalname:{
        type:String
    },
    profilephoto:{
        type:String,
        default:""
    }
})
const userprofile = mongoose.connect("userprofile",userprofileschema)
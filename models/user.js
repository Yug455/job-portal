const mongoose =require("mongoose")
const userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    emailid:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        match:[/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password:{
        type:String,
        required:true,
    },
    phoneNo:{
        type:Number,
    },
    role:{
        type:String,
        enum:["student","recruiter"]
    },
},
{
    timestamps:true
})

const user = mongoose.model("user",userschema)
module.exports=user
const mongoose = require("mongoose")
const companyschema = new mongoose.Schema({
    companyname:{
        type:String,
        required:true,
        unique:true
    },
    companywebsite:{
        type:String,
    },
    location:{
        type:String,
    },
    description:{
        type:String
    },
    logo:{
        type:String
    },
    companyemail:{
        type:String,
        unique:true,   
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
},
{timestamps:true}
)
const company = mongoose.model("company",companyschema)
module.exports =company
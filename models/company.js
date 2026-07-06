const mongoose = require("mongoose")
const companyschema = new mongoose.Schema({
    companyname:{
        type:String,
        required:true
    },
    companywebsite:{
        type:String,
        required:true
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
    },
    userId:{
        ref:"user",
        required:true
    }
},
{timestamps:true}
)
const company = mongoose.model("company",companyschema)
module.exports =company
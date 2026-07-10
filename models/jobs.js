const mongoose = require("mongoose");
const jobschema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    descreption:{
        type:String,
        required:true,
    },
    requirments:[{
        type:String,
        required:true,
    }],
    salary:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    jobtype:{
        type:String,
        required:true,
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"company"
    },
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    application:{
        type:String,
    },
},{timestamps:true})
const job = mongoose.model("job",jobschema)
module.exports = job
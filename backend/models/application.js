const mongoose = require("mongoose")
const applicationschema = new mongoose.Schema({
 applicant:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
    required:true,
 },
 jobrefrence:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"job",
 },
 status:{
    type:String,
    enum:["pending","accepted","rejected"],
    default:"pending"
 },
},{timestamps:true})
const application = mongoose.model("application",applicationschema)
module.exports=application
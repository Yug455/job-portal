const CLUSTER_KEY=process.env.MONGODB_CLUSTER_KEY
const mongoose=require("mongoose")
connectDB =async()=>{
    try{
        await mongoose.connect(CLUSTER_KEY)
        console.log("database connected")
    }catch(err){
        console.log("mongodb connection error"+err)
    }
}
module.exports=connectDB
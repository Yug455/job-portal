const mongoose= require("mongoose")
require("dotenv").config();
const cookieParser = require("cookie-parser")
const express = require("express")
const cors = require("cors")
const app = express()
const connectDB = require("./config/database")
connectDB()
const userRouter=require("./routes/userRoutes");
const companyRouter = require("./routes/companyRoutes");
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}))
app.use("/user",userRouter)
app.use("company",companyRouter)
app.listen(3000,(req,res)=>{
    console.log(`server started at ${3000}`)
})
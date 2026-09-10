const express = require("express")
const companyRouter = express.Router()
const {companyRejister,companyDeatails,getCompany,getSingleCompany,deleteCompany}=require("../controllers/companyrejister")
const {authorization}= require("../middleware/authorization")
companyRouter.post("/addcompany",authorization,companyRejister)
companyRouter.post("/updatecompany/:id",authorization,companyDeatails) //using post because put is not compatible
companyRouter.get("/getallcompany",authorization,getCompany)
companyRouter.get("/getsinglecompany/:id",authorization,getSingleCompany)
companyRouter.post("/deletecompany/:id",authorization,deleteCompany) // using post because delete is not compatible
module.exports=companyRouter
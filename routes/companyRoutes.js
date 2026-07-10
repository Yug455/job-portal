const express = require("express")
const companyRouter = express.Router()
const {companyRejister,companyDeatails,getCompany,deleteCompany}=require("../controllers/companyrejister")
const {authorization}= require("../middleware/authorization")
companyRouter.post("/addcompany",authorization,companyRejister)
companyRouter.post("/updatecompany",authorization,companyDeatails) //using post because put is not compatible
companyRouter.get("/getallcompany",authorization,getCompany)
companyRouter.post("/deletecompany/:id",authorization,deleteCompany) // using post because delete is not compatible
module.exports=companyRouter
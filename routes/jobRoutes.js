const express = require("express")
const jobRouter = express.Router()
const {addingJob,getJob,updateJob,deleteJob,} = require("../controllers/jobposting")
const {authorization}= require("../middleware/authorization")
jobRouter.post("/postjob",authorization,addingJob)
jobRouter.get("/getjobs",authorization,getJob)
jobRouter.post("updatejob",authorization,updateJob)
jobRouter.delete("deletejob",authorization,deleteJob)
module.exports=jobRouter
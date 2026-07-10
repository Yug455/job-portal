const { default: mongoose } = require("mongoose")
const Company = require("../models/company")
const Job = require("../models/jobs")
const addingJob =async(req,res) =>{
   try{ 
    const {jobTitle,descreption,requirments,salary,location,jobType}=req.body
    const numericSalary=Number(salary)
   if(!jobTitle || !descreption || !requirments || !numericSalary || !location || !jobType){
    return res.status(400).json({
        "message":"pls enter fields name properly it should not be undefined"
    })
   } // requirments.some(item => typeOf(item) != "string" || item.trim().length === 0)
    if(jobTitle.trim().length==0 || descreption.trim().length==0  || !Array.isArray(requirments) || requirments.some(item => typeof(item) != "string" || item.trim().length === 0) || Number.isNaN(numericSalary) || location.trim().length==0  || jobType.trim().length==0){
       return res.status(400).json({
            message:"there was an missing filed"
        })
    }
    const userCompany = await Company.findOne({companyname:req.params.company},"_id companyname userId")
    if(!userCompany){
        return res.status(404).json({
            "message":"company not found"
        })
    }
    if(userCompany.userId.toString() !== req.user._id.toString()){
    return res.status(403).json({
        message:"Not authorized"
        })
    }
    const jobDocument= await Job.create({
        title:jobTitle.trim(),
        descreption:descreption.trim(),
        requirments:requirments.map(item => item.trim()), // stores new array and then give it to requirment
        salary:numericSalary,
        location:location.trim(),
        jobtype:jobType.trim(),
        company:userCompany._id,
        createdby:req.user._id
    })
   return res.status(201).json({
        "message":"job created succesfully",
        jobDocument,
    })}catch(err){
        res.status(500).json({
            "message":err.message
        })
    }
}
const getJob = async(req,res)=>{
 try{  
    const CompanyIdFromReq = req.params.id 
    if(!CompanyIdFromReq || !mongoose.isValidObjectId(CompanyIdFromReq)){
        return res.status(400).json({
            "message":"pls send company id"
        })
    }
    const fetchCompany=await Company.findById(CompanyIdFromReq)
    if(!fetchCompany){
        return res.status(404).json({
            "message":"no company found with this id in database"
        })
    }
    if(req.user._id.toString()!==fetchCompany.userId.toString()){
        return res.status(403).json({
            "message":"user not authorized"
        })
    }
    const fetchJobs =await Job.find({company:CompanyIdFromReq})
    if(fetchJobs.length==0){
        return res.status(200).json({
            "message":"no jobs found for this company"
        })
    }
    return res.json({
        "message":"fetched jobs succesfully",
        fetchJobs
    })}catch(err){
        res.status(500).json({
            "message":err.message
        })
    }
}
const deleteJob = async(req,res) =>{
    try{
        const jobId=req.params.id
         if(!jobId || !mongoose.isValidObjectId(jobId)){
            return res.status(400).json({
                "message":"job id is invalid"
            })
         }
         const jobDocument = await Job.findById(jobId)
         if(!jobDocument){
            return res.status(404).json({
                "message":"jobPosting did not found"
            })
         }
         const companyDetails = await Company.findById(jobDocument.company)
         if(!companyDetails){
            return res.status(404).json({
                "message":"no company found"
            })
         }
         if(companyDetails.userId.toString() !== req.user._id.toString()){
            return res.status(403).json({
                "message":"do not have the access to delete jobPosting"
            })
         }
        await jobDocument.deleteOne()
         return res.status(200).json({
            "message":"jobPosting succesfully deleted",
            jobDocument 
         })
    }catch(err){
          return res.status(500).json({
            "message":err.message
        })
    }
}
const { default: mongoose } = require("mongoose")
const application = require("../models/application")
const job = require("../models/jobs")
const newApplication = async(req,res)=>{
   try{ const {jobrefrence}=req.params
   if(!jobrefrence){
      return res.status(400).json({
           "message":"pls select which job you are applying for"
       })
   }
   if(!mongoose.isValidObjectId(jobrefrence)){
    return res.status(400).json({
        message:"Invalid job id"
    })
    }
    const job_model =await job.findById(jobrefrence)
    if(!job_model){
    return res.status(404).json({
        message:"Job not found"
    })
    }
    const alreadyapplied =await application.findOne({
        jobrefrence:jobrefrence,
        applicant:req.user._id
    })
    if(alreadyapplied){
        return res.status(409).json({
            "message":"user already applied"
        })
    }
    const apply = await application.create({
        applicant:req.user._id,
        jobrefrence,
        // status if a fields which is by default pending
    })
    job_model.applications.push(apply._id)
    await job_model.save()
    res.status(201).json({
        "message":"Application submitted successfully",
         apply
    })}catch(err){
        res.status(500).json({
            "message":err.message
        })
    }
}
const getUserApplication = async(req,res)=>{
    try{const findAllApplication = await application.find({applicant:req.user._id}).populate("jobrefrence")
    if(findAllApplication.length==0){
        return res.status(404).json({
            "message":"no applications found"
        })
    }
    return res.status(200).json({
        "message":"all applications found succesfully",
        findAllApplication
    })}catch(err){
        res.status(500).json({
            "message":err.message
        })
    }
}
const getAdminApplications = async(req,res)=>{
    try{
        const jobId=req.params.jobId
        if(!jobId || !(mongoose.isValidObjectId(jobId))){
            return res.status(404).json({
                "message":"no a valid job id"
            })
        }
        const jobDocument = await job.findById(jobId)
        if(!jobDocument){
            return res.status(404).json({
                "message":"no job found"
            })
        }
        if((jobDocument.createdby.toString() != req.user._id.toString())){
            return res.status(403).json({
                "message":"not authorized to make that call"
            })
        }
        const allApplications = await application.find({jobrefrence:jobId}).populate("applicant")
        if(allApplications.length==0){
            return res.status(404).json({
                "message":"could'nt find any applicants for this job"
            })
        }
        return res.status(200).json({
            "message":"applicants found succesfully",
            allApplications
        })
    }catch(err){
         res.status(500).json({
            message:err.message
        })
    }
}
// update apllication status api 
const updateApplicationStatus=async(req,res)=>{
 try{const {updateStatus} = req.params
 const {applicationId}=req.params

 if(!updateStatus){
     return res.status(400).json({
         message:"pls enter status"
     })
 }
    if(!(applicationId) || !(mongoose.isValidObjectId(applicationId))){
     return res.status(400).json({
            message:"pls enter valid id and ensure id is sent"
        })
    }
    const validStatus = ["accepted","rejected"]
    const isStatusValid=validStatus.includes(updateStatus.toLowerCase())
    if(!isStatusValid){
         return res.status(400).json({
            message:"pls enter valid status"
        })
    }
    const applicationDocument=await application.findById(applicationId)
    if(!applicationDocument){
         return res.status(404).json({
            message:"no application found"
        })
    }
    const jobDocument = await job.findById(applicationDocument.jobrefrence);
    if (!jobDocument) {
    return res.status(404).json({
        message: "Job not found"
    });
    }
    if (!jobDocument.createdby.equals(req.user._id)) {
    return res.status(403).json({
        message: "Not authorized"
    });
    }
    if(applicationDocument.status.toLowerCase()== "pending" && updateStatus.toLowerCase()=="accepted"){
        applicationDocument.status = "Accepted"
        await applicationDocument.save()
        return res.status(200).json({
            "message":"status changed succesfully to accepted",
            applicationDocument
        })
    }
    else if(applicationDocument.status.toLowerCase()== "pending" && updateStatus.toLowerCase()=="rejected"){
        applicationDocument.status = "Rejected"
        await applicationDocument.save()
        return res.status(200).json({
            "message":"status changed succesfully to rejected",
            applicationDocument
        })
    }
    else if(applicationDocument.status.toLowerCase()== "accepted" || applicationDocument.status.toLowerCase()== "rejected"){
         return res.status(409).json({
            "message":"status was already set to accepted or rejeted"
        })
    }}catch(err){
         res.status(500).json({
            message:err.message
        })
    }
}
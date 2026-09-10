const { default: mongoose } = require("mongoose")
const application = require("../models/application")
const job = require("../models/jobs")
const user = require("../models/user")
const Userprofile = require("../models/profile")
const sendMailfun = require("../helpers/sendmail")
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
    try{const findAllApplication = await application.find({applicant:req.user._id}).populate("jobrefrence").populate("applicant")
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
const getApplicantDetails = async(req,res)=>{
   try{
    const allProfiles = await Userprofile.find({});

     const applicationDoc = await application.findById(req.params.id)
     console.log("applicationdoc"+applicationDoc)
     if(!applicationDoc){
         return res.status(404).json({
             "message":"no applicaiton doc found"
         })
     }
    const userDoc=await user.findById(applicationDoc.applicant)
    if(!userDoc){
         return res.status(404).json({
             "message":"no User Doc found"
         })
     }
     const profileOfuser = await Userprofile.findOne({userId:userDoc._id}).populate("userId")
     if(!profileOfuser){
         return res.status(404).json({
             "message":"no profile of user found"
         })
     }
    
    return res.json({
        "message":"user found succesfully",
        profileOfuser
    })
   }catch(err){
     res.status(500).json({
            message:err
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
      const userDocument = await user.findById(applicationDocument.applicant)

    if(!userDocument){
         return res.status(404).json({
            message:"user not found"
        })
    }
    if(updateStatus.toLowerCase()=="accepted"){
        sendMailfun(userDocument.emailid,`Congratulations${userDocument.name}` ,"we are glad to here that you are an excellent fit for this job so we are giving you offer letter for the job my more information contach us")
    }
    if(updateStatus.toLowerCase()=="rejected"){
         sendMailfun(userDocument.emailid,`thankyou ${userDocument.name}`,"For Applying in our company but the job role is already filled we are glas the see your Application for other job role posted by this company")
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
        applicationDocument.status = "accepted"
        await applicationDocument.save()
        return res.status(200).json({
            "message":"status changed succesfully to accepted",
            applicationDocument
        })
    }
    else if(applicationDocument.status.toLowerCase()== "pending" && updateStatus.toLowerCase()=="rejected"){
        applicationDocument.status = "rejected"
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
module.exports={
    newApplication,
    getUserApplication,
    getApplicantDetails,
    getAdminApplications,
    updateApplicationStatus
}
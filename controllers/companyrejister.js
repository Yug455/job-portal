const Company = require("../models/company")
const companyRejister = async(req,res)=>{
 try{ const {companyName} = req.body
 if(!companyName){
     return res.status(400).json({
         "message":"pls enter company name"
        })
    }
  const trimmedCompanyName=companyName.trim().toLowerCase()
  if (!trimmedCompanyName) {
    return res.status(400).json({
        message: "Please enter a valid company name"
    });
}
  const isthereCompanyName =await Company.findOne({companyname:trimmedCompanyName})
 if(isthereCompanyName){
    return res.status(409).json({
        "message":"company name already exsist"
    })
 }
  await Company.create({
    companyname : trimmedCompanyName
 })
 return res.status(201).json({
    "message":"company name created",
    companyName:trimmedCompanyName
 })}catch(err){
   return res.status(500).json({
        "message":err.message
    })
 }
}

const companyDeatails = async(req,res)=>{
  try{  const companyDetails=Object.keys(req.body)
    if(companyDetails.length==0){
        return res.status(400).json({
            "message":"pls enter fields"
        })
    }
    const validDetails = ["companyName",
    "companywebsite",
    "location",
    "description",
    "logo",
    "companyemail"]
    const isDetailsValid=companyDetails.every(field=>validDetails.includes(field))
    if(!isDetailsValid){
        return res.status(400).json({
            "message":"pls send correct fields"
        })
    }
    const {companyName,companywebsite,location,description,logo,companyemail} = req.body;
    const updateData={}
    const fields=[
         "companywebsite",
        "location",
        "description",
        "logo",
        "companyemail",
    ]
    for(const field of fields){
        if(req.body[field] !== undefined){
            updateData[field] = req.body[field]
        }
    }
    const userid = req.user._id
    if (!companyName) {
    return res.status(400).json({
        message: "Company name is required"
    });
}
    const companyRejisterDetails=await Company.findOneAndUpdate({companyname:companyName.trim().toLowerCase()},{
        ... updateData,
        userId:userid,
    },{new:true})
    if(!companyRejisterDetails){
        return res.status(404).json({
            message:"company not found"
        })
    }
    return res.json({
        "message":"company details added succesfully",
        companyDeatils:companyRejisterDetails
    })}catch(err){
        return res.status(500).json({
        "message":err.message
    })
    }
}

const getCompany = async(req,res)=>{
   try{ const getAllCompany = await Company.find({userId:req.user._id},"companyname")
    if(getAllCompany.length==0){
       return res.status(404).json({
            "message":"can not find companies"
        })
    }
   return res.json({
        "message":"companies find succesfully",
        companyNameList:getAllCompany
    })}catch(err){
        res.status(500).json({
            "message":err.message
        })
    }
}

const deleteCompany = async(req,res)=>{
   try{ const deletedCompany=await Company.findOneAndDelete({
       _id: req.params.id,
       userId:req.user._id
    })
    if(!deletedCompany){
        return res.status(404).json({
            "message":"no company found"
        })
    }
    return res.json({
        "message":"company deleted succesfully",
        deletedCompany
    })}catch(err){
          res.status(500).json({
            "message":err.message
        })
    }
}
module.exports={
    companyRejister,
    companyDeatails,
    getCompany,
    deleteCompany
}
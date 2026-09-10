import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Createcompany = ()=>{ 
    const[companyName,setCompanyName]=useState("")
    const[companywebsite,setCompanyWebsite]=useState("")
    const[location,setLocation]=useState("")
    const[description,setDescreption]=useState("")
    const[logo,setLogo]=useState("")
    const[companyemail,setCompanyEmail]=useState("")
    const [companyData,setCompanyData]=useState("")
    const navigate =useNavigate()
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const handleSubmit = async()=>{
        try{
            const res = await axios.post(BASE_URL +"/company/addcompany",{
                companyName,
                companywebsite,
                location,
                description,
                logo,
                companyemail
            },{withCredentials:true})
            setCompanyData(res?.data?.company)
            navigate("/admin/companies")
        }catch(err){
            if(err?.response?.data?.message){
                setMessage(err?.response?.data?.message)
            }
            if(err?.request){
                setMessage("server error")
            }
            else{
                setMessage("something is wrong")
            }
        }
    }
    return(
        <div className="h-[80vh]">
            <div className="w-full min-h-full flex justify-center items-center">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 w-[50vw]">
                    <legend className="fieldset-legend">Create Company</legend>
                    <label className="label" htmlFor="companyname">CompanyName</label>
                    <input type="email" id="companyname"  className="input w-[50vw]" value={companyName} placeholder="Company Name" 
                    onChange={(e)=>setCompanyName(e.target.value)}/>
                    <label className="label" htmlFor="companywebsite">companywebsite</label>
                    <input type="text" className="input w-[50vw]" placeholder="Companywebsite" value={companywebsite} id="companywebsite"
                    onChange={(e)=>setCompanyWebsite(e.target.value)}/>
                    <label className="label" htmlFor="location">Location</label>
                    <input type="text" className="input w-[50vw]" placeholder="Location" id="location" value={location} onChange={(e)=>setLocation(e.target.value)}/>
                    <label className="label" htmlFor="description">Description</label>
                    <input type="text" className="input w-[50vw]" placeholder="description" id="description"
                     value={description} onChange={(e)=>setDescreption(e.target.value)}/>
                    <label className="label" htmlFor="logo">Logo</label>
                    <input type="text" className="input w-[50vw]" placeholder="logo" id="logo" value={logo}
                    onChange={(e)=>setLogo(e.target.value)}/>
                    <label className="label" htmlFor="companyemail">Companyemail</label>
                    <input type="text" className="input w-[50vw]" placeholder="Companyemail" id="companyemail" value={companyemail}
                    onChange={(e)=>setCompanyEmail(e.target.value)}/>
                    <button className="btn btn-neutral mt-4 w-[50vw]" onClick={handleSubmit}>Create Company</button>
                </fieldset>
            </div>
        </div>
    )
}
export default Createcompany;
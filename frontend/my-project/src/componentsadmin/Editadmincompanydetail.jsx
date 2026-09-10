import { Edit, Pencil } from "lucide-react";
import {Dialog, DialogContent,DialogHeader,DialogTitle,DialogDescription,DialogFooter, DialogTrigger, DialogClose} from "../components/ui/dialog";
import { useState } from "react";
import axios from "axios";
//companyname,companywebsite,location,description,logo,companyemail
  const BASE_URL = import.meta.env.VITE_BASE_URL
const Editcompany=({companyId})=>{
    const [companyname,setCompanyName]=useState("")
    const [companywebsite,setCompanyWebsite]=useState("")
    const [location,setLocation]=useState("")
    const [description,setDescreption]=useState("")
    const [logo,setLogo]=useState("")
    const [companyemail,setCompanyEmail]=useState("")
    const [message,setMessage]=useState("")
    const handleUpdate =async()=>{
        try{
            const res=await axios.post(BASE_URL+"/company/updatecompany/"+companyId,{
            companyname,
            companywebsite,
            location,
            description,
            companyemail
        },{withCredentials:true})
        setMessage(res.data.message)
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
        <Dialog>
            <DialogTrigger asChild>
                <Edit/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                       Edit Compnay
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>Update your Company Here</DialogDescription>
                <div>
                    <label className="label" htmlFor="companyname">Company Name</label>
                    <input type="text" className="input" placeholder="Company Name"  value={companyname} id="companyname"
                    onChange={(e)=>setCompanyName(e.target.value)}/>
                </div>
                <div>
                    <label className="label" htmlFor="comanywebsite">Company Website</label>
                    <input type="tel" className="input" placeholder="Company Website"  value={companywebsite} id="comanywebsite"
                    onChange={(e)=>setCompanyWebsite(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="location">Location</label>
                    <input type="text" className="input" placeholder="Location"  value={location} id="location"
                    onChange={(e)=>setLocation(e.target.value)}/>
                </div>
                  <div>
                    <label htmlFor="description">Description</label>
                    <input type="text" className="input" placeholder="Descreption" value={description} id="description"
                    onChange={(e)=>setDescreption(e.target.value)}/>
                </div>
                 <div>
                    <label htmlFor="logo">Logo</label>
                    <input type="file" className="input" placeholder="Pls provide a Logo" id="logo"
                    onChange={(e)=>setLogo(e.target.files[0])}/>
                </div>
                 <div>
                    <label htmlFor="companyemail">CompanyEmail</label>
                    <input type="text"  id="companyemail" className="input" placeholder="Pls provide a Company Email" value={companyemail}
                    onChange={(e)=>setCompanyEmail(e.target.value)}/>
                </div>
                <div className="text-center">
                    <button className="bg-black text-white rounded-sm cursor-pointer w-20 h-7" 
                    onClick={()=>handleUpdate()}>Update</button>
                    {message && <p className="text-red-500">{message}</p>}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Editcompany
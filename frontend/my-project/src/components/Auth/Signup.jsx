import { Link } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
const BASE_URL = import.meta.env.VITE_BASE_URL
const Signup = ()=>{
    const [phoneNo,setPhoneNo]=useState("")
    const [name,setname]=useState("")
    const [emailid,setemailid]=useState("")
    const [password,setPassword]=useState("")
    const [role,setRole]=useState("")
    const [message,setMessage]=useState("")
    const navigate=useNavigate()
    const handleSignup=async()=>{
         setMessage("")
        try{const res=await axios.post(BASE_URL+"/user/adduser",{
            username:name,
            emailid,
            password,
            phoneNo,
            role
        },{
            withCredentials:true
        })
        
            setMessage(res.data.message)
            navigate("/")
        
    }catch(err){
            if(err?.response?.data?.message){
                setMessage(err?.response?.data?.message)
            }
            else if(err.request){
                setMessage("unable to send request to server")
            }
            else{
                setMessage("something went wrong")
            }
        }
    }
    return(
        <div className="flex min-h-screen min-w-screen items-center justify-center">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Signup</legend>

                    <label className="label">Name</label>
                    <input type="text" className="input" placeholder="Name" name="name" value={name} 
                    onChange={(e)=>setname(e.target.value)}/>

                    <label className="label">Email</label>
                    <input type="email" className="input" placeholder="Email" name="emailid" value={emailid} 
                    onChange={(e)=>setemailid(e.target.value)}/>

                    <label className="label">Password</label>
                    <input type="password" className="input" placeholder="password" name="password" value={password} 
                    onChange={(e)=>setPassword(e.target.value)}/>

                    <label className="label">PhoneNo</label>
                    <input type="tel" className="input" placeholder="Phone No" name="phoneNo" value={phoneNo} 
                    onChange={(e)=>setPhoneNo(e.target.value)}/>

                    <div className="flex justify-between">
                        <label htmlFor="student" className="cursor-pointer">Student</label>
                         <input id="student" type="radio" className="radio" name="role" value={"student"} onChange={(e)=>{
                            setRole(e.target.value)
                        }}/>

                        <label htmlFor="recruiter" className="cursor-pointer">Recruiter</label>
                        <input id="recruiter" type="radio" className="radio" name="role" value={"recruiter"} 
                        onChange={(e)=>{
                            setRole(e.target.value)
                        }}/>
                    </div>
                {message && <p className="text-red-500">{message}</p>}
                <button className="btn btn-neutral mt-4" type="submit" onClick={handleSignup}>Signup</button>
                <span>already have account? go to <Link to={'/login'} className="ml-3">Login</Link></span>
</fieldset>
        </div>
    )
}
export default Signup
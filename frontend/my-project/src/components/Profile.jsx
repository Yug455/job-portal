import { Mail } from "lucide-react";
import { User } from "lucide-react";
import { useEffect , useState } from "react";
import AppliedJobTable from "./AppliedJobsTable";
import  EditProfileDilauge from "./Dilauge"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "@/utilites/userSlice";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL
const Profile = ()=>{
    const dispatch = useDispatch()
    const userData=useSelector((store)=>store.userSlice.items[0])
    const AllJobs=useSelector((store)=>store.jobSlice.items)
    useEffect(()=>{
        getUser()
    },[])
    const getUser=async()=>{
        try{const res=await axios.get(BASE_URL+"/user/getuser",{
            withCredentials:true
        },)
        dispatch(updateUser(res?.data?.user))
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
    if(!userData){
        return <div>Pls wait....</div>
    }
    return(
        <>
        <div className="mt-20">
            <div className="ml-14 space-y-3">
                <div className="flex space-x-5">
                    <div>
                        <img className="w-20 rounded-full h-20" src="https://images.unsplash.com/photo-1785788681813-a87956da715a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMXx8fGVufDB8fHx8fA%3D%3D" alt="put an image here" />
                    </div>
                        <EditProfileDilauge/>
                    <div>
                        <h1 className="font-bold text-red-600">{userData?.userId?.name || "No name yet"}</h1>
                        <h2 className="">{userData?.bio || "Pls add some descreption"}</h2>
                    </div>
                </div>
                    <div className="space-y-4">
                        <div className="flex space-x-3.5">
                            <Mail/>
                            <h2 className="text-purple-700">{userData?.userId?.emailid || "no email ID"}</h2>
                        </div>
                        <div className="flex space-x-3.5">
                             <User/>
                             <h2 className="text-red-700">{userData?.userId?.phoneNo || "no phone yet"}</h2>
                        </div>
                    </div>
                   {userData && userData?.userId?.role=="student" && <> <div>
                        <h1 className="font-bold">Skills</h1>
                        <div className="space-y-1 ml-3.5">
                        {userData?.skills?.map((skill)=>(
                            <li >{skill}</li>
                        ))}
                        </div>
                    </div>
                    <div>
                        <h1 className="font-bold">Resume</h1>
                        {!userData?.resume ? <input className="border-2 cursor-pointer" type="file" accept=".pdf" onChange={(e)=>{
                           setResume(e.target.files[0])
                        }}/>: (
                        <a className="hover:underline hover:text-purple-800" target="_blank" href={userData.resume}>View Resume</a>)}
                    </div></>}
                </div>
        </div>
       {userData && userData?.userId?.role=="student" &&   <div>
            <h1 className="font-bold text-center mt-6 mb-6">Applied Jobs</h1>
            <AppliedJobTable/>
        </div>}
        </>
    )
}
export default Profile
import axios from "axios";
import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL
const Adminjobtable=()=>{
    const Arr = new Array(12).fill(null)
    const [jobArray,setJobArray]=useState([])
    useEffect(()=>{
        const getAllJob= async()=>{
            const res=await axios.get(BASE_URL+"/jobs/getalljobs",{withCredentials:true})
            setJobArray(res?.data?.AllJob)
        }
        getAllJob()
    },[])
    return(
        <div>
            <div>
                <div className="flex h-[5vh] justify-center">
                    <input type="text" placeholder="search here for jobs" className=" border-2 h-full rounded-l-sm"/>
                    <button className="bg-purple-600 text-white rounded-r-sm h-full cursor-pointer">Search</button>
                </div>
                <div>
                    <table className="border-separate border-spacing-x-36 mt-12 w-full text-center border-spacing-y-15">
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Job Type</th>
                                <th>Job Post Date</th>
                                <th>Company Name</th>
                                 <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                                {jobArray?.map((job,index)=>(
                                    <tr>
                                        <td>{job?.title}</td>
                                        <td>{job?.jobtype}</td>
                                        <td>{new Date(job?.createdAt).toLocaleDateString()}</td>
                                        <td>{job?.company?.companyname}</td>
                                        <td>...</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default Adminjobtable;
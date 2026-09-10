import {Bookmark } from "lucide-react";
import Filtering from "./Filtering"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Jobs = ()=>{
    const id="2324here"
    const AllJob=useSelector((state)=>state?.jobSlice?.items)
    const navigate = useNavigate()
    let [location,setLocation]=useState("")
    let [industry,setIndustry]=useState("")
    let [salary,setSalary]=useState()
    let filterTab;
    filterTab=AllJob;
    filterTab=AllJob.filter((job)=>
     {  
        if(location && !job?.location.toLowerCase().includes(location.toLowerCase())) return false
        if (industry && !job.title.toLowerCase().includes(industry.toLowerCase())) return false;
        if (salary && (job.salary < salary.min || job.salary > salary.max)) return false;
        return true;
     }
)
    return(
        <div className="flex">
            <Filtering  setLocation={setLocation}
    setIndustry={setIndustry}
    setSalary={setSalary}/>
           <div className="flex-1">
            <div className="grid grid-cols-4 gap-10">
                {
                    filterTab?.map((job)=>(
                        <div key={job._id} className="w-full group shadow-sm hover:shadow-xl p-6 rounded-2xl  cursor-pointer hover:-translate-y-1 transition-all duration-300" onClick={()=>navigate("/details/" + job._id)}>
                           <div className="flex w-full justify-between">
                             <div>
                                <h2 className="group-hover:text-purple-700 font-bold">{job?.company?.companyname || "No Company name"}</h2>
                                <p className="text-xs font-l">{job?.location}</p>
                            </div>
                            <span className="inline-flex self-start rounded-full text-xs px-3.5 font-medium bg-purple-50 text-purple-700 border border-purple-100 py-1">Featured</span>
                           </div>
                           {/** job title */}
                           <div className="mb-3 mt-1.5"> 
                            <h1 className="mb-1 font-semibold">{job?.title || "No title"}</h1>
                            <p className="line-clamp-1 font-light pb-1.5">{job?.descreption || " No descreption provided"}</p>
                           </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-500 font-medium">Salary</p>
                                <p className="text-lg font-bold text-gray-800">
                                    ₹{job?.salary?.toLocaleString("en-IN")}
                                    <span className="text-sm font-normal text-gray-500"> / Month</span>
                                </p>
                            </div>
                         </div>
                                        <div className="mt-7 flex justify-center border rounded-xl bg-purple-500 ">
                                            <button className="text-white py-1.5" onClick={(e)=>{
                                                e.stopPropagation()
                                                navigate("/details/" + job._id)}
                                                }>See Details</button>
                                        </div>
                        </div>
                    ))
                }
            </div>
           </div>
        </div>
     
    )
}
export default Jobs
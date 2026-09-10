import { useState,useEffect } from "react"
const BASE_URL = import.meta.env.VITE_BASE_URL
import axios from "axios"
import { useNavigate } from "react-router-dom"
const AdminJob = ()=>{
  const navigate = useNavigate()
  const [searchText,setSearchText]=useState("")
     const [jobArray,setJobArray]=useState([])
     let filterJobArray;
     if(jobArray.length>=0){
        filterJobArray = jobArray
     }
     filterJobArray=jobArray?.filter((job)=>job?.title.toLowerCase().includes(searchText.toLowerCase()))
        useEffect(()=>{
            const getAllJob= async()=>{
                try{
                    const res=await axios.get(BASE_URL+"/jobs/getadminalljobs",{withCredentials:true})
                    setJobArray(res?.data?.AdminAllJob)
                }catch(err){
                     if(err?.response?.data?.message){
                console.log(err?.response?.data?.message)
            }
            if(err?.request){
                console.log("server error")
            }
            else{
                console.log("something is wrong")
            }
                }
            }
            getAllJob(jobArray)
        },[])
        const handleDelete=async(id)=>{
          try{const res =await axios.delete(BASE_URL+"/jobs/deletejob/"+id,{withCredentials:true})
          setJobArray((prev)=> //whole current value of job array is the prev value
            prev.filter((prevJobs)=>prevJobs._id !== id)
          )

        }catch(err){
            console.log(err.message)
          }
        }
    return(
        <div>
            <div className="p-6">

  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
    <div>
      <h1 className="text-2xl font-bold text-gray-900">All Jobs</h1>
      <p className="text-sm text-gray-500 mt-1">Manage and view all job postings</p></div>
    
    <div className="relative w-full sm:w-72">
      <input
        type="text"
        placeholder="Search jobs..."
        value={searchText}
        onChange={(e)=>setSearchText(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-black"
      />
    </div>
  </div>
  <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr className="text-left text-gray-600">
            <th className="px-6 py-4 font-medium">  Job Title</th>
            <th className="px-6 py-4 font-medium">  Company Name</th>
            <th className="px-6 py-4 font-medium"> Location</th>
            <th className="px-6 py-4 font-medium">Job Type</th>
            <th className="px-6 py-4 font-medium">Salary</th>
            <th className="px-6 py-4 font-medium">Posted Date</th>
            <th className="px-6 py-4 font-medium text-center">Actions </th>
          </tr>
        </thead>


        <tbody className="divide-y divide-gray-100">

          {filterJobArray?.map((job) => (
            <tr
              key={job?._id}
              className="hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4">
                <div>
                  <p className="font-semibold text-gray-900"> {job?.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{job?.requirments?.length || 0} requirements </p>
                </div>
              </td>
              {/* Company */}
              <td className="px-6 py-4">
                <span className="font-medium text-gray-800">
                  {job?.company?.companyname || "No Company"}
                </span>

              </td>


              {/* Location */}
              <td className="px-6 py-4">

                <span className="text-gray-600">
                  {job?.location}
                </span>

              </td>


              {/* Job Type */}
              <td className="px-6 py-4">

                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  {job.jobtype}
                </span>

              </td>


              {/* Salary */}
              <td className="px-6 py-4">

                <span className="font-semibold text-gray-800">
                  ₹{job.salary}
                </span>

              </td>


              {/* Posted Date */}
              <td className="px-6 py-4">

                <span className="text-gray-600">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>

              </td>


              {/* Actions */}
              <td className="px-6 py-4">

                <div className="flex items-center justify-center gap-2">

                  <button onClick={()=>navigate("/admin/singlejob/"+job?._id)}
                    className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium hover:bg-gray-100"
                  >
                    View
                  </button>

                  <button
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                    onClick={()=>handleDelete(job._id)}
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>

</div>
        </div>
    )
}
export default AdminJob;
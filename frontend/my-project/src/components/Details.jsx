import useJobId from "@/Hooks/useJobId"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
const BASE_URL=import.meta.env.VITE_BASE_URL
import axios from "axios"

const Details = ()=>{
    const [isApplied,setIsApplied]=useState(false)
    const job=useJobId()
    const userId=useSelector((store)=>store.userSlice.items[0])
    const [message, setMessage] = useState("")
    const [result,setResult]=useState(false)
    const handleApply=async()=>{
        setMessage("")
        try{
            if(!job?._id) return;

            const res=await axios.post(
                BASE_URL+"/application/newapplication/"+job._id,
                {},
                {withCredentials:true}
            )

            setIsApplied(true)

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

    const checkIfUserisApplied=()=>{
        const result=job?.applications?.some((application)=>(
            userId?._id==application?.applicant
        ))
        setResult(true)
        return result
    }

    useEffect(()=>{
        setIsApplied(checkIfUserisApplied())
    },[job,userId])

    const currentDate = new Date()
    const date = new Date(job?.createdAt)
    const difference = currentDate - date
    const PostedDate = (Math.floor(difference / (1000 * 60 * 60 * 24))) || "No Data Of Job Posted How much"

    return(
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto">

                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Job Details
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        View complete information about this job opportunity
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    <div className="border-b border-gray-200 bg-gray-100 px-6 py-6">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">
                                    {job?.title || "No title here"}
                                </h1>

                                <p className="mt-2 text-gray-500">
                                    {job?.company?.companyname || "Company not available"}
                                </p>
                            </div>

                            <div>
                                {!isApplied ? (
                                    <button
                                        onClick={handleApply}
                                        className="w-32 rounded-md bg-green-500 px-4 py-2 font-medium text-white transition hover:bg-green-600 cursor-pointer"
                                    >
                                        Apply Here
                                    </button>
                                ) : (
                                    <button
                                        className="w-32 cursor-default rounded-md bg-gray-400 px-4 py-2 font-medium text-white"
                                    >
                                        Already Applied
                                    </button>
                                )}
                            </div>

                        </div>

                        {message && (
                            <p className="mt-3 text-sm text-red-500">
                                {message}
                            </p>
                        )}

                    </div>

                    <div className="p-6">

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                            <div className="rounded-xl bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">
                                    Location
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {job?.location || "No location defined"}
                                </p>
                            </div>

                            <div className="rounded-xl bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">
                                    Job Type
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {job?.jobtype || "Enter the job type"}
                                </p>
                            </div>

                            <div className="rounded-xl bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">
                                    Salary
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {job?.salary || "No Salary"} LPA
                                </p>
                            </div>

                            <div className="rounded-xl bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">
                                    Posted
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {PostedDate==0 ? "Today" : PostedDate+" Days Ago"}
                                </p>
                            </div>

                            <div className="rounded-xl bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">
                                    Position
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    12 Positions
                                </p>
                            </div>

                            <div className="rounded-xl bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">
                                    Total Applicants
                                </p>

                                <p className="mt-1 font-semibold text-gray-800">
                                    {job?.applications?.length || 0} People
                                </p>
                            </div>

                        </div>

                        <div className="mt-8 border-t border-gray-200 pt-6">

                            <h2 className="text-lg font-bold text-gray-800">
                                Job Description
                            </h2>

                            <p className="mt-3 leading-7 text-gray-600">
                                {job?.descreption || "Please enter a description"}
                            </p>

                        </div>

                        <div className="mt-8 border-t border-gray-200 pt-6">

                            <h2 className="text-lg font-bold text-gray-800">
                                Skills Required
                            </h2>

                            <div className="mt-4 flex flex-wrap gap-2">

                                {job?.requirments?.map((skill,index)=>(
                                    <span
                                        key={index}
                                        className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700"
                                    >
                                        {skill}
                                    </span>
                                ))}

                            </div>

                        </div>

                        <div className="mt-8 border-t border-gray-200 pt-6">

                            <h2 className="text-lg font-bold text-gray-800">
                                Company Information
                            </h2>

                            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Company Name
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-800">
                                        {job?.company?.companyname}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Company Email
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-800">
                                        {job?.company?.companyemail}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Company Website
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-800">
                                        {job?.company?.companywebsite}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Company Location
                                    </p>

                                    <p className="mt-1 font-semibold text-gray-800">
                                        {job?.company?.location}
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Details
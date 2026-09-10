import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editcompany from "./Editadmincompanydetail";
import Adminjobtable from "./Adminjobtable";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL

const Getsinglecompany=()=>{
    const [singleCompany,setSingleCompany]=useState({})
    const {id} =useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        const getSingleCompany=async()=>{
            try{
                const res=await axios.get(BASE_URL+"/company/getsinglecompany/"+id,{withCredentials:true})
                setSingleCompany(res.data.CompanyById)
            }catch(err){
                console.log(err)
            }
        }
        getSingleCompany()
    },[])

    return(
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="mx-auto max-w-6xl">

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Company Details
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        View and manage company information and posted jobs
                    </p>
                </div>

                 <div className="flex justify-end">
      <button
  onClick={() => navigate("/admin/job/create/"+id)}
  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
>
  <span className="text-lg leading-none">+</span>
  Add Job
</button>
    </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                    <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-6 py-5">

                        <div>
                            <h2 className="text-lg font-bold text-gray-800">
                                Company Information
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Complete details of the registered company
                            </p>
                        </div>

                        <div className="rounded-md bg-white shadow-sm">
                            <Editcompany companyId={id}/>
                        </div>

                    </div>


                    <div className="p-6">

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <div className="rounded-xl bg-gray-50 p-5">
                                <p className="text-sm font-medium text-gray-500">
                                    Company Name
                                </p>

                                <p className="mt-2 text-lg font-semibold text-gray-800">
                                    {singleCompany?.companyname}
                                </p>
                            </div>


                            <div className="rounded-xl bg-gray-50 p-5">
                                <p className="text-sm font-medium text-gray-500">
                                    Company Website
                                </p>

                                <p className="mt-2 font-semibold text-gray-800">
                                    {singleCompany?.companywebsite}
                                </p>
                            </div>


                            <div className="rounded-xl bg-gray-50 p-5">
                                <p className="text-sm font-medium text-gray-500">
                                    Location
                                </p>

                                <p className="mt-2 font-semibold text-gray-800">
                                    {singleCompany?.location}
                                </p>
                            </div>


                            <div className="rounded-xl bg-gray-50 p-5">
                                <p className="text-sm font-medium text-gray-500">
                                    Company Email
                                </p>

                                <p className="mt-2 font-semibold text-gray-800 break-all">
                                    {singleCompany?.companyemail}
                                </p>
                            </div>

                        </div>


                        <div className="mt-5 rounded-xl bg-gray-50 p-5">

                            <p className="text-sm font-medium text-gray-500">
                                Description
                            </p>

                            <p className="mt-2 leading-7 text-gray-700">
                                {singleCompany?.description}
                            </p>

                        </div>

                    </div>

                </div>


                <div className="mt-8">

                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-gray-800">
                            Company Jobs
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Jobs posted by this company
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <Adminjobtable/>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Getsinglecompany;
import { addAllJob } from "@/utilites/jobSlice"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
const BASE_URL = import.meta.env.VITE_BASE_URL
const useJobId = ()=>{
    const {id}=useParams()
    const [job,setJob]=useState({})
    useEffect(()=>{
        const fetchJob=async()=>{
                try{
                const res=await axios.get(BASE_URL+"/jobs/getjobs/"+id,{
                    withCredentials:true
                })
                if(res?.data?.fetchJobs){
                    setJob(res?.data?.fetchJobs)
                }}catch(err){
                    console.log(err)
                }
        }
        fetchJob()
    },[id])
    return job
}
export default useJobId
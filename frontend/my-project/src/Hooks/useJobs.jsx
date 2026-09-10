import { addAllJob } from "@/utilites/jobSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
const BASE_URL = import.meta.env.VITE_BASE_URL
const useJob = ()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchJob=async()=>{
                try{
                const res=await axios.get(BASE_URL+"/jobs/getalljobs",{
                    withCredentials:true
                })
                if(res?.data?.AllJob){
                    dispatch(addAllJob(res?.data?.AllJob))
                }}catch(err){
                    console.log(err)
                }
        }
        fetchJob()
    },[])
}
export default useJob
import HeroSection from "./HeroSection"
import Carouseel from "./Carousel"
import Latestjob from "./Latestjob"
import useJob from "@/Hooks/useJobs";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Body = ()=>{
    useJob()
    const user = useSelector((store)=>store.userSlice.items[0])
    const navigate = useNavigate()
    useEffect(()=>{
        if(user?.role=="recruiter") navigate("/admin/jobs")
    },[user,navigate])
    if(user?.role=="recruiter") return null
      const [searchText,setSearchText]=useState("")
    return(
        <>
            <HeroSection searchText={searchText} setSearchText={setSearchText}/>
             <Carouseel searchText={searchText} setSearchText={setSearchText}/>
             <Latestjob searchText={searchText} setSearchText={setSearchText}/>
        </>
       
    )
}
export default Body
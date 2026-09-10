import axios from "axios"
import { useEffect, useState } from "react"
  const BASE_URL = import.meta.env.VITE_BASE_URL
const Getcompany=()=>{
    const [companyArray ,setCompanyArray]=useState([])
useEffect(()=>{
    const getcompanyfunc = async()=>{
        const res=await axios.get(BASE_URL+"/company/getallcompany",{withCredentials:true})
        return setCompanyArray(res.data.companyList)
    }
    getcompanyfunc()
},[])
   return companyArray
}
export default Getcompany;

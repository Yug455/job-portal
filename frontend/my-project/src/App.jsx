
import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addAllJob } from './utilites/jobSlice'
import { setLoading, updateUser } from './utilites/userSlice'
const BASE_URL=import.meta.env.VITE_BASE_URL
import { useSelector } from 'react-redux'
function App() {
  const dispatch = useDispatch()
  const user = useSelector((store)=>store.userSlice.items[0])
  const loading = useSelector((store)=>store.userSlice.loading)
  useEffect(()=>{
    const fetchUserAndJob=async()=>{
      try{
         const res=await axios.get(BASE_URL+"/jobs/getalljobs",{
                    withCredentials:true
            })
            if(res?.data?.AllJob){
              dispatch(addAllJob(res.data.AllJob))
            }
            const res2=await axios.get(BASE_URL+"/user/getuser",{
                        withCredentials:true
                    },)

                    if(res2.data?.user){
                      dispatch(updateUser(res2.data.user))
                    }
      }catch(err){
        console.log(err?.message)
      }finally{
        dispatch(setLoading(false))
      }
    }
    fetchUserAndJob();
  },[])
  if(loading){
    return <h1>Loading....</h1>
  }
  return(
 <>
{ !user && <h1 className='font-extrabold'>pls login or signup to see the website proper and correct functioanlity sorry for inconvienence</h1>}
<Navbar/>
 <Outlet/>
 <Footer/>
 </>
  )
}

export default App

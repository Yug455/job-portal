import  { Popover,PopoverContent,PopoverTrigger} from './ui/popover'
import {Avatar,AvatarFallback,AvatarImage,} from './ui/avatar'
import { Button } from './ui/button'
import {User, LogOut} from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL
import { deleteUser } from '@/utilites/userSlice'
const Navbar = ()=>{
    const [message,setMessage]=useState("")
   const user=useSelector((store)=>store.userSlice.items)
   const loading = useSelector((store)=>store.userSlice.loading)
   const userObj=user[0]
   const role = userObj?.role || userObj?.userId?.role
   const dispatch =useDispatch()
   const navigate=useNavigate()
   const handleLogout = async()=>{
       try{
        setMessage("")
         const res = await axios.post(BASE_URL+"/user/logout",{},{withCredentials:true})
        dispatch(deleteUser())
        navigate("/")
       }catch(err){
         if(err?.data?.response?.message){
                setMessage(err?.data?.response?.message)
            }
            if(err?.request){
                setMessage("server error")
            }
            else{
                setMessage("something is wrong")
            }
       }
        
   }
   if(loading){
    return <h1>Loading....</h1>
   }
   
    return(
        <div className="flex justify-between items-center border-2 h-14 rounded-b-sm">
            <div className="w-20">
                <img src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202010/jobs_660_130920052343_291020052310.jpg?size=948:533" />
            </div>
            <div className='flex'>
               {userObj && role=="recruiter" &&(<ul className="flex gap-10 items-center cursor-pointer">
                    <Link to={"/admin/jobs"}>
                         <li>Jobs</li>
                    </Link>
                    <Link to={"/admin/companies"}>
                         <li>companies</li>
                    </Link>
                </ul>)}
                {userObj && role=="student" &&( <ul className="flex gap-10 items-center cursor-pointer">
                    <Link to={"/main"}>
                         <li>Home</li>
                    </Link>
                    <Link to={"/jobs"}>
                         <li>Jobs</li>
                    </Link>
                    <Link to={"/browse"}>
                         <li>Browser</li>
                    </Link>
                </ul>)}
                {user.length==0 ? (
                    <div>
                        <Link to="/">
                         <Button className="mr-2.5 ml-2 cursor-pointer" variant='ouline'>Login</Button>
                        </Link>
                        <Link to={"/signup"}>
                          <Button className="cursor-pointer">Signup</Button>
                        </Link>
                    </div>
                ) :
                (
            <Popover>
                <PopoverTrigger asChild>
                   <Avatar className="cursor-pointer ml-5">
                         <AvatarImage src="/profile.jpg" alt="Profile" />
                        <AvatarFallback>KS</AvatarFallback>
                     </Avatar>
                </PopoverTrigger>
                    <PopoverContent>
                    <div className='flex gap-2'>
                        <Link to={"/profile"}>
                            <Avatar className="cursor-pointer ml-5 my-3">
                            <AvatarImage src="/profile.jpg" alt="Profile" />
                            <AvatarFallback>KS</AvatarFallback>
                            </Avatar>
                        </Link>
                        <div>
                        <h2>Yug</h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti, fugit.</p>
                        </div>
                    </div>
                    <div className='flex flex-col'> 
                        {userObj && role=="student" && <div className='flex'>
                        <User/>
                        <Link to={"/profile"}>
                          <Button variant="link">View Profile</Button>
                        </Link>
                        </div>}
                        <div className='flex'>
                        <LogOut/>
                       <Button variant="link" onClick={handleLogout}>Logout</Button>
                        {message && <p className='text-red-600 mt-1.5'>{message}</p>}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
                )
                }
            </div>
        </div>
    )
}
export default Navbar;
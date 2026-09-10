import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "@/utilites/userSlice"
const BASE_URL = import.meta.env.VITE_BASE_URL
const Login = ()=>{
    const dispatch=useDispatch()
    const [emailid,setEmailid]=useState("")
    const [password,setPassword] = useState("")
    const [message,setMessage]=useState("")
    const navigate = useNavigate()
    const handleLogin = async()=>{
        setMessage("")
        try{
            const res=await axios.post(BASE_URL+"/user/login",{
                emailid,
                password
            },{
                withCredentials:true
            })
                setMessage(res?.data?.message)
                dispatch(addUser(res?.data?.userrecords))
                // setUser(res?.data?.userrecords)
                navigate("/main")
            
        }catch(err){
            if(err?.response?.data?.message){
                setMessage(err?.response?.data?.message)
            }
            else if(err?.request){
                setMessage("unable to connect to the server")
            }
            else{
                setMessage(err.message || "something went wrong")
            }
            console.log(err)
        }
    }
    return(
        <div className="flex min-h-screen items-center min-w-screen justify-center">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <h1 className="fieldset-legend pb-3">Login</h1>

            <label className="label" htmlFor="email">Email</label>
            <input id="email" type="email" className="input" placeholder="Email" value={emailid} onChange={(e)=>{
                setEmailid(e.target.value)
            }}/>

            <label className="label" htmlFor="password">Password</label>
            <input id="password" type="password" className="input" placeholder="Password" value={password} onChange={(e)=>{
                setPassword(e.target.value)
            }}/>
            {message && <p className="text-red-500">{message}</p>}
            <button className="btn btn-neutral mt-4" onClick={handleLogin}>Login</button>
            <Link to={"/signup"}>
                <span>not have an account? signup here</span>
            </Link>
            </fieldset>
        </div>
    )
}
export default Login
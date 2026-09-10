import { createBrowserRouter } from "react-router-dom"
import App from "../../App"
import Login from "../Auth/Login"
import Body from "../../components/Body"
import Signup from "../Auth/Signup"
import Jobs from "../Jobs"
import Browse from "../Browse"
import Profile from "../Profile"
import Details from "../Details"
import AdminJob from "@/componentsadmin/Adminjobs"
import Admincompanies from "@/componentsadmin/Admincompanies"
import Createcompany from "@/componentsadmin/Createcompany"
import Getsinglecompany from "@/componentsadmin/Getsinglecompanyadmin"
import Adminjobtable from "@/componentsadmin/AdminOneDetails"
import Onejob from "@/componentsadmin/AdminOneDetails"
import Applicants from "@/componentsadmin/Adminapplicants"
import Applicantdetail from "@/componentsadmin/Applicantdetail"
import AdmincreateJob from "@/componentsadmin/AdmincreateJob"
const appRouter = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/main",
                element:<Body/>
            },
             {
                index:true,
                element:<Login/>
            },
            {
                path:"/signup",
                element:<Signup/>
            },
            {
                path:"/jobs",
                element:<Jobs/>
            },
            {
                path:"/browse",
                element:<Browse/>
            },
            {
                path:"/profile",
                element:<Profile/>
            },
            {
                path:"/details/:id",
                element:<Details/>
            },
            // admin route 
            {
                path:"/admin/companies",
                element:<Admincompanies/>
            },
            {
                path:"/admin/company/:id",
                element:<Getsinglecompany/>
            },
            {
                path:"/admin/jobs",
                element:<AdminJob/>
            },
            {
                path:"/admin/create/company",
                element:<Createcompany/>
            },
            {
                path:"/admin/singlejob/:id",
                element:<Onejob/>
            },
            {
                path:"/admin/applications/:id",
                element:<Applicants/>
            },
            {
                path:"/admin/applicationdetail/:id",
                element:<Applicantdetail/>
            },
           {
             path:"/admin/job/create/:id",
            element:<AdmincreateJob/>
           },
        ]
    }
])
export default appRouter
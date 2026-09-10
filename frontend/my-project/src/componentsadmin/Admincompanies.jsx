import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Edit } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Getcompany from "../Hooks/useGetAdminCompany"
import { useState } from "react"

const Admincompanies = ()=>{
    const [searchText,setSearchText]=useState("")
    const companyArray=Getcompany()
    let filterCompanyArray;
    const navigate = useNavigate()
     filterCompanyArray=companyArray?.filter((company)=>company.companyname.toLowerCase().includes(searchText.toLowerCase()))
    return(
        <div className="min-h-screen bg-gray-50 p-6">

            <div className="max-w-6xl mx-auto">

                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Companies
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage all companies registered on the platform
                    </p>
                </div>

                <div className="mb-6 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">

                    <div className="w-full sm:w-87.5">
                        <input
                            type="text"
                            placeholder="Filter By Name"
                            value={searchText}
                            className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                            onChange={(e)=>setSearchText(e.target.value)}
                        />
                    </div>

                    <div>
                        <button
                            className="h-10 rounded-md bg-purple-600 px-5 text-sm font-medium text-white cursor-pointer hover:bg-purple-700 transition"
                            onClick={()=>navigate("/admin/create/company")}
                        >
                            New Company
                        </button>
                    </div>

                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">

                    <table className="w-full text-left">

                        <thead className="border-b border-gray-200 bg-gray-100">

                            <tr>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Logo
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Company Name
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Date
                                </th>

                                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filterCompanyArray?.map((company)=>(

                                <tr
                                    key={company._id}
                                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition"
                                >

                                    <td className="px-6 py-4">

                                        <Avatar className="h-10 w-10 border border-gray-200">
                                            <AvatarImage src="" alt="image here"/>
                                            <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold">
                                                {company?.companyname?.slice(0,2)}
                                            </AvatarFallback>
                                        </Avatar>

                                    </td>

                                    <td className="px-6 py-4">

                                        <p className="font-semibold text-gray-800">
                                            {company?.companyname}
                                        </p>

                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-500">

                                        {new Date(company?.createdAt).toLocaleDateString()}

                                    </td>

                                    <td className="px-6 py-4 text-center">

                                        <Popover>

                                            <PopoverTrigger asChild>

                                                <button className="h-9 w-9 rounded-md text-lg font-bold text-gray-500 hover:bg-gray-100 hover:text-gray-800 cursor-pointer transition">
                                                    ...
                                                </button>

                                            </PopoverTrigger>

                                            <PopoverContent className="w-36 p-2">

                                                <div className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-gray-100">

                                                    <Edit className="h-4 w-4 text-gray-600"/>

                                                    <button
                                                        className="cursor-pointer text-sm font-medium text-gray-700 hover:text-purple-600"
                                                        onClick={()=>navigate("/admin/company/"+company._id)}
                                                    >
                                                        Edit
                                                    </button>

                                                </div>

                                            </PopoverContent>

                                        </Popover>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
}

export default Admincompanies
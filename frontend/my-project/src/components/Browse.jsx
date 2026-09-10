import { Bookmark, MapPin, Briefcase, IndianRupee } from "lucide-react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"

const Browse = () => {
    const arr = new Array(3).fill(null)
    const id = "idhere"
    let [searchInput,setSearchInput] = useState("")
    let [searchText,setSearchText]=useState("")
    const AllJob = useSelector((state) => state?.jobSlice?.items)
    let filterjobs=AllJob || []
    if(searchInput==""){
        filterjobs=AllJob
    }
    else if(searchText){
         filterjobs=AllJob?.filter((job)=>
         job?.title.toLowerCase().includes(searchText.toLowerCase()) || 
         job?.company?.companyname?.toLowerCase().includes(searchText.toLocaleLowerCase())||
         job?.location?.toLowerCase().includes(searchText.toLocaleLowerCase())
         )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">

            {/* Page Heading */}
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900">
                    Search Results
                    <span className="ml-2 text-purple-600">
                        ({filterjobs?.length || 0})
                    </span>
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Find the right opportunity for your career
                </p>
            </div>

            {/* input search */}
               <div className="mb-7">
                <div className="border-2 border-purple-400 focus-within:border-purple-500 flex items-center justify-center mx-auto h-15 rounded-md max-w-2xl px-2">
                    <input type="text" placeholder="Search jobs by title Skills or company..." className="min-w-0 flex-1 outline-none" onChange={(e)=>setSearchInput(e.target.value)}/>
                    <button className="bg-purple-600 hover:bg-purple-700 rounded-sm p-1.5 text-white mr-2 px-3" onClick={()=>{ if(searchInput==="") setSearchText("")
                        setSearchText(searchInput)}}>Search</button>
                </div>
               </div>


            {/* Job Cards Container */}
            <div className="mx-auto max-w-7xl">

                <div className="flex flex-wrap justify-center gap-6">

                    {filterjobs?.map((job, index) => (

                        /* Job Card */
                        <div
                            key={index}
                            className="
                                group
                                w-full
                                max-w-sm
                                rounded-2xl
                                border
                                border-gray-200
                                bg-white
                                p-5
                                shadow-sm
                                transition
                                duration-300
                                hover:-translate-y-1
                                hover:shadow-xl
                            "
                        >

                            {/* Location + Bookmark */}
                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                    <MapPin size={16} />
                                    <span>{job?.location}</span>
                                </div>


                            </div>


                            {/* Company + Job Title */}
                            <div className="mt-5 flex items-center gap-3">

                                {/* Company Logo */}
                                <div
                                    className="
                                        flex
                                        h-12
                                        w-12
                                        shrink-0
                                        items-center
                                        justify-center
                                        overflow-hidden
                                        rounded-xl
                                        bg-purple-50
                                    "
                                >
                                    <img
                                        className="h-full w-full object-cover"
                                        src="https://images.pexels.com/photos/20602372/pexels-photo-20602372.jpeg"
                                        alt="company"
                                    />
                                </div>


                                {/* Job Information */}
                                <div className="min-w-0">

                                    <h2
                                        className="
                                            truncate
                                            text-lg
                                            font-bold
                                            text-gray-900
                                        "
                                    >
                                        {job?.title}
                                    </h2>

                                    <h3 className="mt-1 text-sm text-gray-500">
                                        {job?.company?.companyname}
                                    </h3>

                                </div>

                            </div>


                            {/* Job Type Badge */}
                            <div className="mt-5">
                                <span
                                    className="
                                        inline-flex
                                        rounded-full
                                        bg-purple-50
                                        px-3
                                        py-1
                                        text-xs
                                        font-medium
                                        text-purple-700
                                    "
                                >
                                    {job?.jobtype}
                                </span>
                            </div>


                            {/* Description */}
                            <div className="mt-4">

                                <h3 className="text-sm font-semibold text-gray-900">
                                    Job Description
                                </h3>

                                <p
                                    className="
                                        mt-1.5
                                        line-clamp-2
                                        text-sm
                                        leading-6
                                        text-gray-500
                                    "
                                >
                                    {job?.descreption}
                                </p>

                            </div>


                            {/* Job Details */}
                            <div
                                className="
                                    mt-5
                                    flex
                                    flex-wrap
                                    gap-2
                                    border-t
                                    border-gray-100
                                    pt-4
                                "
                            >

                                <span
                                    className="
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        rounded-lg
                                        bg-gray-50
                                        px-3
                                        py-2
                                        text-xs
                                        font-medium
                                        text-gray-600
                                    "
                                >
                                    <Briefcase size={14} />
                                    Full Time
                                </span>

                                <span
                                    className="
                                        inline-flex
                                        items-center
                                        gap-1
                                        rounded-lg
                                        bg-gray-50
                                        px-3
                                        py-2
                                        text-xs
                                        font-medium
                                        text-gray-600
                                    "
                                >
                                    <IndianRupee size={14} />
                                    {job?.salary}
                                </span>

                            </div>


                            {/* Buttons */}
                            <div className="mt-5 flex items-center gap-3">

                                <Link
                                    to={`/details/${id}`}
                                    className="flex-1"
                                >
                                    <button
                                        className="
                                            w-full
                                            rounded-lg
                                            bg-purple-600
                                            px-4
                                            py-2.5
                                            text-sm
                                            font-semibold
                                            text-white
                                            transition
                                            hover:bg-purple-700
                                            active:scale-95
                                        "
                                    >
                                        Details
                                    </button>
                                </Link>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    )
}

export default Browse
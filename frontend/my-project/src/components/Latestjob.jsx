import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Latestjob = ({searchText,setSearchText}) => {
    const Alljobs = useSelector((store) => store.jobSlice.items)
    const navigate = useNavigate()
    let filterJobs=Alljobs
    if(searchText=="" || searchText==null){
        filterJobs=Alljobs
    }
    else{
         filterJobs=Alljobs.filter((job)=>job.company.companyname.toLowerCase().includes(searchText.toLowerCase()))
    }
    return (
        <div className="max-w-7xl mx-auto my-16 px-4">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                    <span className="text-purple-600">Latest & Top </span>Job Openings
                </h1>
                <p className="text-gray-500 mt-2 text-sm sm:text-base">
                    Discover your next career move among our top verified listings.
                </p>
            </div>

            {/* Job Grid Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    filterJobs?.map((job, index) => {
                        return (
                            <div 
                                key={job._id} 
                                onClick={() => navigate("/details/" + job._id)}
                                className="group relative flex flex-col justify-between p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            >
                                <div className="space-y-4">
                                    {/* Company & Location Info */}
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                                {job?.company?.companyname || "Company Name"}
                                            </h2>
                                            <p className="text-xs font-medium text-gray-400">India</p>
                                        </div>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                                            Featured
                                        </span>
                                    </div>

                                    {/* Job Title & Description */}
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-800">{job?.title || "No title"}</h3>
                                        <p className="text-sm text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                                           {job?.descreption || " No descreption provided"}
                                        </p>
                                    </div>

                                    {/* Badges / Meta Info */}
                                    <div className="flex flex-wrap items-center gap-2 pt-1">
                                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 border border-purple-100">
                                            12 Positions
                                        </span>
                                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-pink-50 text-pink-700 border border-pink-100">
                                            Part Time
                                        </span>
                                        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                                            24 LPA
                                        </span>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="pt-6 mt-4 border-t border-gray-50">
                                    <button 
                                        className="w-full py-2.5 px-4 text-center text-sm font-semibold rounded-xl bg-gray-50 text-gray-700 group-hover:bg-purple-600 group-hover:text-white transition-all duration-200"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            navigate("/details/" + job._id)
                                        }}
                                    >
                                        See Details
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Latestjob
import useJobId from "@/Hooks/useJobId";
import { useNavigate } from "react-router-dom";
const Onejob = () => {
    const job = useJobId();
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Job Details
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        View complete information about All job Created BY Other Company
                    </p>
                </div>

                <div className="rounded-2xl bg-white shadow-sm border border-gray-200 overflow-hidden">

                    <div className="bg-gray-100 px-6 py-6 border-b border-gray-200">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">
                                    {job?.title}
                                </h1>

                                <p className="mt-2 text-gray-500">
                                    {job?.company?.companyname}
                                </p>
                            </div>

                            <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
                                {job?.jobtype}
                            </span>
                        </div>
                    </div>

                    <div className="p-6">

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

                            <div className="rounded-xl bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">
                                    Location
                                </p>
                                <p className="mt-1 font-semibold text-gray-800">
                                    {job?.location}
                                </p>
                            </div>

                            <div className="rounded-xl bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">
                                    Salary
                                </p>
                                <p className="mt-1 font-semibold text-gray-800">
                                    ₹{job?.salary} LPA
                                </p>
                            </div>

                            <div className="rounded-xl bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">
                                    Posted Date
                                </p>
                                <p className="mt-1 font-semibold text-gray-800">
                                    {new Date(job?.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <div className="rounded-xl bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">
                                    Company
                                </p>
                                <p className="mt-1 font-semibold text-gray-800">
                                    {job?.company?.companyname}
                                </p>
                            </div>

                            <div className="rounded-xl bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">
                                    Company Location
                                </p>
                                <p className="mt-1 font-semibold text-gray-800">
                                    {job?.company?.location}
                                </p>
                            </div>

                            <div className="rounded-xl bg-gray-50 p-4 group cursor-pointer" onClick={()=>navigate("/admin/applications/"+job._id)}>
                                <p className="text-sm text-gray-500">
                                    Total Applicants
                                </p>
                                <p className="mt-1 font-semibold text-gray-800" onClick={(e)=>{
                                    e.stopPropagation()
                                    navigate("/admin/applications/"+job._id)}}>
                                    {job?.applications?.length || 0}
                                </p>
                            </div>

                        </div>

                        <div className="mt-8">
                            <h2 className="text-lg font-bold text-gray-800">
                                Job Description
                            </h2>

                            <p className="mt-3 leading-7 text-gray-600">
                                {job?.descreption}
                            </p>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-lg font-bold text-gray-800">
                                Required Skills
                            </h2>

                            <div className="mt-3 flex flex-wrap gap-2">
                                {job?.requirments?.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 border-t border-gray-200 pt-6">
                            <h2 className="text-lg font-bold text-gray-800">
                                Company Information
                            </h2>

                            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Company Name
                                    </p>
                                    <p className="mt-1 font-semibold text-gray-800">
                                        {job?.company?.companyname}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Company Email
                                    </p>
                                    <p className="mt-1 font-semibold text-gray-800">
                                        {job?.company?.companyemail}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Website
                                    </p>
                                    <p className="mt-1 font-semibold text-gray-800">
                                        {job?.company?.companywebsite}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Location
                                    </p>
                                    <p className="mt-1 font-semibold text-gray-800">
                                        {job?.company?.location}
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
                        <button className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700">
                            Edit
                        </button>

                        <button className="rounded-md bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700">
                            Delete
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Onejob;
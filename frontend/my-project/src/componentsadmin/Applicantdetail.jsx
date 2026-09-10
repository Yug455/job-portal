import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
const BASE_URL = import.meta.env.VITE_BASE_URL

const Applicantdetail = () => {
    const [showmsg,setShowMsg]=useState(false)
    const [userDetail, setUserDetail] = useState({})
    const { id } = useParams()

    const getuserDetail = async () => {
        try{
            const res = await axios.get(
            BASE_URL + "/application/getuserapplicant/" + id,{withCredentials:true}
        )
        setUserDetail(res?.data?.profileOfuser)
          if (!res?.data?.profileOfuser?.bio && !res?.data?.profileOfuser?.skills?.length && !res?.data?.profileOfuser?.resume) {
                setShowMsg(true)
                setTimeout(() => {
                    setShowMsg(false)
                }, 3000)
            }
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
    getuserDetail()
}, [])

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            {showmsg && <div><h1 className="text-red-500">User did not make profile or profile incomplete or no Profile added by the user </h1></div>}
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                    {/* Top section */}
                    <div className="bg-linear-to-r from-purple-600 to-indigo-600 h-32"></div>

                    <div className="px-8 pb-8">

                        {/* Profile image */}
                        <div className="-mt-16 mb-5">
                            <div className="w-28 h-28 rounded-full bg-white p-1 shadow-md">
                                {userDetail?.profilephoto ? (
                                    <img
                                        src={userDetail.profilephoto}
                                        alt="Profile"
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-full bg-purple-100 flex items-center justify-center">
                                        <span className="text-4xl font-semibold text-purple-600">
                                            {userDetail?.userId?.name
                                                ?.charAt(0)
                                                ?.toUpperCase()}
                                        </span>
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* Name and role */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {userDetail?.userId?.name || "Applicant Name"}
                                </h1>

                                <p className="text-gray-500 mt-1">
                                    {userDetail?.userId?.role || "Applicant"}
                                </p>
                            </div>

                            <a href={userDetail?.resume} target="_blank"
                                className="px-5 py-2.5 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition"
                            >
                                View Resume
                            </a>

                        </div>

                    </div>
                </div>


                {/* Contact Information */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mt-6 p-6">

                    <h2 className="text-lg font-semibold text-gray-900 mb-5">
                        Contact Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div>
                            <p className="text-sm text-gray-500 mb-1">
                                Email
                            </p>

                            <p className="text-gray-900 font-medium break-all">
                                {userDetail?.userId?.emailid || "Not provided"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500 mb-1">
                                Phone Number
                            </p>

                            <p className="text-gray-900 font-medium">
                                {userDetail?.userId?.phoneNo || "Not provided"}
                            </p>
                        </div>

                    </div>
                </div>


                {/* About */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mt-6 p-6">

                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        About Applicant
                    </h2>

                    <p className="text-gray-600 leading-7">
                        {userDetail?.bio || "No bio available."}
                    </p>

                </div>


                {/* Skills */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mt-6 p-6">

                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Skills
                    </h2>

                    <div className="flex flex-wrap gap-3">

                        {userDetail?.skills?.length > 0 ? (

                            userDetail.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 rounded-full bg-purple-50 text-purple-700 border border-purple-100 text-sm font-medium"
                                >
                                    {skill}
                                </span>
                            ))

                        ) : (

                            <p className="text-gray-500">
                                No skills added.
                            </p>

                        )}

                    </div>

                </div>


                {/* Resume */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mt-6 p-6">

                    <div className="flex items-center justify-between gap-4">

                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Resume
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Applicant's uploaded resume
                            </p>
                        </div>

                        {userDetail?.resume ? (

                            <a
                                href={userDetail.resume}
                                target="_blank"
                                rel="noreferrer"
                                className="px-5 py-2.5 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition"
                            >
                                Open Resume
                            </a>

                        ) : (

                            <span className="text-sm text-gray-500">
                                No resume uploaded
                            </span>

                        )}

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Applicantdetail


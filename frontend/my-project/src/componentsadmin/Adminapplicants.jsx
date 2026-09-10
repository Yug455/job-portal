
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const STATUS_STYLES = {
  pending: "bg-amber-50 text-amber-700 border border-amber-200",
  accepted: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  rejected: "bg-rose-50 text-rose-700 border border-rose-200",
};

const Applicants = () => {
  const { id } = useParams();
 const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  
  const applicantsList = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/application/getadminapplication/" + id,
        { withCredentials: true }
      );

      setApplicants(res.data.allApplications);
    } catch (err) {
      if (err?.response?.data?.message) {
        console.log(err.response.data.message);
      } else if (err?.request) {
        console.log("Server error");
      } else {
        console.log("Something is wrong");
      }
    }
  };

  const handleStatus=async(updateStatus,applicationId)=>{
   try{
     await axios.post(BASE_URL+"/application/updateapplication/"+updateStatus+"/"+applicationId,{},{withCredentials:true})
    applicantsList();
   }catch(err){
     if (err?.response?.data?.message) {
        console.log(err.response.data.message);
      } else if (err?.request) {
        console.log("Server error");
      } else {
        console.log("Something is wrong");
      }
   }
  }
  useEffect(() => {
    applicantsList();
  }, [id]);

  return (
    <div className="min-h-screen bg-stone-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="mb-1 text-sm font-medium text-stone-500">
                Job Applications
              </p>

              <h1 className="text-2xl font-bold tracking-tight text-stone-900">
                Applicants
              </h1>

              <p className="mt-1 text-sm text-stone-500">
                Review and manage people who applied for this job.
              </p>
            </div>

            {/* Applicant count */}
            <div className="flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-stone-900 text-white shadow-sm">
              <span className="text-lg font-bold leading-none">
                {applicants.length}
              </span>

              <span className="mt-1 text-[10px] font-medium uppercase tracking-wide text-stone-300">
                {applicants.length === 1 ? "Person" : "People"}
              </span>
            </div>

          </div>
        </div>

        {/* Empty state */}
        {applicants.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-20 text-center shadow-sm">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-stone-100">
              <svg
                className="h-7 w-7 text-stone-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.7"
                  d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                />
              </svg>
            </div>

            <h2 className="text-base font-semibold text-stone-800">
              No applicants yet
            </h2>

            <p className="mt-1 text-sm text-stone-500">
              Applicants for this job will appear here once they apply.
            </p>

          </div>
        ) : (

          /* Applicants list */
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">

            {/* List heading */}
            <div className="border-b border-stone-200 bg-stone-50/70 px-6 py-4">
              <div className="flex items-center justify-between">

                <div>
                  <h2 className="font-semibold text-stone-900">
                    Applications
                  </h2>

                  <p className="text-xs text-stone-500">
                    Review applicant information and application status.
                  </p>
                </div>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-600 ring-1 ring-stone-200">
                  {applicants.length}{" "}
                  {applicants.length === 1 ? "Application" : "Applications"}
                </span>

              </div>
            </div>

            <ul className="divide-y divide-stone-200">

              {applicants.map((application) => {

                const applicant = application?.applicant;

                const status = (
                  application?.status || "pending"
                ).toLowerCase();

                return (
                  <li
                    key={application?._id}
                    className="p-5 transition hover:bg-stone-50 sm:p-6"
                  >

                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center cursor-pointer" onClick={()=>navigate("/admin/applicationdetail/"+application?._id)}>

                      {/* Avatar */}
                      <div className="flex shrink-0 items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-900 text-base font-semibold text-white shadow-sm">
                          {applicant?.name
                            ?.charAt(0)
                            ?.toUpperCase() || "?"}
                        </div>

                        <div className="sm:hidden">
                          <p className="font-semibold text-stone-900">
                            {applicant?.name || "Unknown applicant"}
                          </p>

                          <p className="text-sm text-stone-500">
                            {applicant?.role || "Applicant"}
                          </p>
                        </div>

                      </div>

                      {/* Applicant information */}
                      <div className="min-w-0 flex-1">

                        <div className="hidden items-center gap-3 sm:flex">

                          <h3 className="truncate text-base font-semibold text-stone-900">
                            {applicant?.name || "Unknown applicant"}
                          </h3>

                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                              STATUS_STYLES[status] ||
                              STATUS_STYLES.pending
                            }`}
                          >
                            {status}
                          </span>

                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-stone-500">

                          {/* Role */}
                          {applicant?.role && (
                            <div className="flex items-center gap-1.5">
                              <svg
                                className="h-4 w-4 text-stone-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.7"
                                  d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                                />
                              </svg>

                              <span className="capitalize">
                                {applicant.role}
                              </span>
                            </div>
                          )}

                          {/* Email */}
                          {applicant?.emailid && (
                            <div className="flex min-w-0 items-center gap-1.5">
                              <svg
                                className="h-4 w-4 shrink-0 text-stone-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="1.7"
                                  d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>

                              <span className="truncate">
                                {applicant.emailid}
                              </span>
                            </div>
                          )}

                        </div>

                        {/* Mobile status */}
                        <div className="mt-3 sm:hidden">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                              STATUS_STYLES[status] ||
                              STATUS_STYLES.pending
                            }`}
                          >
                            {status}
                          </span>
                        </div>

                      </div>

                      {/* Buttons */}
                      <div className="flex shrink-0 gap-2 border-t border-stone-100 pt-4 sm:border-0 sm:pt-0">

                        <button
                          className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.98] sm:flex-none"
                          onClick={()=>{handleStatus("accepted",application._id)}}
                        >
                          Accept
                        </button>

                        <button
                          className="flex-1 rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 active:scale-[0.98] sm:flex-none"
                           onClick={()=>{handleStatus("rejected",application._id)}}
                        >
                          Reject
                        </button>

                      </div>

                    </div>
                  </li>
                );
              })}

            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applicants;

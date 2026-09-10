
import axios from "axios";
import { useState } from "react";
const BASE_URL = import.meta.env.VITE_BASE_URL
import { useParams } from "react-router-dom";
const CreateJob = () => {
    const {id}=useParams()
    const [jobTitle, setJobTitle] = useState("");
    const [descreption, setDescreption] = useState("");
    const [requirments, setRequirments] = useState([""]);
    const [salary, setSalary] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("");
    const [message,setMessage]=useState("")
    const addRequirement = () => {
        setRequirments([...requirments, ""]);
    };

    const removeRequirement = (index) => {
        if (requirments.length === 1) return;

        setRequirments(
            requirments.filter((_, i) => i !== index)
        );
    };

    const updateRequirement = (index, value) => {
        const updatedRequirements = [...requirments];
        updatedRequirements[index] = value;
        setRequirments(updatedRequirements);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const res = await axios.post(BASE_URL+"/jobs/postjob/"+id ,
            { jobTitle,
            descreption,
            requirments,
            salary,
            location,
            jobType},{withCredentials:true})
            setMessage(res.data.message)
            setTimeout(()=>{
                setMessage("")
            },3000)
            setJobTitle("");
            setDescreption("");
            setRequirments([""]);
            setSalary("");
            setLocation("");
            setJobType("");
        }catch(err){
              if (err?.response?.data?.message) {
        console.log(err.response.data.message);
      } else if (err?.request) {
        console.log("Server error");
      } else {
        console.log("Something is wrong");
      }
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Create New Job
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Add the details of the job you want to publish.
                    </p>
                </div>

                {/* Form Card */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8"
                >

                    {/* Job Title */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Job Title
                        </label>

                        <input
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            placeholder="e.g. MERN Stack Developer"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Job Description
                        </label>

                        <textarea
                            value={descreption}
                            onChange={(e) => setDescreption(e.target.value)}
                            rows="6"
                            placeholder="Describe the role, responsibilities and what the candidate will be doing..."
                            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Salary + Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Salary
                            </label>

                            <input
                                type="number"
                                value={salary}
                                onChange={(e) => setSalary(e.target.value)}
                                placeholder="e.g. 60000"
                                min="0"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Location
                            </label>

                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="e.g. Delhi, India"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                    </div>

                    {/* Job Type */}
                    <div className="mb-8">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Job Type
                        </label>

                        <select
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        >
                            <option value="">
                                Select job type
                            </option>

                            <option value="Full-time">
                                Full-time
                            </option>

                            <option value="Part-time">
                                Part-time
                            </option>

                            <option value="Internship">
                                Internship
                            </option>

                            <option value="Contract">
                                Contract
                            </option>
                        </select>
                    </div>

                    {/* Requirements */}
                    <div className="border-t border-gray-200 pt-7 mb-8">

                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Requirements
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Add the skills or requirements for this position.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={addRequirement}
                                className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                            >
                                + Add
                            </button>
                        </div>

                        <div className="space-y-3">
                            {requirments.map((requirement, index) => (
                                <div
                                    key={index}
                                    className="flex gap-3"
                                >
                                    <input
                                        type="text"
                                        value={requirement}
                                        onChange={(e) =>
                                            updateRequirement(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        placeholder={`Requirement ${index + 1}`}
                                        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => removeRequirement(index)}
                                        className="rounded-lg border border-gray-300 px-4 text-gray-500 transition hover:border-red-300 hover:bg-red-50 hover:text-red-500"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                              {message && <p className="text-red-500">{message}</p>}
                    {/* Submit */}
                    <div className="flex justify-end border-t border-gray-200 pt-6">
                        <button
                            type="submit"
                            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                        >
                            Create Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateJob;


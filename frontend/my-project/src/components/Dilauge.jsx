import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { addUser, updateUser } from "@/utilites/userSlice";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const EditProfileDilauge = () => {
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [message, setMessage] = useState("");
    const [bio, setBio] = useState("");
    const [skills, setSkills] = useState([""]);
    const [resume, setResume] = useState(null);
    const dispatch = useDispatch();

    const addSkills = () => {
        return setSkills([...skills, ""]);
    };

    const deleteSkills = (index) => {
        setSkills(skills.filter((_, i) => i != index));
    };

    const setUpdateSkills = (index, value) => {
        const updateSkills = [...skills];
        updateSkills[index] = value;
        setSkills(updateSkills);
    };

    const handleUpdate = async () => {
        const formdata = new FormData();

        try {
            const res = await axios.post(
                BASE_URL + "/user/updateuser",
                {
                    name,
                    phoneNo,
                },
                {
                    withCredentials: true,
                }
            );

            formdata.append("bio", bio);
            formdata.append("skills", JSON.stringify(skills));

            if (resume) {
                formdata.append("resume", resume);
            }

            const resEdit = await axios.post(
                BASE_URL + "/user/updateuserProfile",
                formdata,
                { withCredentials: true }
            );

            const combinedUser = {
                ...resEdit?.data?.newuser,
                userId: res?.data?.user,
            };

            dispatch(updateUser(combinedUser));

            setMessage(
                `${res?.data?.message} And ${resEdit?.data?.message}`
            );
        } catch (err) {
            if (err?.response.data?.message) {
                setMessage(err?.response?.data?.message);
            } else if (err?.request) {
                setMessage("server error");
            } else {
                setMessage("something is wrong");
            }
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="p-2 rounded-full hover:bg-gray-100 transition">
                    <Pencil className="w-5 h-5 text-gray-600" />
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader className="space-y-2">
                    <DialogTitle className="text-2xl font-semibold">
                        Edit Profile
                    </DialogTitle>

                    <DialogDescription className="text-gray-500">
                        Update your profile information here.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5 mt-2">

                    {/* Name */}
                    <div className="space-y-2">
                        <label
                            htmlFor="name"
                            className="text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            className="w-full h-11 px-3 rounded-lg border border-gray-300 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                            placeholder="Enter your name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <label
                            htmlFor="phoneNo"
                            className="text-sm font-medium text-gray-700"
                        >
                            Phone Number
                        </label>

                        <input
                            id="phoneNo"
                            type="tel"
                            className="w-full h-11 px-3 rounded-lg border border-gray-300 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                            placeholder="Enter your phone number"
                            name="phoneNo"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                        />
                    </div>

                    {/* Bio */}
                    <div className="space-y-2">
                        <label
                            htmlFor="bio"
                            className="text-sm font-medium text-gray-700"
                        >
                            Bio
                        </label>

                        <textarea
                            id="bio"
                            className="w-full min-h-24 px-3 py-2.5 rounded-lg border border-gray-300 outline-none resize-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                            placeholder="Tell us something about yourself"
                            name="bio"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                    </div>

                    {/* Skills */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">
                                Skills
                            </label>

                            <button
                                type="button"
                                onClick={addSkills}
                                className="text-sm font-medium text-purple-600 hover:text-purple-700 hover:underline transition"
                            >
                                + Add Skill
                            </button>
                        </div>

                        <div className="space-y-3">
                            {skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2"
                                >
                                    <input
                                        type="text"
                                        className="flex-1 h-11 px-3 rounded-lg border border-gray-300 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                                        placeholder="Enter skill"
                                        name="skills"
                                        value={skill}
                                        onChange={(e) =>
                                            setUpdateSkills(
                                                index,
                                                e.target.value
                                            )
                                        }
                                    />

                                    <button
                                        type="button"
                                        className="h-11 px-3 rounded-lg bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition"
                                        onClick={() => deleteSkills(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Resume */}
                    <div className="space-y-2">
                        <label
                            htmlFor="resume"
                            className="text-sm font-medium text-gray-700"
                        >
                            Resume
                        </label>

                        <input
                            id="resume"
                            type="file"
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm cursor-pointer file:mr-4 file:rounded-md file:border-0 file:bg-purple-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-purple-700 hover:file:bg-purple-100"
                            name="resume"
                            onChange={(e) =>
                                setResume(e.target.files[0])
                            }
                        />

                        <p className="text-xs text-gray-500">
                            Upload your latest resume.
                        </p>
                    </div>

                    {/* Message */}
                    {message && (
                        <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-3">
                            <p className="text-sm text-red-600">
                                {message}
                            </p>
                        </div>
                    )}

                    {/* Update button */}
                    <div className="pt-2">
                        <button
                            type="button"
                            className="w-full h-11 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 active:bg-purple-800 transition cursor-pointer"
                            onClick={handleUpdate}
                        >
                            Update Profile
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfileDilauge;
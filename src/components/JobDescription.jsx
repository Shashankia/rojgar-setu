import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;

  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);

  const isInitialApplied = singleJob?.application?.some(
    (item) => item.applicant === user._id || false
  );
  const [isApplied, setIsApplied] = useState(isInitialApplied);
  const [isSaved, setIsSaved] = useState(false); // Save for Later state

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/job/get-single/${jobId}`,
          { withCredentials: true }
        );
        console.log(response.data); // Check the structure of the response

        if (response.data.success) {
          dispatch(setSingleJob(response.data.job));
          setIsApplied(
            response.data.job?.application?.some(
              (item) => item.applicant === user._id
            )
          );
        }
      } catch (error) {
        console.error("Error fetching single job", error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const handleJobApply = async () => {
    console.log("Applying for job:", jobId); // Debugging log
    try {
      const response = await axios.post(
        `http://localhost:4000/api/application/apply/${jobId}`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setIsApplied(true);
      } else {
        toast.error("Unable to apply. Please try again.");
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const handleSaveJob = () => {
    setIsSaved(true);
    toast.success("Job saved for later!"); // Show toast
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-100 via-white to-indigo-100 py-10 px-5">
      <motion.div
        className="max-w-6xl mx-auto bg-white p-10 rounded-3xl shadow-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Company Logo + Name */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <img
            src={
              singleJob?.company?.logo ||
              "https://via.placeholder.com/150" // Use placeholder image if logo is missing
            }
            alt="Company Logo"
            className="w-20 h-20 object-contain rounded-full shadow-lg bg-gray-100 p-2"
          />
          <div>
            <motion.h1
              className="text-3xl font-semibold text-indigo-800"
              whileHover={{ scale: 1.05, color: "#FF6347" }}
            >
              {singleJob?.company?.name || "Company Name"} {/* Fallback to default */}
            </motion.h1>
            <motion.p
              className="text-gray-600 mt-1"
              whileHover={{ scale: 1.05, color: "#FF6347" }}
            >
              {singleJob?.company?.location || "Location not provided"} {/* Fallback to default */}
            </motion.p>
          </div>
        </div>

        {/* Job Title + Apply/Save Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col gap-6 md:w-3/4">
            <motion.h2
              className="text-3xl font-bold text-indigo-800"
              whileHover={{ scale: 1.05, color: "#1f2937" }}
            >
              {singleJob?.title} <span role="img" aria-label="job title">💼</span>
            </motion.h2>
            <div className="flex flex-wrap gap-4 mt-4">
              <motion.div whileHover={{ scale: 1.1 }}>
                <Badge className="bg-blue-600 text-white rounded-full py-2 px-4 shadow-md">
                  {singleJob?.position} <span role="img" aria-label="position">🧑‍💼</span>
                </Badge>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Badge className="bg-green-600 text-white rounded-full py-2 px-4 shadow-md">
                  {singleJob?.jobType} <span role="img" aria-label="job type">💼</span>
                </Badge>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Badge className="bg-purple-600 text-white rounded-full py-2 px-4 shadow-md">
                  {singleJob?.salary} LPA <span role="img" aria-label="salary">💸</span>
                </Badge>
              </motion.div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mt-6 md:mt-0">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                disabled={isApplied}
                onClick={handleJobApply}
                className={`px-8 py-3 text-lg rounded-full ${
                  isApplied
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                } text-white`}
              >
                {isApplied ? "Already Applied" : "Apply Now"} <span role="img" aria-label="apply">📝</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                onClick={handleSaveJob}
                disabled={isSaved}
                className={`px-8 py-3 text-lg rounded-full ${
                  isSaved
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                {isSaved ? "Saved" : "Save for Later"} <span role="img" aria-label="save">💾</span>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Job Details with Hover Effects */}
        <motion.div
          className="mt-10 space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold text-indigo-800 mb-2">Job Details</h2>
          <hr className="mb-6 border-t-2 border-gray-300" />

          <div className="space-y-6">
            <motion.div
              className="flex flex-col md:flex-row gap-4 items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-semibold w-40 text-indigo-600">Role:</h3>
              <p className="text-gray-600">{singleJob?.title} <span role="img" aria-label="role">👨‍💻</span></p>
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row gap-4 items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-semibold w-40 text-indigo-600">Location:</h3>
              <p className="text-gray-600">{singleJob?.location} <span role="img" aria-label="location">📍</span></p>
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row gap-4 items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-semibold w-40 text-indigo-600">Description:</h3>
              <p className="text-gray-600">{singleJob?.description} <span role="img" aria-label="description">📝</span></p>
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row gap-4 items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-semibold w-40 text-indigo-600">Experience:</h3>
              <p className="text-gray-600">{singleJob?.experienceLevel} years <span role="img" aria-label="experience">💼</span></p>
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row gap-4 items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-semibold w-40 text-indigo-600">Salary:</h3>
              <p className="text-gray-600">{singleJob?.salary} LPA <span role="img" aria-label="salary">💸</span></p>
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row gap-4 items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-semibold w-40 text-indigo-600">Total Applicants:</h3>
              <p className="text-gray-600">{singleJob?.application?.length} <span role="img" aria-label="applicants">👥</span></p>
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row gap-4 items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-semibold w-40 text-indigo-600">Posted Date:</h3>
              <p className="text-gray-600">{singleJob?.createdAt?.split("T")[0]} <span role="img" aria-label="posted date">📅</span></p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default JobDescription;

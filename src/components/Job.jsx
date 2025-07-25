import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const dayAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const handleSave = () => {
    let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const alreadySaved = savedJobs.find((j) => j._id === job._id);

    if (!alreadySaved) {
      savedJobs.push(job);
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      alert(`✅ Job saved: ${job?.title}`);
    } else {
      alert("⚠️ Job already saved!");
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="p-6 rounded-2xl border border-gray-200 bg-gradient-to-br from-[#fafafa] to-[#f4f5f7] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full"
    >
      {/* Posted Date */}
      <p className="text-xs text-gray-600">
        {dayAgo(job?.createdAt) === 0 ? "Today" : `${dayAgo(job?.createdAt)} days ago`}
      </p>

      {/* Company Info */}
      <div className="flex items-center gap-3 mt-4">
        <div className="w-12 h-12 border-4 border-gray-300 rounded-full overflow-hidden">
          <img
            src={job?.company?.logo}
            alt="Company Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 text-lg">{job?.company?.name}</h2>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600 font-medium">{job?.location}</span>
          </div>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mt-5 flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-gray-800">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-3">{job?.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mt-5">
        <Badge className="bg-gradient-to-r from-blue-200 to-blue-400 text-gray-700 rounded-full px-4 py-1 text-xs">
          {job?.position} position
        </Badge>
        <Badge className="bg-gradient-to-r from-teal-200 to-teal-400 text-gray-700 rounded-full px-4 py-1 text-xs">
          {job?.jobType}
        </Badge>
        <Badge className="bg-gradient-to-r from-pink-200 to-pink-400 text-gray-700 rounded-full px-4 py-1 text-xs">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={() => navigate(`/job/description/${job._id}`)}
          className="bg-gray-800 hover:bg-gray-700 text-white rounded-full px-6 py-2 text-sm transition duration-300"
        >
          View Details
        </Button>
        <Button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 py-2 text-sm transition duration-300"
        >
          Save
        </Button>
      </div>
    </motion.div>
  );
};

export default Job;

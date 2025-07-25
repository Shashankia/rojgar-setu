import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  const companyName = job?.company?.name || "Company Name Not Available";
  const logoUrl = job?.company?.logo;

  return (
    <Link to={`/job/description/${job._id}`} className="block no-underline">
      <motion.div
        className="border-2 border-gray-200 rounded-3xl shadow-lg p-6 bg-gradient-to-br from-purple-50 via-pink-100 to-orange-50 transition-transform duration-300 ease-out hover:scale-105 hover:shadow-2xl cursor-pointer"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
      >
        {/* Company Logo */}
        <motion.div
          className="relative w-full aspect-[4/3] bg-white rounded-xl border border-gray-200 flex items-center justify-center overflow-hidden"
          custom={0}
          variants={itemVariants}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={companyName}
              className="h-full w-full object-contain p-4 transition-all duration-300 ease-in-out"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/300x200?text=No+Image";
              }}
            />
          ) : (
            <div className="text-center text-gray-600 flex items-center justify-center h-full text-lg font-medium">
              {companyName}
            </div>
          )}
        </motion.div>

        {/* Company Name & Location */}
        <motion.div custom={1} variants={itemVariants} className="mt-6">
          <h1 className="text-3xl font-semibold text-gray-800">{companyName}</h1>
          <Badge className="bg-blue-600 text-white rounded-xl cursor-pointer hover:bg-blue-700 mt-2 transition-all duration-300 ease-in-out">
            {job?.location || "Location Not Provided"}
          </Badge>
        </motion.div>

        {/* Job Title & Description */}
        <motion.div
          custom={2}
          variants={itemVariants}
          className="flex flex-col gap-2 mt-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800">
            {job?.title || "No Title"}
          </h2>
          <p className="text-sm text-gray-600">
            {job?.description || "No Description"}
          </p>
        </motion.div>

        {/* Badges: Position, Job Type, Salary */}
        <motion.div
          custom={3}
          variants={itemVariants}
          className="flex flex-wrap gap-4 items-center justify-between mt-8"
        >
          <Badge className="bg-orange-600 hover:bg-orange-700 cursor-pointer text-white rounded-xl transition-all duration-300 ease-in-out">
            {job?.position || "N/A"} position
          </Badge>
          <Badge className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-white rounded-xl transition-all duration-300 ease-in-out">
            {job?.jobType || "N/A"}
          </Badge>
          <Badge className="bg-pink-600 hover:bg-pink-700 cursor-pointer text-white rounded-xl transition-all duration-300 ease-in-out">
            {job?.salary || "N/A"} LPA
          </Badge>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default JobCard;

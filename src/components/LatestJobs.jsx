import { useSelector } from "react-redux";
import JobCard from "./JobCard";
import { motion } from "framer-motion";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full mx-auto gap-5 flex items-center justify-center flex-col py-16 bg-white">
      {/* Animated heading */}
      <motion.h1
        className="ml-6 text-4xl font-extrabold text-gray-800"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Latest jobs & <span className="text-blue-600">Openings</span>
      </motion.h1>

      {/* Animated grid with horizontal scroll */}
      <motion.div
        className="latest-jobs-container w-full overflow-hidden mt-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="latest-jobs-list flex gap-8"
          animate={{ x: ["100%", "-100%"] }} // Scroll from right to left
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          {allJobs.slice(0, 6).map((job, index) => (
            <motion.div key={job.id || index} variants={cardVariants}>
              <JobCard job={job} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LatestJobs;

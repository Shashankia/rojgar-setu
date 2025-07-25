import { useState } from "react";
import { useSelector } from "react-redux";
import FilterJob from "./FilterJob";
import Job from "./Job";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  const [filters, setFilters] = useState({});

  if (!allJobs || !Array.isArray(allJobs)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        ⏳ Loading jobs...
      </div>
    );
  }

  const applyFilters = () => {
    return allJobs.filter((job) => {
      // Location filter
      const matchesLocation =
        !filters.Location || job.location === filters.Location;

      // Industry filter
      const matchesIndustry =
        !filters.Industry || job.industry === filters.Industry;

      // Salary filter
      const matchesSalary =
        !filters.Salary ||
        (job.salary >= filters.Salary.min && job.salary <= filters.Salary.max);

      return matchesLocation && matchesIndustry && matchesSalary;
    });
  };

  const filteredJobs = applyFilters();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 to-white px-4 mx-auto max-w-7xl py-14">
      <h2 className="text-4xl font-extrabold text-center text-orange-600 mb-10 tracking-wide">
        🚀 Explore <span className="text-gray-800">Job Opportunities</span>
      </h2>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Filter Section */}
        <div className="w-full md:w-1/4">
          <div className="bg-white shadow-lg rounded-2xl p-6 sticky top-24 border border-orange-100">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
              🛠️ <span>Filter Jobs</span>
            </h3>
            <FilterJob onFilterChange={setFilters} />
          </div>
        </div>

        {/* Job Cards Section */}
        <div className="flex-1">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <motion.div
                  key={job._id || job.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 p-6"
                >
                  <Job job={job} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center">
                <p className="text-lg text-gray-500 italic">
                  😔 No jobs found matching your filters.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;

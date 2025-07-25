import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to capture search query
  const navigate = useNavigate(); // To navigate after search

  // Function to fetch jobs from LocalStorage
  const fetchJobsFromLocalStorage = () => {
    const jobs = localStorage.getItem("jobs");
    return jobs ? JSON.parse(jobs) : []; // Return empty array if no jobs are stored
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Fetch jobs from localStorage
      const allJobs = fetchJobsFromLocalStorage();

      // Debugging: Log the jobs fetched from localStorage
      console.log("All Jobs from LocalStorage:", allJobs);

      // Search for job matching either title or company
      const matchedJob = allJobs.find(
        (job) =>
          job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Debugging: Log the matched job
      console.log("Matched Job:", matchedJob);

      if (matchedJob) {
        // If a matching job is found, redirect to the job details page
        navigate(`/job/${matchedJob.id}`);
      } else {
        alert("No matching job found!");
      }
    } else {
      alert("Please enter a search term.");
    }
  };

  return (
    <section className="bg-gradient-to-r from-orange-50 to-yellow-100 py-20 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-6 max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600">
          Welcome to RojgarSetu 🚀
        </h2>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Search, Apply &{" "}
          <span className="text-orange-500">Get Hired Instantly</span>
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Find your dream job among top companies. Build your career today with
          the best opportunities curated for you.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex max-w-xl mx-auto overflow-hidden rounded-full border-2 border-orange-400 shadow-lg bg-white"
        >
          <input
            type="text"
            placeholder="Search for jobs..."
            className="flex-1 py-3 px-4 text-sm outline-none rounded-l-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Capture input value
          />
          <Button
            className="rounded-none py-[14px] px-6 bg-orange-600 hover:bg-orange-700 text-white"
            onClick={handleSearch} // Attach event handler to the button
          >
            Search
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

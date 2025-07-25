import React from "react";
import Job from "./Job"; // Import the Job component

const Explore = () => {
  // Array of fallback company logos
  const fallbackLogos = [
    "/path/to/randomLogo1.png", // Replace with your random logo paths
    "/path/to/randomLogo2.png",
    "/path/to/randomLogo3.png",
    "/path/to/randomLogo4.png",
    "/path/to/randomLogo5.png"
  ];

  // Mock job data (can be replaced with data fetched from an API)
  const jobData = [
    {
      _id: 1,
      title: "Plumber",
      description: "Experienced plumber needed for residential and commercial work.",
      company: { name: "Plumbing Experts", logo: "/path/to/logo1.jpg" }, // This has a logo
      location: "Mumbai",
      position: "Full-Time",
      jobType: "Trades",
      salary: "30k/month",
      industry: "Non-Technical",
      createdAt: "2025-04-20T08:00:00Z",
    },
    {
      _id: 2,
      title: "Electrician",
      description: "Looking for skilled electricians for local projects.",
      company: { name: "PowerFix", logo: "" }, // This doesn't have a logo, will use a random logo
      location: "Delhi",
      position: "Full-Time",
      jobType: "Trades",
      salary: "40k/month",
      industry: "Non-Technical",
      createdAt: "2025-04-18T08:00:00Z",
    },
    {
      _id: 3,
      title: "Software Developer",
      description: "Developing software solutions for businesses.",
      company: { name: "TechCorp", logo: "/path/to/logo2.jpg" }, // This has a logo
      location: "Bangalore",
      position: "Full-Time",
      jobType: "Technical",
      salary: "80k/month",
      industry: "Technical",
      createdAt: "2025-04-15T08:00:00Z",
    },
    // More jobs...
  ];

  // Filter only non-technical jobs
  const filteredJobs = jobData.filter((job) => job.industry === "Non-Technical");

  return (
    <div className="py-8">
      <h1 className="text-2xl font-bold my-4">
        Search Results ({filteredJobs.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Map over the filtered jobs and pass them to the Job component */}
        {filteredJobs.map((job) => {
          // Check if logo exists, if not, assign a random logo from the fallback list
          const logo = job?.company?.logo
            ? job.company.logo
            : fallbackLogos[Math.floor(Math.random() * fallbackLogos.length)];

          return (
            <Job
              key={job._id}
              job={{
                ...job,
                company: {
                  ...job.company,
                  logo: logo, // Use the random logo if necessary
                },
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Explore;

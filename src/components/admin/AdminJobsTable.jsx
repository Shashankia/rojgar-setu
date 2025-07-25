import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, Trash2, Edit, Users } from "lucide-react";
import { motion } from "framer-motion";

const AdminJobsTable = () => {
  const { adminJobs } = useSelector((store) => store.job);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalType, setModalType] = useState("");
  const [showModal, setShowModal] = useState(false);

  const jobsArray = Array.isArray(adminJobs) ? adminJobs : adminJobs ? [adminJobs] : [];
  const filteredJobs = jobsArray.filter(
    (job) =>
      job?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job?.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (job) => {
    setSelectedJob(job);
    setModalType("edit");
    setShowModal(true);
  };

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      console.log(`Deleting job ${jobId}`);
      // Add delete logic here
    }
  };

  const handleViewApplicants = (job) => {
    setSelectedJob(job);
    setModalType("view");
    setShowModal(true);
  };

  const handleSalaryChange = (e) => {
    const value = e.target.value;
    const salaryValues = value.split("-").map((val) => val.trim());
    if (salaryValues.length === 2) {
      setSelectedJob({
        ...selectedJob,
        salaryRange: {
          min: salaryValues[0],
          max: salaryValues[1],
        },
      });
    } else {
      setSelectedJob({
        ...selectedJob,
        salaryRange: {
          min: value,
          max: value,
        },
      });
    }
  };

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);

      const payload = {
        ...selectedJob,
        salaryRange: {
          min: Number(selectedJob.salaryRange?.min),
          max: Number(selectedJob.salaryRange?.max),
        },
        requirements: Array.isArray(selectedJob.requirements)
          ? selectedJob.requirements
          : selectedJob.requirements?.split(",").map((r) => r.trim()),
        experienceLevel: Number(selectedJob.experienceLevel),
        position: Number(selectedJob.position),
      };

      const response = await fetch(`/api/jobs/${selectedJob._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save job changes");
      }

      const updatedJob = await response.json();
      console.log("Updated Job:", updatedJob);
      alert("Job updated successfully!");
      setShowModal(false);
    } catch (error) {
      console.error("Error saving job:", error.message);
      alert("Failed to save changes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full px-4 mt-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center max-w-md relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 6.65a7.5 7.5 0 010 10.6z" />
            </svg>
          </span>

          <Input
            type="text"
            placeholder="Search jobs by title or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10 py-3 w-full rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />

          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 text-gray-400 hover:text-gray-600 transition"
              title="Clear"
            >
              ❌
            </button>
          )}
        </div>

        <div className="bg-white shadow-md rounded-2xl border border-gray-200 overflow-x-auto">
          <Table>
            <TableCaption className="text-gray-600 text-sm">
              {filteredJobs.length > 0 ? "Admin Jobs List" : "No jobs found"}
            </TableCaption>

            <TableHeader className="sticky top-0 bg-white z-10 shadow-sm">
              <TableRow className="bg-gray-100">
                {["Title", "Description", "Salary", "Requirements", "Location", "Experience", "Job Type", "Position", "Actions"].map((head, index) => (
                  <TableHead key={index} className="text-sm font-semibold text-gray-700 py-3 px-4">
                    {head}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-6">
                    <Loader2 className="animate-spin h-6 w-6 mx-auto text-blue-500" />
                    Saving changes...
                  </TableCell>
                </TableRow>
              ) : filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <TableRow key={job?._id} className="even:bg-gray-50 odd:bg-white hover:bg-blue-50 transition-all duration-200">
                    <TableCell className="font-semibold text-blue-700">{job?.title || "—"}</TableCell>
                    <TableCell><span className="text-gray-600 italic">“{job?.description || "No description"}”</span></TableCell>
                    <TableCell><span className="text-green-600 font-semibold">₹{job?.salary?.toLocaleString() || "N/A"}/mo</span></TableCell>
                    <TableCell><span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{job?.requirements || "N/A"}</span></TableCell>
                    <TableCell><span className="text-sm text-gray-700">📍 {job?.location || "Unknown"}</span></TableCell>
                    <TableCell><span className="text-sm text-gray-700">{job?.experienceLevel ? `${job.experienceLevel}+ yrs` : "—"}</span></TableCell>
                    <TableCell><span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{job?.jobType || "—"}</span></TableCell>
                    <TableCell><span className="text-sm font-medium text-purple-700">{job?.position ? `${job.position} Opening${job.position > 1 ? "s" : ""}` : "—"}</span></TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-center">
                        <Button variant="ghost" size="sm" title="Edit" onClick={() => handleEdit(job)} className="text-blue-600 hover:text-blue-800 hover:scale-110 transition-transform">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Delete" onClick={() => handleDelete(job?._id)} className="text-red-600 hover:text-red-800 hover:scale-110 transition-transform">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Applicants" onClick={() => handleViewApplicants(job)} className="text-green-600 hover:text-green-800 hover:scale-110 transition-transform">
                          <Users className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="py-10 text-center text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl">📭</span>
                      <p>No jobs available. Create a new job!</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Modal */}
        {showModal && selectedJob && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative shadow-lg">
              <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl" onClick={() => setShowModal(false)}>×</button>
              {modalType === "edit" ? (
                <>
                  <h2 className="text-xl font-semibold mb-4">Edit Job</h2>
                  <div className="grid gap-4">
                    <input className="border p-2 rounded" value={selectedJob?.title || ""} onChange={(e) => setSelectedJob({ ...selectedJob, title: e.target.value })} placeholder="Job Title" />
                    <textarea className="border p-2 rounded" value={selectedJob?.description || ""} onChange={(e) => setSelectedJob({ ...selectedJob, description: e.target.value })} placeholder="Job Description" />
                    <input className="border p-2 rounded" type="text" value={`${selectedJob?.salaryRange?.min || ""} - ${selectedJob?.salaryRange?.max || ""}`} onChange={handleSalaryChange} placeholder="Salary Range (e.g. 55000 - 60000)" />
                    <input className="border p-2 rounded" value={selectedJob?.requirements || ""} onChange={(e) => setSelectedJob({ ...selectedJob, requirements: e.target.value })} placeholder="Requirements (comma-separated)" />
                    <input className="border p-2 rounded" value={selectedJob?.location || ""} onChange={(e) => setSelectedJob({ ...selectedJob, location: e.target.value })} placeholder="Location" />
                    <input className="border p-2 rounded" type="number" value={selectedJob?.experienceLevel || ""} onChange={(e) => setSelectedJob({ ...selectedJob, experienceLevel: e.target.value })} placeholder="Experience Level (in years)" />
                    <input className="border p-2 rounded" value={selectedJob?.jobType || ""} onChange={(e) => setSelectedJob({ ...selectedJob, jobType: e.target.value })} placeholder="Job Type" />
                    <input className="border p-2 rounded" type="number" value={selectedJob?.position || ""} onChange={(e) => setSelectedJob({ ...selectedJob, position: e.target.value })} placeholder="Position(s)" />
                    <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSaveChanges}>Save Changes</button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-4">View Applicants</h2>
                  <p><strong>Title:</strong> {selectedJob?.title}</p>
                  <p><strong>Description:</strong> {selectedJob?.description}</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AdminJobsTable;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const jobs = [
  { date: "23/02/2025", role: "Backend Developer", company: "Google", status: "Accepted" },
  { date: "23/02/2025", role: "Frontend Developer", company: "Facebook", status: "Pending" },
  { date: "24/02/2025", role: "UX Designer", company: "Apple", status: "Rejected" },
  { date: "25/02/2025", role: "Data Scientist", company: "Microsoft", status: "Accepted" },
];

const StatusBadge = ({ status }) => {
  const base = "px-3 py-1 rounded-full text-sm font-semibold";
  const styles = {
    Accepted: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Rejected: "bg-red-100 text-red-800",
  };
  return <span className={`${base} ${styles[status] || ""}`}>{status}</span>;
};

export default function AppliedJobs() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-left">Applied Jobs</h1>

        <div className="overflow-hidden border border-gray-200 rounded-xl">
          <table className="w-full text-left">
            <thead className="bg-gray-900 text-white text-sm">
              <tr>
                <th className="py-4 px-4">Date</th>
                <th className="py-4 px-4">Role</th>
                <th className="py-4 px-4">Company</th>
                <th className="py-4 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm">
              {jobs.map((job, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.01, backgroundColor: "#f9fafb" }}
                  onClick={() => setSelected(job)}
                  className="cursor-pointer transition"
                >
                  <td className="py-4 px-4">{job.date}</td>
                  <td className="py-4 px-4">{job.role}</td>
                  <td className="py-4 px-4">{job.company}</td>
                  <td className="py-4 px-4">
                    <StatusBadge status={job.status} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <AnimatePresence>
          {selected && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="mt-8 p-6 border rounded-xl bg-gray-50"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Job Details</h2>
              <p><strong>Role:</strong> {selected.role}</p>
              <p><strong>Company:</strong> {selected.company}</p>
              <p><strong>Status:</strong> <StatusBadge status={selected.status} /></p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

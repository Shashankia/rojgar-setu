import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import AdminJobsTable from "./AdminJobsTable";
import { motion } from "framer-motion";

const AdminJobs = () => {
  const navigate = useNavigate();
  useGetAllAdminJobs();

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-200 py-16">
      <div className="container mx-auto p-6">
        {/* Title and Floating Button */}
        <div className="flex items-center justify-between mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-extrabold text-gray-900"
          >
            Manage All Jobs
          </motion.h1>

          {/* Floating Action Button with Hover Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Button
              onClick={() => navigate("/admin/create/job")}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-700 transition-all duration-300 rounded-full p-4 shadow-xl focus:outline-none"
            >
              <span className="text-3xl">+</span>
            </Button>
          </motion.div>
        </div>

        {/* Job Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <AdminJobsTable />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminJobs;

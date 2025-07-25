import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { motion } from "framer-motion";

const Companies = () => {
  const navigate = useNavigate();
  useGetAllCompanies();

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-[#7c98b3] via-[#c3e1f3] to-[#f0f7fb] bg-[url('/images/grid-pattern.svg')] bg-fixed bg-cover py-16 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 18 }}
        >
          <motion.h1
            className="text-4xl font-bold text-gray-800 tracking-tight"
            whileHover={{ scale: 1.02 }}
          >
            🚀 Companies Directory
          </motion.h1>
          <Button
            onClick={() => navigate("/admin/create/company")}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200"
          >
            ➕ Create New
          </Button>
        </motion.div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <CompaniesTable />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Companies;

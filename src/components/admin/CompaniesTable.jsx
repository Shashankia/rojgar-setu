import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

const MotionTR = motion(TableRow);

const CompaniesTable = () => {
  const { companies } = useSelector((store) => store.company);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleSort = (field) => setSortBy(field);
  const handlePageChange = (page) => setCurrentPage(page);

  const sortedCompanies = [...companies].sort((a, b) => {
    if (!sortBy) return 0;
    return a[sortBy].localeCompare(b[sortBy]);
  });

  const filteredCompanies = sortedCompanies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const paginatedCompanies = filteredCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white/60 backdrop-blur-md shadow-xl border border-gray-200 rounded-xl p-6">
      {/* Search + Sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="🔍 Search companies..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 outline-none shadow-md"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-lg">🔍</span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={() => handleSort("name")} className="bg-cyan-600 text-white hover:bg-cyan-700 px-4">
            Sort by Name
          </Button>
          <Button onClick={() => handleSort("location")} className="bg-blue-500 text-white hover:bg-blue-600 px-4">
            Sort by Location
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="min-w-[1100px] text-sm">
          <TableHeader>
            <TableRow className="bg-cyan-50 border-b border-cyan-100">
              <TableCell className="font-semibold py-3 px-4 text-cyan-700">Logo</TableCell>
              <TableCell className="font-semibold py-3 px-4 text-cyan-700">Name</TableCell>
              <TableCell className="font-semibold py-3 px-4 text-cyan-700">Location</TableCell>
              <TableCell className="font-semibold py-3 px-4 text-cyan-700">Description</TableCell>
              <TableCell className="font-semibold py-3 px-4 text-cyan-700">Website</TableCell>
              <TableCell className="font-semibold py-3 px-4 text-center text-cyan-700">Action</TableCell>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedCompanies.length > 0 ? (
              paginatedCompanies.map((company, index) => (
                <MotionTR
                  key={company._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  className="border-b border-gray-100 hover:bg-slate-50 transition-all"
                >
                  <TableCell className="py-3 px-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={company.logo} alt={company.name} />
                    </Avatar>
                  </TableCell>
                  <TableCell className="py-3 px-4 font-medium text-gray-800 max-w-[180px] truncate">
                    {company.name}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-gray-700 max-w-[150px] truncate">
                    {company.location}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-gray-700 max-w-[300px] truncate">
                    {company.description}
                  </TableCell>
                  <TableCell className="py-3 px-4 text-blue-600 max-w-[200px] truncate">
                    <a href={company.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {company.website}
                    </a>
                  </TableCell>
                  <TableCell className="py-3 px-4 text-center">
                    <Button
                      onClick={() => navigate(`/admin/update/company/${company._id}`)}
                      className="text-sm bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg"
                    >
                      ✏️ Edit
                    </Button>
                  </TableCell>
                </MotionTR>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-10">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center text-gray-500"
                  >
                    <span className="text-xl font-medium mb-2">No companies found</span>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="text-4xl"
                    >
                      🏢
                    </motion.div>
                  </motion.div>
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2 flex-wrap">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={`w-10 h-10 rounded-full text-sm font-medium ${
                currentPage === index + 1
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompaniesTable;

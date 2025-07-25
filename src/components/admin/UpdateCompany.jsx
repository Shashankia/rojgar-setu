import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

// Importing icon library (You can use any library like FontAwesome, HeroIcons, etc.)
import { FaBuilding, FaLink, FaMapMarkerAlt, FaRegEdit, FaUpload } from "react-icons/fa";

const UpdateCompany = () => {
  const [inputs, setInputs] = useState({
    name: "",
    date: "",
    location: "",
    website: "",
    description: "",
    file: null,
  });
  const params = useParams();
  const companyId = params.id;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInputs({ ...inputs, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("description", inputs.description);
    formData.append("website", inputs.website);
    formData.append("location", inputs.location);
    if (inputs.file) formData.append("file", inputs.file);

    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:4000/api/company/update/${companyId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/admin/companies");
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-xl bg-white rounded-xl shadow-2xl p-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-bold text-center text-gray-800 mb-8"
        >
          🏢 Update Company Details
        </motion.h1>

        <form onSubmit={submitHandler} className="space-y-6">
          {[{ name: "name", label: "Company Name", icon: <FaBuilding size={20} /> },
            { name: "website", label: "Website URL", icon: <FaLink size={20} /> },
            { name: "location", label: "Location", icon: <FaMapMarkerAlt size={20} /> },
            { name: "description", label: "Description", icon: <FaRegEdit size={20} /> }
          ].map((field, index) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 * index, duration: 0.5 }}
              className="space-y-1"
            >
              <Label htmlFor={field.name} className="text-lg font-medium text-gray-700 flex items-center space-x-2">
                {field.icon}
                <span>{field.label}</span>
              </Label>
              <Input
                type="text"
                name={field.name}
                value={inputs[field.name]}
                onChange={onChangeHandler}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:border-purple-500 hover:scale-105"
              />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="space-y-1"
          >
            <Label htmlFor="file" className="text-lg font-medium text-gray-700 flex items-center space-x-2">
              <FaUpload size={20} />
              <span>Company Logo</span>
            </Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:border-purple-500 hover:scale-105"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-red-600 text-white text-lg font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            >
              {loading ? "Updating..." : "Update Company"}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateCompany;

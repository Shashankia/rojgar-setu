import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

const CreateCompany = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Checking if the company name is provided
    if (!name) {
      toast.error("Please provide a company name");
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/company/register",  // Make sure this URL is correct
        { name },  // Sending only the company name to the backend
        {
          headers: {
            "Content-Type": "application/json",  // Ensure JSON is sent
          },
          withCredentials: true,  // Make sure the user is authenticated
        }
      );

      // Handling successful response
      if (response.data.success) {
        dispatch(setSingleCompany(response.data.company));  // Dispatching the company to redux
        toast.success(response.data.message);
        navigate(`/admin/update/company/${response.data.company._id}`);  // Redirect to update page
      } else {
        toast.error(response.data.message);  // Error from backend
      }
    } catch (error) {
      console.error("Error in creating company:", error);
      toast.error("Something went wrong!");  // Error on catch block
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 flex flex-col items-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-lg p-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-3xl font-bold text-center text-gray-800 mb-6"
        >
          <FaPlus size={24} className="inline mr-2" />
          Create a New Company
        </motion.h1>

        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex flex-col gap-2"
          >
            <Label htmlFor="name" className="text-gray-700 font-medium">
              Company Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter company name"
              className="border-gray-300 focus:ring-2 focus:ring-teal-400 focus:border-teal-400 rounded-lg transition-all duration-300 transform hover:scale-105 hover:border-teal-500"
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <Button
              disabled={loading}
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:from-blue-600 hover:to-teal-500"
            >
              {loading ? (
                <span className="animate-spin">⏳</span>
              ) : (
                "Create Company"
              )}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateCompany;

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setAdminJobs } from "@/redux/jobSlice";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreateJobs = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    salary: "",
    requirements: "",
    location: "",
    experienceLevel: "",
    jobType: "",
    position: "",
    company: "", // ✅ fixed: backend expects 'company', not 'companyId'
  });

  const [companyError, setCompanyError] = useState("");

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const { companies } = useSelector((store) => store.company);

  const HandleChange = (value) => {
    const selectedCompany = companies.find(
      (company) => company?.name.toLowerCase() === value.toLowerCase()
    );

    if (selectedCompany) {
      setInputs({ ...inputs, company: selectedCompany?._id }); // ✅ fixed field name
      setCompanyError("");
    } else {
      setCompanyError(`No company found with name: "${value}"`);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:4000/api/job/post",
        { ...inputs },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        dispatch(setAdminJobs(response.data.job));
        toast.success(response.data.message);
        navigate(`/admin/jobs`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error creating job:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-yellow-100 flex flex-col justify-center items-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-10 hover:shadow-2xl transition-all duration-300"
      >
        <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">
          Create a New Job
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          {[
            { label: "Title", name: "title", type: "text", placeholder: "Enter Job Title" },
            { label: "Description", name: "description", type: "text", placeholder: "Enter Job Description" },
            { label: "Salary", name: "salary", type: "text", placeholder: "e.g. 35k, 50,000/month, Negotiable" },
            { label: "Location", name: "location", type: "text", placeholder: "Enter Location" },
            { label: "Requirements", name: "requirements", type: "text", placeholder: "Enter Requirements" },
            { label: "Experience Level", name: "experienceLevel", type: "text", placeholder: "Enter Experience Level" },
            { label: "Job Type", name: "jobType", type: "text", placeholder: "Enter Job Type" },
            { label: "Position", name: "position", type: "number", placeholder: "Enter Positions" },
          ].map((field, index) => (
            <motion.div
              key={index}
              className="flex flex-col gap-2 group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Label htmlFor={field.name} className="text-gray-600 group-hover:text-blue-600 transition-colors duration-200">
                {field.label}
              </Label>
              <Input
                id={field.name}
                type={field.type}
                name={field.name}
                value={inputs[field.name]}
                onChange={onChangeHandler}
                placeholder={field.placeholder}
                className="border-gray-300 hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-all duration-200"
                required
              />
            </motion.div>
          ))}

          {/* Select Company Section */}
          <motion.div className="flex flex-col gap-2 group" whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Label htmlFor="company" className="text-gray-600 group-hover:text-blue-600 transition-colors duration-200">
              Select Company
            </Label>
            <Select onValueChange={HandleChange}>
              <SelectTrigger className="border-gray-300 hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-all duration-200">
                <SelectValue placeholder="Select Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {companies.map((company) => (
                    <SelectItem key={company._id} value={company.name.toLowerCase()}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </motion.div>

          {/* Error messages */}
          {companyError && (
            <p className="text-center text-red-600 text-sm">{companyError}</p>
          )}

          {companies.length === 0 && (
            <p className="text-center text-red-600 text-sm">
              No companies found. Please add a company first.
            </p>
          )}

          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
            <Button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 w-full text-lg font-medium transition-all duration-300"
            >
              {loading ? "Creating..." : "Create Job"}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateJobs;

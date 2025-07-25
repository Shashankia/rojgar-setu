import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { motion } from "framer-motion"; // Import framer-motion

const Signup = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    role: "",
    phoneNumber: "",
    file: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setInputs({ ...inputs, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("email", inputs.email);
    formData.append("password", inputs.password);
    formData.append("role", inputs.role);
    formData.append("phoneNumber", inputs.phoneNumber);
    if (inputs.file) {
      formData.append("file", inputs.file);
    }

    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        "http://localhost:4000/api/user/signup",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (response.data.success === true) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error in signup", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 relative overflow-hidden">
      
      {/* Animated Background Circles */}
      <motion.div
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute w-80 h-80 bg-white opacity-20 rounded-full top-10 left-10 blur-3xl"
      ></motion.div>

      <motion.div
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute w-80 h-80 bg-yellow-400 opacity-20 rounded-full bottom-10 right-10 blur-3xl"
      ></motion.div>

      {/* Form Animation */}
      <motion.form
        onSubmit={submitHandler}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-[400px] flex flex-col gap-6"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center text-indigo-600"
        >
          🚀 Create Account
        </motion.h2>

        {/* Input Fields */}
        {[
          { label: "Name", name: "name", type: "text", placeholder: "👤 Enter your name" },
          { label: "Email", name: "email", type: "email", placeholder: "📧 Enter your email" },
          { label: "Phone Number", name: "phoneNumber", type: "number", placeholder: "📞 Enter your phone" },
          { label: "Password", name: "password", type: "password", placeholder: "🔒 Create a password" },
        ].map((field, index) => (
          <motion.div
            key={field.name}
            whileFocus={{ scale: 1.05 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex flex-col gap-2"
          >
            <Label>{field.label}</Label>
            <Input
              type={field.type}
              name={field.name}
              value={inputs[field.name]}
              onChange={onChangeHandler}
              placeholder={field.placeholder}
              className="rounded-xl border p-3 focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
            />
          </motion.div>
        ))}

        {/* Role Selection */}
        <motion.div
          className="flex gap-4 items-center"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2">
            <Input
              type="radio"
              name="role"
              value="student"
              onChange={onChangeHandler}
              className="cursor-pointer"
            />
            <Label>🎓 Student</Label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="radio"
              value="recruiter"
              name="role"
              onChange={onChangeHandler}
              className="cursor-pointer"
            />
            <Label>🧑‍💼 Recruiter</Label>
          </div>
        </motion.div>

        {/* Profile Upload */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex flex-col gap-2"
        >
          <Label>📸 Upload Profile</Label>
          <Input
            accept="image/*"
            onChange={fileHandler}
            type="file"
            name="file"
            className="rounded-xl border p-2 cursor-pointer"
          />
        </motion.div>

        {/* Signup Button with Pulse */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          type="submit"
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
        >
          {loading ? "Loading..." : "Signup 🚀"}
        </motion.button>

        {/* Login Link */}
        <div className="text-center">
          <span>Already have an account?</span>{" "}
          <Link to={"/login"} className="text-indigo-600 font-semibold underline ml-1">
            Login
          </Link>
        </div>
      </motion.form>
    </div>
  );
};

export default Signup;

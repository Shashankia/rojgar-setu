import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { motion } from "framer-motion"; // animation import

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    role: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        "http://localhost:4000/api/user/signin",
        inputs,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success === true) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("error in login", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 relative overflow-hidden">

      {/* Background Animations */}
      <motion.div
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="absolute w-72 h-72 bg-white opacity-20 rounded-full top-10 left-10 blur-3xl"
      ></motion.div>

      <motion.div
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute w-72 h-72 bg-yellow-400 opacity-20 rounded-full bottom-10 right-10 blur-3xl"
      ></motion.div>

      {/* Login Form */}
      <motion.form
        onSubmit={submitHandler}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-white bg-opacity-90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-[400px] flex flex-col gap-6"
      >
        <motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold text-center text-blue-600"
        >
          🔒 Login Account
        </motion.h2>

        {/* Email */}
        <motion.div
          whileFocus={{ scale: 1.05 }}
          whileHover={{ scale: 1.03 }}
          className="flex flex-col gap-2"
        >
          <Label>Email</Label>
          <Input
            type="email"
            value={inputs.email}
            name="email"
            onChange={onChangeHandler}
            placeholder="📧 Enter your Email"
            className="rounded-xl border p-3 focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          />
        </motion.div>

        {/* Password */}
        <motion.div
          whileFocus={{ scale: 1.05 }}
          whileHover={{ scale: 1.03 }}
          className="flex flex-col gap-2"
        >
          <Label>Password</Label>
          <Input
            type="password"
            value={inputs.password}
            name="password"
            onChange={onChangeHandler}
            placeholder="🔒 Enter your Password"
            className="rounded-xl border p-3 focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          />
        </motion.div>

        {/* Role Select */}
        <motion.div
          className="flex gap-4 items-center"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2">
            <Input
              type="radio"
              onChange={onChangeHandler}
              name="role"
              value="student"
              className="cursor-pointer"
            />
            <Label>🎓 Student</Label>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="radio"
              onChange={onChangeHandler}
              value="recruiter"
              name="role"
              className="cursor-pointer"
            />
            <Label>🧑‍💼 Recruiter</Label>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
        >
          {loading ? "Logging In..." : "Login 🚀"}
        </motion.button>

        {/* Signup Redirect */}
        <div className="text-center">
          <span>Don't have an account?</span>{" "}
          <Link
            to={"/signup"}
            className="text-blue-600 font-semibold underline ml-1"
          >
            Signup
          </Link>
        </div>
      </motion.form>
    </div>
  );
};

export default Login;

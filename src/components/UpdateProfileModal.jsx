import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setLoading, setUser } from "@/redux/authSlice";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const UpdateProfileModal = ({ isOpen, setIsOpen }) => {
  const { user, loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills || [],
    skillInput: "",
    file: null,
  });

  const [success, setSuccess] = useState(false);

  const onChangeHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    setInputs({ ...inputs, file });
  };

  const addSkillHandler = () => {
    if (inputs.skillInput.trim() !== "") {
      setInputs({
        ...inputs,
        skills: [...inputs.skills, inputs.skillInput.trim()],
        skillInput: "",
      });
    }
  };

  const removeSkillHandler = (index) => {
    const newSkills = [...inputs.skills];
    newSkills.splice(index, 1);
    setInputs({ ...inputs, skills: newSkills });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", inputs.name);
    formData.append("email", inputs.email);
    formData.append("bio", inputs.bio);
    formData.append("skills", inputs.skills.join(","));
    formData.append("phoneNumber", inputs.phoneNumber);
    if (inputs.file) {
      formData.append("file", inputs.file);
    }
    try {
      dispatch(setLoading(true));
      const response = await axios.put(
        "http://localhost:4000/api/user/update",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        setSuccess(true);
        toast.success("Profile updated successfully!");

        setTimeout(() => {
          setIsOpen(false); // ✅ modal close kar do
        }, 2000);
      }
    } catch (error) {
      console.log("Error updating profile", error);
      toast.error("Something went wrong!");
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50"
      >
        <motion.form
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onSubmit={submitHandler}
          className="relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-[90%] max-w-md space-y-4 overflow-hidden"
        >
          {/* Success Animation */}
          {success && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-green-100 dark:bg-green-900/80 bg-opacity-90 z-10"
            >
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                className="text-green-600 text-6xl font-bold"
              >
                ✅
              </motion.div>
            </motion.div>
          )}

          <h2 className="text-2xl font-bold text-gray-700 dark:text-white text-center">
            Update Profile
          </h2>

          {["name", "email", "bio"].map((field) => (
            <motion.input
              key={field}
              type={field === "email" ? "email" : "text"}
              value={inputs[field]}
              onChange={onChangeHandler}
              name={field}
              placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-400 transition-transform duration-300 hover:scale-[1.02] focus:scale-[1.03]"
            />
          ))}

          <motion.input
            type="text"
            value={inputs.phoneNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, "");
              if (value.length <= 10) {
                setInputs({ ...inputs, phoneNumber: value });
              }
            }}
            name="phoneNumber"
            placeholder="Enter your Phone Number"
            className="w-full border p-2 rounded mb-3 focus:ring-2 focus:ring-purple-400 transition-transform duration-300 hover:scale-[1.02] focus:scale-[1.03]"
            maxLength={10}
          />

          {/* Skills Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputs.skillInput}
              onChange={(e) => setInputs({ ...inputs, skillInput: e.target.value })}
              placeholder="Enter skill"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-purple-400 transition-transform duration-300 hover:scale-[1.02] focus:scale-[1.03]"
            />
            <button
              type="button"
              onClick={addSkillHandler}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
            >
              Add
            </button>
          </div>

          {/* Skills List */}
          <div className="flex flex-wrap gap-2">
            {inputs.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkillHandler(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          {/* File Upload */}
          <motion.input
            type="file"
            accept="application/pdf"
            onChange={fileHandler}
            name="file"
            id="file"
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-purple-400 transition-transform duration-300 hover:scale-[1.02] focus:scale-[1.03]"
          />

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-5 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-all flex items-center gap-2"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="border-2 border-white border-t-transparent rounded-full w-5 h-5"
                ></motion.div>
              ) : (
                "Update"
              )}
            </button>
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
};

export default UpdateProfileModal;

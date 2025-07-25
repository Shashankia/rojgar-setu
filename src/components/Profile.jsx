import { Contact, Edit, Mail } from "lucide-react";
import { Badge } from "./ui/badge";
import { Link } from "react-router-dom";
import AppliedJobs from "./AppliedJobs";
import { useState } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <div className="my-12 w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 p-6 relative">
        
        {/* Profile Dropdown */}
        <div className="relative">
          {/* Profile photo */}
          <motion.img
            src={user?.profile?.profilePhoto || "/default-avatar.png"}
            alt="Profile"
            className="w-12 h-12 rounded-full border-4 border-purple-300 shadow-lg object-cover cursor-pointer"
            onClick={toggleDropdown} // Toggling the dropdown on click
          />
          
          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute top-14 right-0 w-48 bg-white shadow-lg rounded-lg z-10 border border-gray-200">
              <div className="px-4 py-3 text-center border-b border-gray-200 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-t-lg">
                Profile Options
              </div>
              <div className="flex flex-col">
                {/* Edit Profile Button */}
                <Link
                  to="/profile"
                  className="px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-purple-700 transition-all text-center font-semibold rounded-t-lg"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Edit className="inline-block mr-2 w-5 h-5 text-purple-600" />
                  Edit Profile
                </Link>

                {/* Logout Button */}
                <Link
                  to="/logout"
                  className="px-4 py-3 text-red-500 hover:bg-gray-100 hover:text-red-700 transition-all text-center font-semibold rounded-b-lg"
                  onClick={() => setDropdownOpen(false)}
                >
                  <span className="inline-block mr-2">🚪</span>
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.03 }}
          className="relative w-full max-w-3xl p-8 bg-white rounded-3xl shadow-2xl backdrop-blur-lg border border-gray-200 hover:shadow-purple-400/50 transition-all"
        >
          {/* Edit Button */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            className="absolute top-6 right-6 text-gray-600 hover:text-black cursor-pointer group"
          >
            <Edit onClick={() => setIsOpen(true)} />
            <span className="absolute -top-8 right-0 text-xs bg-black text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">
              Edit Profile
            </span>
          </motion.div>

          {/* Profile Info */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <motion.img
              src={user?.profile?.profilePhoto || "/default-avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-purple-300 shadow-lg object-cover"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              whileHover={{ scale: 1.1, rotate: 10 }}
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                <motion.span
                  whileHover={{
                    textShadow: "0px 0px 10px rgba(255, 255, 255, 0.7)",
                    color: "#FF1493",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {user?.name}
                </motion.span>
              </h1>
              <p className="text-gray-500 text-md mt-1">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className={!user?.profile?.bio ? "italic text-gray-400" : ""}
                >
                  {user?.profile?.bio || "No bio available"}
                </motion.span>
              </p>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-6 border-t border-gray-200" />

          {/* Contact Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-3 text-gray-600"
            >
              <Mail className="w-5 h-5" />
              <p>{user?.email || "Not provided"}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center gap-3 text-gray-600"
            >
              <Contact className="w-5 h-5" />
              <p>{user?.phoneNumber || "Not provided"}</p>
            </motion.div>
          </div>

          {/* Divider */}
          <hr className="my-6 border-t border-gray-200" />

          {/* Skills Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Skills</h2>
            {user?.profile?.skills?.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {user.profile.skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow hover:scale-110 transition-all cursor-pointer">
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No skills added</p>
            )}
          </div>

          {/* Divider */}
          <hr className="my-6 border-t border-gray-200" />

          {/* Resume */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Resume</h2>
            {user?.profile?.resume ? (
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href={user?.profile?.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {user?.profile?.resumeName}
              </motion.a>
            ) : (
              <p className="text-gray-500 italic">No resume uploaded</p>
            )}
          </div>
        </motion.div>

        {/* Applied Jobs Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full max-w-5xl mt-12"
        >
          <AppliedJobs />
        </motion.div>
      </div>

      {/* Update Modal */}
      <UpdateProfileModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Profile;

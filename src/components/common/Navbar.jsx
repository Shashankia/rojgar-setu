import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "@/redux/authSlice";
import axios from "axios";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/user/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="h-16 bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        {/* Left section */}
        <Link to="/" className="transition-all">
          <h2 className="text-3xl font-bold text-orange-600 hover:text-orange-700">
            RojgarSetu
          </h2>
        </Link>

        {/* Middle section */}
        <ul className="flex items-center gap-6 text-sm font-medium">
          {user?.role === "recruiter" ? (
            <>
              <li>
                <Link
                  to="/admin/companies"
                  className="px-4 py-2 rounded-full text-gray-700 hover:text-orange-600 hover:bg-orange-100 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Companies
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/jobs"
                  className="px-4 py-2 rounded-full text-gray-700 hover:text-orange-600 hover:bg-orange-100 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Jobs
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/"
                  className="px-4 py-2 rounded-full text-gray-700 hover:text-orange-600 hover:bg-orange-100 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="px-4 py-2 rounded-full text-gray-700 hover:text-orange-600 hover:bg-orange-100 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/explore"
                  className="px-4 py-2 rounded-full text-gray-700 hover:text-orange-600 hover:bg-orange-100 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Explore
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Right section */}
        <div className="flex gap-4 items-center">
          {!user ? (
            <>
              <Link to="/login">
                <Button className="bg-orange-600 text-white font-semibold rounded-full px-6 py-2.5 transition-all duration-300 ease-in-out hover:bg-orange-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold rounded-full px-6 py-2.5 transition-all duration-300 ease-in-out hover:from-orange-600 hover:to-yellow-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile}
                    alt="profile"
                    className="transition-all hover:scale-105"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white shadow-xl rounded-lg p-4 z-50">
                <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
                <p className="text-gray-600 mt-2">{user?.profile?.bio}</p>
                <div className="mt-4 space-y-2">
                  {user?.role === "student" && (
                    <Link to="/profile">
                      <Button variant="link" className="text-blue-600 hover:text-blue-800">
                        Profile
                      </Button>
                    </Link>
                  )}
                  <Button
                    onClick={logoutHandler}
                    variant="link"
                    className="text-red-600 hover:text-red-800"
                  >
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

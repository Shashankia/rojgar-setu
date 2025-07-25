import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import { ToastContainer } from "react-toastify";
import Jobs from "./components/Jobs";
import Explore from "./components/Explore";
import Profile from "./components/Profile";
import AppliedJobs from "./components/AppliedJobs";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import AdminJobs from "./components/admin/AdminJobs";
import CreateCompany from "./components/admin/CreateCompany";
import UpdateCompany from "./components/admin/UpdateCompany";
import CreateJobs from "./components/admin/createJobs";

function App() {
  return (
    <div className="max-w-7xl mx-auto">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/applied-jobs" element={<AppliedJobs />} />
        <Route path="/job/description/:id" element={<JobDescription />} />
        <Route path="/admin/companies" element={<Companies />} />
        <Route path="/admin/jobs" element={<AdminJobs />} />
        <Route path="/admin/create/company" element={<CreateCompany />} />
        <Route path="/admin/update/company/:id" element={<UpdateCompany />} />
        <Route path="/admin/create/job" element={<CreateJobs />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

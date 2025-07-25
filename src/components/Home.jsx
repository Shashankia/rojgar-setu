import useGetAllJobs from "@/hooks/useGetAllJobs";
import Category from "./Category";
import Footer from "./Footer";
import Hero from "./Hero";
import LatestJobs from "./LatestJobs";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <Hero />

      {/* Category Section */}
      <Category />

      {/* Latest Jobs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Latest Job Openings
          </h2>
          <LatestJobs />
        </div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Home;

import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const useGetAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/job/get/", {
          withCredentials: true,
        });
        console.log("response", response);
        if (response.data.success) {
          dispatch(setAllJobs(response.data.jobs));
        }
      } catch (error) {
        console.log("error in fecthing all jobs", error);
      }
    };
    getAllJobs();
  }, []);
  return;
};
export default useGetAllJobs;

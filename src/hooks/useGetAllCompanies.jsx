import { setCompanies } from "@/redux/companySlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllCompanies = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/company/companies",
          {
            withCredentials: true,
          }
        );
        if (response.data.success) {
          dispatch(setCompanies(response.data.companies));
        }
      } catch (error) {
        console.log("error in fecthing all jobs", error);
      }
    };
    getAllCompanies();
  }, []);
  return;
};
export default useGetAllCompanies;

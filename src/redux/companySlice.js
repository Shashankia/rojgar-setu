import { createSlice } from "@reduxjs/toolkit";
const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: "null",
    companies: [],
  },
  reducers: {
    // actions
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
      state.companies = action.payload;
    },
  },
});
export const { setSingleCompany, setCompanies } = companySlice.actions;
export default companySlice.reducer;

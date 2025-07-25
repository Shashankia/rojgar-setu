import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { MapPin, Briefcase, DollarSign } from "lucide-react";

const FilterJob = ({ onFilterChange }) => {
  const [selected, setSelected] = useState({});

  const filterData = [
    {
      icon: <MapPin className="w-4 h-4 text-white" />,
      filterType: "Location",
      color: "bg-blue-500",
      array: ["Mumbai", "Delhi", "USA", "UK", "Canada", "Australia"],
    },
    {
      icon: <Briefcase className="w-4 h-4 text-white" />,
      filterType: "Industry",
      color: "bg-green-600",
      array: ["Web", "Flutter", "React", "Full Stack", "Laravel", "Nextjs"],
    },
    {
      icon: <DollarSign className="w-4 h-4 text-white" />,
      filterType: "Salary",
      color: "bg-yellow-600",
      array: [
        { label: "2-4 lakh", min: 2, max: 4 },
        { label: "4-6 lakh", min: 4, max: 6 },
        { label: "6-8 lakh", min: 6, max: 8 },
        { label: "6-10 lakh", min: 6, max: 10 },
        { label: "10-12 lakh", min: 10, max: 12 },
        { label: "12-15 lakh", min: 12, max: 15 },
        { label: "15-20 lakh", min: 15, max: 20 },
      ],
    },
  ];

  const handleChange = (type, value) => {
    const updated = { ...selected, [type]: value };
    setSelected(updated);
    onFilterChange(updated);
  };

  return (
    <div className="bg-gray-50 border border-gray-200 shadow-md rounded-3xl p-6 space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800">🎯 Filter Jobs</h2>
      <hr className="border-gray-200" />

      {filterData.map((data, idx) => (
        <div key={idx}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-full shadow-sm ${data.color}`}>
              {data.icon}
            </div>
            <h3 className="text-md font-semibold text-gray-700 uppercase tracking-wide">
              {data.filterType}
            </h3>
          </div>

          <RadioGroup
            value={selected[data.filterType]?.label || ""}
            onValueChange={(val) => {
              const selectedOption =
                typeof data.array[0] === "string"
                  ? val
                  : data.array.find((opt) => opt.label === val);
              handleChange(data.filterType, selectedOption);
            }}
            className="space-y-2"
          >
            {data.array.map((item, i) => {
              const value = typeof item === "string" ? item : item.label;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 hover:bg-gray-100 ${
                    selected[data.filterType]?.label === value ||
                    selected[data.filterType] === value
                      ? "bg-gray-200"
                      : ""
                  }`}
                >
                  <RadioGroupItem value={value} id={`${data.filterType}-${value}`} />
                  <Label
                    htmlFor={`${data.filterType}-${value}`}
                    className="text-sm text-gray-700 cursor-pointer"
                  >
                    {value}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterJob;

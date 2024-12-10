import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  useFinanceOverViewQuery,
  useGpListFetchQuery,
} from "@/features/api/phedApi";

const FinanceOverview = () => {
  const navigate = useNavigate();
  const [selectedGp, setSelectedGp] = useState(null); // Store full GP object
  const [isIncomeView, setIsIncomeView] = useState(true);
  const [gp, setGp] = useState(null);

  // Fetch finance details for a specific GP
  const {
    data: financeData,
    isLoading,
    error,
  } = useFinanceOverViewQuery(selectedGp?._id, { skip: !selectedGp });

  const {
    data: gpList,
    error: listError,
    isLoading: listLoading,
    isSuccess,
  } = useGpListFetchQuery();

  useEffect(() => {
    if (gpList && isSuccess) {
      setGp(gpList.data);
    } else {
      setGp(null);
    }
  }, [listError, listLoading, gpList]);

  const handleGpClick = (gp) => {
    setSelectedGp(gp);
  };

  const handleBack = () => {
    setSelectedGp(null);
  };

  const toggleView = () => {
    setIsIncomeView((prev) => !prev);
  };

  return (
    <div className="h-auto py-12 bg-gradient-to-b from-[#4EB4F8] via-[#D8E9FF] to-white flex justify-center items-center">
      <div
        className={`w-[90vw] flex-col md:w-[80vw] flex ${
          selectedGp ? "md:flex-row" : "flex-col"
        } gap-8 transition-all duration-500`}
      >
        {/* GP List Section */}
        <div
          className={`${
            selectedGp ? "w-full md:w-1/2" : "w-full"
          } shadow-lg rounded-lg p-6 overflow-y-auto max-h-[600px] transition-all duration-500`}
        >
          {!selectedGp && <h2 className="text-xl font-bold mb-4">GP List</h2>}
          {gp?.map((singlegp) => (
            <div
              key={singlegp._id}
              className="flex justify-between items-center bg-blue-100 shadow-md rounded-lg p-4 mb-3 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => handleGpClick(singlegp)}
            >
              {/* Left Section - Round Avatar and GP Details */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white text-lg font-bold rounded-full">
                  {singlegp.name[0]?.toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold">{singlegp.name}</span>
                  <span className="text-gray-600 text-sm">
                    GP ID: {singlegp.grampanchayatId}
                  </span>
                </div>
              </div>
              <div className="text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Details Section */}
        {selectedGp && (
          <div className="w-full md:w-1/2 shadow-lg rounded-lg p-6  transition-all duration-500">
            <div className="flex justify-between items-center mb-4">
              <button
                className="flex items-center text-blue-500 bg-blue-100 py-2 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-300"
                onClick={handleBack}
              >
                <ArrowLeft className="mr-2" />
                Back
              </button>
              <button
                className="text-blue-500 bg-gray-100 py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors duration-300"
                onClick={toggleView}
              >
                {isIncomeView ? "Show Expenditure" : "Show Income"}
              </button>
            </div>
            <h2 className="text-xl font-bold mb-4">
              {selectedGp.name} - {isIncomeView ? "Income Details" : "Expenditure Details"}
            </h2>
            {isLoading ? (
              <p className="text-center text-blue-600">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-600">
                Error loading data. Please try again.
              </p>
            ) : (
              <div>
                <p className="text-lg font-bold mb-2">
                  {isIncomeView
                    ? `Total Income: ${financeData?.data?.totalIncome}`
                    : `Total Expenditure: ${financeData?.data?.totalExpenditure}`}
                </p>
                <div className="overflow-y-auto max-h-[400px]">
                  {(isIncomeView
                    ? financeData?.data?.financeOverview?.income
                    : financeData?.data?.financeOverview?.expenditure
                  )?.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center py-2 border-b last:border-b-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-blue-500 text-white font-bold flex justify-center items-center rounded-full">
                          {item.category[0]}
                        </div>
                        <span className="text-lg font-medium">
                          {item.category}
                        </span>
                      </div>
                      <span className="text-lg font-semibold">
                        Amount: {item.amount}
                      </span>
                    </div>
                  )) || (
                    <p className="text-center text-gray-500">
                      No data available
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceOverview;

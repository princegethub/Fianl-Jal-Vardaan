import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAssestOverviewPHeDQuery,
  useInvenotoryOverviewPHeDQuery,
} from "@/features/api/phedApi";
import { ArrowLeft } from "lucide-react";

const AssestOverview = () => {
  const navigate = useNavigate();
  const [isAssetView, setIsAssetView] = React.useState(true);

  // Fetch asset data only when needed
  const {
    data: assetOverviewData,
    isLoading: assetLoading,
    error: assetError,
  } = useAssestOverviewPHeDQuery(isAssetView);

  // Fetch inventory data only when needed
  const {
    data: inventoryOverviewData,
    isLoading: inventoryLoading,
    error: inventoryError,
  } = useInvenotoryOverviewPHeDQuery(!isAssetView);

  const toggleView = () => {
    setIsAssetView((prev) => !prev);
  };

  const handleBack = () => {
    navigate("/phed/assestinventory");
  };

  // Effect to make sure data fetching is controlled based on the current view
  useEffect(() => {
    if (isAssetView) {
      // API call for assets is triggered only when the toggle is set to "asset"
      console.log("Fetching asset data...");
    } else {
      // API call for inventory is triggered only when the toggle is set to "inventory"
      console.log("Fetching inventory data...");
    }
  }, [isAssetView]);

  return (
    <div className="h-auto py-12 bg-gradient-to-b from-[#4EB4F8] via-[#D8E9FF] to-white flex justify-center items-center">
      <div className="w-[90vw] md:w-[80vw] flex flex-col gap-8">
        {/* Header Section with Toggle and Back Button */}
        

           {/* Toggle Button Section */}
           <div className="flex justify-between flex-col   shadow-lg  md:flex-row items-center w-full mx-auto py-4 px-8 rounded-lg">
      
        <div className="flex items-center flex-row mb-8 md:mb-0">
           <button className="bg-transparent border-2 border-black text-black py-2 px-4 w-[100px] flex items-center justify-between text-sm md:text-base rounded-full shadow-lg hover:bg-black hover:text-white transition-all"
            onClick={handleBack}
            >
             <ArrowLeft/> Back
            </button>
            </div>

          <div className="flex justify-center items-center  mb-6 md:m-0">
            <span
              className={`mr-4 font-bold text-xl transition-colors duration-300 ease-in-out ${
                isAssetView ? "text-blue-400" : "text-blue-800"
              }`}
            >
              INVENTORY
            </span>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                className="sr-only peer"
                type="checkbox"
                checked={isAssetView}
                onChange={toggleView}
              
              />
              <div className="peer rounded-full outline-none duration-100 w-[6rem] h-8 bg-blue-300 peer-focus:outline-none relative">
                <div
                  className={`absolute top-[6px] left-1 w-5 h-5  rounded-full transition-all duration-300 ease-in-out ${
                    isAssetView ? "translate-x-16 bg-blue-800" : "bg-white"
                  }`}
                />
              </div>
            </label>

            <span
              className={`ml-4 font-bold text-xl transition-colors duration-300 ease-in-out ${
                isAssetView ? "text-blue-800" : "text-blue-400"
              }`}
            >
              ASSET
            </span>
          </div>

      
    
        
       
        </div>


        {/* Card Section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Overview Card */}
          <div className="w-full shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">
              {isAssetView ? "Asset Overview" : "Inventory Overview"}
            </h2>
            {assetLoading || inventoryLoading ? (
              <p className="text-center text-blue-600">Loading...</p>
            ) : assetError || inventoryError ? (
              <p className="text-center text-red-600">Error loading data. Please try again.</p>
            ) : (
              <div className="overflow-y-auto max-h-[400px]">
                {isAssetView ? (
                  assetOverviewData?.total ? (
                    Object.entries(assetOverviewData.total).length === 0 ? (
                      <p className="text-center text-gray-500">No asset data available</p>
                    ) : (
                      Object.entries(assetOverviewData.total).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center py-2 border-b last:border-b-0"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-blue-500 text-white font-bold flex justify-center items-center rounded-full">
                              {key[0]}
                            </div>
                            <span className="text-lg font-medium">{key}</span>
                          </div>
                          <span className="text-lg font-semibold">
                            Quantity: {value.totalQuantity}
                          </span>
                        </div>
                      ))
                    )
                  ) : (
                    <p className="text-center text-gray-500">No asset data available</p>
                  )
                ) : (
                  inventoryOverviewData?.total ? (
                    Object.entries(inventoryOverviewData.total).length === 0 ? (
                      <p className="text-center text-gray-500">No inventory data available</p>
                    ) : (
                      Object.entries(inventoryOverviewData.total).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex justify-between items-center py-2 border-b last:border-b-0"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-blue-500 text-white font-bold flex justify-center items-center rounded-full">
                              {key[0]}
                            </div>
                            <span className="text-lg font-medium">{key}</span>
                          </div>
                          <span className="text-lg font-semibold">
                            Quantity: {value.totalQuantity}
                          </span>
                        </div>
                      ))
                    )
                  ) : (
                    <p className="text-center text-gray-500">No inventory data available</p>
                  )
                )}
              </div>
            )}
          </div>

          {/* GP Details Card */}
          <div className="w-full shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">GP Details</h2>
            <div className="h-[300px] overflow-y-auto">
              {(isAssetView ? assetOverviewData : inventoryOverviewData)?.gpDetails?.map((gp, index) => (
                <div
                  key={index}
                  className="py-4 border-b last:border-b-0 text-sm md:text-base"
                >
                  <p>
                    <strong>GP Name:</strong> {gp.gpName}
                  </p>
                  <p>
                    <strong>Grampanchayat Id:</strong> {gp.grampanchayatId}
                  </p>
                  <p>
                    <strong>Total Quantity:</strong> {gp.totalQuantity}
                  </p>
                </div>
              )) || (
                <p className="text-center text-gray-500">No GP data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssestOverview;

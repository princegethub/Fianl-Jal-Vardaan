import React, { useState, useEffect } from "react";
import { useGetGpAssetsQuery, useGetGpInventoryQuery } from "../../features/api/gpApi";
function Assest_GP() {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState([]);
  const { data: assetsData, error: assetsError, isFetching: assetsFetching } = useGetGpAssetsQuery(undefined, { skip: !isActive });
  const { data: inventoryData, error: inventoryError, isFetching: inventoryFetching } = useGetGpInventoryQuery(undefined, { skip: isActive });
  const toggleIsActive = () => {
    setIsActive(!isActive);
  };
  useEffect(() => {
    if (isActive && assetsData) {
      setData(assetsData?.assets);
    } else if (!isActive && inventoryData) {
      setData(inventoryData?.inventory);
    }
  }, [isActive, assetsData, inventoryData]);
  console.log("inventoryData", inventoryData);
  return (
    <div className="flex items-center flex-col gap-12 justify-center h-[90vh] bg-gradient-to-b from-[#4EB4F8] via-[#D8E9FF] to-white">
      <div className="flex justify-between flex-col md:flex-row items-center w-full shadow-lg my-2 py-4 mx-auto rounded-lg">
        <div className="flex justify-center items-center mx-auto">
          <span
            className={`mr-4 font-bold text-xl transition-colors duration-300 ease-in-out ${
              !isActive ? "text-red-400" : "text-blue-800"
            }`}
          >
            Inventory
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              type="checkbox"
              checked={isActive}
              onChange={toggleIsActive}
            />
            <div className="peer rounded-full outline-none duration-100 w-[6rem] h-8 bg-blue-300 peer-focus:outline-none relative">
              <div
                className={`absolute top-[6px] left-1 w-5 h-5 rounded-full transition-all duration-300 ease-in-out ${
                  isActive ? "translate-x-16 bg-blue-800" : "bg-white"
                }`}
              />
            </div>
          </label>
          <span
            className={`ml-4 font-bold text-xl transition-colors duration-300 ease-in-out ${
              isActive ? "text-green-800" : "text-blue-800"
            }`}
          >
            Assets
          </span>
        </div>
      </div>
      {/* Outer Container */}
      <div className="bg-gradient-to-b from-[#4EB4F8] via-[#D8E9FF] to-white w-[90%] md:w-[60%] lg:w-[40%] h-[60vh] rounded-lg shadow-2xl p-4 overflow-hidden">
        {/* Scrollable Inner Content */}
        <div className="h-full overflow-y-auto flex flex-col gap-4 p-4 rounded-sm shadow-inner max-h-[calc(100vh - 100px)] custom-scrollbar">
          {/* Inner Small Boxes */}
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-[#CEEAF9] rounded-2xl shadow-md flex flex-col p-4"
            >
              <div>Category: {item.category}</div>
              <div>Created At: {new Date(item.createdAt).toISOString().split("T")[0].split("-").reverse().join(",")}</div>
              <div>Quantity: {item.quantity}</div>
              <div>Description: {item.description}</div>
            </div>
          ))}
          {(assetsError || inventoryError) && (
            <div className="text-red-500">Error loading data</div>
          )}
        </div>
      </div>
      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F1F1F1;
          border-radius: 50px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 50px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}
export default Assest_GP;
















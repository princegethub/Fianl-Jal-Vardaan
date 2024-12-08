import React, { useEffect, useState } from "react";
import ListCard from "../ListCard";
import DetailsCard from "../DetailsCard";
import FormDialogAssetInventory from "../FormDilogAssetInvenotry"; // Import the new component
import {
  useAssestOverviewPHeDQuery,
  useCreateAssetMutation,
  useCreateInventoryMutation,
  useGpListFetchQuery,
  useInvenotoryOverviewPHeDQuery,
  useViewSingleGpAssetQuery,
  useViewSingleGpInventoryQuery,
} from "@/features/api/phedApi";
import { toast } from "sonner";
import { useNavigate } from "react-router";

function AssestInventory() {
  // Track which GP is selected
  const [activeGP, setActiveGP] = useState(null);
  // Track if we are in Details view
  const [isDetailsView, setIsDetailsView] = useState(false);
  // Toggle between Asset and Inventory
  const [isAssetView, setIsAssetView] = useState(true); // true means Asset, false means Inventory

  // State for dialog visibility and form data
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  const [assetDetails , setAssetDetails] = useState(null);
  const [inventoryDetails , setInventoryDetails] = useState(null);


  const navigate = useNavigate();
  


  // Handle switching between Asset and Inventory views
  const toggleView = () => {
    setIsAssetView(!isAssetView); // Toggle between Asset and Inventory
  };



  // Fetching assets for the active GP
  const {
    data: AssetData,
    isSuccess: AssestSuccess,
    isError: AssestError,
    isLoading: AssetisLoading,
  } = useViewSingleGpAssetQuery(activeGP?._id, { skip: !activeGP });
  

  const {
    data: inventoryData,
    isSuccess: inventorySucess,
    isError: inventoryError,
    isLoading: InventoryLoading,
  } = useViewSingleGpInventoryQuery(activeGP?._id, { skip: !activeGP });

  
  const handleGPSelect = (gp) => {
    // Set the selected GP
    setActiveGP(gp);
    setIsDetailsView(true); // Switch to details view
  };

  useEffect(() => {
    // Update assetDetails state when AssetData changes
    if (AssestSuccess && AssetData) {
      setAssetDetails(AssetData);
    } else if (AssestError) {
      setAssetDetails(null); // Handle error case
    }
  }, [AssetData, AssestSuccess, AssestError]);

  useEffect(() => {
    // Update inventoryDetails state when inventoryData changes
    if (inventorySucess && inventoryData) {
      setInventoryDetails(inventoryData);
    } else if (inventoryError) {
      setInventoryDetails(null); // Handle error case
    }
  }, [inventoryData, inventorySucess, inventoryError]);

  // Handle Back button (Go back to ListView)
  const handleBack = () => {
    setIsDetailsView(false); // Show ListView
  };

  // Handle Add/Update button click
  const handleAddClick = () => {
    setFormData(null); // Reset form data for "Add"
    setIsDialogOpen(true);
  };

  const handleHistoryClick = ()=>{
    navigate("/phed/assestinventoryoverview")
  }

  ////Here api Call;
  const { data: gpList, error, isLoading } = useGpListFetchQuery();
  const extractedGpList = gpList?.data?.map((gp) => gp) || [];

  const [
    createAsset,
    { isLoading: AssetLoading, isSuccess: assetSuccess, error: AssetError },
  ] = useCreateAssetMutation(); // Fetch GP list from
  const [
    createInventory,
    {
      isLoading: InventorLoading,
      isSuccess: inventorySuccess,
      error: InventoryError,
    },
  ] = useCreateInventoryMutation(); // Fetch GP list from

  const handleFormSubmit = async (data) => {
    console.log("Form data submitted:", data);

    try {
      let response;
      if (isAssetView) {
        response = await createAsset(data);
        if (response?.data) {
          toast.success(response.data.message || "Asset created successfully");
          setIsDialogOpen(false); // Close dialog on success
        } else {
          throw new Error(
            response.error?.data?.message || "Error creating asset"
          );
        }
      } else {
        response = await createInventory(data);
        if (response?.data) {
          toast.success(
            response.data.message || "Inventory created successfully"
          );
          setIsDialogOpen(false); // Close dialog on success
        } else {
          throw new Error(
            response.error?.data?.message || "Error creating inventory"
          );
        }
      }
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="h-auto py-12 bg-gradient-to-b from-[#4EB4F8] via-[#D8E9FF] to-white flex justify-center items-center">
      <div className="w-[90vw] md:w-[90vw] flex flex-col gap-6">
        {/* Toggle Button Section */}
        <div className="flex justify-between flex-col   shadow-lg  md:flex-row items-center w-full mx-auto py-4 px-8 rounded-lg">
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

          <div className="flex justify-between items-center w-full sm:w-[250px] space-x-2">
            <button
              onClick={handleAddClick}
              className="bg-transparent border-2 border-black text-black py-2 px-3 text-sm md:text-base rounded-full shadow-lg hover:bg-black hover:text-white transition-all"
            >
              {isAssetView ? "Add Asset" : "Add Inventory"}
            </button>

            <button 
            onClick={handleHistoryClick}
            className="bg-transparent border-2 border-black text-black py-2 px-3 text-sm md:text-base rounded-full shadow-lg hover:bg-black hover:text-white transition-all">
              Your History
            </button>
          </div>
        </div>

        {/* List and Details Section */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* List Section */}
          <div
            className={`transition-all ${
              isDetailsView ? "w-full md:w-[50%]" : "w-full"
            }`}
          >
            <ListCard gps={extractedGpList} onSelect={handleGPSelect} />
          </div>

          {/* Details Section */}
          <div
            className={`transition-all ${
              isDetailsView ? "w-full md:w-[50%]" : "hidden"
            }`}
          >
            {isDetailsView && (
              <DetailsCard
                gp={activeGP}
                details={isAssetView ? assetDetails : inventoryDetails}
                viewType={isAssetView ? "Asset" : "Inventory"}
                onBack={handleBack}
              />
            )}
          </div>
        </div>
      </div>

      {/* Dialog Component */}
      <FormDialogAssetInventory
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        isAssetView={isAssetView}
        formData={formData}
        onFormSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default AssestInventory;

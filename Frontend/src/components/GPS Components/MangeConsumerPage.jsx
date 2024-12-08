import React, { useState, useEffect } from "react";
import ConsumerList from "./MangeConsumerList";
import ConsumerDetails from "./ManageConsumerDetails";
import {
  useGetActiveConsumerQuery,
  useDeleteConsumerMutation,
  useGetInActiveConsumerQuery,
} from "../../features/api/gpApi";
import { toast } from "sonner";

const ManageConsumer = () => {
  const [activeConsumer, setActiveConsumer] = useState(null);
  const [viewMode, setViewMode] = useState("illustrator");
  const [isActive, setIsActive] = useState(true);

  // Fetch active consumer data
  const {
    data: activeConsumerData,
    isLoading: activeConsumerLoading,
    isError: activeConsumerError,
    isSuccess: activeIsSuccess,
  } = useGetActiveConsumerQuery(undefined, {
    skip: !isActive,
  });

  const {
    data: inActiveConsumerData,
    isLoading: inActiveConsumerLoading,
    isError: inActiveConsumerError,
    isSuccess: inActiveIsSuccess,
  } = useGetInActiveConsumerQuery(undefined, {
    skip: isActive,
  });


  console.log( " inActiveConsumerData ", inActiveConsumerData );
  
  // Initialize delete consumer mutation
  const [deleteConsumer] = useDeleteConsumerMutation();

  // Handle "View", "Edit", or "Add" click
  const handleAction = (consumer, mode) => {
    setActiveConsumer(consumer);
    setViewMode(mode);
  };

  // Handle "Back" button click
  const handleBack = () => {
    setActiveConsumer(null);
    setViewMode("illustrator");
  };

  // Handle adding a new consumer
  const handleAddConsumer = () => {
    setActiveConsumer(null);
    setViewMode("add");
  };

  useEffect(() => {
    if (
      (isActive && !activeConsumerData && activeConsumerError) ||
      (!isActive && !inActiveConsumerData && inActiveConsumerError)
    ) {
      toast.error("Your session has timed out, please login again.");
    }
  }, [isActive, activeConsumerData, activeConsumerError, inActiveConsumerData, inActiveConsumerError]);

  // Determine consumers based on isActive state
  const consumers = isActive
    ? activeConsumerData?.activeUsers || []
    : inActiveConsumerData?.inactiveUsers || [];

  return (
    <div className="h-auto py-12 bg-gradient-to-b from-blue-400 via-white to-white shadow-lg flex flex-col md:flex-row justify-center gap-12 items-center">
      {/* Left Side: Consumer List */}
      <div className="w-[90vw] md:w-[45%] bg-gradient-to-b from-blue-400 via-white to-white shadow-lg rounded-lg p-4 overflow-y-auto custom-scrollbar">
        <ConsumerList
          consumers={consumers} // Pass the determined consumers here
          isActive={isActive}
          setIsActive={setIsActive}
          onAction={handleAction}
          onAddConsumer={handleAddConsumer}
          deleteConsumer={deleteConsumer} // Pass the delete mutation to the list
        />
      </div>

      {/* Right Side: Illustrator or Form */}
      <div className="w-[90vw] bg-gradient-to-b from-blue-400 via-white to-white p-4 shadow-lg md:w-[40%] rounded-lg">
        {activeConsumerLoading || inActiveConsumerLoading ? (
          <div>Loading...</div>
        ) : (isActive && activeIsSuccess) || (!isActive && inActiveIsSuccess) ? (
          viewMode === "illustrator" ? (
            <ConsumerDetails mode="illustrator" onBack={handleBack} />
          ) : viewMode === "add" ? (
            <ConsumerDetails mode="add" onBack={handleBack} />
          ) : activeConsumer ? (
            <ConsumerDetails
              consumer={activeConsumer}
              mode={viewMode}
              onBack={handleBack}
            />
          ) : (
            <div>Failed to load consumer data.</div>
          )
        ) : (
          <div>Failed to load consumer data.</div>
        )}
      </div>
    </div>
  );
};

export default ManageConsumer;

import React, { useEffect, useState } from "react";
import AlertListCard from "./AlertListCard";
import AlertDetailsDialog from "./AlertDetailsDialog";
import HandImg from "../../assets/PHED/Hand.png";
import "../../App.css";
import { useAlreatPhedQuery, useStatusCompletealreatPhedMutation } from "@/features/api/phedApi";
import { toast } from "sonner";

function AlertPage() {
  const [selectedAlert, setSelectedAlert] = useState(null); // State to track the currently selected alert
  const { data, isLoading: listLoading, isError: listError, error } = useAlreatPhedQuery();
  const [alerts, setAlerts] = useState([]);

  const [statusCompletealreatPhed] = useStatusCompletealreatPhedMutation();

  useEffect(() => {
    if (data) {
      setAlerts(data.data);
      toast.success(data.message);
    }
    if (listError) {
      console.error("Failed to fetch announcements:", error);
      toast.error("Error fetching announcements");
    }
  }, [data, listError, error]);

  // Function to handle acknowledging an alert
  const handleAcknowledge = async (alertId) => {
    try {
      await statusCompletealreatPhed(alertId).unwrap();
      // Update the status of the acknowledged alert locally
     
      toast.success("Alert acknowledged successfully!");
      setSelectedAlert(null); // Close the dialog after acknowledgment
    } catch (error) {
      console.error("Error acknowledging alert:", error);
      toast.error("Failed to acknowledge alert.");
    }
  };

  return (
    <div className="h-auto py-12 bg-gradient-to-b from-[#4EB4F8] via-[#D8E9FF] to-white flex flex-col items-center">
      {/* Main container */}
      <div className="w-[90vw] flex flex-col gap-6">
        {/* Desktop View: Left Illustration and Right Alert List */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Illustration Section: Only visible on larger screens */}
          <div className="hidden md:block w-full md:w-[30%]">
            <div className="bg-gradient-to-b from-[#4EB4F8] via-[#D8E9FF] to-white p-6 rounded-lg shadow-lg">
              <img
                src={HandImg}
                alt="Illustration"
                className="w-[350px] h-auto"
              />
            </div>
          </div>

          {/* Alert List Section */}
          <div className="w-full md:w-[70%]">
            <div className="max-h-[470px] overflow-y-scroll custom-scrollbar">
              {/* Pass alerts to the AlertListCard component */}
              <AlertListCard
                alerts={alerts}
                onAlertClick={(alert) => setSelectedAlert(alert)} // Pass clicked alert to the dialog
                onButtonClick={(alert) => setSelectedAlert(alert)} // Open dialog on button click
              />
            </div>
          </div>
        </div>

        {/* Alert Details Dialog */}
        {selectedAlert && (
          <AlertDetailsDialog
            alert={selectedAlert}
            onClose={() => setSelectedAlert(null)} // Close dialog
            onAcknowledge={handleAcknowledge} // Handle acknowledgment
          />
        )}
      </div>
    </div>
  );
}

export default AlertPage;

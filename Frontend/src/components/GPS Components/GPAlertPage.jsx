import React, { useState } from "react";
import GPAlertListCard from "./GPAlertListCard";
import GPAlertDetailsDialog from "./GPAlertDetailsDialog";
import HandImg from "../../assets/GPS/Hand.png"; // Replace with your specific image
import "../../App.css";

function GPAlertPage() {
  const [selectedAlert, setSelectedAlert] = useState(null);

  // Hardcoded sample alerts data (replace with API calls if required)
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      source: "School - SC452",
      alertCategory: "Low Water Pressure",
      message: "Low water pressure reported this week at SC452.",
      status: "Pending",
    },
    {
      id: 2,
      source: "Household - H459",
      alertCategory: "Delayed Water Pump Repair",
      message: "Household H459 reports delayed repair of water pumps.",
      status: "Pending",
    },
    {
      id: 3,
      source: "AWC - AC895",
      alertCategory: "Billing Issue",
      message: "AWC AC895 has raised an issue regarding water usage billing.",
      status: "Pending",
    },
    {
      id: 4,
      source: "School - SC684",
      alertCategory: "Pipeline Leakage",
      message: "Pipeline leakage reported near the school SC684.",
      status: "Pending",
    },
  ]);

  // Handle assigning a worker
  const handleAssignWorker = (alertId) => {
    // Update the status of the alert to "Worker Assigned"
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === alertId ? { ...alert, status: "Worker Assigned" } : alert
      )
    );
    alert("A worker has been assigned for this issue."); // Confirmation message
  };

  return (
    <div className="h-auto py-12 bg-gradient-to-b from-[#4EB4F8] via-[#D8E9FF] to-white flex flex-col items-center">
      <div className="w-[90vw] flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="hidden md:block w-full md:w-[30%]">
            <div className="bg-gradient-to-b from-[#4EB4F8] via-[#D8E9FF] to-white p-6 rounded-lg shadow-lg">
              <img
                src={HandImg}
                alt="Gram Panchayat Illustration"
                className="w-[350px] h-auto"
              />
            </div>
          </div>
          <div className="w-full md:w-[70%]">
            <div className="max-h-[470px] overflow-y-scroll custom-scrollbar">
              <GPAlertListCard
                alerts={alerts}
                onAlertClick={(alert) => setSelectedAlert(alert)}
                onButtonClick={(alert) => setSelectedAlert(alert)}
              />
            </div>
          </div>
        </div>
        {selectedAlert && (
          <GPAlertDetailsDialog
            alert={selectedAlert}
            onClose={() => setSelectedAlert(null)}
            onAssignWorker={handleAssignWorker}
          />
        )}
      </div>
    </div>
  );
}

export default GPAlertPage;

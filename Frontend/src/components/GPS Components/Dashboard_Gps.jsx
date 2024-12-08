

import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Card from "../Card";

// Importing images
import ManageGp from "../../assets/Card Logo/ManageGp.png";
import Asset from "../../assets/Card Logo/assests.png";
import AlretIcon from "../../assets/Card Logo/alert icon.png";
import Inventory from "../../assets/Card Logo/inventory.png";
import Annoucement from "../../assets/Card Logo/announcement 1.png";
import Finance from "../../assets/Card Logo/finan_ico 1.png";
import PushNotification from "../../assets/GPS/PushNotification.svg";
import Payment from "../../assets/GPS/Payment.svg";
import RqstFund from "../../assets/GPS/RqstFund.svg";
import ManageIOT from "../../assets/GPS/ManageIOT.svg";
import SlickSlider from "../PHED Components/Slider";

function Dashboard_Gps() {
  const navigate = useNavigate(); // Initialize navigate function

  // Services array with routes
  const services = [
    {
      text: "Manage Consumer",
      imageSrc: ManageGp,
      route: "/gp/manageconsumer", // Route for Manage GPs
    },
    {
      text: "Asset Overview",
      imageSrc: Asset,
      route: "/gp/assest", // Route for Asset Inventory
    },
    {
      text: "Create Announcement",
      imageSrc: PushNotification,
      route: "/gp/notification", // Route for Asset Inventory
    },
    {
      text: "Complaint PHED",
      imageSrc: PushNotification,
      route: "/gp/complaint", // Route for Asset Inventory
    },
    // {
    //   text: "Payment",
    //   imageSrc: Payment,
    //   route: "/gp/payment", // Route for Asset Inventory
    // },
    {
      text: "View Complaint",
      imageSrc: AlretIcon,
      route: "/gp/aleart", // Route for Alerts
    },
    {
      text: "Request Fund",
      imageSrc: RqstFund,
      route: "/gp/requestfund", // Route for Asset Inventory
    },
  
    
    {
      text: "Submit Receipt To PHED",
      imageSrc: Finance,
      route: "/gp/receipt", // Route for Financial Overview
    },
  ];

  // Dynamic navigation handler
  const handleDashboardCard = (route) => {
    navigate(route); // Navigate to the route passed as parameter
  };

  return (
    <>
      <SlickSlider />
      <div className="h-auto bg-gradient-to-b from-[#4EB4F8] to-[#FFFFFF] py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8 lg:px-16">
          {services.map((service, index) => (
            <Card
              key={index}
              imageSrc={service.imageSrc}
              text={service.text}
              onClick={() => handleDashboardCard(service.route)} // Pass route dynamically
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard_Gps;

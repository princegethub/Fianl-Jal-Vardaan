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
import HandImg from "../../assets/PHED/rqstFund.png";

import SlickSlider from "./Slider";
import { useSelector } from 'react-redux';

function Dashboard_PHED() {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticate = useSelector((state) => state.auth.isAuthenticate);

  const navigate = useNavigate(); // Initialize navigate function

  // Services array with routes
  const services = [
    {
      text: "Manage GPs",
      imageSrc: ManageGp,
      route: "/phed/managegp", // Route for Manage GPs
    },
    {
      text: "Asset Inventory",
      imageSrc: Asset,
      route: "/phed/assestinventory", // Route for Asset Inventory
    },
    {
      text: "View Alerts",
      imageSrc: AlretIcon,
      route: "/phed/alerts", // Route for Alerts
    },
    {
      text: "AssetInventory Overview",
      imageSrc: Inventory,
      route: "/phed/assestinventoryoverview", // Route for Inventory
    },
    {
      text: "Add Announcement for GP",
      imageSrc: Annoucement,
      route: "/phed/gpannouncement", // Route for GP Announcements
    },
    {
      text: "Requested Fund",
      imageSrc: HandImg,
      route: "/phed/requestedfund", // Route for GP Announcements
    },
    {
      text: "Financial Overview",
      imageSrc: Finance,
      route: "/phed/finance", // Route for Financial Overview
    },
  ];

  // Dynamic navigation handler
  const handleDashboardCard = (route) => {
    navigate(route); // Navigate to the route passed as parameter
  };

  console.log("dataaa",user)

  return (
    <>
      <SlickSlider />
      <div className="h-auto bg-gradient-to-b from-[#4EB4F8] to-[#FFFFFF] py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-8 lg:px-16">
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

export default Dashboard_PHED;

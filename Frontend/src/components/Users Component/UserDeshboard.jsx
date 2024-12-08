import React, { useState } from 'react'
import Card from '../Card'
import complaints from "../../assets/UsersIcons/complaints.svg"
import WaterUsage from "../../assets/UsersIcons/waterUsage.svg"
import ViewBills from "../../assets/UsersIcons/viewBills.svg"
import gift from "../../assets/UsersIcons/gift-card.svg"
import notification from "../../assets/UsersIcons/notification.svg"
import quickPay from "../../assets/UsersIcons/quickPay.svg"
import Slider from 'react-slick'
import SlickSlider from '../PHED Components/Slider'


const services = [
  {
    text: "ViewBills ",
    imageSrc: ViewBills,
    route: "#", // Route for Manage GPs
  },
  {
    text: "complaints",
    imageSrc: complaints,
    route: "#", // Route for Asset Inventory
  },
  {
    text: "quickPay",
    imageSrc: quickPay,
    route: "#", // Route for Alerts
  },
  {
    text: "notification",
    imageSrc: notification,
    route: "#", // Route for Inventory
  },
  {
    text: "Rewards",
    imageSrc: gift,
    route: "#", // Route for GP Announcements
  },
  {
    text: "WaterUsage",
    imageSrc: WaterUsage,
    route: "#", // Route for Financial Overview
  },
];



export default function UserDeshboard() {

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

    
  )
}

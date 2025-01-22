import React, { useState, useEffect } from "react";
import Card from "../Card";
import complaints from "../../assets/UsersIcons/complaints.svg";
import WaterUsage from "../../assets/UsersIcons/waterUsage.svg";
import ViewBills from "../../assets/UsersIcons/viewBills.svg";
import gift from "../../assets/UsersIcons/gift-card.svg";
import notification from "../../assets/UsersIcons/notification.svg";
import quickPay from "../../assets/UsersIcons/quickPay.svg";
import aiIcon from "../../assets/UsersIcons/ai.png"; // AI Icon
import SlickSlider from "../PHED Components/Slider";

const services = [
  {
    text: "ViewBills",
    imageSrc: ViewBills,
    route: "#",
  },
  {
    text: "Complaints",
    imageSrc: complaints,
    route: "#",
  },
  {
    text: "QuickPay",
    imageSrc: quickPay,
    route: "#",
  },
  {
    text: "Notification",
    imageSrc: notification,
    route: "#",
  },
  {
    text: "Rewards",
    imageSrc: gift,
    route: "#",
  },
  {
    text: "WaterUsage",
    imageSrc: WaterUsage,
    route: "#",
  },
];

export default function UserDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to initialize Kommunicate only once
  useEffect(() => {
    if (!window.kommunicate) {
      (function (d, m) {
        var kommunicateSettings = {
          appId: "d6a1c706cb64c97e00c50ef770652ef3",
          popupWidget: true,
          automaticChatOpenOnNavigation: true,
          theme: {
            primaryColor: "#4EB4F8",
            secondaryColor: "#1E90FF",
            backgroundColor: "#FFFFFF",
            headerBackgroundColor: "#4EB4F8",
            chatBubblePrimaryBackgroundColor: "#E6F7FF",
            chatBubbleSecondaryBackgroundColor: "#D9EAFB",
            textColor: "#000000",
          },
        };
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0];
        h.appendChild(s);
        window.kommunicate = m;
        m._globals = kommunicateSettings;
      })(document, window.kommunicate || {});
    }
  }, []);

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
            />
          ))}
        </div>

       
      </div>

      {/* Chatbot Modal */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">AI Chatbot</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
              onClick={() => setIsDialogOpen(false)}
            >
              Close Chatbot
            </button>
          </div>
        </div>
      )}
    </>
  );
}
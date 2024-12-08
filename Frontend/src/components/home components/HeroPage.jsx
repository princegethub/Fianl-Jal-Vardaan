import React from "react";
import Hero from "../../assets/hero.svg";


function HeroPage() {
  return (

    <div className=" h-auto sm:h-[60vh] flex items-center justify-center bg-gradient-to-b from-[#4EB4F8] to-[#FFFFFF] py-6">

      {/* Main Content */}
      <div className="container w-[90%] mx-auto flex flex-col-reverse sm:flex-row items-center justify-between px-6">
        {/* Left Section */}
        <div className="w-full sm:w-[40%] mt-2 text-center sm:text-left px-4">
          <h1 className="text-[28px] sm:text-[33px] lg:text-[64px] font-grover text-gray-900 mb-1 sm:-mb-2 leading-snug sm:leading-normal">
            HAR GHAR JAL
          </h1>
          <h2 className="text-[18px] sm:text-xl lg:text-2xl text-gray-700 mb-2 sm:mb-2 font-inknut leading-snug sm:leading-normal">
            Ek Sapna, Ab Haqiqat
          </h2>
          <p className="text-gray-500 mb-8 sm:mb-4 text-sm sm:text-base leading-tight sm:leading-relaxed">
            Empowering every household with access to clean and safe drinking
            water. Together, we are building a healthier and sustainable future
            for all.
          </p>
          <button className="bg-blue-500 text-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300">
            Get Started
          </button>
        </div>

        {/* Right Section - Illustration */}
        <div className="w-full sm:w-[60%] flex justify-center sm:justify-end mb-6 sm:mb-0">
          <img
            src={Hero} // Replace with the actual image path
            alt="Hero Illustration"
            className="w-3/4 sm:w-full max-w-xs sm:max-w-md"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroPage;

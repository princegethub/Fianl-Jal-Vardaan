import React from "react";
import emeporment from "../../assets/image.png";
import location from "../../assets/location.png";
import waterquality from "../../assets/water quality.png";

export default function Archivement() {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-[#F0F8FF]">
      {/* Title */}
      <p className="text-[30px] font-mulish text-[#406B95] font-bold mb-8">
        What We Have Done
      </p>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-4 md:px-0">
        {/* Empowerment */}
        <div className="flex flex-col justify-center items-center gap-4 p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <img src={emeporment} alt="Empowerment" className="h-16 md:h-20" />
          <h4 className="text-[2rem] font-bold text-[#406B95]">10Cr Plus</h4>
          <p className="text-[#989898] text-center">HOUSEHOLDS EMPOWERED</p>
        </div>

        {/* Location */}
        <div className="flex flex-col justify-center items-center gap-4 p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <img src={location} alt="Location" className="h-16 md:h-20" />
          <h4 className="text-[2rem] font-bold text-[#406B95]">25Cr Plus</h4>
          <p className="text-[#989898] text-center">STATES AND COUNTING</p>
        </div>

        {/* Water Quality */}
        <div className="flex flex-col justify-center items-center gap-4 p-6 bg-white rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <img
            src={waterquality}
            alt="Water Quality"
            className="h-16 md:h-20"
          />
          <h4 className="text-[2rem] font-bold text-[#406B95]">80%</h4>
          <p className="text-[#989898] text-center">QUALITY WATER</p>
        </div>
      </div>
    </div>
  );
}

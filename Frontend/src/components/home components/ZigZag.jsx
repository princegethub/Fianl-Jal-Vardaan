import React from "react";
import ZIGZAG2 from "../../assets/ZigZag2.webp";
import ZIGZAG1 from "../../assets/ZigZag1.jpg";

function ZigZag() {
  return (
    <div className="w-full bg-[#EAF7FF] py-10 flex flex-col items-center justify-center">
      {/* Container */}
      <div className="w-[90%] lg:w-[80%] text-center">
        {/* ZigZag Sections */}
        <div className="space-y-12">
          {/* First Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src={ZIGZAG1}
                alt="Water Conservation 1"
                className="w-full h-auto rounded-lg"
              />
              <button className="absolute bottom-4 left-4 bg-[#406B95] text-white p-3 rounded-full shadow-lg">
                ▶
              </button>
            </div>

            {/* Text */}
            <div className="text-left">
              <h2 className="text-[#406B95] font-bold text-[24px] md:text-[28px] mb-4">
                Why Should Save Water?
              </h2>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
                Water is life, but it's limited. Saving water ensures future
                availability, supports ecosystems, and prevents scarcity. Every
                drop counts!
              </p>
              <ul className="text-gray-700 text-sm md:text-base leading-relaxed list-disc pl-5 mb-4">
                <li>Water is Life, Protect It</li>
                <li>Save Water, Secure the Future</li>
                <li>Every Drop Counts for Tomorrow</li>
              </ul>
              <button className="px-6 py-2 bg-[#406B95] text-white font-mulish rounded-lg shadow-md hover:bg-[#35557B]">
                Learn More
              </button>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Reversed Layout */}
            <div className="md:order-2 relative">
              <img
                src={ZIGZAG2}
                alt="Water Conservation 2"
                className="w-full h-auto rounded-lg"
              />
              <button className="absolute bottom-4 left-4 bg-[#406B95] text-white p-3 rounded-full shadow-lg">
                ▶
              </button>
            </div>

            {/* Text */}
            <div className="md:order-1 text-left">
              <h2 className="text-[#406B95] font-bold text-[24px] md:text-[28px] mb-4">
                What Our Vision?
              </h2>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
                To ensure clean water for all, promote conservation, and protect
                resources, creating a sustainable and prosperous future for
                everyone.
              </p>
              <ul className="text-gray-700 text-sm md:text-base leading-relaxed list-disc pl-5 mb-4">
                <li>Ensure Access to Clean Water</li>
                <li>Promote Water Conservation</li>
                <li>Protect Water Resources for Future Generations</li>
              </ul>
              <button className="px-6 py-2 bg-[#406B95] text-white font-mulish rounded-lg shadow-md hover:bg-[#35557B]">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ZigZag;

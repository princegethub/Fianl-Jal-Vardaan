import React from "react";

function Card({ imageSrc, text, onClick }) {
  return (
    <div
      className="flex flex-col cursor-pointer items-center justify-center bg-white/30 backdrop-blur-lg rounded-lg p-6 shadow-lg hover:shadow-xl transition-transform hover:scale-105 border border-white/40"
      onClick={onClick} // Trigger navigation on click
    >
      <img src={imageSrc} alt={text} className="w-16 h-16 mb-4 object-contain" />
      <h3 className="text-[18px] font-mulish text-[#406B95] font-semibold text-center">
        {text}
      </h3>
    </div>
  );
}

export default Card;

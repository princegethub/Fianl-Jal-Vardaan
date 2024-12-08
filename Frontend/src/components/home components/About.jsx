import React from "react";

function About() {
  return (
    <div className="w-full mt-16   bg-opacity-62 flex items-center justify-center">
      {/* Content Container */}
      <div className="w-[90%] mt-5 sm:w-[80%] text-center p-6">
        {/* Title */}
        <h1 className="text-[30px] font-mulish text-[#406B95] font-bold mb-4">
          About Jal Vardaan
        </h1>
        
        {/* Description */}
        <p className="text-gray-700 font-mulish mb-5 leading-relaxed">
          Water is the essence of life, and ensuring its availability is one of
          the most critical challenges in today's world. Recognizing the
          importance of water and its impact on public health, the Government of
          India launched the Jal Jeevan Mission (JJM) in 2019. This ambitious
          initiative aims to provide functional household tap connections (FHTC)
          to every rural household by 2024, ensuring clean and safe drinking
          water. The mission stands as a testament to the government’s
          commitment to improving the quality of life for millions of people,
          especially in rural areas where access to potable water has been a
          longstanding issue.
        </p>
      </div>
    </div>
  );
}

export default About;

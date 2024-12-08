import React from "react";
import WaterIllustration from "../../assets/WaterIllustration.png"; // Replace with your image path

function BetterTomorrow() {
  return (
  <div className="bg-gradient-to-b from-white via-[#EAF7FF] to-white bg-opacity-80 py-8 px-4">

      <div className="w-[90%] mx-auto">
      {/* Title */}
      <h1 className="text-center text-[#406B95] text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
        Save Water For A Better Tomorrow
      </h1>

      {/* Content Section */}
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left Column */}
        <div className="flex  flex-row lg:flex-row gap-8 lg:w-1/2 text-gray-700">
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-4">You should do</h2>
            <ul className="space-y-2">
              <li>✅ Fix leaks immediately</li>
              <li>✅ Install water-saving fixtures</li>
              <li>✅ Practice rainwater harvesting</li>
              <li>✅ Use water-saving taps</li>
              <li>✅ Reuse greywater</li>
              <li>✅ Spread awareness</li>
            </ul>
          </div>
          <div>
            <h2 className="text-sx sm:text-xl font-bold mb-4">You should avoid</h2>
            <ul className="space-y-2">
              <li>❌ Don't waste water</li>
              <li>❌ Don't leave taps running</li>
              <li>❌ Don't overwater plants</li>
              <li>❌ Don't ignore leaks</li>
              <li>❌ Don't use hoses unnecessarily</li>
              <li>❌ Avoid droplets</li>
            </ul>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src={WaterIllustration} // Replace with actual image file
            alt="Save Water"
            className="w-full max-w-md object-contain"
          />
        </div>
        
</div>
      </div>

      {/* Footer Description */}
      <p className="text-center text-gray-600 text-sm sm:text-base mt-8 px-4 sm:px-16">
        Saving water is not just an individual effort; it is a collective
        responsibility. Governments, industries, and citizens must work
        together to conserve this invaluable resource. Simple changes in our
        daily habits, coupled with larger policy initiatives, can make a
        profound difference.
      </p>
    </div>
  );
}

export default BetterTomorrow;

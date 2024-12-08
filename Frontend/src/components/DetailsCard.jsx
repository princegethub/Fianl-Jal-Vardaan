import React from 'react';

function DetailsCard({ gp, details, viewType, onBack }) {
  console.log('details: ', details);

  // Check if details for the current viewType are valid
  const hasDetails = viewType === 'Asset'
    ? details && details.assets && details.assets.length > 0
    : details && details.inventory && details.inventory.length > 0;

  // Render content based on viewType
  return (
    <div className="w-full shadow-lg rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-600">
          {gp.name} - {viewType} Details
        </h2>
        <button
          onClick={onBack}
          className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow hover:bg-gray-400 transition-all"
        >
          Back
        </button>
      </div>

      {/* Conditional rendering for details */}
      {hasDetails ? (
        <div className="max-h-96 overflow-y-auto custom-scrollbar">
          <ul className="space-y-4">
            {viewType === 'Asset' ? (
              details.assets.map((item, index) => (
                <li
                  key={index}
                  className="bg-[#e0f2ff] text-blue-700 rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                >
                  <p className="font-semibold">Category: {item.category}</p>
                  <p>Description: {item.description}</p>
                  <p>Quantity: {item.quantity}</p>
                </li>
              ))
            ) : (
              details.inventory.map((item, index) => (
                <li
                  key={index}
                  className="bg-[#e0f2ff] text-blue-700 rounded-lg shadow p-4 hover:shadow-md transition-shadow"
                >
                  <p className="font-semibold">Category: {item.category}</p>
                  <p>Description: {item.description}</p>
                  <p>Quantity: {item.quantity}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      ) : (
        // Show a fallback message if no details are available
        <div className="text-center text-gray-500">
          <p>No {viewType.toLowerCase()} details available for this GP.</p>
        </div>
      )}
    </div>
  );
}

export default DetailsCard;

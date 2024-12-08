import React from 'react';

const ListCard = ({ gps, onSelect }) => {
  return (
    <div className="shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold text-blue-600 mb-6">
        Choose GP to view details
      </h2>
      <div className="max-h-96 overflow-y-auto custom-scrollbar"> {/* Set a max height and enable scrolling */}
        <ul className="space-y-4">
          {gps.map((gp, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-[#e0f2ff] text-blue-700 rounded-lg shadow p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">
                {gp.name.charAt(0)}
                </div>
                <span className="text-lg">{gp.name}</span>
              </div>
              <button
                onClick={() => onSelect(gp)} // Trigger the selection callback
                className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition-all"
              >
                View → 
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListCard;

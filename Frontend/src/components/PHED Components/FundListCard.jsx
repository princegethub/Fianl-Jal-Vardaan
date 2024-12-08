
// FundListCard Component
import React from "react";

function FundListCard({ fundRequests, onFundClick, onButtonClick }) {
  return (
    <div className="flex flex-col gap-4">
      {fundRequests.map((fund) => (
        <div
          key={fund._id}
          className="bg-gradient-to-b from-[#4EB4F8] to-white shadow-md p-4 rounded-lg flex justify-between items-center"
          onClick={() => onFundClick(fund)}
        >
          <div>
            <h3 className="font-bold text-lg">{fund.gpName || "GP Name"}</h3>
            <p className="text-sm text-gray-700">{fund.category}</p>
            <p className="text-sm text-gray-700">Amount: ₹{fund.amount}</p>
          </div>
          <button
            className={`py-2 px-4 rounded-full border-2 font-semibold transition-all ${
              fund.status === "Approved"
                ? "text-gray-900 border-green-700"
                : "text-gray-600 border-red-700"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onButtonClick(fund);
            }}
          >
            {fund.status}
          </button>
        </div>
      ))}
    </div>
  );
}

export default FundListCard;

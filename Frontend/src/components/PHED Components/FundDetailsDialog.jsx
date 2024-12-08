// FundDetailsDialog Component
import React from "react";

function FundDetailsDialog({ fund, onClose, onPaid }) {
  console.log("fund: ", fund.status);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-gradient-to-b from-[#4EB4F8] to-[white] rounded-lg p-6 shadow-md w-[90vw] max-w-md">
        <h2 className="text-xl font-semibold mb-4">Fund Request Details</h2>
        <p>
          <strong>GP Name:</strong> {fund.gpName}
        </p>
        <p>
          <strong>Category:</strong> {fund.category}
        </p>
        <p>
          <strong>Amount:</strong> ₹{fund.amount}
        </p>
        <p className="mt-4">
          <strong>Description:</strong> {fund.description}
        </p>
        <div className="flex justify-end mt-6 gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-all"
            onClick={onClose}
          >
            Close
          </button>
          {fund.status === "Pending" ? (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
              onClick={() => onPaid(fund._id)}
            >
              Mark as Paid 💰
            </button>
          ) : (
            <span className="text-black rounded-lg  px-4 py-2 bg-green-500  font-semibold">Approved</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default FundDetailsDialog;

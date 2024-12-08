import React from "react";

function GPAlertDetailsDialog({ alert, onClose, onAssignWorker }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-md">
      <div className="bg-gradient-to-b from-[#4EB4F8] to-[white] rounded-lg p-6 shadow-md w-[90vw] max-w-md">
        <h2 className="text-xl font-semibold mb-4">Alert Details</h2>
        <p><strong>Source:</strong> {alert.source}</p>
        <p><strong>Category:</strong> {alert.alertCategory}</p>
        <p className="mt-4"><strong>Message:</strong> {alert.message}</p>

        <div className="flex justify-end mt-6 gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-all"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
            onClick={() => {
              onAssignWorker(alert.id); // Assign worker
              onClose(); // Close the dialog after assigning
            }}
          >
            Assign Worker
          </button>
        </div>
      </div>
    </div>
  );
}

export default GPAlertDetailsDialog;
          
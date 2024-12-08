import React, { useState } from 'react';

function AlertDetailsDialog({ alert, onClose, onAcknowledge }) {
  const [loading, setLoading] = useState(false);

  const handleAcknowledge = async () => {
    setLoading(true);
    await onAcknowledge(alert._id);
    setLoading(false);
  };

  const isPending = alert.status === "Pending";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-md">
      {/* Modal Content */}
      <div className="bg-gradient-to-b from-[#4EB4F8] to-[white] rounded-lg p-6 shadow-md w-[90vw] max-w-md">
        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">Alert Details</h2>
        {/* GP Name */}
        <p><strong>GP Name:</strong> {alert.gpName}</p>
        {/* Alert Category */}
        <p><strong>Category:</strong>  {alert.category}</p>
        {/* Full Message */}
        <p className="mt-4"><strong>Message:</strong> {alert.message}</p>
        {/* Status */}
        <p className="mt-4"><strong>Status:</strong> {alert.status}</p>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6 gap-4">
          {/* Close Button */}
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-all"
            onClick={onClose}
          >
            Close
          </button>
          {/* Acknowledge Button */}
          <button
            className={`px-4 py-2 text-white rounded-lg transition-all ${isPending ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleAcknowledge}
            disabled={loading}
          >
            {loading ? 'Acknowledging...' : isPending ? 'Pending' : 'Acknowledged'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertDetailsDialog;

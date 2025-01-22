import React, { useEffect } from 'react';

export default function ChatbotDialog({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      (function (d, m) {
        var kommunicateSettings = {
          appId: "d6a1c706cb64c97e00c50ef770652ef3",
          popupWidget: true,
          automaticChatOpenOnNavigation: true,
        };
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0];
        h.appendChild(s);
        window.kommunicate = m;
        m._globals = kommunicateSettings;
      })(document, window.kommunicate || {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">AI Chatbot</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          onClick={onClose}
        >
          Close Chatbot
        </button>
      </div>
    </div>
  );
}

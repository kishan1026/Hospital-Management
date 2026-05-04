import React from "react";

const AlertBox = ({ message, type, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm text-center">

        <p className={`text-lg font-medium mb-4 
          ${type === "success" ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>

        <button
          onClick={onClose}
          className="bg-[#5f6FFF] text-white px-6 py-2 rounded-lg hover:scale-105 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default AlertBox;
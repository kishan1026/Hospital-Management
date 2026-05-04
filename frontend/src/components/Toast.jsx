import React, { useEffect } from "react";

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // auto close after 3 sec

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 right-5 z-50 animate-fade-in">
      <div
        className={`px-5 py-3 rounded-xl shadow-lg text-white text-sm
        ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;
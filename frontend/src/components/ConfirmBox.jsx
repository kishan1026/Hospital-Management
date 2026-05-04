import React, { useEffect } from "react";

const ConfirmBox = ({ message, onYes, onNo }) => {

  // ESC key close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onNo();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onNo]);

  return (
    <div 
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onNo} // outside click close
    >
      <div 
        onClick={(e) => e.stopPropagation()} // prevent close on box click
        className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-sm text-center animate-scaleIn"
      >

        <p className="text-lg font-semibold text-gray-800 mb-6">
          {message}
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onYes}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:scale-105 transition"
          >
            Yes
          </button>

          <button
            onClick={onNo}
            className="bg-gray-200 px-5 py-2 rounded-lg hover:scale-105 transition"
          >
            No
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmBox;
import React, { useEffect, useState } from "react";
import ConfirmBox from "../components/ConfirmBox";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const [confirm, setConfirm] = useState({
    show: false,
    id: null,
  });

  // Load appointments
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(data);
  }, []);

  // Open confirm box
  const handleCancelClick = (id) => {
    setConfirm({ show: true, id });
  };

  // Confirm cancel
  const confirmCancel = () => {
    const updated = appointments.filter((item) => item.id !== confirm.id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
    setConfirm({ show: false, id: null });
  };

  // Close popup
  const closeConfirm = () => {
    setConfirm({ show: false, id: null });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 md:px-16 py-12">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          My Appointments
        </h1>

        <div className="space-y-6">
          {appointments.length === 0 ? (
            <p className="text-center text-gray-500">
              No appointments booked yet ❌
            </p>
          ) : (
            appointments.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between gap-6"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.docName}
                  </h2>
                  <p className="text-gray-600">{item.speciality}</p>
                  <p className="text-gray-500 mt-2">Date: {item.date}</p>
                  <p className="text-gray-500">Time: {item.time}</p>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() => handleCancelClick(item.id)}
                    className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* ✅ IMPORTANT: ConfirmBox render */}
      {confirm.show && (
        <ConfirmBox
          message="Are you sure you want to cancel this appointment?"
          onYes={confirmCancel}
          onNo={closeConfirm}
        />
      )}

    </div>
  );
};

export default MyAppointments;
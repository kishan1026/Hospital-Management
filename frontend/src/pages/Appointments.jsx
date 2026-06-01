import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import AlertBox from "../components/AlertBox";

const Appointments = () => {
  const navigate = useNavigate();
  const { docId } = useParams();

  // ✅ Get token from AppContext
  const { doctors, currencySymbol, token } = useContext(AppContext);

  // ✅ Alert state
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showAlert = (message, type = "error") => {
    setAlert({
      show: true,
      message,
      type,
    });
  };

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // ✅ Fetch selected doctor info
  const fetchDocInfo = () => {
    const doc = doctors.find((doctor) => doctor._id === docId);
    setDocInfo(doc);
  };

  // ✅ Generate available time slots
  const getAvailableSlots = () => {
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(today);
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // Today's slots start from next available half hour
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10
            ? currentDate.getHours() + 1
            : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      currentDate.setSeconds(0);
      currentDate.setMilliseconds(0);

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  // Load doctor info
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  // Generate slots after doctor info loads
  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  // ✅ Book Appointment
  const bookAppointment = () => {
    // 1️⃣ Check login
    if (!token) {
      showAlert("Please login first to book an appointment.", "error");

      // Redirect to login after 1.5 seconds
      setTimeout(() => {
        navigate("/login");
      }, 1500);

      return;
    }

    // 2️⃣ Check if time slot is selected
    if (!slotTime) {
      showAlert("Please select a time slot.", "error");
      return;
    }

    // 3️⃣ Create booking data
    const bookingData = {
      id: Date.now(),
      docId: docInfo._id,
      docName: docInfo.name,
      speciality: docInfo.speciality,
      image: docInfo.image,
      fees: docInfo.fees,
      date: docSlots[slotIndex][0].datetime.toDateString(),
      time: slotTime,
    };

    // 4️⃣ Get old appointments
    const oldBookings =
      JSON.parse(localStorage.getItem("appointments")) || [];

    // 5️⃣ Save new appointment
    oldBookings.push(bookingData);
    localStorage.setItem(
      "appointments",
      JSON.stringify(oldBookings)
    );

    // 6️⃣ Show success card
    showAlert("Appointment Booked Successfully ✅", "success");

    // 7️⃣ Reset selected slot
    setSlotTime("");
  };

  return (
    docInfo && (
      <div>
        {/* Alert Box */}
        {alert.show && (
          <AlertBox
            message={alert.message}
            type={alert.type}
            onClose={() =>
              setAlert({
                ...alert,
                show: false,
              })
            }
          />
        )}

        {/* Doctor Info */}
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            className="bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt={docInfo.name}
          />

          <div className="flex-1 border rounded-lg p-6 bg-white">
            <p className="flex items-center gap-2 text-2xl font-medium">
              {docInfo.name}
              <img
                className="w-5"
                src={assets.verified_icon}
                alt="Verified"
              />
            </p>

            <p className="text-sm text-gray-600 mt-1">
              {docInfo.degree} - {docInfo.speciality}
            </p>

            <p className="text-sm text-gray-500 mt-3">
              {docInfo.about}
            </p>

            <p className="mt-3 font-medium">
              Fee: {currencySymbol}
              {docInfo.fees}
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="mt-10">
          <p className="font-medium text-gray-700">
            Booking Slots
          </p>

          {/* Days */}
          <div className="flex gap-3 overflow-x-auto mt-4">
            {docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setSlotIndex(index);
                  setSlotTime(""); // reset selected time when day changes
                }}
                className={`text-center py-4 px-4 rounded-full cursor-pointer min-w-[60px]
                ${
                  slotIndex === index
                    ? "bg-[#5f6FFF] text-white"
                    : "border"
                }`}
              >
                <p>
                  {item[0] &&
                    daysOfWeek[item[0].datetime.getDay()]}
                </p>
                <p>
                  {item[0] &&
                    item[0].datetime.getDate()}
                </p>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          <div className="flex gap-3 flex-wrap mt-6">
            {docSlots[slotIndex]?.map((item, index) => (
              <p
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`px-4 py-2 rounded-full cursor-pointer border
                ${
                  item.time === slotTime
                    ? "bg-[#5f6FFF] text-white"
                    : ""
                }`}
              >
                {item.time}
              </p>
            ))}
          </div>

          {/* Book Appointment Button */}
          <button
            onClick={bookAppointment}
            className="bg-[#5f6FFF] text-white px-10 py-3 rounded-full mt-6 hover:scale-105 transition"
          >
            Book Appointment
          </button>
        </div>
      </div>
    )
  );
};

export default Appointments;
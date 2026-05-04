import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import AlertBox from "../components/AlertBox";
import { useNavigate } from 'react-router-dom';

const Appointments = () => {
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: ""
  });
  const showAlert = (msg, type="error") => {
    setAlert({ show: true, message: msg, type });
  };

  const { docId } = useParams()
  const { doctors, currencySymbol } = useContext(AppContext)

  const daysOfWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const navigate = useNavigate();

  // fetch doctor
  const fetchDocInfo = () => {
    const doc = doctors.find(doc => doc._id === docId)
    setDocInfo(doc)
  }

  // slots
  const getAvailableSlots = () => {
    setDocSlots([])
    let today = new Date()

    for (let i = 0; i < 7; i++) {

      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21,0,0,0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours()+1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => [...prev, timeSlots])
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  // booking function
  const bookAppointment = () => {

    // ✅ CHECK LOGIN
    const isLoggedIn = localStorage.getItem("isLoggedIn");
  
    if (!isLoggedIn) {
      showAlert("Please login first ❌");
      navigate("/login");
      return;
    }
  
    if (!slotTime) {
      showAlert("Please select a time slot");
      return;
    }
  
    const bookingData = {
      id: Date.now(),
      docName: docInfo.name,
      speciality: docInfo.speciality,
      date: docSlots[slotIndex][0].datetime.toDateString(),
      time: slotTime
    };
  
    let oldBookings = JSON.parse(localStorage.getItem("appointments")) || [];
  
    oldBookings.push(bookingData);
  
    localStorage.setItem("appointments", JSON.stringify(oldBookings));
  
    showAlert("Appointment Booked ✅", "success");
  };

  return docInfo && (
    <div>

      {/* Doctor Info */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <img className="bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt="" />

        <div className='flex-1 border rounded-lg p-6 bg-white'>
          <p className='flex items-center gap-2 text-2xl font-medium'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>

          <p className='text-sm text-gray-600 mt-1'>
            {docInfo.degree} - {docInfo.speciality}
          </p>

          <p className='text-sm text-gray-500 mt-3'>{docInfo.about}</p>

          <p className='mt-3 font-medium'>
            Fee: {currencySymbol}{docInfo.fees}
          </p>
        </div>
      </div>

      {/* Slots */}
      <div className='mt-10'>
        <p className='font-medium text-gray-700'>Booking Slots</p>

        {/* Days */}
        <div className='flex gap-3 overflow-x-auto mt-4'>
          {
            docSlots.map((item,index)=>(
              <div 
                onClick={()=> setSlotIndex(index)}
                key={index}
                className={`text-center py-4 px-4 rounded-full cursor-pointer min-w-[60px]
                ${slotIndex === index ? "bg-[#5f6FFF] text-white" : "border"}`}
              >
                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        {/* Time Slots */}
        <div className='flex gap-3 flex-wrap mt-6'>
          {
            docSlots[slotIndex]?.map((item,index)=>(
              <p
                onClick={()=> setSlotTime(item.time)}
                key={index}
                className={`px-4 py-2 rounded-full cursor-pointer border
                ${item.time === slotTime ? "bg-[#5f6FFF] text-white" : ""}`}
              >
                {item.time}
              </p>
            ))
          }
        </div>

        {/* Button */}
        <button 
          onClick={bookAppointment}
          className='bg-[#5f6FFF] text-white px-10 py-3 rounded-full mt-6 hover:scale-105 transition'
        >
          Book Appointment
        </button>
      </div>

      {alert.show && (
  <AlertBox
    message={alert.message}
    type={alert.type}
    onClose={() => setAlert({ ...alert, show: false })}
  />
)}

    </div>
  )
}

export default Appointments
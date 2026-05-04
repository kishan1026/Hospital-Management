import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200 px-6 md:px-16 py-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          
          {/* Left Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6 transform transition duration-500 hover:scale-105">
            <h2 className="text-2xl font-semibold text-gray-800">
              Get in Touch
            </h2>

            <div className="flex items-center gap-4 hover:translate-x-2 transition">
              <MapPin className="w-6 h-6 text-black" />
              <p className="text-gray-600">
                Prescripto Hospital, Jalandhar, Punjab
              </p>
            </div>

            <div className="flex items-center gap-4 hover:translate-x-2 transition">
              <Phone className="w-6 h-6 text-black" />
              <p className="text-gray-600">+91 98765 43210</p>
            </div>

            <div className="flex items-center gap-4 hover:translate-x-2 transition">
              <Mail className="w-6 h-6 text-black" />
              <p className="text-gray-600">support@priscripto.com</p>
            </div>

            <div className="flex items-center gap-4 hover:translate-x-2 transition">
              <Clock className="w-6 h-6 text-black" />
              <p className="text-gray-600">
                Mon - Sat : 9:00 AM - 8:00 PM
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 transform transition duration-500 hover:scale-105">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Send a Message
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg hover:scale-105 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Our Location
          </h2>

          <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-[1.02]">
            <iframe
              title="hospital-location"
              src="https://www.google.com/maps?q=Jalandhar,Punjab&output=embed"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
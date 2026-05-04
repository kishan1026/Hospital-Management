import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200 px-6 md:px-16 py-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          About Prescripto
        </h1>

        {/* Main Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Image with 3D effect */}
          <div className="transform transition duration-500 hover:scale-105 hover:rotate-1">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d"
              alt="Hospital"
              className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold text-gray-800">
              Your Health, Our Priority
            </h2>

            <p className="text-gray-600 leading-7">
              Prescripto is a modern hospital management system designed to
              simplify healthcare services. From booking appointments to managing
              prescriptions, everything is just a few clicks away.
            </p>

            <p className="text-gray-600 leading-7">
              We combine cutting-edge technology with expert medical care to
              ensure patients receive the best experience possible.
            </p>

            <p className="text-gray-600 leading-7">
              Our system helps hospitals streamline operations, reduce waiting
              times, and improve overall patient satisfaction.
            </p>
          </div>
        </div>

        {/* Extra Section (Cards with 3D hover) */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg transform transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Smart Appointments
            </h3>
            <p className="text-gray-600">
              Book and manage appointments easily with real-time availability of doctors.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg transform transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Digital Records
            </h3>
            <p className="text-gray-600">
              Maintain patient history, prescriptions, and reports digitally in one place.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg transform transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              24/7 Support
            </h3>
            <p className="text-gray-600">
              Get continuous support and assistance anytime for better healthcare service.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-600 leading-7">
            To revolutionize healthcare by making it more accessible, efficient,
            and patient-friendly using advanced technology and innovation.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;
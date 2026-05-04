import React from "react";

const Gallery = () => {
  const images = [
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
    "https://images.unsplash.com/photo-1579154204601-01588f351e67",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
    
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907",
    "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b",
    "https://images.unsplash.com/photo-1600959907703-125ba1374a12",
    "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc",
    "https://images.unsplash.com/photo-1551190822-a9333d879b1f"
  ];

  return (
    <div className="bg-gray-50 px-6 md:px-16 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Our Gallery
        </h1>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg"
            >
              <img
                src={img}
                alt="hospital"
                className="w-full h-64 object-cover transform transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <p className="text-white text-lg font-semibold">
                  Prescripto Hospital
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Facilities Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Our Facilities
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition">
              <h3 className="text-xl font-semibold mb-3">24/7 Emergency</h3>
              <p className="text-gray-600">
                Our emergency department is available round the clock with expert doctors and staff.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition">
              <h3 className="text-xl font-semibold mb-3">Advanced ICU</h3>
              <p className="text-gray-600">
                مجهز ICU with modern life-support systems and continuous monitoring facilities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition">
              <h3 className="text-xl font-semibold mb-3">Expert Doctors</h3>
              <p className="text-gray-600">
                Highly experienced specialists across multiple departments for best care.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition">
              <h3 className="text-xl font-semibold mb-3">Online Appointments</h3>
              <p className="text-gray-600">
                Book appointments easily through our smart hospital management system.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition">
              <h3 className="text-xl font-semibold mb-3">Pharmacy</h3>
              <p className="text-gray-600">
                In-house pharmacy with all essential medicines available anytime.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition">
              <h3 className="text-xl font-semibold mb-3">Diagnostic Lab</h3>
              <p className="text-gray-600">
                Fully equipped lab for fast and accurate test results.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Gallery;
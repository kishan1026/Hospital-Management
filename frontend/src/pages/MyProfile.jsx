import React, { useState } from "react";

const MyProfile = () => {
  const [edit, setEdit] = useState(false);

  const [user, setUser] = useState({
    name: "Nishant",
    email: "nishant@example.com",
    phone: "+91 98765 43210",
    address: "Jalandhar, Punjab",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200 px-6 md:px-16 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          My Profile
        </h1>

        <div className="flex flex-col md:flex-row gap-10 items-center">

          {/* Profile Image */}
          <div className="relative group">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGVVMxLiIouqPDCxQvdbAZdu_Y9PTrp3mqGg&s"
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-white"
            />

            {/* Hover overlay */}
            {edit && (
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white text-sm opacity-0 group-hover:opacity-100 transition">
                Change Photo
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="flex-1 space-y-5 w-full">

            {/* Name */}
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              {edit ? (
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              ) : (
                <p className="text-lg font-medium text-gray-800">{user.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <p className="text-sm text-gray-500">Email</p>
              {edit ? (
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              ) : (
                <p className="text-lg font-medium text-gray-800">{user.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              {edit ? (
                <input
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              ) : (
                <p className="text-lg font-medium text-gray-800">{user.phone}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <p className="text-sm text-gray-500">Address</p>
              {edit ? (
                <input
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 mt-1"
                />
              ) : (
                <p className="text-lg font-medium text-gray-800">{user.address}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              {edit ? (
                <>
                  <button
                    onClick={() => setEdit(false)}
                    className="bg-black text-white px-6 py-2 rounded-lg hover:scale-105 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEdit(false)}
                    className="border px-6 py-2 rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEdit(true)}
                  className="bg-black text-white px-6 py-3 rounded-lg hover:scale-105 transition"
                >
                  Edit Profile
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
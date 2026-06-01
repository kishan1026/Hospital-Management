import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Toast from "../components/Toast";

// ✅ Your deployed backend URL
const BASE_URL = "https://hospital-management-1-76du.onrender.com";

const Login = () => {
  const navigate = useNavigate();

  // ✅ Use login() from AppContext
  // login(token, userData)
  const { login } = useContext(AppContext);

  const [toast, setToast] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ API URL
    const url = isLogin
      ? `${BASE_URL}/api/auth/login`
      : `${BASE_URL}/api/auth/register`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // ✅ Save token + user
      if (res.ok && data.token) {
        // IMPORTANT: pass BOTH token and user data
        login(data.token, data.user);

        // Success toast
        setToast({
          message: isLogin
            ? "Login Successful ✅"
            : "Account Created Successfully 🎉",
          type: "success",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          password: "",
        });

        // Redirect to home page after 1 second
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        // Error from backend
        setToast({
          message: data.message || "Something went wrong ❌",
          type: "error",
        });
      }
    } catch (error) {
      console.log("Login/Register Error:", error);

      // Server/network error
      setToast({
        message: "Server error ❌",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200 flex items-center justify-center px-6 py-12">
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          {isLogin ? "Login" : "Create Account"}
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Welcome to Prescripto Hospital Management System
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name field only for signup */}
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          )}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg transition transform active:scale-95 md:hover:scale-105"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {/* Toggle Login / Signup */}
        <p className="text-center text-sm text-gray-600 mt-6">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-black font-medium cursor-pointer ml-1"
          >
            {isLogin ? "Sign up" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Toast from "../components/Toast";

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);

  const [toast, setToast] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:8080/api/auth/login"
      : "http://localhost:8080/api/auth/register";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);

        setToast({
          message: isLogin
            ? "Login Successful ✅"
            : "Account Created Successfully 🎉",
          type: "success",
        });

        setFormData({
          name: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setToast({
          message: data.message || "Something went wrong ❌",
          type: "error",
        });
      }
    } catch (error) {
      console.log(error);
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

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          {isLogin ? "Login" : "Create Account"}
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Welcome to Prescripto Hospital Management System
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

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

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg transition transform active:scale-95 md:hover:scale-105"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}

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
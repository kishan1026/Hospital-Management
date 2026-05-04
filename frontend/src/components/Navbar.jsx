import React, { useState, useContext, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, logout } = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const dropdownRef = useRef();

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // ✅ Disable scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = showMenu ? "hidden" : "auto";
  }, [showMenu]);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300 px-4 md:px-10">

      {/* Logo */}
      <img
        onClick={() => {
          navigate("/");
          scrollTo(0, 0);
        }}
        className="w-36 md:w-44 cursor-pointer"
        src={assets.logo}
        alt=""
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-start gap-6 font-medium">
        <NavLink to="/"><li>HOME</li></NavLink>
        <NavLink to="/doctors"><li>ALL DOCTORS</li></NavLink>
        <NavLink to="/about"><li>ABOUT</li></NavLink>
        <NavLink to="/gallery"><li>GALLERY</li></NavLink>
        <NavLink to="/contact"><li>CONTACT</li></NavLink>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {token ? (
          <div className="relative" ref={dropdownRef}>

            {/* Profile */}
            <div
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img className="w-8 rounded-full" src={assets.profile_pic} alt="" />
              <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            </div>

            {/* Dropdown */}
            {openDropdown && (
              <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-xl flex flex-col gap-3 p-4 z-20 animate-fadeIn">

                <p
                  onClick={() => {
                    navigate("/my-profile");
                    setOpenDropdown(false);
                  }}
                  className="cursor-pointer hover:text-black"
                >
                  My Profile
                </p>

                <p
                  onClick={() => {
                    navigate("/my-appointments");
                    setOpenDropdown(false);
                  }}
                  className="cursor-pointer hover:text-black"
                >
                  My Appointments
                </p>

                <p
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="cursor-pointer text-red-500 hover:text-red-600"
                >
                  Logout
                </p>

              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-[#5f6FFF] text-white px-5 py-2 rounded-full text-sm"
          >
            Login
          </button>
        )}

        {/* Hamburger */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt=""
        />
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col p-6">

          {/* Close */}
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">Menu</p>
            <p
              onClick={() => setShowMenu(false)}
              className="text-2xl cursor-pointer"
            >
              ✖
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-6 mt-10 text-lg font-medium">

            <NavLink onClick={() => setShowMenu(false)} to="/">HOME</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">ALL DOCTORS</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">ABOUT</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/gallery">GALLERY</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">CONTACT</NavLink>

            {/* ✅ Mobile Auth */}
            {token ? (
              <>
                <hr />
                <p onClick={() => navigate("/my-profile")}>My Profile</p>
                <p onClick={() => navigate("/my-appointments")}>My Appointments</p>
                <p
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="text-red-500"
                >
                  Logout
                </p>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-black text-white py-3 rounded-lg"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
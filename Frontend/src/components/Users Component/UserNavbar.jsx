import React, { useState } from 'react'
import Logo from "../../assets/Logo.png"
import { Link } from "react-router-dom";

export default function UserNavbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };



  return (
    <nav
      className={`${
        isSticky
          ? "fixed top-0 left-0 w-full bg-white shadow-md z-50"
          : "sticky"
      } bg-white shadow-xl z-10 h-[10vh] flex justify-center transition-all duration-300`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Left Side - Logo and Titles */}
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="w-16" />
          <div className="text-left leading-3">
            <h1 className="text-xl font-bold text-blue-600">Jal Vardaan</h1>
            <p className="text-[12px] text-gray-600">
              Department of Drinking Water & Sanitation <br />
              Ministry of Jalshakti
            </p>
          </div>
        </div>

        {/* Hamburger Button for Mobile */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "flex bg-gray-100" : "hidden"
          } absolute top-16 left-0 w-full flex-col items-center space-y-4 py-4 sm:relative sm:top-0 sm:left-0 sm:w-auto sm:flex sm:flex-row sm:space-y-0 sm:space-x-6 sm:bg-transparent`}
        >
          <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 text-sm font-medium text-gray-700">
            <Link to="/phed" className="hover:text-blue-600 cursor-pointer">
              Home
            </Link>
            <Link to="/phed/assestinventory" className="hover:text-blue-600 cursor-pointer">
            Inoventory
            </Link>
            <Link to="/phed/alerts" className="hover:text-blue-600 cursor-pointer">
              Notification
            </Link>
          </ul>

          {/* Profile Icon with Dropdown */}
          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
            >
              <img
                src="https://www.w3schools.com/w3images/avatar2.png"
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            </button>

            {/* Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
                <ul className="text-sm text-gray-700">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      My Account
                    </Link>
                  </li>
                  <li>
                    <Link to="/login">
                    <button className="block px-4 py-2 w-full text-left hover:bg-gray-100">
                      Logout
                    </button></Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>


      </div>
    </nav>
  )
}

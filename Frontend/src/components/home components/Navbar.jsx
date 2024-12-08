import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll to toggle sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`${
        isSticky ? "fixed top-0 left-0 w-full bg-white shadow-md z-50" : "sticky"
      } bg-white shadow-xl h-[10vh] flex justify-center transition-all duration-300`}
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
            <Link to="/" className="hover:text-blue-600 cursor-pointer">
              Home
            </Link>
            <Link to="/about" className="hover:text-blue-600 cursor-pointer">
              About
            </Link>
            <Link to="/vision" className="hover:text-blue-600 cursor-pointer">
              Our Vision
            </Link>
            <Link to="/contact" className="hover:text-blue-600 cursor-pointer">
              Contact
            </Link>
          </ul>
          <Link to="/login">
            <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

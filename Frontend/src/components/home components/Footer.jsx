import React from "react";
import DigtalIndia from "../../assets/digital-india.png";
import MakeInIndia from "../../assets/makeinindia.png";
import IndiaGov from "../../assets/india-gov.png";
import Goidirectory from "../../assets/goidirectory.png";
import DataGov from "../../assets/data-gov.png";
import MyGov from "../../assets/mygov.png";

function Footer() {
  return (
    <>
      {" "}
      {/* Icon Section */}
      <div className="icon-section w-[100%] bg-white py-4">
        <div className="w-[90%] mx-auto  flex flex-wrap justify-around items-center gap-6">
          <img className="h-16" src={DigtalIndia} alt="Digital India" />
          <img className="h-16" src={MakeInIndia} alt="Make in India" />
          <img className="h-16" src={IndiaGov} alt="India Gov" />
          <img className="h-16" src={Goidirectory} alt="GOI Directory" />
          <img className="h-16" src={DataGov} alt="Data Gov" />
          <img className="h-16" src={MyGov} alt="My Gov" />
        </div>
      </div>
      <div className="bg-[#F9F9FF] py-10">
        {/* Main Footer Content */}
        <div className="w-[90%] mx-auto flex flex-wrap justify-between text-gray-700">
          {/* About Section */}
          <div className="w-full md:w-[20%] mb-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">About</h3>
            <p className="text-sm leading-relaxed">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
            </p>
            {/* Social Media Icons */}
            <div className="flex gap-3 mt-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="w-full md:w-[20%] mb-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Symptoms
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Prevention
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About Coronavirus
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Helpful Links Section */}
          <div className="w-full md:w-[20%] mb-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">
              Helpful Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  Healthcare Professional
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  LGU Facilities
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Protect Your Family
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  World Health
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div className="w-full md:w-[20%] mb-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:underline">
                  WHO Website
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  CDC Website
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Gov Website
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  DOH Website
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;

import React from "react";

function Footer_PHED() {
  return (
    <footer className="bg-[#F9F9FF] text-gray-700 py-9">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
          <p className="text-sm">
            Email: <a href="mailto:contactprince24.7@gmail.com" className="hover:underline">contactprince24.7@gmail.com</a>
          </p>
          <p className="text-sm">
            Phone: <a href="tel:9372496705" className="hover:underline">9372496705</a>
          </p>
        </div>

        {/* Connect Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect</h3>
          <p className="text-sm">
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              LinkedIn
            </a>
          </p>
          <p className="text-sm">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Instagram
            </a>
          </p>
        </div>

        {/* Location Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
          <p className="text-sm">
            World College of Technology and Management<br />
            Gurgaon, Haryana
          </p>
        </div>

        {/* Color Match Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Theme</h3>
          <p className="text-sm">
            Website colors are carefully chosen to match the aesthetics. Footer uses light shades of blue-gray (#F9F9FF).
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer_PHED;

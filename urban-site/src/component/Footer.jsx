import React from "react";

const Footer = () => {
  return (
    <footer className="bg-backg text-primary text-sm py-3 bottom-0 w-full">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <p>
            &copy; {new Date().getFullYear()} Buildwind. All rights reserved.
          </p>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

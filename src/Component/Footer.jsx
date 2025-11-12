import React from "react";
import logo from "../assets/EcoBill.png";

const Footer = () => {
  return (
    <div>
      <footer className="bg-neutral text-neutral-content p-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-center text-center md:text-left space-y-3">
            <img
              className="h-20 w-20 border-2 rounded-full"
              src={logo}
              alt="Eco Bill Logo"
            />
            <p className="text-sm leading-relaxed text-gray-300">
              A full-stack Utility Bill Management System built with the MERN
              Stack, featuring secure login, bill tracking, and PDF report
              generation.
            </p>
          </div>

          {/* Services */}
          <nav className="flex  flex-col md:text-center space-y-2">
            <h6 className="footer-title">Services</h6>
            <a className="link link-hover">Secure User Authentication</a>
            <a className="link link-hover">Multi-Utility Bill Management</a>
            <a className="link link-hover">Smart Search & Filter System</a>
            <a className="link link-hover">Responsive & Interactive UI</a>
          </nav>

          {/* Company */}
          <nav className="flex flex-col md:text-center space-y-2">
            <h6 className="footer-title">Company</h6>
            <a href="/" className="link link-hover">
              Home
            </a>
            <a href="/bills" className="link link-hover">
              Bills
            </a>
            <a href="/about" className="link link-hover">
              About
            </a>
            <a href="/contact" className="link link-hover">
              Contact
            </a>
          </nav>

          {/* Legal */}
          <nav className="flex flex-col md:text-center space-y-2">
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of Use</a>
            <a className="link link-hover">Privacy Policy</a>
            <a className="link link-hover">Cookie Policy</a>
          </nav>
        </div>

        <hr className="my-6 border-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[12px] text-gray-400 gap-2">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-gray-300">Eco Bill</span> |
            Developed by{" "}
            <span className="font-medium text-gray-200">Md Mohebur</span>. All
            Rights Reserved.
          </p>
          <p>This project was made by Mohebur.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

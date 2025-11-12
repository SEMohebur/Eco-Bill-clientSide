import React, { useEffect } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";
import { MdMarkEmailRead } from "react-icons/md";
import Swal from "sweetalert2";

const ContactUs = () => {
  useEffect(() => {
    document.title = "Contact | Eco Bill";
  }, []);

  const handleContactForm = (e) => {
    e.preventDefault();
    // const name = e.target.name.value;
    // const email = e.target.email.value;
    // const message = e.target.message.value;

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Message sent successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    e.target.reset();
  };
  return (
    <div className=" bg-indigo-950 flex flex-col text-center p-10">
      {/* contact us  */}
      <div className=" py-5">
        <h2 className=" text-3xl font-bold text-center py-5 text-warning">
          {" "}
          Contact Information
        </h2>

        <div className="max-w-6xl mx-auto text-center mb-12">
          <p className=" text-white text-base md:text-lg ">
            Get in touch with us for billing support, feedback, or general
            inquiries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8  mx-auto">
          <div className=" p-6 rounded-2xl shadow-lg flex flex-col items-center text-center bg-white">
            <MdMarkEmailRead className="w-10 h-10 text-blue-400 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p>support@billmanager.com</p>
          </div>

          <div className=" p-6 rounded-2xl shadow-lg flex flex-col items-center text-center bg-white">
            <IoCall className="w-10 h-10 text-green-400 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p>+880 1234 567 890</p>
          </div>

          <div className=" p-6 rounded-2xl shadow-lg flex flex-col items-center text-center bg-white">
            <FaMapMarkedAlt className="w-10 h-10 text-red-400 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p>Dhaka, Bangladesh</p>
          </div>

          <div className="p-6 rounded-2xl shadow-lg flex flex-col items-center text-center bg-white">
            <MdOutlineWatchLater className="w-10 h-10 text-yellow-400 mb-3" />
            <h3 className="text-xl font-semibold mb-2">Working Hours</h3>
            <p>Sat - Thu: 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
      <div className=" bg-white p-10 rounded-2xl">
        <h2 className=" text-warning text-2xl font-bold my-3">Contact Us</h2>
        <form onSubmit={handleContactForm} className=" space-y-4">
          <div>
            {" "}
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className=" input"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className=" input"
              required
            />
          </div>
          <div className="w-full">
            <textarea
              id="message"
              name="message"
              placeholder="Write your message here..."
              required
              className="textarea textarea-bordered "
            ></textarea>
          </div>
          <button className=" btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;

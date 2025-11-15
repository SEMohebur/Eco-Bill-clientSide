import React, { useEffect } from "react";
import logo from "../assets/EcoBill.png";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { fadeIn } from "../varient";

const About = () => {
  useEffect(() => {
    document.title = "About | Eco Bill";
  }, []);

  return (
    <div className=" bg-base-200">
      <div className=" w-11/12 mx-auto">
        <div className=" text-center p-5">
          <motion.h2
            variants={fadeIn("left", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
            className=" text-3xl font-bold text-warning"
          >
            About Us
          </motion.h2>
          <motion.div
            variants={fadeIn("right", 0.1)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
          >
            {" "}
            We make paying your utility bills simple, secure, and fast. Our
            mission is to bring all your payments into one convenient platform.
          </motion.div>
        </div>
        <div className="grid md:grid-cols-2 items-center gap-10 py-16 px-6 md:px-20 bg-base-200 rounded-2xl shadow-sm">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-warning">Our Story</h3>
            <p className="text-gray-600 leading-relaxed">
              We started this project with a simple idea — to make bill payments
              easier for everyone. No more waiting in lines or switching between
              multiple apps. Just one platform to manage all your bills with
              ease.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our team is passionate about creating a seamless experience that
              saves your time and gives you full control over your payment
              history.
            </p>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={logo}
              alt="Our Story"
              className="w-64 md:w-80 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        <div className=" py-5 grid grid-cols-2 gap-5 text-gray-400">
          <div className=" bg-base-300 hover:shadow-lg duration-200 cursor-pointer rounded-2xl text-center flex flex-col items-center justify-center p-5">
            <h3 className=" text-warning font-bold">Our Mission</h3>
            <p className=" text-gray-600">
              To simplify the way people manage and pay their utility bills
              through secure and modern technology.
            </p>
          </div>
          <div className=" bg-base-300 hover:shadow-lg duration-200 cursor-pointer rounded-2xl text-center flex flex-col items-center justify-center p-5">
            <h3 className="text-warning font-bold"> Our Vision</h3>
            <p className=" text-gray-600">
              {" "}
              To become the most trusted and user-friendly bill payment platform
              that empowers users to manage their bills effortlessly.
            </p>
          </div>
        </div>

        <div className=" bg-base-200 p-10 rounded-2xl">
          <h3 className=" text-warning text-center text-xl font-bold py-5">
            {" "}
            Why Choose Us
          </h3>
          <div className="  grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className=" bg-base-300 cursor-pointer hover:shadow-lg duration-200 p-3  rounded-2xl text-center flex flex-col items-center justify-center">
              <h3 className=" text-warning font-bold">Fast & Easy Payments</h3>
              <p>Pay your bills within seconds with a few simple clicks</p>
            </div>

            <div className=" bg-base-300 cursor-pointer hover:shadow-lg duration-200 p-3  rounded-2xl text-center flex flex-col items-center justify-center">
              <h3 className=" text-warning font-bold">Secure Transactions</h3>
              <p>
                Your data and payment details are protected with advanced
                encryption.
              </p>
            </div>

            <div className="bg-base-300 cursor-pointer hover:shadow-lg duration-200 p-3 rounded-2xl text-center flex flex-col items-center justify-center">
              <h3 className=" text-warning font-bold">
                User-Friendly Interface
              </h3>
              <p>Simple, intuitive design that anyone can use easily.</p>
            </div>

            <div className=" bg-base-300 cursor-pointer hover:shadow-lg duration-200 p-3  rounded-2xl text-center flex flex-col items-center justify-center">
              <h3 className=" text-warning font-bold">Track History</h3>
              <p>View and download your past bill reports anytime.</p>
            </div>
          </div>
        </div>

        <motion.div
          variants={fadeIn("down", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className=" py-5"
        >
          <h3 className=" text-xl py-4 font-bold text-center text-warning">
            Our Team
          </h3>
          <div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className=" bg-base-200 rounded-2xl text-center flex flex-col items-center justify-center p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="mb-4">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=800"
                  alt="Team Member"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 "
                />
              </div>

              <h5 className=" text-warning font-bold">Alisha</h5>
              <p className=" ">Frontend Developer</p>
            </div>

            <div className="bg-base-200 rounded-2xl text-center flex flex-col items-center justify-center p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="mb-4">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=800"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 "
                />
              </div>

              <h5 className=" text-warning font-bold">Choyon</h5>
              <p className="">Backend Developer</p>
            </div>
            <div className="bg-base-200 rounded-2xl text-center flex flex-col items-center justify-center p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="mb-4">
                <img
                  src="https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=800"
                  alt="Team Member"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 "
                />
              </div>

              <h5 className="text-warning font-bold ">Jarifa</h5>
              <p className="">UI/UX Designer</p>
            </div>
          </div>
        </motion.div>

        <div className=" text-center space-y-3 pb-4">
          <h3 className=" text-xl font-bold text-warning ">
            Have Any Questions?
          </h3>
          <p>We’d love to hear from you. Get in touch with our team today.</p>
          <Link to="/contact" className=" btn btn-warning">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;

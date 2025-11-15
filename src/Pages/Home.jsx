import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import bannerLogo from "../assets/d29b434e48b48.png";
import { FaLightbulb } from "react-icons/fa6";
import { FaGasPump } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { MdOutlineSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md";

import BillCard from "../Component/BillCard";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import * as motion from "motion/react-client";

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://eco-bill-server.vercel.app/latest-bills")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, []);

  // slider
  const bannerData = [
    {
      name: "Electricity Bill Tracker",
      img: "https://plus.unsplash.com/premium_photo-1716999684531-b8f40731a827?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RWxlY3RyaWNpdHklMjBCaWxsJTIwVHJhY2tlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=800",
      description:
        "Easily track your electricity bills every month, view payment history, and get notified of due dates to avoid late fees. Stay on top of your household energy usage with Eco Bill.",
    },
    {
      name: "Water & Gas Management",
      img: "https://images.unsplash.com/photo-1743580886673-812abb5acf3a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8V2F0ZXIlMjAlMjYlMjBHYXMlMjBNYW5hZ2VtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=800",
      description:
        "Manage your water and gas bills efficiently in one place. Eco Bill allows you to record, monitor, and download PDF reports of your monthly bills for quick reference.",
    },
    {
      name: "Internet Bill Organizer",
      img: "https://images.unsplash.com/photo-1746712241471-614b914f9c23?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fEludGVybmV0JTIwQmlsbCUyME9yZ2FuaXplcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=800",
      description:
        "Keep all your internet bills organized and accessible. With Eco Bill, you can view bills, pay securely, and generate detailed reports anytime you need them.",
    },
  ];
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // slider

  // category
  const category = [
    { title: "Electricity", icon: <FaLightbulb /> },
    { title: "Gas", icon: <FaGasPump /> },
    { title: "Water", icon: <IoIosWater /> },
    {
      title: "Internet",
      icon: <MdOutlineSignalWifiStatusbarConnectedNoInternet4 />,
    },
  ];
  useEffect(() => {
    document.title = "Home | Eco Bill";
  }, []);

  const [text] = useTypewriter({
    words: ["Manage Your Utility Bills Effortlessly"],
    loop: 3,
    // onLoopDone: () => console.log(`loop completed after 3 runs.`),
  });

  if (loading) {
    return (
      <div className=" flex justify-center items-center h-48">
        <span className="loading loading-ring loading-xl "></span>
      </div>
    );
  }

  return (
    <div className=" bg-base-100">
      {/* banner  */}
      <section className=" py-5  bg-base-200 text-gray-600">
        <div className=" text-center">
          <h1 className=" text-4xl font-bold text-warning min-h-4">
            <span>{text || "|"}</span>
          </h1>
          <p className=" font-semibold ">Welcome to Eco Bill </p>

          <p className=" text-sm font-thin">
            Manage your Electricity, Gas, Water, and Internet bills easily and
            securely.
          </p>
        </div>

        <motion.div
          className="  gap-3 p-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
        >
          <Slider {...settings}>
            {bannerData.map((item, index) => {
              return (
                <div
                  key={index}
                  className="relative card card-side overflow-hidden rounded-md shadow-md"
                >
                  <figure>
                    <img
                      className="w-full h-80 object-cover"
                      src={item.img}
                      alt="Album"
                    />
                  </figure>
                  <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white p-4 transition-all duration-300 hover:bg-black/60">
                    <h2 className="text-6xl font-bold drop-shadow-lg">
                      {item.name}
                    </h2>
                    <p className="font-thin mt-2 max-w-md">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </Slider>
        </motion.div>
      </section>
      <div className=" w-11/12 mx-auto ">
        {/* category  */}
        <div>
          <h2 className=" text-center font-bold text-3xl  text-warning mt-2">
            {" "}
            Category
          </h2>
          <div className=" grid grid-cols-2 md:grid-cols-4 gap-3 py-5">
            {category.map((item, index) => {
              return (
                <div
                  key={index}
                  className=" text-center rounded-md space-y-3 p-4 bg-base-200 shadow text-gray-600 hover:bg-base-300 px-4 py-2  transition duration-300 cursor-pointer"
                >
                  <div className=" flex justify-center">
                    <p className=" text-3xl ">{item.icon}</p>
                  </div>
                  <p className=" text-2xl">{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
        {/* recent 6 BillCard */}
        <div className=" py-5">
          <h2 className=" text-center py-5 text-3xl font-bold text-warning">
            Recent Bill
          </h2>
          <div className=" grid md:grid-cols-3 gap-3">
            {data?.map((bill, index) => {
              return <BillCard bill={bill} key={index}></BillCard>;
            })}
          </div>
        </div>
        {/* Our Services  */}
        <div className=" py-5">
          <h2 className=" text-3xl text-warning font-bold text-center py-5">
            Our Services
          </h2>
          <div className=" grid md:grid-cols-3 gap-3">
            {/* card  */}
            <div className=" shadow rounded-xl p-5 text-center bg-base-200 space-y-3 cursor-pointer hover:shadow-lg duration-200">
              <h3 className=" font-bold text-xl text-warning">
                Electricity Bill Management
              </h3>
              <p className=" text-gray-600">
                Our Electricity Bill Management System allows users to easily
                view, pay, and download their electricity bills online. It
                ensures fast, secure, and paperless billing, helping both users
                and the electricity department save time and reduce errors.
              </p>
            </div>
            <div className=" shadow rounded-xl p-5 text-center bg-base-200 space-y-3 cursor-pointer hover:shadow-lg duration-200">
              <h3 className=" font-bold text-xl text-warning">
                Electricity Bill Management
              </h3>
              <p className=" text-gray-600">
                Our Electricity Bill Management System allows users to easily
                view, pay, and download their electricity bills online. It
                ensures fast, secure, and paperless billing, helping both users
                and the electricity department save time and reduce errors.
              </p>
            </div>
            <div className=" shadow rounded-xl p-5 text-center bg-base-200 space-y-3 cursor-pointer hover:shadow-lg duration-200">
              <h3 className=" font-bold text-xl text-warning">
                Gas Bill Management
              </h3>
              <p className=" text-gray-600">
                Our Gas Bill Management System helps users easily check, pay,
                and download their gas bills online. It offers a secure,
                paperless, and time-saving way to manage monthly gas payments
                efficiently.
              </p>
            </div>
            <div className=" shadow rounded-xl p-5 text-center bg-base-200 space-y-3 cursor-pointer hover:shadow-lg duration-200">
              <h3 className=" font-bold text-xl text-warning">
                Water Bill Tracking System
              </h3>
              <p className=" text-gray-600">
                Our Water Bill Tracking System allows users to monitor and pay
                their water bills online. It provides an easy, secure, and
                efficient way to track monthly usage, manage payments, and
                download receipts instantly.
              </p>
            </div>
            <div className=" shadow rounded-xl p-5 text-center bg-base-200 space-y-3 cursor-pointer hover:shadow-lg duration-200">
              <h3 className=" font-bold text-xl text-warning">
                Internet Bill Handling
              </h3>
              <p className=" text-gray-600">
                Our Internet Bill Handling System helps users manage their
                internet bills with ease. It enables online viewing, secure
                payment, and instant receipt download — ensuring a fast and
                hassle-free billing experience.
              </p>
            </div>
            <div className=" shadow rounded-xl p-5 text-center bg-base-200 space-y-3 cursor-pointer hover:shadow-lg duration-200">
              <h3 className=" font-bold text-xl text-warning">
                Download Paid Bill Reports (PDF)
              </h3>
              <p className=" text-gray-600">
                Easily download your paid electricity, gas, water, or internet
                bill reports in PDF format. Keep a secure digital record of all
                your transactions — anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
        {/* contact us  */}
        <div className=" py-5 text-gray-700">
          <h2 className=" text-3xl font-bold text-center py-5 text-warning">
            {" "}
            Contact Information
          </h2>

          <div className="max-w-6xl mx-auto text-center mb-12">
            <p className=" text-base md:text-lg ">
              Get in touch with us for billing support, feedback, or general
              inquiries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8  mx-auto">
            <div className=" p-6 rounded-2xl shadow flex flex-col items-center text-center bg-base-200 cursor-pointer hover:shadow-lg duration-200">
              <MdEmail className="w-10 h-10 text-blue-400 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p>support@billmanager.com</p>
            </div>

            <div className=" p-6 rounded-2xl shadow flex flex-col items-center text-center bg-base-200 cursor-pointer hover:shadow-lg duration-200">
              <IoCall className="w-10 h-10 text-green-400 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p>+880 1234 567 890</p>
            </div>

            <div className=" p-6 rounded-2xl shadow flex flex-col items-center text-center bg-base-200 cursor-pointer hover:shadow-lg duration-200">
              <FaMapMarkedAlt className="w-10 h-10 text-red-400 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p>Dhaka, Bangladesh</p>
            </div>

            <div className="p-6 rounded-2xl shadow flex flex-col items-center text-center bg-base-200 cursor-pointer hover:shadow-lg duration-200">
              <MdOutlineWatchLater className="w-10 h-10 text-yellow-400 mb-3" />
              <h3 className="text-xl font-semibold mb-2">Working Hours</h3>
              <p>Sat - Thu: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

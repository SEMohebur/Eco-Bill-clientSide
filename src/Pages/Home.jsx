import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import bannerLogo from "../assets/d29b434e48b48.png";
import { FaLightbulb } from "react-icons/fa6";
import { FaGasPump } from "react-icons/fa";
import { IoIosWater } from "react-icons/io";
import { MdOutlineSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md";

const Home = () => {
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

  return (
    <div className=" bg-base-300">
      <div className=" w-11/12 mx-auto ">
        {/* banner  */}
        <section className=" py-5">
          <div className=" text-center">
            <h1 className=" text-4xl font-bold text-gray-700">
              Manage Your Utility Bills Effortlessly
            </h1>
            <p className=" font-semibold text-gray-500">Welcome to Eco Bill</p>
            <p className=" text-sm font-thin">
              Manage your Electricity, Gas, Water, and Internet bills easily and
              securely.
            </p>
          </div>

          <div className="  gap-3 p-10">
            <Slider {...settings}>
              {bannerData.map((item, index) => {
                return (
                  <div key={index} className="flex card card-side  bg-cyan-600">
                    <figure>
                      <img
                        className=" max-h-60  rounded-md"
                        src={item.img}
                        alt="Album"
                      />
                    </figure>
                    <div className="card-body text-center text-white">
                      <h2 className=" text-2xl font-bold  text-center">
                        {item.name}
                      </h2>
                      <p className=" font-thin">{item.description}</p>
                      <div className="card-actions justify-end"></div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </section>

        {/* category  */}
        <div>
          <h2 className=" text-center font-bold text-3xl text-gray-700">
            {" "}
            Category
          </h2>
          <div className=" grid grid-cols-2 md:grid-cols-4 gap-3 p-10">
            {category.map((item, index) => {
              return (
                <div
                  key={index}
                  className=" text-center rounded-md space-y-3 p-4 bg-blue-500 hover:bg-blue-800 text-white px-4 py-2  transition duration-300 cursor-pointer"
                >
                  <div className=" flex justify-center">
                    <p className=" text-3xl">{item.icon}</p>
                  </div>
                  <p className=" text-2xl">{item.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

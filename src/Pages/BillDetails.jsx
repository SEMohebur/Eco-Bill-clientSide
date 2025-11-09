import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { MdOutlineSubtitles } from "react-icons/md";
import { IoIosWater } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdDescription } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";

const BillDetails = () => {
  const bill = useLoaderData();
  const { amount, category, date, description, image, location, title, _id } =
    bill.result;

  const [bilingDate, setBilingDate] = useState(false);

  useEffect(() => {
    const billYear = parseInt(date.split("-")[0]);
    const billMonth = parseInt(date.split("-")[1]);

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    setBilingDate(billYear == currentYear && billMonth == currentMonth);
  }, [date]);

  return (
    <div className=" bg-base-300">
      <div className="w-11/12 mx-auto py-6">
        <h2 className=" text-center py-5 text-2xl font-bold">Bill Details</h2>
        <div className=" grid md:grid-cols-2 grid-rows-1 bg-white rounded-xl gap-5 p-5">
          <img
            src={image}
            alt=""
            className=" h-80 w-full object-cover rounded-2xl"
          />
          <div className=" space-y-3">
            <h2 className=" text-xl font-bold flex items-center gap-2">
              <MdOutlineSubtitles />
              <span>{title}</span>
            </h2>
            <p className=" flex items-center gap-2">
              <IoIosWater />

              <span>{category}</span>
            </p>
            <p className=" flex items-center gap-2">
              <FaLocationDot />

              <span>{location}</span>
            </p>

            <p className=" flex items-center gap-2">
              <FaMoneyCheckDollar />

              <span>{amount}</span>
            </p>
            <p className=" flex items-center gap-2">
              <MdDateRange />

              <span>{date}</span>
            </p>
            <p className="">
              <span>{description.slice(0, 150)}...</span>
            </p>
            <div>
              {bilingDate == false ? (
                <p className=" text-red-400">
                  Only current month bills can be paid.
                </p>
              ) : (
                <></>
              )}
            </div>
            <button disabled={!bilingDate} className=" btn btn-primary">
              Pay Bill
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillDetails;

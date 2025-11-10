import React, { use, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { MdOutlineSubtitles } from "react-icons/md";
import { IoIosWater } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdDescription } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { AuthContext } from "../Provider/AuthContext";

const BillDetails = () => {
  const { userInfo } = use(AuthContext);

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

  // pay bill button open modal
  const handlePayBill = () => {
    document.getElementById("my_modal_5").showModal();
  };

  // modal form handle
  const handlePaymentInfo = (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      bill_id: e.target.billId.value,
      amount: e.target.amount.value,
      userName: e.target.userName.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
      date: e.target.date.value,
      additionalInfo: e.target.additionalInfo.value,
    };
    console.log(formData);
    document.getElementById("my_modal_5").close();
    e.target.reset();
  };

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
            <button
              onClick={handlePayBill}
              disabled={!bilingDate}
              className=" btn btn-primary"
            >
              Pay Bill
            </button>
          </div>
        </div>
      </div>
      {/* modal  */}

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">Payment Information</h3>

          <div className="modal-action  flex justify-center ">
            <form onSubmit={handlePaymentInfo}>
              <div className=" space-y-2">
                <div>
                  <label className=" label">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className=" input"
                    defaultValue={userInfo?.email}
                    readOnly
                  />
                </div>
                <div>
                  <label className=" label">Bill Id</label>
                  <input
                    type="text"
                    name="billId"
                    placeholder="Id"
                    className=" input"
                    defaultValue={_id}
                    readOnly
                  />
                </div>
                <div>
                  <label className=" label">Amount</label>
                  <input
                    type="text"
                    name="amount"
                    placeholder="amount"
                    className=" input"
                    defaultValue={amount}
                    readOnly
                  />
                </div>
                <div>
                  <label className=" label">User Name</label>
                  <input
                    type="text"
                    name="userName"
                    placeholder="name"
                    className=" input"
                    required
                  />
                </div>
                <div>
                  <label className=" label">Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="address"
                    className=" input"
                    required
                  />
                </div>
                <div>
                  <label className=" label">Phone</label>
                  <input
                    type="number"
                    name="phone"
                    placeholder="number"
                    className=" input"
                    required
                  />
                </div>
                <div>
                  <label className=" label">Date</label>
                  <input
                    type="text"
                    name="date"
                    placeholder="date"
                    className=" input"
                    defaultValue={date}
                    readOnly
                  />
                </div>
                <div>
                  <label className=" label">Additional info</label>
                  <textarea
                    name="additionalInfo"
                    placeholder="Enter any additional info (optional)"
                    className="textarea textarea-bordered w-full"
                  />
                </div>
              </div>

              <button className="btn my-2 w-full btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* modal  */}
    </div>
  );
};

export default BillDetails;

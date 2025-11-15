import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { MdOutlineSubtitles } from "react-icons/md";
import { IoIosWater } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdDescription } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";

const BillDetails = () => {
  const { userInfo } = use(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [bill, setBill] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://eco-bill-server.vercel.app/bills/${id}`, {
      headers: {
        authorization: `Bearer ${userInfo.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBill(data), setLoading(false);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const { amount, category, date, description, image, location, title, _id } =
    bill.result || {};

  const [bilingDate, setBilingDate] = useState(false);
  const today = new Date();
  const currentDate = today.toISOString().split("T")[0];

  useEffect(() => {
    const billYear = parseInt(date?.split("-")[0]);
    const billMonth = parseInt(date?.split("-")[1]);

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    setBilingDate(billYear == currentYear && billMonth == currentMonth);
  }, [date]);

  // pay bill button open modal
  const handlePayBill = () => {
    document.getElementById("my_modal_5").showModal();
  };

  // modal form handle post
  const handlePaymentInfoPost = (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      bill_id: e.target.billId.value,
      amount: e.target.amount.value,
      userName: e.target.userName.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
      date: currentDate,
      additionalInfo: e.target.additionalInfo.value,
    };
    // modalbtn close
    document.getElementById("my_modal_5").close();
    e.target.reset();
    // formData post
    fetch(`https://eco-bill-server.vercel.app/my-pay-bill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${userInfo.accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Payment information recorded successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/myPayBils");
      })
      .catch((err) =>
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: err.message,
          showConfirmButton: false,
          timer: 1500,
        })
      );
  };

  useEffect(() => {
    document.title = "Details | Eco Bill";
  }, []);

  if (loading) {
    return (
      <div className=" flex justify-center items-center h-48">
        <span className="loading loading-ring loading-xl "></span>
      </div>
    );
  }

  return (
    <div className="">
      <div className="w-11/12 mx-auto py-6">
        <h2 className=" text-center py-5 text-3xl text-warning font-bold">
          Bill Details
        </h2>
        <div className=" grid md:grid-cols-2 grid-rows-1 bg-base-200 rounded-xl gap-5 p-5">
          <img
            src={image}
            alt=""
            className=" h-80 w-full object-cover rounded-2xl"
          />
          <div className=" space-y-3">
            <h2 className=" text-xl font-bold flex items-center gap-2 text-warning">
              <MdOutlineSubtitles />
              <span>{title}</span>
            </h2>
            <p className=" flex items-center gap-2">
              <IoIosWater />

              <span className=" font-semibold text-gray-700">{category}</span>
            </p>
            <p className=" flex items-center gap-2">
              <FaLocationDot />

              <span className=" text-gray-700">{location}</span>
            </p>

            <p className=" flex items-center gap-2">
              <span>$</span>

              <span className=" text-gray-700">{amount}</span>
            </p>
            <p className=" flex items-center gap-2 text-gray-700">
              <MdDateRange />

              <span>{date}</span>
            </p>
            <p className="">
              <span className=" text-gray-600">
                {description?.slice(0, 150)}...
              </span>
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
              className={` btn btn-primary shadow-md ${
                bilingDate ? "text-white" : "text-red-300"
              }`}
            >
              Pay Bill
            </button>
          </div>
        </div>
      </div>
      {/* modal  */}

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box ">
          <h3 className="font-bold text-lg text-center text-warning ">
            Payment Information
          </h3>

          <div className="modal-action  flex justify-center ">
            <form onSubmit={handlePaymentInfoPost}>
              <div className=" space-y-2 grid md:grid-cols-2 gap-3">
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
                <div className=" col-span-2">
                  <label className=" label">Date</label>
                  <input
                    type="date"
                    name="date"
                    placeholder="date"
                    className=" input w-full"
                    defaultValue={currentDate}
                    readOnly
                  />
                </div>
                <div className=" col-span-2">
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

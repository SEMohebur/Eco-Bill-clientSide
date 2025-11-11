import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";

const MyPayBils = () => {
  const { userInfo } = use(AuthContext);

  const [billHistory, setBillHistory] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/my-paybill-history?email=${userInfo.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBillHistory(data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const totalBillLength = billHistory?.length;

  const totalAmount = billHistory?.reduce(
    (sum, bill) => sum + Number(bill.amount),
    0
  );

  ////

  return (
    <div className=" bg-base-300">
      <div className=" w-11/12 mx-auto">
        <div className=" py-5">
          <div className=" bg-white rounded-xl">
            <h2 className=" text-center text-3xl font-bold py-5">
              My Pay Bill History
            </h2>
            {/* table  */}
            <div className="overflow-x-auto w-full">
              <table className="table table-zebra w-full text-sm md:text-base ">
                <thead className="bg-gray-200 text-gray-800 uppercase text-sm">
                  <tr>
                    <th>#</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Amount</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Date</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                <tbody>
                  {billHistory?.map((bill, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 transition-colors duration-200 text-gray-700"
                    >
                      <td className="font-medium">{index + 1}</td>
                      <td className="whitespace-nowrap">{bill.userName}</td>
                      <td className="whitespace-nowrap">{bill.email}</td>
                      <td className="whitespace-nowrap text-green-600 font-semibold">
                        ৳{bill.amount}
                      </td>
                      <td className="min-w-[120px]">{bill.address}</td>
                      <td className="whitespace-nowrap">{bill.phone}</td>
                      <td className="whitespace-nowrap">{bill.date}</td>
                      <td>
                        <button className="btn btn-xs btn-warning text-white hover:scale-105 transition-transform">
                          Update
                        </button>
                      </td>
                      <td>
                        <button className="btn btn-xs btn-error text-white hover:scale-105 transition-transform">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <hr className=" text-gray-300" />
            <div className=" flex justify-between item-center p-5">
              <div className=" flex gap-5">
                <p>
                  Total Bill Paid:{" "}
                  <span className=" text-green-500">{totalBillLength}</span>
                </p>
                <p>
                  Total Amount : ৳
                  <span className=" text-green-500">{totalAmount}</span>
                </p>
              </div>
              <div>
                <button className="btn btn-primary">Download Report</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPayBils;

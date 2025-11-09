import React from "react";
import { useLoaderData } from "react-router";
import BillCard from "../Component/BillCard";

const Bills = () => {
  const bills = useLoaderData();

  return (
    <div className=" bg-base-300">
      {" "}
      <div className=" w-11/12 mx-auto py-5">
        <h1 className=" text-center font-bold text-4xl py-5">Bills</h1>

        <div className=" flex justify-between my-4">
          <div>
            <span>Total Bills:</span>
            <span className=" text-green-700"> {bills.length}</span>
          </div>
          <select
            name="myDropdown"
            id="myDropdown"
            className=" border-2 border-blue-400 rounded-2xl p-1 "
          >
            <option value="">Category</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        </div>

        <div className=" grid md:grid-cols-3 grid-cols-1  gap-3">
          {bills.map((bill, index) => {
            return <BillCard key={index} bill={bill}></BillCard>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Bills;

import React from "react";
import { Link } from "react-router";
import { FaLocationDot } from "react-icons/fa6";

const BillCard = ({ bill }) => {
  // console.log(bill);
  return (
    <div className="card bg-base-100  shadow-sm">
      <figure>
        <img
          src={bill.image}
          alt="logo"
          className=" max-h-40 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{bill.title}</h2>
        <p>
          <span className=" bg-red-500 p-1 rounded-full text-white">
            {bill.category}
          </span>
        </p>

        <div className=" text-green-600 flex items-center gap-1">
          <FaLocationDot className=" text-gray-700" />
          <p>{bill.location}</p>
        </div>
        <strong className=" text-red-500">$ {bill.amount}</strong>
        <div className="card-actions justify-end">
          <Link to={`/billDetails/${bill._id}`} className="btn btn-primary">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BillCard;

import React from "react";
import { Link } from "react-router";
import { FaLocationDot } from "react-icons/fa6";

const BillCard = ({ bill }) => {
  return (
    <div className="card bg-base-300 shadow  cursor-pointer hover:shadow-lg duration-200">
      <figure>
        <img
          src={bill.image}
          alt="logo"
          className=" max-h-40 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-warning">{bill.title}</h2>
        <p>
          <span className=" bg-base-300 font-bold p-1 rounded-full text-gray-600">
            {bill.category}
          </span>
        </p>

        <div className="  text-sm font-bold flex items-center gap-1 text-gray-600">
          <FaLocationDot />
          <p>{bill.location}</p>
        </div>
        <strong className=" text-gray-600">$ {bill.amount}</strong>
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

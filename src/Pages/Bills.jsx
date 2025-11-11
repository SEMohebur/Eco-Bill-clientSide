import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import BillCard from "../Component/BillCard";

const Bills = () => {
  const bills = useLoaderData();

  const [filterBill, setFilterBill] = useState(bills);

  const [category, setCategory] = useState("");

  // filtering
  const handleFilter = (select) => {
    fetch(`http://localhost:3000/bill-filtering?category=${select}`)
      .then((res) => res.json())
      .then((data) => {
        setFilterBill(data);
      })
      .catch((err) => console.log(err.message));
  };

  // input value get and stor useState / fetch function call
  const handleCategoryChange = (e) => {
    const select = e.target.value;
    setCategory(select);
    if (select) {
      handleFilter(select);
    } else {
      setFilterBill(bills);
    }
  };

  useEffect(() => {
    document.title = "Bills | Eco Bill";
  }, []);

  if (!filterBill) {
    return (
      <div className=" flex justify-center items-center">
        <div>
          <span className="loading loading-ring loading-xl text-center"></span>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-base-300">
      {" "}
      <div className=" w-11/12 mx-auto py-5">
        <h1 className=" text-center font-bold text-4xl py-5">Bills</h1>

        <div className=" flex justify-between my-4">
          <div>
            <span>Total Bills:</span>
            <span className=" text-green-700"> {filterBill.length}</span>
          </div>

          <select
            name="myDropdown"
            id="myDropdown"
            value={category}
            onChange={handleCategoryChange}
            className=" border-2  border-none bg-white py-1  rounded-2xl text-center "
          >
            <option value="">All</option>
            <option value="Electricity">Electricity</option>
            <option value="Gas">Gas</option>
            <option value="Water">Water</option>
            <option value="Telecommunication">Telecommunication</option>
            <option value="Rent">Rent</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Groceries">Groceries</option>
          </select>
        </div>

        <div className=" grid md:grid-cols-3 grid-cols-1  gap-3">
          {filterBill.map((bill, index) => {
            return <BillCard key={index} bill={bill}></BillCard>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Bills;

import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import BillCard from "../Component/BillCard";
import { fadeIn } from "../varient";
import { motion } from "framer-motion";

const Bills = () => {
  const bills = useLoaderData();

  const [loading, setLoadng] = useState(false);
  const [filterBill, setFilterBill] = useState(bills);

  const [category, setCategory] = useState("");

  // filtering
  const handleFilter = (select) => {
    setLoadng(true);
    fetch(
      `https://eco-bill-server.vercel.app/bill-filtering?category=${select}`
    )
      .then((res) => res.json())
      .then((data) => {
        setFilterBill(data);
        setLoadng(false);
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
    <div className=" bg-indigo-950">
      {" "}
      <div className=" w-11/12 mx-auto py-5">
        <motion.h1
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
          className=" text-center font-bold text-3xl text-warning "
        >
          Bills
        </motion.h1>

        <div className=" flex justify-between mb-3">
          <div>
            <span className=" font-bold text-white">Total Bills : </span>
            <span className=" text-warning "> {filterBill.length}</span>
          </div>

          <select
            name="myDropdown"
            id="myDropdown"
            value={category}
            onChange={handleCategoryChange}
            className=" border-2  border-none bg-white text-gray-700 py-1  rounded-2xl text-center "
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

        <div>
          {loading ? (
            <div className="flex justify-center items-center h-48 text-white">
              <span className="loading loading-ring loading-xl"></span>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
              {filterBill.map((bill, index) => (
                <BillCard key={index} bill={bill} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bills;

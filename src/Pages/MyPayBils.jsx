import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";
import { DataGrid } from "react-data-grid";
import "react-data-grid/lib/styles.css";
import { motion } from "framer-motion";
import { fadeIn } from "../varient";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MyPayBils = () => {
  const { userInfo } = use(AuthContext);

  const [billHistory, setBillHistory] = useState(null);
  const [selectBill, setSelectBill] = useState(null);
  const [loading, setLoading] = useState(false);

  //get my paybil history
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://eco-bill-server.vercel.app/my-paybill-history?email=${userInfo.email}`,
      {
        headers: {
          authorization: `Bearer ${userInfo.accessToken}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setBillHistory(data);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, []);

  const totalBillLength = billHistory?.length;

  const totalAmount = billHistory?.reduce(
    (sum, bill) => sum + Number(bill.amount),
    0
  );

  ////update modal open
  const handleUpdateModal = (bill) => {
    document.getElementById("my_modal_5").showModal();
    setSelectBill(bill);
  };

  //update my bill history
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    // modalbtn close
    const formData = {
      bill_id: selectBill._id,
      amount: e.target.amount.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
      date: e.target.date.value,
    };
    fetch(
      `https://eco-bill-server.vercel.app/my-paybill-history/${formData.bill_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${userInfo.accessToken}`,
        },
        body: JSON.stringify(formData),
      }
    )
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Bill updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });

        document.getElementById("my_modal_5").close();
      })

      .catch((err) => console.log(err));
  };

  // handle delete
  const handleDelete = (bill) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to delete this bill?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `https://eco-bill-server.vercel.app/my-paybill-history/${bill._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${userInfo.accessToken}`,
            },
          }
        )
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              title: "delete",
              text: "Bill deleted successfully!",
              icon: "success",
            }).then(() => {
              document.getElementById("my_modal_5").close();
              window.location.reload();
            });
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: err.message,
              icon: "error",
            });
          });
      }
    });
  };
  useEffect(() => {
    document.title = "My pay bill | Eco Bill";
  }, []);

  // pdf download
  const columns = [
    { key: "_id", name: "ID" },
    { key: "userName", name: "User Name" },
    { key: "email", name: "Email" },
    { key: "amount", name: "Amount" },
    { key: "address", name: "Address" },
    { key: "phone", name: "Phone" },
    { key: "date", name: "Date" },
  ];

  const pdfDownloader = () => {
    if (!billHistory || billHistory.length === 0) {
      Swal.fire({
        title: "error",
        text: "Bill History Not Found",
        icon: "question",
      });
      return;
    }
    const doc = new jsPDF();

    doc.text("My Pay Bill Report", 14, 10);

    const tableColumn = columns.map((col) => col.name);
    const tableRows = billHistory.map((row) =>
      columns.map((col) => row[col.key] || "")
    );

    // footer row
    const footRows = [
      ["Bill History", "", "", "", "", "", `Total: ${totalAmount}`],
    ];

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      foot: footRows,

      startY: 20,
      footStyles: { fillColor: [200, 200, 200] },
    });

    doc.save("MyPayBills.pdf");
  };

  if (loading) {
    return (
      <div className=" flex justify-center items-center h-48">
        <span className="loading loading-ring loading-xl "></span>
      </div>
    );
  }

  return (
    <div className=" bg-indigo-950">
      <div className=" w-11/12 mx-auto">
        <div className=" py-5">
          <div className="  bg-base-200 rounded-xl">
            <motion.h2
              variants={fadeIn("up", 0.1)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
              className=" text-center text-3xl text-warning font-bold py-5"
            >
              My Pay Bill History
            </motion.h2>

            {/* pdf table  */}
            <div className=" hidden" style={{ height: "400px" }}>
              {billHistory && (
                <DataGrid
                  columns={columns}
                  rows={billHistory.map((row, i) => ({ id: i + 1, ...row }))}
                />
              )}
            </div>
            {/* main table  */}
            <div className="overflow-x-auto w-full">
              <table className="table w-full text-sm md:text-base ">
                <thead className="bg-base-100 text-gray-600 uppercase text-sm">
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
                        <button
                          onClick={() => handleUpdateModal(bill)}
                          className="btn btn-xs btn-warning text-white hover:scale-105 transition-transform"
                        >
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(bill)}
                          className="btn btn-xs btn-error text-white hover:scale-105 transition-transform"
                        >
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
                <p className=" text-gray-700">
                  Total Bill Paid:{" "}
                  <span className=" text-green-500">{totalBillLength}</span>
                </p>
                <p className=" text-gray-700">
                  Total Amount : ৳
                  <span className=" text-green-500">{totalAmount}</span>
                </p>
              </div>
              <div>
                <button onClick={pdfDownloader} className="btn btn-primary">
                  Download Report
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* modal  */}

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-warning text-center">
              Update Payment Information
            </h3>

            <div className="modal-action  flex justify-center ">
              <form onSubmit={handleUpdateSubmit}>
                <div className=" space-y-2 grid grid-cols-2 gap-3">
                  <div>
                    <label className=" label">Amount</label>
                    <input
                      type="text"
                      name="amount"
                      placeholder="amount"
                      className=" input"
                      defaultValue={selectBill?.amount}
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
                      defaultValue={selectBill?.address}
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
                      defaultValue={selectBill?.phone}
                      required
                    />
                  </div>
                  <div>
                    <label className=" label">Date</label>
                    <input
                      type="date"
                      name="date"
                      placeholder="date"
                      className=" input"
                      defaultValue={selectBill?.date}
                      required
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
    </div>
  );
};

export default MyPayBils;

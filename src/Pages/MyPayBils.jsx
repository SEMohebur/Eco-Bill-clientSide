import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import Swal from "sweetalert2";

const MyPayBils = () => {
  const { userInfo } = use(AuthContext);

  const [billHistory, setBillHistory] = useState(null);
  const [selectBill, setSelectBill] = useState(null);

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
    fetch(`http://localhost:3000/my-paybill-history/${formData.bill_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
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
        fetch(`http://localhost:3000/my-paybill-history/${bill._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
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

  return (
    <div className=" bg-indigo-950">
      <div className=" w-11/12 mx-auto">
        <div className=" py-5">
          <div className=" bg-white rounded-xl">
            <h2 className=" text-center text-3xl text-warning font-bold py-5">
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

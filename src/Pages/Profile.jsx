import React, { use } from "react";
import { AuthContext } from "../Provider/AuthContext";
import { Link } from "react-router";

const Profile = () => {
  const { userInfo } = use(AuthContext);
  console.log(userInfo);
  return (
    <div className=" bg-indigo-950 flex justify-center items-center ">
      <div className=" py-8 bg-white p-15 rounded-2xl m-20 space-y-4">
        <h2 className=" text-center text-3xl font-bold text-warning">
          My Profile
        </h2>

        <div className=" flex justify-center">
          <img
            src={userInfo?.photoURL}
            alt=""
            className=" rounded-full border-4 border-red-400 p-1"
          />
        </div>
        <div className=" text-center">
          <h4 className=" font-bold text-indigo-600 text-xl text-center">
            {userInfo?.displayName}
          </h4>
          <p className=" text-indigo-500">{userInfo?.email}</p>
          <Link to="/" className=" btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;

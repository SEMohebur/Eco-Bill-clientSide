import React, { use } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Provider/AuthContext";

const PrivateRoute = ({ children }) => {
  const { loading, userInfo } = use(AuthContext);

  if (loading) {
    return (
      <div className=" flex justify-center items-center h-48">
        <span className="loading loading-ring loading-xl"></span>
      </div>
    );
  }

  if (userInfo && userInfo?.email) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;

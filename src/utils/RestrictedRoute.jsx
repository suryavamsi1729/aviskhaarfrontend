import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BarLoader from "react-spinners/BarLoader";

const RestrictedRoute = ({ children }) => {
  const userData = useSelector((state) => state.user.data);
  const userStatus = useSelector((state) => state.user.status);

  if (userStatus === "loading") {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <BarLoader />
      </div>
    );
  }

  if (userData) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

export default RestrictedRoute;

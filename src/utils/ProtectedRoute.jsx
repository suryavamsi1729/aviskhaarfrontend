import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BarLoader from "react-spinners/BarLoader";
import { fetchUser } from "../store/userSlice";

const ProtectedRoute = ({ children, path }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);
  const userStatus = useSelector((state) => state.user.status);
  const token = localStorage.getItem(import.meta.env.VITE_APP_TOKEN);

  useEffect(() => {
    if (!userData) {
      const ctoken = localStorage.getItem(import.meta.env.VITE_APP_TOKEN);
      if (ctoken) {
        dispatch(fetchUser(token));
      }
    }
  }, [dispatch, userData, userStatus]);

  if (!token) {
    return <Navigate to={path} />;
  }

  if (userStatus !== "loaded") {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <BarLoader />
      </div>
    );
  }

  if (userStatus === "loaded" && !userData) {
    return <Navigate to={path} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

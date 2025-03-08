import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./pages/Home";
import {
  Cameras,
  Complaints,
  Dashboard,
  Login,
  Register,
  Notifications,
  PageNotFound,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./utils/ProtectedRoute";
import RestrictedRoute from "./utils/RestrictedRoute";
import { fetchUser } from "./store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Demo from "./pages/Demo";

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);
  const userStatus = useSelector((state) => state.user.status);

  useEffect(() => {
    if (!userData && userStatus === "idle") {
      const token = localStorage.getItem(import.meta.env.VITE_APP_TOKEN);
      if (token) {
        dispatch(fetchUser(token));
      }
    }
  }, [dispatch, userData]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/"
          element={
            <ProtectedRoute path="/login">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="cameras" element={<Cameras />} />
          <Route path="demo" element={<Demo />} />
        </Route>

        <Route
          path="/login"
          element={
            <RestrictedRoute>
              <Login />
            </RestrictedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute>
              <Register />
            </RestrictedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;

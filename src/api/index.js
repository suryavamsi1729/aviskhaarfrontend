import api from "./config";
import { toast } from "react-toastify";

// get locations
export const fetchLocations = async () => {
  try {
    const response = await api.get("/api/locations");
    return response.data.locations;
  } catch (err) {
    console.log(err.message);
    toast.error("Error Fetching Locations : ", err.message);
    return [];
  }
};

// Sign Up and Sign In
export const signUp = async (body) => {
  try {
    const response = await api.post("/api/signup/admin", body);
    return response.data;
  } catch (error) {
    console.log(error.message);
    toast.error("Error Signing Up : Invalid Credentials ");
    throw new Error("Error Signing Up: " + error.message);
  }
};

export const signIn = async (body) => {
  try {
    const response = await api.post("/api/login", body);
    return response.data;
  } catch (error) {
    console.log(error.message);
    toast.error("Error Signing Up : Invalid Credentials ");
    throw new Error("Error Signing In: " + error.message);
  }
};

// chat api
export const postChat = async (body) => {
  try {
    const response = await api.post("/chat", body);
    return response.data;
  } catch (error) {
    console.log(error.message);
    toast.error("Error Sending Message : ", error.message);
    throw new Error("Error Signing In: " + error.message);
  }
};

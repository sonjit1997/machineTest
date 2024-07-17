// axios.jsx
import axios from "axios";
import toast from "react-hot-toast";

const getBaseURL = () => {
  return "https://fakestoreapi.com/";
};

const instance = axios.create({
  baseURL: getBaseURL(),
});

// Response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const errorMessage =
        error.response.data.message || "An error occurred. Please try again.";
      toast.error(errorMessage);
      return Promise.reject(new Error(errorMessage));
    }
    toast.error("An error occurred. Please try again.");
    return Promise.reject(error);
  }
);

export default instance;

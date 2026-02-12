// Apicall/AuthApiCall.js
import Swal from "sweetalert2";
import { apiWithoutAuth } from "./api";

const AuthApiCall = async ({ url, method = "POST", data = null, params = null }) => {
  try {
    const response = await apiWithoutAuth({
      url,
      method,
      data,
      params,
    });

    return response;
  } catch (error) {
    Swal.fire(
      "Error",
      error?.response?.data?.error?.message || "Something went wrong",
      "error"
    );

    throw error;
  }
};

export default AuthApiCall;

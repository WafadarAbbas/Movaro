

import Swal from "sweetalert2";
import { getToken } from "../Compo/utilis/getToken";
import { apiWithAuth } from "./api";

const ApiCall = async ({ url, method = "GET", data = null, params = null }) => {
  const token = getToken();

  try {
    const response = await apiWithAuth({
      url,
      method,
      data,
      params,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
console.log("api response", response.status, response);
    return response;
  } catch (error) {
    const status = error?.response?.status;

    if (status === 401) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized (401)",
        text: "Your session has expired. Please log in again.",
        allowOutsideClick: false,
      }).then(() => {
        window.location.href = "/home";
      });
    } 
    else if (status === 403) {
      Swal.fire({
        icon: "error",
        title: "Access Denied (403)",
        text: "You do not have permission to access this resource.",
      });
    }

    throw error;
  }
};

export default ApiCall;

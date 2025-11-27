import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../Compo/utilis/getToken";

const ApiCall = async ({ url, method, data }) => {
  const token = getToken();
  console.log("api calling", url, method, data);

  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    if (response?.status === 200 || response?.status === 204) {
      console.log("api response", response.status, response);
      return response;
    }
  } catch (error) {
    console.error("api call catch", error);

    const status = error?.response?.status;

    if (status === 401) {
      Swal.fire({
        icon: "warning",
        title: "Unauthorized (401)",
        text: "Your session has expired. Please log in again.",
      })
      .then(() => {
 
        window.location.reload();
      });
    } else if (status === 403) {
      Swal.fire({
        icon: "error",
        title: "Access Denied (403)",
        text: "You do not have permission to access this resource.",
      })
      .then(() => {
        
        window.location.reload();
      });
    }

     
    return error.response ? error.response.data : error;
  }
};

export default ApiCall;

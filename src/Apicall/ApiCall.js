import axios from "axios";
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
    if (error.message === "Network Error") return error.message;
    return error.response ? error.response.data : error;
  }
};

export default ApiCall;

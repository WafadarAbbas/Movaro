import axios from "axios";

const AuthApiCall = async ({ url, method, data }) => {

  // console.log("auth api calling", url, method, data);
 
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
      headers: {
        "Content-Type": "application/json",
  
      }
    });

    // console.log("auth api response", response.status, response);

    if (response.status === 200 ||response.status === 204) {
      
      return response;  
    }
  } catch (error) {
    console.error("auth api call vala catch", error);
    if (error.message === "Network Error") {
      return error.message;
    }
    return error.response ? error.response.data : error;  
  }
};

export default AuthApiCall;
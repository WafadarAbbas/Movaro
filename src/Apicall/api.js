import axios from "axios";

export const apiWithAuth = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL ,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiWithoutAuth = axios.create({
  baseURL: process.env.REACT_APP_AUTH_API_BASE_URL ,
  headers: {
    "Content-Type": "application/json",
  },
});

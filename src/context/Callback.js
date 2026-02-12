
import React, { useEffect, useState, useContext } from "react";
import { useCriiptoVerify } from "@criipto/verify-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { AppSettings } from "./../../src/config/app-settings.js";
import LoadingSpinner from "../../src/Compo/spinner.jsx";

const Callback = () => {
  const context = useContext(AppSettings);
  const { result, isLoading, error } = useCriiptoVerify();
  const [pageLoading, setPageLoading] = useState(true);
  const navigate = useNavigate();
  const { setAuthData } = useAuth();
  const [token, setToken] = useState("");
  const [claims, setClaims] = useState({});

   useEffect(() => {
    context.setAppHeaderNone(true);   
  
    return () => {
      context.setAppHeaderNone(false);  
    };
  }, []);

  useEffect(() => {
    if (!isLoading && result) {
      const idToken = result.id_token;
      setToken(idToken);

      let decodedClaims = {};
      if (!result.claims || Object.keys(result.claims).length === 0) {
        const base64Url = idToken.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        decodedClaims = JSON.parse(atob(base64));
      } else {
        decodedClaims = result.claims;
      }

      setClaims(decodedClaims);
      setAuthData({
        token: idToken,
        claims: decodedClaims,
      });

     
      const storedRole = localStorage.getItem("role");
 
       
      if (storedRole === "buyer") {
        localStorage.removeItem("role");
        navigate("/user/buyerRegister-v3");
      } else {
        
        localStorage.removeItem("role");
        navigate("/user/register-v3");
      }

      setPageLoading(false);
    }
  }, [isLoading, result, navigate, setAuthData]);

  if (pageLoading || isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) return <h2>Error: {error.message}</h2>;

  return null;
};

export default Callback;

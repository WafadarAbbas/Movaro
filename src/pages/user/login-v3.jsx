

import React, { useEffect, useContext, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { AppSettings } from "../../config/app-settings.js";

import myImage from "./c2.jpg";
import myImage2 from "./c3.jpg";
import myImage3 from "./c1.jpg";
import myImage4 from "./ferrari.jpg";
import myImage5 from "./lambo.jpg";
import { styled } from "@mui/system";


import { Box, Container, Tab, Tabs, Paper } from '@mui/material'
import LoginBox from "./logincompo/loginbox.js";
import ForgotPasswordBox from "./logincompo/ForgotPasswordBox.js";
 


function LoginV3() {

  const [screen, setScreen] = useState("login");

  const context = useContext(AppSettings);
  const [redirect, setRedirect] = useState(false);
  const [tab, setTab] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);

  const shadows = [
    "0 10px 32px 0 rgba(31, 38, 135, 0.65)",
    "0 10px 32px 0 rgba(255, 0, 0, 0.65)",
    "0 10px 32px 0 rgba(0, 255, 0, 0.65)",
    "0 10px 32px 0 rgba(0, 0, 255, 0.75)",
    "0 10px 32px 0 rgba(235, 116, 5, 0.85)",
  ];

  const [shadowIndex, setShadowIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShadowIndex((prev) => (prev + 1) % shadows.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);
  const images = [myImage, myImage2, myImage4, myImage5];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
   context.setAppHeaderNone(true);   
 
   return () => {
     context.setAppHeaderNone(false);  
   };
 }, []);


  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (token) {
  //     setRedirect(true);
  //   }
  // }, []);



  if (redirect) {
    return <Navigate to="/dashboard/v3" />;
  }


  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",

        backgroundSize: "cover",
        backgroundImage: `url(${myImage2})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 1s ease-in-out",
        zIndex: -1,
      }}
    >

      <Container

        sx={{
          minHeight: '100vh',

          display: 'flex',

          alignItems: 'center'
        }}
      >
        <>
          {screen === "login" && (
            <LoginBox
              onForgotPassword={() => setScreen("forgotPassword")}
            />
          )}

          {screen === "forgotPassword" && (
            <ForgotPasswordBox onBack={() => setScreen("login")} />
          )}



        </>
      </Container>
    </Box>


  );
}

export default LoginV3;
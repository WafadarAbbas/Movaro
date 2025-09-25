 

import React, { useEffect, useContext, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { AppSettings } from "../../config/app-settings.js";

import myImage from "./c2.jpg";
import myImage2 from "./c3.jpg";
import myImage3 from "./c1.jpg";
import { styled } from "@mui/system";


import { Box, Container, Tab, Tabs, Paper } from '@mui/material'

import LoginForm from './LoginForm.jsx'
import SignupForm from './SignupForm.jsx'
import ApiCall from "../../Apicall/ApiCall.js";




const StyledTabs = styled(Tabs)(() => ({
  marginBottom: "16px",
  
  "& .MuiTab-root": {
    fontWeight: "bold",
    fontSize: "18px",
    color: "white",
    textTransform: "none",
  },
  "& .Mui-selected": {
    color: "white !important", // active tab bhi white
    fontWeight: "bold",
  },
  "& .MuiTabs-indicator": {
    backgroundColor: "white", // underline white
    height: "3px",
    borderRadius: "2px",
  },
}));

// ✅ Styled Tab
const StyledTab = styled(Tab)(() => ({
  textTransform: "none",
  fontSize: "18px",
  fontWeight: "bolder",
}));

// ✅ Illustration container
const IllustrationContainer = styled(Box)(({ theme, tab }) => ({
  flex: "0 0 50%",
  position: "relative",
  minHeight: "600px",
  transition: "transform 0.9s ease-in-out",
  transform: tab === 1 ? "translateX(100%)" : "translateX(0)",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));


// ✅ Form container
const FormContainer = styled(Box)(({ theme }) => ({
  flex: "0 0 50%",
  padding: "20px",
  backgroundColor: "transparent",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  transition: "transform 0.9s ease-in-out",
  [theme.breakpoints.down('md')]: {
    flex: '1 1 auto',
    padding: theme.spacing(4),
    transform: 'none !important', // Disable transform on mobile
  },
}));

// ✅ Image
const IllustrationImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "fill",
});


function LoginV3() {
  const context = useContext(AppSettings);
  const [redirect, setRedirect] = useState(false);
  const [tab, setTab] = useState(0);

  const [currentIndex, setCurrentIndex] = useState(0);




  useEffect(() => {
    context.handleSetAppSidebarNone(true);
    context.handleSetAppHeaderNone(true);
    context.handleSetAppContentClass("p-0");

    return () => {
      context.handleSetAppSidebarNone(false);
      context.handleSetAppHeaderNone(false);
      context.handleSetAppContentClass("");
    };
  }, [context]);


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
            transition: "background-image 1s ease-in-out", // smooth transition
            zIndex: -1,
          }}
        >
         
          <Container
            maxWidth="lg" 
            sx={{ 
              minHeight: '100vh',
             
              display: 'flex',
             
              alignItems: 'center'
            }}
          > 
    <Box
      sx={{
        display: "flex",
        width: "100%",
        maxWidth: "1200px",
        minHeight: "600px",
        margin: "40px auto",
        borderRadius: "50px",
        overflow: "hidden",
        backgroundColor: "rgba(255, 255, 255, 0.1)",  
        backdropFilter: "blur(15px)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.85)",
      }}
    >
      {/* Left Side Illustration */}
      <IllustrationContainer tab={tab}>
        <IllustrationImage src={myImage} alt="Collaboration" />
      </IllustrationContainer>

      {/* Right Side Form */}
      <FormContainer
        sx={{
          transform: tab === 1 ? "translateX(-100%)" : "translateX(0)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          {/* Tabs */}
          <StyledTabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            variant="fullWidth"
          >
            <StyledTab label="Login" />
            <StyledTab label="Sign Up" />
          </StyledTabs>
        </Box>

        {/* Tab Content */}
        {tab === 0 ? <LoginForm /> : <SignupForm />}
      </FormContainer>
    </Box>
    </Container>
     </Box>
  );
}

export default LoginV3;
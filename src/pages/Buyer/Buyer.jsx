 
import React, { useContext, useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
} from "@mui/material";
import ApiCall from "../../Apicall/ApiCall";
import { AppSettings } from "./../../config/app-settings.js";
import BuyerLogin from "../user/Buyer/buyerlogin.js";
import { styled } from "@mui/system";
import { motion } from "framer-motion";  

const DottedLoader = styled("div")({
  width: "60px",
  aspectRatio: "2",
  "--_g": "no-repeat radial-gradient(circle closest-side, #ff9f63 90%, #0000)",
  background: `
    var(--_g) 0%   50%,
    var(--_g) 50%  50%,
    var(--_g) 100% 50%
  `,
  backgroundSize: "calc(100%/3) 50%",
  animation: "l3 1s infinite linear",
  margin: "20px auto",
  "@keyframes l3": {
    "20%": { backgroundPosition: "0% 0%, 50% 50%, 100% 50%" },
    "40%": { backgroundPosition: "0% 100%, 50% 0%, 100% 50%" },
    "60%": { backgroundPosition: "0% 50%, 50% 100%, 100% 0%" },
    "80%": { backgroundPosition: "0% 50%, 50% 50%, 100% 100%" },
  },
});

const BlurredContentBox = styled(Box)({
  textAlign: "center",
  filter: "blur(5px)",
  userSelect: "none",
  padding: "40px",
  cursor: "pointer",
  transition: "all 0.3s ease",
 
});

export default function Seller() {
  const context = useContext(AppSettings);
  const [isFocused, setIsFocused] = useState(false);  

  useEffect(() => {
   context.setAppHeaderNone(true);   
 
   return () => {
     context.setAppHeaderNone(false);  
   };
 }, []);

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh", p: 3 }}
      spacing={3}
    >
     
      <Grid size={{xs:12,md:6}}>
        <BlurredContentBox onClick={() => setIsFocused(true)}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            You are connected to the deal
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Waiting for the seller to set the price
          </Typography>
          <DottedLoader />
          <Typography variant="subtitle1">
            The page will update automatically once the seller is ready.
          </Typography>
          <Typography variant="h6" fontWeight="bold" gutterBottom mt={5}>
            You need to login first
          </Typography>
        </BlurredContentBox>
      </Grid>

      
      <Grid
       size={{xs:12,md:6}}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
 
        <motion.div
          initial={{ scale: 0.9, opacity: 0.6 }}
          animate={
            isFocused
              ? { scale: 1, opacity: 1 }
              : { scale: 0.95, opacity: 0.9 }
          }
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          onAnimationComplete={() => {
            
            if (isFocused) setTimeout(() => setIsFocused(false), 400);
          }}
        >
          <BuyerLogin />
        </motion.div>
      </Grid>
    </Grid>
  );
}

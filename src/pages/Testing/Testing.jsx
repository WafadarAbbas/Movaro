import React, { useRef, useEffect, useState } from "react";
 
import { TextField, Box , Container} from "@mui/material";
import p1 from "./p1.jpg"
function Testing1() {
 
 

  return (
 <Container>
  <Box
    sx={{
      width: 420,
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    }}
  >
    <TextField
      fullWidth
      placeholder="Type here to search"
      variant="standard"
      InputProps={{
        disableUnderline: true,
        sx: {
          padding: "10px 12px",
          paddingRight: "70px", // space for image
          backgroundImage: `url(${p1})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 10px center",
          backgroundSize: "45px",
        },
      }}
    />
  </Box>
</Container>
   
  );
}

export default Testing1;


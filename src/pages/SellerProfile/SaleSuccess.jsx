 
import React, { useRef } from "react";
import { Box, Typography ,Container, Button} from "@mui/material";
import QRCode from "react-qr-code";
 

const SaleSuccess = () => {

  

 
  return (
    <Box textAlign="center" py={5}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Sale is now created!
      </Typography>

       
      <Box
        sx={{
          display: "inline-block",
          padding: 2,
          bgcolor: "background.paper",
          borderRadius: 1,
          boxShadow: 2,
        }}
      >
        <QRCode
          value="Success"
          size={160}          
          level="M"         
          bgColor="#ffffff"
          fgColor="#000000"
          includeMargin={false}
        />

        </Box>
       
      <Container maxWidth="sm" sx={{marginTop:5}}>
 
        <Typography variant="body1" gutterBottom sx={{marginTop:1}}>
        Ask the buyer to scan the QR code or enter the registration number in
        their app to connect to the deal.
      </Typography>

      <Typography variant="subtitle1" color="green" gutterBottom sx={{marginTop:2,  backgroundColor: "#c6f7d4ff",p: 1,
    borderRadius: 1,
}}>
        ✅ Available for the buyer: Yes
      </Typography>

      <Typography variant="subtitle1" color="green" fontWeight="bold" sx={{marginTop:2,  backgroundColor: "#c6f7d4ff",p: 1,
    borderRadius: 1,
}}>
         Proceed to the purchase contract.
      </Typography>

       </Container>

 </Box>
    
  );
};

export default SaleSuccess;

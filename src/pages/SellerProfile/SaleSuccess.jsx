 
import React, { useRef } from "react";
import { Box, Typography ,Container, Button} from "@mui/material";
import QRCode from "react-qr-code";
 

const SaleSuccess = () => {

      const qrRef = useRef();

  const downloadQR = () => {
    const svg = qrRef.current.querySelector("svg");
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);

    // convert SVG → image → download
    const img = new Image();
    img.src = "data:image/svg+xml;base64," + window.btoa(source);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = "qr-code.png";
      downloadLink.click();
    };
  };
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
          size={160}         // px, makes it square
          level="M"         // error correction level (L, M, Q, H)
          bgColor="#ffffff"
          fgColor="#000000"
          includeMargin={false}
        />

        </Box>
        <Box mt={2}>
        <Button
          variant="contained"
          onClick={downloadQR}
          sx={{ backgroundColor: "#ff9f43", color: "white" }}
        >
          Download QR
        </Button>
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

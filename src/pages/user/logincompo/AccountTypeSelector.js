import React from "react";
import { Box, Typography, Paper, IconButton, Divider } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../../../assets/logoBankId.png"

function AccountTypeSelector({ onClose }) {
  return (
    <Box
      sx={{
        maxwidth: 800,
        margin: "auto",
        mt: 10,
        p: 4,
        borderRadius: 2,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
        backgroundColor: "white",
        
      }}
      component={Paper}
    >
      {/* Top Bar */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <img
          src={logo}
          alt="BankID Logo"
          style={{ width: 40, marginRight: 10 }}
        />
        <Typography variant="h6" fontWeight="bold" sx={{ flexGrow: 1 }}>
          Login in with BankID
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

<Divider sx={{ my: 2, borderColor: "grey.600" }} />
      {/* Options */}
      <Box sx={{ display: "flex", justifyContent: "space-around", mb: 3 }}>
        <Paper
          elevation={2}
          sx={{
            p: 5,
            m:3,
            cursor: "pointer",
            textAlign: "center",
            width: "40%",
              borderRadius: 2,
             border: "2px solid #ffffffff",
            "&:hover": { border: "2px solid #1976d2" }
            
          }}
          onClick={() => alert("Person Account Selected")}
        >
          <PersonIcon sx={{ fontSize: 50, color: "#1976d2" }} />
          <Typography fontWeight="bold" mt={1}>
            PERSON
          </Typography>
        </Paper>

        <Paper
          elevation={2}
          sx={{
            p: 5,
              m:3,
            cursor: "pointer",
            textAlign: "center",
            width: "40%",
                 border: "2px solid #ffffffff",
            borderRadius: 2,
            "&:hover": { border: "2px solid #1976d2" }
          }}
           onClick={() => alert("Company Account Selected")}
        >
          <BusinessCenterIcon sx={{ fontSize: 50, color: "#1976d2" }} />
          <Typography fontWeight="bold" mt={1}>
            COMPANY
          </Typography>
        </Paper>
      </Box>

<Divider sx={{ my: 2, borderColor: "grey.600" }} />
      {/* Back */}
      <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }} onClick={onClose}>
        <ArrowBackIcon fontSize="small" sx={{ mr: 1 }} />
        <Typography variant="body2">Back</Typography>
      </Box>
      
    </Box>
  );
}

export default AccountTypeSelector;

import React from "react";
import {
  Box,
  Button,
  Typography,
  Link,
  Paper,
  Divider
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import { TextField, InputAdornment } from "@mui/material";

function ForgotPasswordBox({ onBack }) {
  return (
    <Box
      sx={{
        width: 800,
        margin: "auto",
        mt: 10,
        p: 5,
        borderRadius: 3,
        boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
        backgroundColor: "white",
      }}
      component={Paper}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Forgot Password
      </Typography>

       <Typography  variant="subtitle2" color="grey">
        Please enter your email to recover your password. After a few minutes you should receive a link in your email. Please click on it and you will be able to create a new password
      </Typography>
    <Divider sx={{ my: 2, borderColor: "grey.400" }} />

<TextField
  fullWidth
  placeholder="Email"
  margin="normal"
  label="Email"
    size="small"
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <EmailIcon />
      </InputAdornment>
    ),
  }}
/>

      <Button
        fullWidth
        variant="contained"
        sx={{ mb: 2, mt: 2, backgroundColor: "#0097a7", fontWeight: "bold" }}
      >
        SEND EMAIL
      </Button>

<Box display="flex" justifyContent="center" mt={2}>
  <Link
    component="button"
    underline="hover"
    onClick={onBack}
  >
    Back to Login
  </Link>
</Box>

    </Box>
  );
}

export default ForgotPasswordBox;

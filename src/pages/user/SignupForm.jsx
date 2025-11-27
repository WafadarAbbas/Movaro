import React, { useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import logo from "../../../src/assets/logoBankIdwhite.png";
import {
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Paper,
  Divider,
  InputAdornment,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Formik, Form } from "formik";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

const steps = ["Verify with BankID", "Complete Account Details"];

function BankIdStepper({ onClose, onBack }) {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <Paper
      elevation={5}
      sx={{
        // minWidth: 600,
        maxWidth: 700,
        mx: "auto",
        mt: 5,
        p: 3,
        borderRadius: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" gutterBottom>
        BankID Sign Up
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              StepIconProps={{
                sx: {
                  color: "#ccc",
                  "&.Mui-active": { color: "#0097a7" },
                  "&.Mui-completed": { color: "#0097a7" },
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Formik
        initialValues={{
          fullName: "",
          personalNumber: "",
          email: "",
          phone: "",
          drivingLicense: "",
          bankDetails: "",
           password: "",
  confirmPassword: "",
          terms: false,
        }}
        onSubmit={(values) => {
          console.log("Submitted values:", values);
          alert("Signup completed (dummy)!");
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            {/* Step 1 */}
            {activeStep === 0 && (
              <Box>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Enter your Social Security Number
                </Typography>

                <Box sx={{ display: "flex", gap: 2, mb: 3  }}>
                  <TextField
                    fullWidth
                     size="small"
                    label="Social Security Number"
                    name="personalNumber"
                    value={values.personalNumber}
                    onChange={handleChange}
                  />
            <Button
  variant="contained"
  size="small"
  color="primary"
  onClick={() => {
    setFieldValue("fullName", "Wafadar Abbas");
    alert("Fetched info from BankID!");
  }}
  sx={{
    minWidth: "auto",     // button ki width tight ho jayegi
    px: 1.8,              // horizontal padding chhoti
    py: 0.3,              // vertical padding chhoti
    fontSize: "10px",     // text size chhoti
  }}
>
  GetInfo
</Button>
                 
                </Box>

                <Typography variant="subtitle2" color="grey" mt={2} mb={3}>
                  Your information will be retrieved in cooperation with BankID and
                  Bisenode.{" "}
                  <a href="#" style={{ color: "#0097a7" }}>
                    Read Privacy Policy
                  </a>
                </Typography>

                <Divider sx={{ my: 2, borderColor: "grey.600" }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Link component="button" underline="hover" onClick={onBack}>
                    Back to Login
                  </Link>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ fontWeight: "bold", backgroundColor: "#00acc1" }}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            )}

            {/* Step 2 */}
            {activeStep === 1 && (
              <Box>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Complete Your Account
                </Typography>

             
                <Grid container spacing={2} mb={2}>
                  <Grid size={{xs:12,sm:6,md:6,lg:6}}>
                    <TextField
                      fullWidth
                       size="small"
                      label="Full Name"
                      name="fullName"
                      value={values.fullName}
                      disabled
                      InputProps={{
                        style: { backgroundColor: "#f5f5f5" },
                      }}
                    />
                  </Grid>
                  <Grid size={{xs:12,sm:6,md:6,lg:6}}>
                    <TextField
                      fullWidth
                       size="small"
                      label="Personal Number"
                      name="personalNumber"
                      value={values.personalNumber}
                      disabled
                      InputProps={{
                        style: { backgroundColor: "#f5f5f5" },
                      }}
                    />
                  </Grid>
                </Grid>

              
                <Grid container spacing={2} mb={2}>
                  <Grid size={{xs:12,sm:6,md:6,lg:6}}>
                    <TextField
                      fullWidth
                       size="small"
                      label="Email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{xs:12,sm:6,md:6,lg:6}}>
                    <TextField
                      fullWidth
                       size="small"
                      label="Phone Number"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">+46</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} mb={2}>
 <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
  <Button
    variant="outlined"
    component="label"
    fullWidth
    // size="small"
    sx={{
      textTransform: "none",
      color: "grey.700",          // text grey
      borderColor: "grey.400",    // border grey
      "&:hover": {
        borderColor: "grey.600",  // hover par thoda dark
        backgroundColor: "grey.100",
      },
      justifyContent: "flex-start", // text left align jaise TextField
    }}
    startIcon={<CloudUploadIcon sx={{ color: "grey.600" }} />} // icon bhi grey
  >
    Upload Driving License
    <input
      type="file"
      accept="image/*"
      hidden
      name="drivingLicense"
      onChange={(event) => {
        if (event.target.files && event.target.files[0]) {
          setFieldValue("drivingLicense", event.target.files[0]); // Formik
        }
      }}
    />
  </Button>
  {values.drivingLicense && (
    <Typography variant="caption" color="textSecondary">
      {values.drivingLicense.name}
    </Typography>
  )}
</Grid>


                  <Grid size={{xs:12,sm:6,md:6,lg:6}}>
                    <TextField
                     size="small"
                      fullWidth
                      label="Bank Details (optional)"
                      name="bankDetails"
                      value={values.bankDetails}
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} mb={2}>
  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
    <TextField
      fullWidth
      size="small"
      label="Password"
      type="password"
      name="password"
      value={values.password}
      onChange={handleChange}
    />
  </Grid>

  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
    <TextField
      fullWidth
      size="small"
      label="Confirm Password"
      type="password"
      name="confirmPassword"
      value={values.confirmPassword}
      onChange={handleChange}
    />
  </Grid>
</Grid>


                {/* Terms */}
                <Box
                  sx={{
                    p: 2,
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    mb: 3,
                    textAlign: "left",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="terms"
                        checked={values.terms}
                        onChange={handleChange}
                      />
                    }
                    label={
                      <Typography variant="subtitle3">
                        By logging in, you confirm that your information is processed in accordance with{" "}
                        <a href="#" target="_blank" style={{ color: "#0097a7" }}>
                          Klargo’s Privacy Policy
                        </a>{" "}
                        and used only to verify your identity and secure transactions.
                      </Typography>
                    }
                  />
                </Box>

                <Divider sx={{ my: 3, borderColor: "grey.600" }} />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button onClick={handleBack}>Back</Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mb: 1,
                      backgroundColor: "#00acc1",
                      fontWeight: "bold",
                      padding: 1,
                      color: "white",
                    }}
                  >
                    Sign Up with BankID
                    <img
                      src={logo}
                      alt="BankID Logo"
                      style={{ width: 30, marginLeft: 8 }}
                    />
                  </Button>
                </Box>
              </Box>
            )}
          </Form>
        )}
      </Formik>
    </Paper>
  );
}

export default BankIdStepper;

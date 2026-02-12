import React, { useEffect, useState, useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AppSettings } from '../../../config/app-settings.js';
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import logo from "../../../../src/assets/logoBankIdwhite.png";
import Swal from "sweetalert2";
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
  Container,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../../../context/AuthContext.js";
import { Formik, Form } from "formik";
import Grid from "@mui/material/Grid";
import myImage2 from "../c3.jpg";
import AuthApiCall from "../../Apicall/AuthApiCall"; // path adjust karo
import axios from 'axios';
import * as Yup from "yup";




function RegisterV2() {
  const { authData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const context = useContext(AppSettings);

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    context.setAppHeaderNone(true);

    return () => {
      context.setAppHeaderNone(false);
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to='/dashboard' />;
  }
  const validationSchema = Yup.object({
    emailAddress: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    personalContact: Yup.string()
      .matches(/^[0-9]+$/, "Only digits are allowed")
      .min(10, "Must be at least 10 digits")
      .required("Contact number is required"),
  });

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
          <Typography variant="h6" fontWeight={"bold"} gutterBottom>
            BankID Sign Up
          </Typography>
          <Divider sx={{ my: 1, borderColor: "grey.600" }} />


          <Formik
            initialValues={{
              userName: "",
              emailAddress: "",
              personalContact: "",
              drivingLiscencePath: "",
              bankDetail: "",
              password: "",
              profileImagePath: "",
              isSeller: false,
              isBuyer: true,
              terms: false,

            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              const { terms, ...formValues } = values;
              const payload = {
                ...formValues,
                bankIdSSN: "string",
                surname: "string",
                name: 'string',
                profileImagePath: "",
                isSeller: false,
                isBuyer: true,
                countary: 'string',

                createExternalUserRegisterLogDto: {
                  identityToken: authData?.token || "string",
                  aud: authData?.claims?.aud || "string",
                  authenticationInstant: authData?.claims?.authenticationinstant || "string",
                  authenticationMethod: authData?.claims?.authenticationmethod || "string",
                  authenticationType: authData?.claims?.authenticationtype || "string",
                  countary: authData?.claims?.country || "string",
                  exp: authData?.claims?.exp?.toString() || "1",
                  familyName: authData?.claims?.family_name || "string",
                  given_Name: authData?.claims?.given_name || "string",
                  givenName: authData?.claims?.givenname || "string",
                  iat: authData?.claims?.iat?.toString() || "1",
                  identityScheme: authData?.claims?.identityscheme || "string",
                  ipAdress: authData?.claims?.ipaddress || "string",
                  iss: authData?.claims?.iss || "string",
                  name: authData?.claims?.name || "string",
                  nameIdentifier: authData?.claims?.nameidentifier || "string",
                  nbf: authData?.claims?.nbf?.toString() || "1",
                  sessionIndex: authData?.claims?.sessionindex || "string",
                  ssn: authData?.claims?.ssn || "string",
                  sub: authData?.claims?.sub || "string",
                  surName: authData?.claims?.surname || "string",
                  userEmail: values.emailAddress || "string",
                  userId: 0,
                },
              };

              console.log("Final data to send:", payload);

              try {
                setLoading(true);

           

                const response = await AuthApiCall({
                  url: "/services/app/User/RegisterExternalUser",
                  method: "POST",
                  data: payload,
                });


                // console.log("✅ API Response:", response.data);

                if (response.data?.success) {
                  Swal.fire({
                    icon: "success",
                    title: "User Registered!",
                    text: "External user registered successfully.",
                    confirmButtonText: "OK",
                  });
                  resetForm();
                  setShowLoginButton(true);
                } else {

                  const backendError =
                    response.data?.error?.details ||
                    response.data?.error?.message ||
                    response.data?.message ||
                    "Something went wrong while registering user.";

                  setApiError(backendError);
                }
              } catch (error) {
                console.error("❌ API Error:", error);


                const backendError =
                  error.response?.data?.error?.details ||
                  error.response?.data?.error?.message ||
                  error.response?.data?.message ||
                  "Something went wrong while registering user.";

                setApiError(backendError);
              } finally {
                setLoading(false);
              }
            }}
          >
            {({ values, handleChange, setFieldValue, errors, touched }) => (

              <Form>

                <Box>
                  <Typography variant="subtitle1" mb={2} mt={1}>
                    Complete Your Account
                  </Typography>

                  <Grid container spacing={2} mb={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="User Name"
                        name="userName"
                        value={values.userName}
                        onChange={handleChange}

                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Bank Detail"
                        name="bankDetail"
                        value={values.bankDetail}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} mb={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Email Address"
                        name="emailAddress"
                        value={values.emailAddress}
                        onChange={handleChange}
                        error={touched.emailAddress && Boolean(errors.emailAddress)}
                        helperText={touched.emailAddress && errors.emailAddress}
                      />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Contact Number"
                        name="personalContact"
                        value={values.personalContact}
                        onChange={handleChange}
                        error={touched.personalContact && Boolean(errors.personalContact)}
                        helperText={touched.personalContact && errors.personalContact}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} mb={2}>


                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        size="small"
                        label="Password"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                      />
                    </Grid>
                  </Grid>

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
                          onChange={(e) => setFieldValue("terms", e.target.checked)}
                        />
                      }
                      label={
                        <Typography variant="subtitle3">
                          By logging in, you confirm that your information is processed in
                          accordance with{" "}
                          <a
                            href="#"
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "#0097a7" }}
                          >
                            Klargo’s Privacy Policy
                          </a>
                          .
                        </Typography>
                      }
                    />
                  </Box>

                  {apiError && (
                    <div
                      style={{
                        color: "red",
                        background: "#ffe5e5",
                        padding: "10px",
                        marginTop: "15px",
                        borderRadius: "6px",
                        textAlign: "center",
                        fontWeight: "500",
                      }}
                    >
                      {apiError}
                    </div>
                  )}
                  <Divider sx={{ my: 3, borderColor: "grey.600" }} />
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button
                      variant="outline"
                      onClick={() => navigate("/Buyer")}
                    >
                      Back
                    </Button>

                    {!showLoginButton ? (
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading || !values.terms}
                        sx={{
                          mb: 1,
                          backgroundColor: loading ? "#9e9e9e" : "#00acc1",
                          fontWeight: "bold",
                          padding: 1,
                          color: "white",
                          "&:hover": { backgroundColor: "#008b9a" },
                        }}
                      >
                        {loading ? (
                          <>
                            <CircularProgress
                              size={20}
                              sx={{ color: "white", mr: 1 }}
                            />
                            Creating...
                          </>
                        ) : (
                          <>
                            Create Account
                            <img
                              src={logo}
                              alt="BankID Logo"
                              style={{ width: 30, marginLeft: 8 }}
                            />
                          </>
                        )}
                      </Button>
                    ) : (

                      <Button
                        variant="contained"
                        sx={{ mb: 1, backgroundColor: "#00acc1" }}
                        onClick={() => navigate("/Buyer")}
                      >
                        Move to Login
                      </Button>
                    )}
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </Box>
  );
}

export default RegisterV2;
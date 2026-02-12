
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Divider,
   
  CircularProgress,
  TextField,
  InputAdornment,
  FormLabel, Tabs,
  Tab,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import CryptoJS from "crypto-js";
import logo from "../../../assets/logoBankIdwhite.png";
import { useCriiptoVerify } from "@criipto/verify-react";
 import { useUser } from "../../../context/UserContext.js";
import { useTranslation } from "react-i18next";
import AuthApiCall from "../../../Apicall/AuthApiCall.js";
function BuyerLogin() {

 
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const { loginWithRedirect } = useCriiptoVerify();
    const { refreshUserInfo } = useUser();
  const handleLoginBankID = async () => {
    localStorage.setItem("role", "buyer");
    await loginWithRedirect({
      acrValues: "urn:grn:authn:se:bankid:another-device",
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const loginFormik = useFormik({
    initialValues: {
      emailAddress: "",
      password: "",

    },
    validationSchema: Yup.object({
      emailAddress: Yup.string().required("Email or Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setApiError("");
      try {
        setLoading(true);
        const payload = {
          userNameOrEmailAddress: values.emailAddress,
          password: values.password,
        };


        const response = await AuthApiCall({
          url: "/TokenAuth/Authenticate",
          method: "POST",
          data: payload,
        });

        if (response.data?.result?.accessToken) {
          Swal.fire({
            icon: "success",
            title: "Login Successful!",
            text: "You are now logged in.",
            timer: 500,
            showConfirmButton: false,
          });

          const token = response.data.result.accessToken;
          const secretKey = "klargo-secret-key";
          const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
          localStorage.setItem("authToken", encryptedToken);

      await refreshUserInfo();
   resetForm();

         
          navigate("/BuyerSuccess");
        } else {
          const backendError =
            response.data?.error?.details ||
            response.data?.error?.message ||
            response.data?.message ||
            "Invalid credentials.";
          setApiError(backendError);
        }
      } catch (error) {
        setApiError(
          error.response?.data?.error?.details ||
          error.response?.data?.error?.message ||
          error.response?.data?.message ||
          "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    },
  });


  const registerFormik = useFormik({
    initialValues: {
      emailAddress: "",
      password: "",
      isSeller: false,
      isBuyer: true,
    },
    validationSchema: Yup.object({
      emailAddress: Yup.string().required("Email is required"),
      password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setApiError("");
      try {
        setLoading(true);
        const { terms, ...formValues } = values;
        const payload = {
          userName: values.emailAddress,
          emailAddress: values.emailAddress,
          personalContact: "",
          drivingLiscencePath: "",
          bankDetail: "",
          password: values.password,
          profileImagePath: "",
          isSeller: false,
          isBuyer: true,

          bankIdSSN: "string",
          surname: "string",
          name: "string",
          country: "string",
          createExternalUserRegisterLogDto: {
            identityToken: "string",
            aud: "string",
            authenticationInstant: "string",
            authenticationMethod: "string",
            authenticationType: "string",
            countary: "string",
            exp: "1",
            familyName: "string",
            given_Name: "string",
            givenName: "string",
            iat: "1",
            identityScheme: "string",
            ipAdress: "string",
            iss: "string",
            name: "string",
            nameIdentifier: "string",
            nbf: "1",
            sessionIndex: "string",
            ssn: "string",
            sub: "string",
            surName: "string",
            userEmail: values.emailAddress,
            userId: 0,
          },
        };
 
        const response = await AuthApiCall({
          url: "/services/app/User/RegisterExternalUser",
          method: "POST",
          data: payload,
        });

        if (response.data?.success) {
          Swal.fire({
            icon: "success",
            title: "Registered Successfully!",
            timer: 800,
            showConfirmButton: false,
          });
          resetForm();
          setIsLogin(true);
        } else {
          const backendError =
            response.data?.error?.details ||
            response.data?.error?.message ||
            response.data?.message ||
            "Something went wrong.";
          setApiError(backendError);
        }
      } catch (error) {
        setApiError(
          error.response?.data?.error?.details ||
          error.response?.data?.error?.message ||
          error.response?.data?.message ||
          "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>




      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 5, textAlign: "center" }}>




        <Box textAlign="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">
            {t("buyerauth.signInTitle")}
          </Typography>

          <Typography variant="subtitle2" mt={1} sx={{ color: "#475569" }}>
            {t("buyerauth.signInSubtitle")}
          </Typography>
        </Box>

        <Box sx={{ backgroundColor: "#f5f6fa", borderRadius: 3, p: 0.9, display: "inline-block", width: "100%" }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            TabIndicatorProps={{ style: { display: "none" } }}
            textColor="inherit"
            sx={{ minHeight: "unset", "& .MuiTabs-flexContainer": { gap: "16px" } }}
          >
            <Tab
              label={t("buyerauth.tabs.bankId")}
              sx={{
                textTransform: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                borderRadius: 3,
                py: 0.7,
                minHeight: "unset",
                backgroundColor: tabValue === 0 ? "#fff" : "transparent",
                color: tabValue === 0 ? "#000" : "#64748b",
                boxShadow: tabValue === 0 ? "5px 4px 8px rgba(0,0,0,0.1)" : "none",
              }}
            />
            <Tab
              label={t("buyerauth.tabs.emailPassword")}
              sx={{
                textTransform: "none",
                fontSize: "0.9rem",
                fontWeight: 600,
                borderRadius: 3,
                py: 0.7,
                minHeight: "unset",
                backgroundColor: tabValue === 1 ? "#fff" : "transparent",
                color: tabValue === 1 ? "#000" : "#64748b",
                boxShadow: tabValue === 1 ? "-5px 4px 8px rgba(0,0,0,0.1)" : "none",
              }}
            />
          </Tabs>
        </Box>
        <Divider sx={{ my: 2 }} />



        {tabValue === 0 && (
          <Box sx={{ mt: 3, textAlign: "center", borderRadius: 3, p: 1, minWidth: "450px", }}>
            <Typography variant="body2" sx={{ color: "#4b5563", mb: 2 }}>
              {t("buyerauth.bankid.secureText")}
            </Typography>
            <Box>
              <Button
                fullWidth
                variant="contained"
                sx={{

                  mt: 2,
                  backgroundColor: "#ff9f63",
                  fontWeight: "bold",
                  borderRadius: 10
                }}
                onClick={handleLoginBankID}
              >
                {t("buyerauth.bankid.loginButton")}
                <img
                  src={logo}
                  alt="BankID Logo"
                  style={{ width: 30, marginLeft: 3 }}
                />
              </Button>
            </Box>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                mt: 1.5,
                fontWeight: 600,
                color: "#1e293b",
                borderColor: "#ffe1ce",
                borderRadius: 5,
                py: 1,
                "&:hover": { borderColor: "#ff9f63", backgroundColor: "#fff7f2" },
              }}
            >
              {t("buyerauth.bankid.loginButton")}
            </Button>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mt: 3,
                mb: 1,
              }}
            >

              <Box sx={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }} />


              <Typography
                sx={{
                  color: "#6b7280",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  px: 1.5,
                  whiteSpace: "nowrap",
                }}
              >
                or
              </Typography>


              <Box sx={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }} />
            </Box>


            <Typography
              textAlign="center"
              mt={3}
              fontSize="0.85rem"
              color="#ff"
            >
              {t("buyerauth.bankid.needHelp")}{" "}
            </Typography>
          </Box>
        )}



        {tabValue === 1 && (
          <Box>
            {isLogin ? (
              <form onSubmit={loginFormik.handleSubmit}>

                <FormLabel
                  component="legend"
                  sx={{
                    fontWeight: 600,
                    color: "#555",
                    textAlign: "left",
                    display: "block",
                    mb: 1,
                  }}
                >
                  {t("buyerauth.bankid.secureText")}
                </FormLabel>
                <TextField
                  fullWidth
                  size="small"

                  placeholder={t("buyerauth.email.emailPlaceholder")}
                  name="emailAddress"
                  value={loginFormik.values.emailAddress}
                  onChange={loginFormik.handleChange}
                  onBlur={loginFormik.handleBlur}
                  error={loginFormik.touched.emailAddress && Boolean(loginFormik.errors.emailAddress)}
                  helperText={loginFormik.touched.emailAddress && loginFormik.errors.emailAddress}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle color="action" fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                <FormLabel
                  component="legend"
                  sx={{
                    fontWeight: 600,
                    color: "#555",
                    mb: 1,
                    mt: 1,
                    textAlign: "left",
                    display: "block",
                  }}
                >
                  {t("buyerauth.email.passwordLabel")}
                </FormLabel>
                <TextField
                  fullWidth
                  placeholder={t("buyerauth.email.passwordPlaceholder")}
                  type="password"
                  size="small"

                  name="password"
                  value={loginFormik.values.password}
                  onChange={loginFormik.handleChange}
                  onBlur={loginFormik.handleBlur}
                  error={loginFormik.touched.password && Boolean(loginFormik.errors.password)}
                  helperText={loginFormik.touched.password && loginFormik.errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />

                {apiError && <Typography color="error">{apiError}</Typography>}
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, backgroundColor: "#ff9f63", fontWeight: "bold", }}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={22} color="inherit" />
                  ) : (
                    t("buyerauth.email.loginButton")
                  )}
                </Button>



                <Typography textAlign="center" mt={2} fontSize="0.85rem" color="#334155">
                  {t("buyerauth.email.newToKlargo")}{" "}
                  <span
                    style={{ color: "#ff9f63", fontWeight: 600, cursor: "pointer" }}
                    onClick={() => setIsLogin(false)}
                  >
                    {t("buyerauth.email.createAccount")}
                  </span>
                </Typography>

              </form>
            ) : (
              <form onSubmit={registerFormik.handleSubmit}>
                <FormLabel
                  component="legend"
                  sx={{
                    fontWeight: 600,
                    color: "#555",
                    textAlign: "left",
                    display: "block",
                    mb: 1,
                  }}
                >
                  {t("buyerauth.email.emailLabel")}
                </FormLabel>
                <TextField
                  fullWidth
                  size="small"

                  label="Email"
                  name="emailAddress"
                  value={registerFormik.values.emailAddress}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                  error={registerFormik.touched.emailAddress && Boolean(registerFormik.errors.emailAddress)}
                  helperText={registerFormik.touched.emailAddress && registerFormik.errors.emailAddress}
                />

                <FormLabel
                  component="legend"
                  sx={{
                    fontWeight: 600,
                    color: "#555",
                    textAlign: "left",
                    display: "block",
                    mb: 1,
                    mt: 2,
                  }}
                >
                  {t("buyerauth.email.passwordLabel")}
                </FormLabel>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  size="small"

                  name="password"
                  value={registerFormik.values.password}
                  onChange={registerFormik.handleChange}
                  onBlur={registerFormik.handleBlur}
                  error={registerFormik.touched.password && Boolean(registerFormik.errors.password)}
                  helperText={registerFormik.touched.password && registerFormik.errors.password}
                />
                {apiError && <Typography color="error">{apiError}</Typography>}
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, backgroundColor: "#ff9f63", fontWeight: "bold", borderRadius: 2 }}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={22} color="inherit" />
                  ) : (
                    t("buyerauth.email.createAccountButton")
                  )}
                </Button>


                <Typography
                  textAlign="center"
                  mt={2}
                  fontSize="0.85rem"
                  color="#334155"
                >
                  {t("buyerauth.email.alreadyHaveAccount")}{" "}
                  <span
                    style={{
                      color: "#ff9f63",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    onClick={() => setIsLogin(true)}
                  >
                    {t("buyerauth.email.login")}
                  </span>
                </Typography>
              </form>
            )}

          </Box>
        )}


        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 1,
          }}
        >

        </Box>
        <Divider sx={{ mt: 2, borderColor: "#979797ff" }} />

        <Box mt={3} textAlign="center">
          <Typography variant="caption" sx={{ color: "#6b7280", fontSize: "0.7rem" }}>
            {t("buyerauth.legal.agreementText")}{" "}
            <span
              style={{
                color: "#ff9f63",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {t("buyerauth.legal.terms")}
            </span>{" "}
            {t("buyerauth.legal.and")}{" "}
            <span
              style={{
                color: "#ff9f63",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {t("buyerauth.legal.privacy")}
            </span>
            .
          </Typography>
        </Box>

      </Paper>



    </Box>
  );
}

export default BuyerLogin;

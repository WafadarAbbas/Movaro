import React, { useEffect, useState } from "react";
import { Typography, Box, Tabs, Tab, Button, Divider } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';
import { useCriiptoVerify } from "@criipto/verify-react";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import AuthApiCall from "../../Apicall/AuthApiCall";
import { useUser } from "../../context/UserContext";


const LoginModal = (props) => {
  const { loginWithRedirect } = useCriiptoVerify();
  const [tabValue, setTabValue] = useState(0);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiError2, setApiError2] = useState("");
  const { t } = useTranslation();
  const { refreshUserInfo } = useUser();


 
  const handleLoginBankID = async () => {

    await loginWithRedirect({
      acrValues: "urn:grn:authn:se:bankid:another-device",
    });
  };

 const handleTabChange = (event, newValue) => {
  setTabValue(newValue);
};
useEffect(() => {
  const handleOnline = () => setApiError("");
  const handleOffline = () =>
    setApiError("No internet connection. Please check your network.");

  window.addEventListener("online", handleOnline);
  window.addEventListener("offline", handleOffline);

  if (!navigator.onLine) {
    setApiError("No internet connection. Please check your network.");
  }

  return () => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  };
}, []);

  // ======================
  // ✅ Signup Formik
  // ======================
  const signupFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
     
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      Confirmpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {

      const payload = {
        userName: values.email,
        emailAddress: values.email,
        personalContact: "",
        drivingLiscencePath: "",
        bankDetail: "",
        password: values.password,
        profileImagePath: "",
        isSeller: false,
        isBuyer: false,
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
          userEmail: values.email,
          userId: 0,
        },
      };

      

      try {
        setLoading(true);
        const response = await AuthApiCall({
          url: "/services/app/User/RegisterExternalUser",
          method: "POST",
          data: payload,
        });

        if (response.data?.success) {
          Swal.fire({
            icon: "success",
            title: "User Registered!",
            text: "External user registered successfully.",
          });
          resetForm();
          if (props.close && props.close.current) {
            props.close.current.click();
          }
        } else {
          const backendError =
            response.data?.error?.details ||
            response.data?.error?.message ||
            response.data?.message ||
            "Something went wrong while registering user.";
          setApiError2(backendError);
        }
      } catch (error) {
        console.error("API Error:", error);
        const backendError =
          error.response?.data?.error?.details ||
          error.response?.data?.error?.message ||
          error.response?.data?.message ||
          "Something went wrong while registering user.";
        setApiError2(backendError);
      } finally {
        setLoading(false);
      }
    },
  });


  // ======================
  // ✅ Login Formik
  // ======================
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email or Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setApiError("");
      try {
        setLoading(true);

        const payload = {
          userNameOrEmailAddress: values.email,
          password: values.password,
        };

        const response = await AuthApiCall({
          url: "/TokenAuth/Authenticate",
          method: "POST",
          data: payload,
          
        });
        if (response.data?.result?.accessToken) {
          const token = response.data.result.accessToken;
          const secretKey = "klargo-secret-key";
          const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
          localStorage.setItem("authToken", encryptedToken);


          resetForm();
          if (props.close && props.close.current) {
            props.close.current.click();
          }

       await refreshUserInfo();  

navigate("/user/ChooseAction", { replace: true });

        } else {
          const backendError =
            response.data?.error?.details ||
            response.data?.error?.message ||
            response.data?.message ||
            "Invalid credentials or unexpected response.";

          setApiError(backendError);

        }
      } catch (error) {
        console.error("❌ API Error:", error);

        const backendError =
          error.response?.data?.error?.details ||
          error.response?.data?.error?.message ||
          error.response?.data?.message ||
          "Something went wrong while logging in.";

        setApiError(backendError);

      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#LoginModalModal"
        ref={props.open}
      >
        Login
      </button>

      <div
        className="modal fade"
        id="LoginModalModal"
        tabIndex="-1"
        aria-labelledby="LoginModalModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content" style={{ borderRadius: "18px" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="LoginModalModalLabel">
                Login
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                ref={props.close}
                style={{
                  filter:
                    "invert(33%) sepia(94%) saturate(7478%) hue-rotate(356deg) brightness(99%) contrast(103%)",
                }}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <Box textAlign="center" mb={1}>
                <Typography variant="h5" fontWeight="bold">
                  {t("auth.signInTitle")}
                </Typography>
                <Typography variant="subtitle2" mt={1} sx={{ color: "#475569" }}>
                  {t("auth.signInSubtitle")}
                </Typography>
              </Box>


              <Box textAlign="center" mt={3}>
                <Box
                  sx={{
                    backgroundColor: "#f5f6fa",
                    borderRadius: 3,
                    p: 0.9,
                    display: "inline-block",
                    width: "100%",
                  }}
                >
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    TabIndicatorProps={{ style: { display: "none" } }}
                    textColor="inherit"
                    sx={{
                      minHeight: "unset",
                      "& .MuiTabs-flexContainer": { gap: "16px" },
                    }}
                  >
                    <Tab
                      label={t("auth.tabs.bankId")}
                      sx={{
                        textTransform: "none",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        borderRadius: 3,
                        py: 0.7,
                        minHeight: "unset",
                        backgroundColor: tabValue === 0 ? "#fff" : "transparent",
                        color: tabValue === 0 ? "#000" : "#64748b",
                        boxShadow:
                          tabValue === 0 ? "5px 4px 8px rgba(0,0,0,0.1)" : "none",
                      }}
                    />
                    <Tab
                      label={t("auth.tabs.emailPassword")}
                      sx={{
                        textTransform: "none",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        borderRadius: 3,
                        py: 0.7,
                        minHeight: "unset",
                        backgroundColor: tabValue === 1 ? "#fff" : "transparent",
                        color: tabValue === 1 ? "#000" : "#64748b",
                        boxShadow:
                          tabValue === 1 ? "-5px 4px 8px rgba(0,0,0,0.1)" : "none",
                      }}
                    />
                  </Tabs>
                </Box>
              </Box>


              <Box mt={3}>

                {tabValue === 0 && (
                  <Box
                    sx={{
                      mt: 3,
                      textAlign: "center",

                      borderRadius: 3,
                      p: 1,

                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "#4b5563", mb: 2, gap: 1 }}
                    >
                      🔒{t("auth.bankId.secureLogin")}
                    </Typography>

                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        backgroundColor: "#ff9f63",
                        color: "#fff",
                        fontWeight: 700,
                        borderRadius: 5,
                        py: 1,
                        mt: 3,
                        "&:hover": { backgroundColor: "#ff8a40" },
                      }}
                      onClick={handleLoginBankID}
                    >
                      {t("auth.bankId.openBankId")}
                    </Button>

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
                        "&:hover": {
                          borderColor: "#ff9f63",
                          backgroundColor: "#fff7f2",
                        },
                      }}
                    >
                      {t("auth.bankId.showQRCode")}
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
                      variant="body2"
                      sx={{
                        color: "#ff9f63",
                        fontWeight: 600,
                        mb: 2,
                        mt: 2,
                        cursor: "pointer",
                      }}
                    >
                      {t("auth.bankId.needHelp")}
                    </Typography>


                    <Typography
                      variant="overline"
                      sx={{ color: "#6b7280", fontSize: "0.55rem" }}
                    >
                      {t("auth.bankId.agreementTextStart")}{" "}
                      <Typography
                        component="span"
                        sx={{ color: "#ff9f63", cursor: "pointer", fontWeight: 300, fontSize: "0.75rem" }}
                      >
                        {t("auth.bankId.termsOfService")}
                      </Typography>{" "}
                      and{" "}
                      <Typography
                        component="span"
                        sx={{ color: "#ff9f63", cursor: "pointer", fontWeight: 300, fontSize: "0.75rem" }}
                      >
                        {t("auth.bankId.privacyPolicy")}
                      </Typography>.
                    </Typography>

                  </Box>
                )}


                {tabValue === 1 && (
                  <Box>
                    {isSignup ? (
                      <form onSubmit={signupFormik.handleSubmit}>
                        <Box p={1}>
                          <Typography textAlign="left" fontWeight={600} fontSize="0.9rem" mb={1}>
                            {t("auth.email")}
                          </Typography>
                          <input
                            type="text"
                            name="email"
                            value={signupFormik.values.email}
                            onChange={signupFormik.handleChange}
                            className="form-control mb-1"
                            placeholder={t("auth.emailPlaceholder")}
                          />
                          {signupFormik.touched.email && signupFormik.errors.email && (
                            <div className="text-danger small">{signupFormik.errors.email}</div>
                          )}

                          <Typography textAlign="left" fontWeight={600} fontSize="0.9rem" mb={1}>
                            {t("auth.password")}
                          </Typography>
                          <input
                            type="password"
                            name="password"
                            value={signupFormik.values.password}
                            onChange={signupFormik.handleChange}
                            className="form-control mb-1"
                            placeholder={t("auth.passwordPlaceholder")}
                          />
                          {signupFormik.touched.password && signupFormik.errors.password && (
                            <div className="text-danger small">{signupFormik.errors.password}</div>
                          )}

                          <Typography textAlign="left" fontWeight={600} fontSize="0.9rem" mb={1}>
                            {t("auth.confirmPassword")}
                          </Typography>
                          <input
                            type="password"
                            name="Confirmpassword"
                            value={signupFormik.values.Confirmpassword}
                            onChange={signupFormik.handleChange}
                            onBlur={signupFormik.handleBlur}
                            className="form-control mb-1"
                            placeholder={t("auth.confirmPasswordPlaceholder")}
                          />
                          {signupFormik.touched.Confirmpassword && signupFormik.errors.Confirmpassword && (
                            <div className="text-danger small">{signupFormik.errors.Confirmpassword}</div>
                          )}

                          {apiError2 && (
                            <div style={{
                              color: "red",
                              background: "#ffe5e5",
                              padding: "10px",
                              marginTop: "15px",
                              borderRadius: "6px",
                              textAlign: "center",
                              fontWeight: "500",
                            }}>
                              {apiError2}
                            </div>
                          )}

                          <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            sx={{
                              backgroundColor: "#ff9f63",
                              fontWeight: 700,
                              color: "#fff",
                              borderRadius: "8px",
                              py: 1.2,
                              mt: 1,
                              "&:hover": { backgroundColor: "#f87829ff" },
                            }}
                          >
                            {t("auth.createAccount")}
                          </Button>

                          <Typography textAlign="center" mt={2} fontSize="0.85rem" color="#334155">
                            {t("auth.alreadyHaveAccount")}?{" "}
                            <span
                              style={{ color: "#ff9f63", fontWeight: 600, cursor: "pointer" }}
                              onClick={() => setIsSignup(false)}
                            >
                              {t("auth.login")}
                            </span>
                          </Typography>

                          <Divider sx={{ mt: 2, borderColor: "#979797ff" }} />

                          <Box mt={3} textAlign="center">
                            <Typography variant="caption" color="#6b7280" fontSize="0.7rem">
                              {t("auth.agreementTextStart")}{" "}
                              <span style={{ color: "#ff9f63", cursor: "pointer" }}>
                                {t("auth.termsOfService")}
                              </span>{" "}
                              {t("auth.agreementTextMiddle")}{" "}
                              <span style={{ color: "#ff9f63", cursor: "pointer" }}>
                                {t("auth.privacyPolicy")}
                              </span>.
                            </Typography>
                          </Box>
                        </Box>
                      </form>
                    ) : (
                      <form onSubmit={loginFormik.handleSubmit}>
                        <Box p={1}>
                          <Typography textAlign="left" fontWeight={600} fontSize="0.9rem" mb={1}>
                            {t("auth.email")}
                          </Typography>
                          <input
                            type="text"
                            name="email"
                            value={loginFormik.values.email}
                            onChange={loginFormik.handleChange}
                            className="form-control mb-1"
                            placeholder={t("auth.emailPlaceholder")}
                          />
                          {loginFormik.touched.email && loginFormik.errors.email && (
                            <div className="text-danger small">{loginFormik.errors.email}</div>
                          )}

                          <Typography textAlign="left" fontWeight={600} fontSize="0.9rem" mb={1}>
                            {t("auth.password")}
                          </Typography>
                          <input
                            type="password"
                            name="password"
                            value={loginFormik.values.password}
                            onChange={loginFormik.handleChange}
                            className="form-control mb-1"
                            placeholder={t("auth.passwordPlaceholder")}
                          />
                          {loginFormik.touched.password && loginFormik.errors.password && (
                            <div className="text-danger small">{loginFormik.errors.password}</div>
                          )}

                          {apiError && (
                            <Typography color="error" variant="body2" mt={1}>
                              {apiError}
                            </Typography>
                          )}

                          <Button
                            fullWidth
                            variant="contained"
                            type="submit"
                            disabled={loading}
                            sx={{
                              backgroundColor: "#ff9f63",
                              fontWeight: 700,
                              color: "#fff",
                              borderRadius: "8px",
                              py: 1.2,
                              mt: 1,
                              "&:hover": { backgroundColor: "#f87829ff" },
                            }}
                          >
                            {loading ? <CircularProgress size={24} color="inherit" /> : t("auth.login")}
                          </Button>

                          <Typography textAlign="center" mt={2} fontSize="0.85rem" color="#ff9f63" fontWeight={600} sx={{ cursor: "pointer" }}>
                            {t("auth.forgotPassword")}
                          </Typography>

                          <Typography textAlign="center" mt={2} fontSize="0.85rem" color="#334155">
                            {t("auth.newToKlargo")}?{" "}
                            <span
                              style={{ color: "#ff9f63", fontWeight: 600, cursor: "pointer" }}
                              onClick={() => setIsSignup(true)}
                            >
                              {t("auth.createAccount")}
                            </span>
                          </Typography>

                          <Divider sx={{ mt: 2, borderColor: "#979797ff" }} />
                          <Box mt={3} textAlign="center">
                            <Typography variant="caption" color="#6b7280" fontSize="0.7rem">
                              {t("auth.agreementTextStart")}{" "}
                              <span style={{ color: "#ff9f63", cursor: "pointer" }}>
                                {t("auth.termsOfService")}
                              </span>{" "}
                              {t("auth.agreementTextMiddle")}{" "}
                              <span style={{ color: "#ff9f63", cursor: "pointer" }}>
                                {t("auth.privacyPolicy")}
                              </span>.
                            </Typography>
                          </Box>
                        </Box>
                      </form>
                    )}
                  </Box>
                )}


              </Box>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

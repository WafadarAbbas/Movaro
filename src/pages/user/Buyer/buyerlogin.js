// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Link,
//   Paper,
//   Divider,
//   Container,
//   CircularProgress
// } from "@mui/material";
// import VpnKeyIcon from "@mui/icons-material/VpnKey";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// import { useCriiptoVerify } from "@criipto/verify-react";
// import { TextField, InputAdornment } from "@mui/material";
//  import { useNavigate } from "react-router-dom";
// import LockIcon from "@mui/icons-material/Lock";
// import logo from "../../../assets/logoBankIdwhite.png"
// import EmailIcon from "@mui/icons-material/Email";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import Swal from "sweetalert2";
// import CryptoJS from 'crypto-js'; 

// function BuyerLogin({ onForgotPassword }) {
// const navigate = useNavigate();
//     const { loginWithRedirect } = useCriiptoVerify();
//     const [loading, setLoading] = useState(false);
//   const [apiError, setApiError] = useState("");

//   const handleLoginBankID = async () => {
//     localStorage.setItem("role", "buyer");
//     await loginWithRedirect({
//       acrValues: "urn:grn:authn:se:bankid:another-device",  
//     });
//   };

// const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().required("Email or Username is required"),
//       password: Yup.string().required("Password is required"),
//     }),
//     onSubmit: async (values, { resetForm }) => {
//       setApiError("");
//       try {
//         setLoading(true);

//         const payload = {
//           userNameOrEmailAddress: values.email,
//           password: values.password,
//         };

//         const response = await axios.post(
//           "https://localhost:44311/api/TokenAuth/Authenticate",
//           payload,
//           {
//             headers: { "Content-Type": "application/json" },
//           }
//         );

//         console.log("✅ API Response:", response.data);

//         if (response.data?.result?.accessToken) {
//           Swal.fire({
//             icon: "success",
//             title: "Login Successful!",
//             text: "You are now logged in.",
//              timer: 500, 
//   showConfirmButton: false,  
//           });
//            const token = response.data.result.accessToken;
//                 const secretKey = "my-super-secret-key";
//                 const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
//                 localStorage.setItem("authToken", encryptedToken);


//           resetForm();
//            navigate("/BuyerSuccess");

//         } else {
//           const backendError =
//             response.data?.error?.details ||
//             response.data?.error?.message ||
//             response.data?.message ||
//             "Invalid credentials or unexpected response.";

//           setApiError(backendError);

//         }
//       } catch (error) {
//         console.error("❌ API Error:", error);

//         const backendError =
//           error.response?.data?.error?.details ||
//           error.response?.data?.error?.message ||
//           error.response?.data?.message ||
//           "Something went wrong while logging in.";

//         setApiError(backendError);

//       } finally {
//         setLoading(false);
//       }
//     },
//   });
//   return (
//    <Box sx={{ margin: "auto"  }}>
//       <Box
//         sx={{
//           maxWidth: 600,
//           margin: "auto",
//           mt: 2,
//           p: 3,
//           borderRadius: 3,
//           boxShadow: "0px 8px 15px rgba(0,0,0,0.4)",
//           backgroundColor: "white",
//         }}
//         component={Paper}
//       >
//         <Typography variant="h5" fontWeight="bold" gutterBottom>
//          Buyer Log in
//         </Typography>
//         <Typography variant="subtitle2" color="grey">
//           You need to login to verify
//         </Typography>

//         <Divider sx={{ my: 2, borderColor: "grey.600" }} />

//         {/* ✅ FORM */}
//         <form onSubmit={formik.handleSubmit}>
//           <TextField
//             fullWidth
//             size="small"
//             margin="normal"
//             label="Email / Username"
//             placeholder="Enter your email or username"
//             name="email"
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.email && Boolean(formik.errors.email)}
//             helperText={formik.touched.email && formik.errors.email}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <AccountCircle color="action" fontSize="small" />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <TextField
//             fullWidth
//             label="Password"
//             type="password"
//             placeholder="Enter password"
//             size="small"
//             margin="normal"
//             name="password"
//             value={formik.values.password}
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             error={formik.touched.password && Boolean(formik.errors.password)}
//             helperText={formik.touched.password && formik.errors.password}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <LockIcon color="action" fontSize="small" />
//                 </InputAdornment>
//               ),
//             }}
//           />

//           {apiError && (
//             <Typography color="error" variant="body2" mt={1}>
//               {apiError}
//             </Typography>
//           )}

//          <Button
//   fullWidth
//   variant="contained"
//   type="submit"
//   disabled={loading}
//   sx={{
//     mb: 1,
//     mt: 2,
//     backgroundColor: "#ff9f63",
//     fontWeight: "bold",
//     padding: 1,
//     borderRadius:10,
//     "&:disabled": {
//       backgroundColor: "#ff9f63",
//       color: "#fff",
//       cursor: "not-allowed",
//     },
//   }}
// >
//   {loading ? (
//     <>
//       <CircularProgress
//         size={22}
//         color="inherit"
//         sx={{ mr: 1 }}
//       />
//       Logging in...
//     </>
//   ) : (
//     <>
//       <AccountCircle sx={{ marginRight: 1 }} /> LOG IN TO YOUR ACCOUNT
//     </>
//   )}
// </Button>

//         </form>

//         <Box>
//           <Button
//             fullWidth
//             variant="contained"
//             sx={{
//               mb: 1,
//               backgroundColor: "#ff9f63",
//               fontWeight: "bold",
//               padding: 1,
//               borderRadius:10
//             }}
//             onClick={handleLoginBankID}
//           >
//             LOGIN WITH BANKID
//             <img
//               src={logo}
//               alt="BankID Logo"
//               style={{ width: 30, marginLeft: 3 }}
//             />
//           </Button>
//         </Box>

//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             mt: 1,
//           }}
//         >

//         </Box>
//       </Box>

//       <Container
//         maxWidth="xs"
//         sx={{
//           textAlign: "center",
//           backgroundColor: "#ffd231ff",
//           p: 1,
//           borderBottomLeftRadius: 12,
//           borderBottomRightRadius: 12,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           cursor: "pointer",
//           boxShadow: "0px -4px 6px rgba(0,0,0,0.2)",
//         }}
//         onClick={() => navigate("/user/buyerRegister-v2")}
//       >
//         <Typography
//           variant="subtitle2"
//           fontWeight="bold"
//           sx={{ textDecoration: "underline" }}
//         >
//           Sign up for new account
//         </Typography>
//       </Container>
//     </Box>


//   );
// }

// export default BuyerLogin;



import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Divider,
  Container,
  CircularProgress,
  TextField,
  InputAdornment,
  FormLabel, Tabs,
  Tab,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import CryptoJS from "crypto-js";
import logo from "../../../assets/logoBankIdwhite.png";
import { useCriiptoVerify } from "@criipto/verify-react";
import { useAuth } from "../../../context/AuthContext.js";
function BuyerLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const { loginWithRedirect } = useCriiptoVerify();
  const { authData } = useAuth();
  const handleLoginBankID = async () => {
    localStorage.setItem("role", "buyer");
    await loginWithRedirect({
      acrValues: "urn:grn:authn:se:bankid:another-device",
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  // ✅ Login Formik
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
        const response = await axios.post(
          "https://localhost:44311/api/TokenAuth/Authenticate",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.data?.result?.accessToken) {
          Swal.fire({
            icon: "success",
            title: "Login Successful!",
            text: "You are now logged in.",
            timer: 500,
            showConfirmButton: false,
          });

          const token = response.data.result.accessToken;
          const secretKey = "my-super-secret-key";
          const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
          localStorage.setItem("authToken", encryptedToken);

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

        console.log(payload);


        const response = await axios.post(
          "https://localhost:44311/api/services/app/User/RegisterExternalUser",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );

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
                        Sign in to Klargo
                      </Typography>
                      <Typography variant="subtitle2" mt={1} sx={{ color: "#475569" }}>
                        Choose how you want to log in.
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
              label="BANKID"
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
              label="EMAIL & PASSWORD"
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
              🔒 Secure login using your Swedish BankID.
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
                LOGIN WITH BANKID
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
              SHOW QR CODE
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
                 Need help logging in?{" "}
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
                  Email
                </FormLabel>
                <TextField
                  fullWidth
                  size="small"

                  placeholder="Email"
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
                  Password
                </FormLabel>
                <TextField
                  fullWidth
                  placeholder="Password"
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
                  {loading ? <CircularProgress size={22} color="inherit" /> : "LOG IN"}
                </Button>



                <Typography
                  textAlign="center"
                  mt={2}
                  fontSize="0.85rem"
                  color="#334155"
                >
                  New to Klargo?{" "}
                  <span
                    style={{
                      color: "#ff9f63",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    onClick={() => setIsLogin(false)}
                  >
                    CREATE AN ACCOUNT
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
                  Email
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
                  Password
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
                  {loading ? <CircularProgress size={22} color="inherit" /> : "CREATE ACCOUNT"}
                </Button>


                <Typography
                  textAlign="center"
                  mt={2}
                  fontSize="0.85rem"
                  color="#334155"
                >
                  Already have an account?{" "}
                  <span
                    style={{
                      color: "#ff9f63",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    onClick={() => setIsLogin(true)}
                  >
                    LOG IN
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
          <Typography variant="caption" color="#6b7280" fontSize="0.7rem">
            By continuing, you agree to our{" "}
            <span style={{ color: "#ff9f63", cursor: "pointer" }}>Terms of Service</span>{" "}
            and{" "}
            <span style={{ color: "#ff9f63", cursor: "pointer" }}>Privacy Policy</span>.
          </Typography>
        </Box>
      </Paper>



    </Box>
  );
}

export default BuyerLogin;

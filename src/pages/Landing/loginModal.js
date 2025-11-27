// import React, { useState } from "react";
// import { Typography, Box, Tabs, Tab, Button } from "@mui/material";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import Swal from "sweetalert2";

// const LoginModal = (props) => {
//   const [tabValue, setTabValue] = useState(0);
// const [isSignup, setIsSignup] = useState(false);
//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   return (
//     <div>
//       <button
//         type="button"
//         className="btn btn-primary d-none"
//         data-bs-toggle="modal"
//         data-bs-target="#LoginModalModal"
//         ref={props.open}
//       >
//         Login
//       </button>

//       <div
//         className="modal fade"
//         id="LoginModalModal"
//         tabIndex="-1"
//         aria-labelledby="LoginModalModalLabel"
//         data-bs-backdrop="static"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-md modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="LoginModalModalLabel">
//                Login
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 ref={props.close}
//                 style={{
//                   filter:
//                     "invert(33%) sepia(94%) saturate(7478%) hue-rotate(356deg) brightness(99%) contrast(103%)",
//                 }}
//                 aria-label="Close"
//               ></button>
//             </div>

//             <div className="modal-body">
//               <Box textAlign="center" mb={1}>
//                 <Typography variant="h5" fontWeight="bold">
//                   Sign in to Klargo
//                 </Typography>
//                 <Typography variant="subtitle2" mt={1} sx={{ color: "#475569" }} >
//                   Choose how you want to log in.
//                 </Typography>
//               </Box>

//               <Box textAlign="center" mt={3}>


//                 <Box
//                   sx={{
//                     backgroundColor: "#f5f6fa",
//                     borderRadius: 3,
//                     p: 0.9,
//                     display: "inline-block",
//                     width: "100%",

//                   }}
//                 >
//                   <Tabs
//                     value={tabValue}
//                     onChange={handleTabChange}
//                     variant="fullWidth"
//                     TabIndicatorProps={{ style: { display: "none" } }}
//                     textColor="inherit"
//                     sx={{
//                       minHeight: "unset",
//                       "& .MuiTabs-flexContainer": {
//                         gap: "16px",
//                       },
//                     }}
//                   >
//                     <Tab
//                       label="BANKID"
//                       sx={{
//                         textTransform: "none",
//                         fontSize: "0.9rem",
//                         fontWeight: 600,
//                         borderRadius: 3,
//                         py: 0.6,
//                         minHeight: "unset",
//                         backgroundColor: tabValue === 0 ? "#fff" : "transparent",
//                         color: tabValue === 0 ? "#000" : "#64748b",
//                         boxShadow: tabValue === 0 ? "5px 4px 8px rgba(0,0,0,0.1)" : "none",
//                         "&:hover": {
//                           backgroundColor: "#fff",
//                           color: "#000",
//                         },
//                       }}
//                     />
//                     <Tab
//                       label="EMAIL & PASSWORD"
//                       sx={{
//                         textTransform: "none",
//                         fontSize: "0.9rem",
//                         fontWeight: 600,
//                         borderRadius: 3,
//                         py: 0.6,
//                         minHeight: "unset",
//                         backgroundColor: tabValue === 1 ? "#fff" : "transparent",
//                         color: tabValue === 1 ? "#000" : "#64748b",
//                         boxShadow: tabValue === 1 ? "-5px 4px 8px rgba(0,0,0,0.1)" : "none",
//                         "&:hover": {
//                           backgroundColor: "#fff",
//                           color: "#000",
//                         },
//                       }}
//                     />
//                   </Tabs>
//                 </Box>
//               </Box>





//               <Box mt={3}>
//                 {tabValue === 0 && (
//                   <Box
//                     sx={{
//                       mt: 3,
//                       textAlign: "center",
//                       backgroundColor: "#fff",
//                       borderRadius: 3,
//                       p: 1,
//                       boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
//                     }}
//                   >

//                     <Typography
//                       variant="body2"
//                       sx={{
//                         color: "#4b5563",
//                         mb: 2,

//                         gap: 1,
//                       }}
//                     >
//                       <span role="img" aria-label="lock">🔒</span> Secure login using your Swedish BankID.
//                     </Typography>


//                     <Button
//                       fullWidth
//                       variant="contained"
//                       sx={{
//                         backgroundColor: "#ff9f63",
//                         color: "#fff",
//                         fontWeight: 700,
//                         borderRadius: 5,
//                         py: 1.2,
//                         "&:hover": {
//                           backgroundColor: "#ff8a40",
//                         },
//                       }}
//                     >
//                       OPEN BANKID
//                     </Button>


//                     <Button
//                       fullWidth
//                       variant="outlined"
//                       sx={{
//                         mt: 1.5,
//                         fontWeight: 600,
//                         color: "#1e293b",
//                         borderColor: "#ffe1ce",
//                         borderRadius: 5,
//                         py: 1.1,
//                         "&:hover": {
//                           borderColor: "#ff9f63",
//                           backgroundColor: "#fff7f2",
//                         },
//                       }}
//                     // startIcon={<span style={{ fontSize: "1rem" }}>🔲</span>}
//                     >
//                       SHOW QR CODE
//                     </Button>


//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         mt: 3,
//                         mb: 1,
//                       }}
//                     >

//                       <Box sx={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }} />


//                       <Typography
//                         sx={{
//                           color: "#6b7280",
//                           fontSize: "0.8rem",
//                           fontWeight: 500,
//                           px: 1.5,
//                           whiteSpace: "nowrap",
//                         }}
//                       >
//                         or
//                       </Typography>


//                       <Box sx={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb" }} />
//                     </Box>




//                     <Typography
//                       variant="body2"
//                       sx={{
//                         color: "#ff9f63",
//                         fontWeight: 600,
//                         mb: 2,
//                         cursor: "pointer",
//                       }}
//                     >
//                       Need help logging in?
//                     </Typography>


//                     <Typography
//                       variant="overline" // ya 'caption' se chhota
//                       sx={{ color: "#6b7280", fontSize: "0.55rem" }}
//                     >
//                       By continuing, you agree to our{" "}
//                       <Typography
//                         component="span"
//                         sx={{ color: "#ff9f63", cursor: "pointer", fontWeight: 300, fontSize: "0.75rem" }}
//                       >
//                         Terms of Service
//                       </Typography>{" "}
//                       and{" "}
//                       <Typography
//                         component="span"
//                         sx={{ color: "#ff9f63", cursor: "pointer", fontWeight: 300, fontSize: "0.75rem" }}
//                       >
//                         Privacy Policy
//                       </Typography>.
//                     </Typography>
//                   </Box>
//                 )}

//                {tabValue === 1 && (
//   <Box>

//     {isSignup ? (

//       <Box p={1}>
//         <Typography textAlign="left" fontWeight={600} fontSize="0.9rem" mb={1}>
//           Email
//         </Typography>
//         <input
//           type="email"
//           placeholder="your.email@example.com"
//           className="form-control mb-3"
//           style={{
//             borderRadius: "8px",
//             padding: "10px",
//             fontSize: "0.9rem",
//           }}
//         />

//         <Typography textAlign="left" fontWeight={600} fontSize="0.9rem" mb={1}>
//           Password
//         </Typography>
//         <input
//           type="password"
//           placeholder="At least 6 characters"
//           className="form-control mb-3"
//           style={{
//             borderRadius: "8px",
//             padding: "10px",
//             fontSize: "0.9rem",
//           }}
//         />

//         <Typography textAlign="left" fontWeight={600} fontSize="0.9rem" mb={1}>
//           Confirm password
//         </Typography>
//         <input
//           type="password"
//           placeholder="Re-enter your password"
//           className="form-control mb-3"
//           style={{
//             borderRadius: "8px",
//             padding: "10px",
//             fontSize: "0.9rem",
//           }}
//         />

//         <Button
//           fullWidth
//           variant="contained"
//           sx={{
//             backgroundColor: "#ff9f63",
//             fontWeight: 700,
//             color: "#fff",
//             borderRadius: "8px",
//             py: 1.2,
//             mt: 1,
//             "&:hover": { backgroundColor: "#f87829ff" },
//           }}
//         >
//           CREATE ACCOUNT
//         </Button>

//         <Typography
//           textAlign="center"
//           mt={2}
//           fontSize="0.85rem"
//           color="#334155"
//         >
//           Already have an account?{" "}
//           <span
//             style={{ color: "#ff9f63", fontWeight: 600, cursor: "pointer" }}
//             onClick={() => setIsSignup(false)}
//           >
//             LOG IN
//           </span>
//         </Typography>

//         <Box mt={3} textAlign="center">
//           <Typography
//             variant="caption"
//             color="#6b7280"
//             fontSize="0.7rem"
//           >
//             By continuing, you agree to our{" "}
//             <span
//               style={{ color: "#ff9f63", cursor: "pointer" }}
//             >
//               Terms of Service
//             </span>{" "}
//             and{" "}
//             <span
//               style={{ color: "#ff9f63", cursor: "pointer" }}
//             >
//               Privacy Policy
//             </span>.
//           </Typography>
//         </Box>
//       </Box>
//     ) : (

//       <Box p={1}>
//         <Typography textAlign="left" fontWeight={600} fontSize="0.9rem" mb={1}>
//           Email
//         </Typography>
//         <input
//           type="email"
//           placeholder="your.email@example.com"
//           className="form-control mb-3"
//           style={{
//             borderRadius: "8px",
//             padding: "10px",
//             fontSize: "0.9rem",
//           }}
//         />

//         <Typography textAlign="left" fontWeight={600} fontSize="0.9rem" mb={1}>
//           Password
//         </Typography>
//         <input
//           type="password"
//           placeholder="Enter your password"
//           className="form-control mb-2"
//           style={{
//             borderRadius: "8px",
//             padding: "10px",
//             fontSize: "0.9rem",
//           }}
//         />

//         <Button
//           fullWidth
//           variant="contained"
//           sx={{
//             backgroundColor: "#ff9f63",
//             fontWeight: 700,
//             color: "#fff",
//             borderRadius: "8px",
//             py: 1.2,
//             mt: 1,
//             "&:hover": { backgroundColor: "#f87829ff" },
//           }}
//         >
//           LOG IN
//         </Button>

//         <Typography
//           textAlign="center"
//           mt={2}
//           fontSize="0.85rem"
//           color="#ff9f63"
//           fontWeight={600}
//           sx={{ cursor: "pointer" }}
//         >
//           Forgot your password?
//         </Typography>

//         <Typography
//           textAlign="center"
//           mt={2}
//           fontSize="0.85rem"
//           color="#334155"
//         >
//           New to Klargo?{" "}
//           <span
//             style={{ color: "#ff9f63", fontWeight: 600, cursor: "pointer" }}
//             onClick={() => setIsSignup(true)}
//           >
//             CREATE AN ACCOUNT
//           </span>
//         </Typography>

//         <Box mt={3} textAlign="center">
//           <Typography
//             variant="caption"
//             color="#6b7280"
//             fontSize="0.7rem"
//           >
//             By continuing, you agree to our{" "}
//             <span
//               style={{ color: "#ff9f63", cursor: "pointer" }}
//             >
//               Terms of Service
//             </span>{" "}
//             and{" "}
//             <span
//               style={{ color: "#ff9f63", cursor: "pointer" }}
//             >
//               Privacy Policy
//             </span>.
//           </Typography>
//         </Box>
//       </Box>
//     )}
//   </Box>
// )}

//               </Box>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;







import React, { useState } from "react";
import { Typography, Box, Tabs, Tab, Button, Divider } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
  import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js'; 
import { useCriiptoVerify } from "@criipto/verify-react";
import CircularProgress from "@mui/material/CircularProgress";

const LoginModal = (props) => {
     const { loginWithRedirect } = useCriiptoVerify();
  const [tabValue, setTabValue] = useState(0);
  const [isSignup, setIsSignup] = useState(false);
const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const [apiError2, setApiError2] = useState("");

   const handleLoginBankID = async () => {
    
    await loginWithRedirect({
      acrValues: "urn:grn:authn:se:bankid:another-device",  
    });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // ======================
  // ✅ Signup Formik
  // ======================
const signupFormik = useFormik({
  initialValues: {
    email: "",       
    password: "",    
  },
  validationSchema: Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
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
        identityToken:   "string",
        aud:  "string",
        authenticationInstant:  "string",
        authenticationMethod:  "string",
        authenticationType:  "string",
        countary:"string",
        exp:   "1",
        familyName:   "string",
        given_Name:  "string",
        givenName:   "string",
        iat:   "1",
        identityScheme:   "string",
        ipAdress:  "string",
        iss:   "string",
        name:   "string",
        nameIdentifier:  "string",
        nbf:  "1",
        sessionIndex:  "string",
        ssn:  "string",      
          sub:   "string",
        surName:  "string",
        userEmail: values.email,
        userId: 0,
      },
    };

    console.log("Final payload to send:", payload);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://localhost:44311/api/services/app/User/RegisterExternalUser",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

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

        // setShowLoginButton(true);
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

        const response = await axios.post(
          "https://localhost:44311/api/TokenAuth/Authenticate",
          payload,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("✅ API Response:", response.data);
      //  console.log( response.data?.result?.accessToken);
        // localStorage.setItem("authTokenn",  response.data?.result?.accessToken);

        if (response.data?.result?.accessToken) {
 
           const token = response.data.result.accessToken;
                const secretKey = "my-super-secret-key";
                const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
                localStorage.setItem("authToken", encryptedToken);
         

          resetForm();
             if (props.close && props.close.current) {
            props.close.current.click();
          }

           navigate("/user/ChooseAction");
     
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
                  Sign in to Klargo
                </Typography>
                <Typography variant="subtitle2" mt={1} sx={{ color: "#475569" }}>
                  Choose how you want to log in.
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
                        boxShadow:
                          tabValue === 0
                            ? "5px 4px 8px rgba(0,0,0,0.1)"
                            : "none",
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
                        boxShadow:
                          tabValue === 1
                            ? "-5px 4px 8px rgba(0,0,0,0.1)"
                            : "none",
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
                      🔒 Secure login using your Swedish BankID.
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
                        mt:3,
                        "&:hover": { backgroundColor: "#ff8a40" },
                      }}
                         onClick={handleLoginBankID}
                    >
                      OPEN BANKID
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
                      variant="body2"
                      sx={{
                        color: "#ff9f63",
                        fontWeight: 600,
                        mb: 2,
                         mt: 2,
                        cursor: "pointer",
                      }}
                    >
                      Need help logging in?
                    </Typography>


                    <Typography
                      variant="overline"  
                      sx={{ color: "#6b7280", fontSize: "0.55rem" }}
                    >
                      By continuing, you agree to our{" "}
                      <Typography
                        component="span"
                        sx={{ color: "#ff9f63", cursor: "pointer", fontWeight: 300, fontSize: "0.75rem" }}
                      >
                        Terms of Service
                      </Typography>{" "}
                      and{" "}
                      <Typography
                        component="span"
                        sx={{ color: "#ff9f63", cursor: "pointer", fontWeight: 300, fontSize: "0.75rem" }}
                      >
                        Privacy Policy
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
      Email 
    </Typography>
    <input
      type="text"
      name="email"
      value={signupFormik.values.email}
      onChange={signupFormik.handleChange}
      className="form-control mb-1"
      placeholder="Email"
    />
    {signupFormik.touched.email && signupFormik.errors.email && (
      <div className="text-danger small">{signupFormik.errors.email}</div>
    )}

    <Typography textAlign="left" fontWeight={600} fontSize="0.9rem" mb={1}>
      Password
    </Typography>
    <input
      type="password"
      name="password"
      value={signupFormik.values.password}
      onChange={signupFormik.handleChange}
      className="form-control mb-1"
      placeholder="At least 6 characters"
    />
    {signupFormik.touched.password && signupFormik.errors.password && (
      <div className="text-danger small">{signupFormik.errors.password}</div>
    )}
<Typography textAlign="left" fontWeight={600} fontSize="0.9rem" mb={1}>
  Confirm Password
</Typography>
<input
  type="password"
  name="Confirmpassword"
  value={signupFormik.values.Confirmpassword}
  onChange={signupFormik.handleChange}
  onBlur={signupFormik.handleBlur}
  className="form-control mb-1"
  placeholder="At least 6 characters"
/>
{signupFormik.touched.Confirmpassword && signupFormik.errors.Confirmpassword && (
  <div className="text-danger small">{signupFormik.errors.Confirmpassword}</div>
)}

  

    {apiError2 && (
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
      CREATE ACCOUNT
    </Button>

    <Typography textAlign="center" mt={2} fontSize="0.85rem" color="#334155">
      Already have an account?{" "}
      <span
        style={{ color: "#ff9f63", fontWeight: 600, cursor: "pointer" }}
        onClick={() => setIsSignup(false)}
      >
        LOG IN
      </span>
    </Typography>

    <Divider sx={{ mt: 2, borderColor: "#979797ff" }} />

    <Box mt={3} textAlign="center">
      <Typography variant="caption" color="#6b7280" fontSize="0.7rem">
        By continuing, you agree to our{" "}
        <span style={{ color: "#ff9f63", cursor: "pointer" }}>Terms of Service</span>{" "}
        and{" "}
        <span style={{ color: "#ff9f63", cursor: "pointer" }}>Privacy Policy</span>.
      </Typography>
    </Box>
  </Box>
</form>

                    ) : (
                      // Login Form
                      <form onSubmit={loginFormik.handleSubmit}>
                        <Box p={1}>
                          <Typography
                            textAlign="left"
                            fontWeight={600}
                            fontSize="0.9rem"
                            mb={1}
                          >
                            Email
                          </Typography>
                          <input
                              type="text" 
                            name="email"
                            value={loginFormik.values.email}
                            onChange={loginFormik.handleChange}
                            className="form-control mb-1"
                            placeholder="Email"
                          />
                          {loginFormik.touched.email &&
                            loginFormik.errors.email && (
                              <div className="text-danger small">
                                {loginFormik.errors.email}
                              </div>
                            )}

                          <Typography
                            textAlign="left"
                            fontWeight={600}
                            fontSize="0.9rem"
                            mb={1}
                          >
                            Password
                          </Typography>
                          <input
                            type="password"
                            name="password"
                            value={loginFormik.values.password}
                            onChange={loginFormik.handleChange}
                            className="form-control mb-1"
                            placeholder="Enter your password"
                          />
                          {loginFormik.touched.password &&
                            loginFormik.errors.password && (
                              <div className="text-danger small">
                                {loginFormik.errors.password}
                              </div>
                            )}

                              {apiError && (
                                        <Typography color="error" variant="body2" mt={1}>
                                          {apiError}
                                        </Typography>
                                      )}
                            
{/* 
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
                            LOG IN
                          </Button> */}

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
  {loading ? (
    <CircularProgress size={24} color="inherit" />
  ) : (
    "LOG IN"
  )}
</Button>


                          <Typography
                            textAlign="center"
                            mt={2}
                            fontSize="0.85rem"
                            color="#ff9f63"
                            fontWeight={600}
                            sx={{ cursor: "pointer" }}
                          >
                            Forgot your password?
                          </Typography>

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
                              onClick={() => setIsSignup(true)}
                            >
                              CREATE AN ACCOUNT
                            </span>
                          </Typography>

                              <Divider sx={{ mt: 2, borderColor: "#979797ff" }} />
                          <Box mt={3} textAlign="center">
                            <Typography
                              variant="caption"
                              color="#6b7280"
                              fontSize="0.7rem"
                            >
                              By continuing, you agree to our{" "}
                              <span
                                style={{ color: "#ff9f63", cursor: "pointer" }}
                              >
                                Terms of Service
                              </span>{" "}
                              and{" "}
                              <span
                                style={{ color: "#ff9f63", cursor: "pointer" }}
                              >
                                Privacy Policy
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

import React, { useState } from "react";
import { Typography, Box, Tabs, Tab, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const CreateTesting3 = (props) => {
  const [tabValue, setTabValue] = useState(0);
const [isSignup, setIsSignup] = useState(false);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreateTesting3Modal"
        ref={props.open}
      >
        Login
      </button>

      <div
        className="modal fade"
        id="CreateTesting3Modal"
        tabIndex="-1"
        aria-labelledby="CreateTesting3ModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateTesting3ModalLabel">
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
                <Typography variant="subtitle2" mt={1} sx={{ color: "#475569" }} >
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
                      "& .MuiTabs-flexContainer": {
                        gap: "16px",
                      },
                    }}
                  >
                    <Tab
                      label="BANKID"
                      sx={{
                        textTransform: "none",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        borderRadius: 3,
                        py: 0.6,
                        minHeight: "unset",
                        backgroundColor: tabValue === 0 ? "#fff" : "transparent",
                        color: tabValue === 0 ? "#000" : "#64748b",
                        boxShadow: tabValue === 0 ? "5px 4px 8px rgba(0,0,0,0.1)" : "none",
                        "&:hover": {
                          backgroundColor: "#fff",
                          color: "#000",
                        },
                      }}
                    />
                    <Tab
                      label="EMAIL & PASSWORD"
                      sx={{
                        textTransform: "none",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        borderRadius: 3,
                        py: 0.6,
                        minHeight: "unset",
                        backgroundColor: tabValue === 1 ? "#fff" : "transparent",
                        color: tabValue === 1 ? "#000" : "#64748b",
                        boxShadow: tabValue === 1 ? "-5px 4px 8px rgba(0,0,0,0.1)" : "none",
                        "&:hover": {
                          backgroundColor: "#fff",
                          color: "#000",
                        },
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
                      backgroundColor: "#fff",
                      borderRadius: 3,
                      p: 1,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                  >

                    <Typography
                      variant="body2"
                      sx={{
                        color: "#4b5563",
                        mb: 2,

                        gap: 1,
                      }}
                    >
                      <span role="img" aria-label="lock">🔒</span> Secure login using your Swedish BankID.
                    </Typography>


                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        backgroundColor: "#ff9f63",
                        color: "#fff",
                        fontWeight: 700,
                        borderRadius: 5,
                        py: 1.2,
                        "&:hover": {
                          backgroundColor: "#ff8a40",
                        },
                      }}
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
                        py: 1.1,
                        "&:hover": {
                          borderColor: "#ff9f63",
                          backgroundColor: "#fff7f2",
                        },
                      }}
                    // startIcon={<span style={{ fontSize: "1rem" }}>🔲</span>}
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
                        cursor: "pointer",
                      }}
                    >
                      Need help logging in?
                    </Typography>


                    <Typography
                      variant="overline" // ya 'caption' se chhota
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
       
      <Box p={1}>
        <Typography textAlign="left" fontWeight={600} fontSize="0.9rem" mb={1}>
          Email
        </Typography>
        <input
          type="email"
          placeholder="your.email@example.com"
          className="form-control mb-3"
          style={{
            borderRadius: "8px",
            padding: "10px",
            fontSize: "0.9rem",
          }}
        />

        <Typography textAlign="left" fontWeight={600} fontSize="0.9rem" mb={1}>
          Password
        </Typography>
        <input
          type="password"
          placeholder="At least 6 characters"
          className="form-control mb-3"
          style={{
            borderRadius: "8px",
            padding: "10px",
            fontSize: "0.9rem",
          }}
        />

        <Typography textAlign="left" fontWeight={600} fontSize="0.9rem" mb={1}>
          Confirm password
        </Typography>
        <input
          type="password"
          placeholder="Re-enter your password"
          className="form-control mb-3"
          style={{
            borderRadius: "8px",
            padding: "10px",
            fontSize: "0.9rem",
          }}
        />

        <Button
          fullWidth
          variant="contained"
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

        <Typography
          textAlign="center"
          mt={2}
          fontSize="0.85rem"
          color="#334155"
        >
          Already have an account?{" "}
          <span
            style={{ color: "#ff9f63", fontWeight: 600, cursor: "pointer" }}
            onClick={() => setIsSignup(false)}
          >
            LOG IN
          </span>
        </Typography>

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
    ) : (
     
      <Box p={1}>
        <Typography textAlign="left" fontWeight={600} fontSize="0.9rem" mb={1}>
          Email
        </Typography>
        <input
          type="email"
          placeholder="your.email@example.com"
          className="form-control mb-3"
          style={{
            borderRadius: "8px",
            padding: "10px",
            fontSize: "0.9rem",
          }}
        />

        <Typography textAlign="left" fontWeight={600} fontSize="0.9rem" mb={1}>
          Password
        </Typography>
        <input
          type="password"
          placeholder="Enter your password"
          className="form-control mb-2"
          style={{
            borderRadius: "8px",
            padding: "10px",
            fontSize: "0.9rem",
          }}
        />

        <Button
          fullWidth
          variant="contained"
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
            style={{ color: "#ff9f63", fontWeight: 600, cursor: "pointer" }}
            onClick={() => setIsSignup(true)}
          >
            CREATE AN ACCOUNT
          </span>
        </Typography>

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

export default CreateTesting3;

import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Link,
  Paper,
  Divider,
  Container,
  CircularProgress
} from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useCriiptoVerify } from "@criipto/verify-react";
import { TextField, InputAdornment } from "@mui/material";
 import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import logo from "../../../assets/logoBankIdwhite.png"
 
import { useFormik } from "formik";
import * as Yup from "yup";
 import AuthApiCall from "../../../Apicall/AuthApiCall";
import CryptoJS from 'crypto-js'; 

function LoginBox({ onForgotPassword }) {
const navigate = useNavigate();
    const { loginWithRedirect } = useCriiptoVerify();
    const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleLoginBankID = async () => {
    await loginWithRedirect({
      acrValues: "urn:grn:authn:se:bankid:another-device",  
    });
  };

const formik = useFormik({
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

       // path adjust karo

const response = await AuthApiCall({
  url: "/TokenAuth/Authenticate",
  method: "POST",
  data: payload,
});

        console.log("✅ API Response:", response.data);

        if (response.data?.result?.accessToken) {
 
           const token = response.data.result.accessToken;
                const secretKey = "klargo-secret-key";
                const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
                localStorage.setItem("authToken", encryptedToken);
         

          resetForm();
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
   <Box sx={{ margin: "auto" }}>
      <Box
        sx={{
          maxWidth: 600,
          margin: "auto",
          mt: 2,
          p: 3,
          borderRadius: 3,
          boxShadow: "0px 8px 15px rgba(0,0,0,0.4)",
          backgroundColor: "white",
        }}
        component={Paper}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Log in
        </Typography>
        <Typography variant="subtitle2" color="grey">
          You need to login to verify
        </Typography>

        <Divider sx={{ my: 2, borderColor: "grey.600" }} />

         
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            size="small"
            margin="normal"
            label="Email / Username"
            placeholder="Enter your email or username"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle color="action" fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            placeholder="Enter password"
            size="small"
            margin="normal"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          
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
    mb: 1,
    mt: 2,
    backgroundColor: "#0097a7",
    fontWeight: "bold",
    padding: 1,
    "&:disabled": {
      backgroundColor: "#80cbc4",
      color: "#fff",
      cursor: "not-allowed",
    },
  }}
>
  {loading ? (
    <>
      <CircularProgress
        size={22}
        color="inherit"
        sx={{ mr: 1 }}
      />
      Logging in...
    </>
  ) : (
    <>
      <AccountCircle sx={{ marginRight: 1 }} /> LOG IN TO YOUR ACCOUNT
    </>
  )}
</Button>

        </form>

        <Box>
          <Button
            fullWidth
            variant="contained"
            sx={{
              mb: 1,
              backgroundColor: "#00acc1",
              fontWeight: "bold",
              padding: 1,
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

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 1,
          }}
        >
          <Link
            component="button"
            underline="always"
            onClick={onForgotPassword}
            sx={{ mb: 1, fontSize: 13 }}
          >
            Forgot your password?
          </Link>
        </Box>
      </Box>

      <Container
        maxWidth="xs"
        sx={{
          textAlign: "center",
          backgroundColor: "#ffd231ff",
          p: 1,
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          boxShadow: "0px -4px 6px rgba(0,0,0,0.2)",
        }}
        onClick={() => navigate("/user/register-v2")}
      >
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          sx={{ textDecoration: "underline" }}
        >
          Sign up for new account
        </Typography>
      </Container>
    </Box>


  );
}

export default LoginBox;


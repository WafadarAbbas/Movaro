import { Box, TextField, Button, Alert, CircularProgress, InputAdornment, IconButton, Checkbox, FormControlLabel } from '@mui/material'
import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import CryptoJS from 'crypto-js';  
import ApiCall from '../../Apicall/ApiCall'
import { Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from "axios";


function LoginForm() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [redirect, setRedirect] = useState(false);

  const validationSchema = Yup.object({
    userNameOrEmailAddress: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
    rememberClient: Yup.boolean(),
  })

const handleSubmit = async (values) => {
  setLoading(true);
  setError("");

  try {
    const requestBody = {
      userNameOrEmailAddress: values.userNameOrEmailAddress,
      password: values.password,
      rememberClient: values.rememberClient,
    };

 const response = await axios.post('https://localhost:44311/api/TokenAuth/Authenticate', requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
 
     if (response.status === 200 && response.data.success) {
      const token = response.data.result.accessToken;
      const secretKey = "my-super-secret-key";
      const encryptedToken = CryptoJS.AES.encrypt(token, secretKey).toString();
      localStorage.setItem("authToken", encryptedToken);
     setTimeout(() => {
  window.location.reload();
}, 10);
 
      setRedirect(true);  
    } else {
      // API ne success=false bheja
      const errorMsg =
        response.data.error?.details ||
        response.data.error?.message ||
        "Login failed!";
      setError(errorMsg); // Inline error show
    }
  } catch (error) {
    // Axios automatically 500/400 etc. ko catch me bhejta hai
    const errorMsg =
      error.response?.data?.error?.details ||
      error.response?.data?.error?.message ||
      error.message ||
      "Something went wrong!";
    setError(errorMsg); // Inline error show
  } finally {
    setLoading(false);
  }
};
   


   if (redirect) {
    return <Navigate to='/dashboard/v3' />;
  }

  return (
    <Formik
      initialValues={{ userNameOrEmailAddress: '', password: '', rememberClient: true }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form noValidate>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
              {error}
            </Alert>
          )}

          {/* Username / Email Field */}
          <TextField
            fullWidth
            label="Username"
            name="userNameOrEmailAddress"
            value={values.userNameOrEmailAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.userNameOrEmailAddress && Boolean(errors.userNameOrEmailAddress)}
            helperText={touched.userNameOrEmailAddress && errors.userNameOrEmailAddress}
            sx={{
              mb: 2.5,
              fontWeight: "bolder",
              "& .MuiOutlinedInput-root": {
                fontWeight: "bold",
                "& fieldset": { borderWidth: "2px", borderColor: "white" },
                "&:hover fieldset": { borderWidth: "3px", borderColor: "white" },
                "&.Mui-focused fieldset": { borderWidth: "3px", borderColor: "white !important" },
              },
              input: { color: "white" }
            }}
            InputLabelProps={{
              sx: { color: "white", "&.Mui-focused": { color: "white !important", fontWeight: "bolder" } },
            }}
            disabled={loading}
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            sx={{
              mb: 2.5,
              fontWeight: "bolder",
              "& .MuiOutlinedInput-root": {
                fontWeight: "bold",
                "& fieldset": { borderWidth: "2px", borderColor: "white" },
                "&:hover fieldset": { borderWidth: "3px", borderColor: "white" },
                "&.Mui-focused fieldset": { borderWidth: "3px", borderColor: "white !important" },
              },
              input: { color: "white" }
            }}
            InputLabelProps={{
              sx: { color: "white", "&.Mui-focused": { color: "white !important", fontWeight: "bolder" } },
            }}
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Remember Client Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                name="rememberClient"
                checked={values.rememberClient}
                onChange={handleChange}
                sx={{ color: "white" }}
              />
            }
            label="Remember me"
            sx={{ color: "white", mb: 2 }}
          />

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="contained" size="large" disabled={loading} sx={{ width: "200px" }}>
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
          </Box>

            {error && (
    <Box
      sx={{
        mt: 2,
        p: 2,
        textAlign: "center",
        borderRadius: "8px",
        backgroundColor: "rgba(255,0,0,0.1)",
        color: "red",
        fontWeight: "bold",
      }}
    >
      {error}
    </Box>
  )}
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm

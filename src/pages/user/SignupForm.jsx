import { Box, TextField, Button, Grid, Typography, Alert, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import "./Box.css";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ApiCall from '../../Apicall/ApiCall';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
 import * as Yup from "yup";

function SignupForm() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
 const [hover, setHover] = useState(false);
 const initialValues = {
  userName: '',
  name: '',
  surname: '',
  emailAddress: '',
  city: '',
  isBuyer: false,
  isSeller: false,
  password: '', 
};
const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required("Username is required")
      .matches(/^\S*$/, "Username cannot contain spaces"),
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    emailAddress: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    city: Yup.string().required("City is required"),
    password: Yup.string().required("Password is required"),
  });

const handleSubmit = async (values) => {
  setLoading(true);
  setError("");
  setSuccess("");
  try {
    const requestBody = {
      ...values,
isActive: true,
      roleNames: ["Seller"],
    };
 console.log(requestBody);
    const response = await axios.post(
      "https://localhost:44311/api/services/app/User/RegisterNewUser",
      requestBody
    );

    console.log("User created successfully:", response.data);

    setSuccess("User created successfully! 🎉");  
window.location.href = "/user/login-v3"; 
  } catch (err) {
    const errorMsg =
      err.response?.data?.error?.details ||
      err.response?.data?.error?.message ||
      err.message ||
      "Something went wrong!";
    setError(errorMsg);
    console.error("Error creating user:", errorMsg);
  } finally {
    setLoading(false);
  }
};

  const textFieldSx = {
    mb: 2.5,
    fontWeight: 'bolder',
    "& .MuiOutlinedInput-root": {
      fontWeight: 'bold',
      "& fieldset": { borderWidth: '2px', borderColor: 'white' },
      "&:hover fieldset": { borderWidth: '3px', borderColor: 'white' },
      "&.Mui-focused fieldset": { borderWidth: '3px', borderColor: 'white !important' },
    },
    input: { color: 'white' },
  };

  const labelSx = {
    sx: { color: 'white', "&.Mui-focused": { color: 'white !important', fontWeight: 'bolder' } },
  };
  

  return (


    <Box    display="flex"
      justifyContent="center"
      alignItems="center"
   
      
      px={2}  
      >
   
 
      {loading && <p>Loading...</p>}
      
    <Formik initialValues={initialValues}  validationSchema={validationSchema}  onSubmit={handleSubmit}>
      {({ values, handleChange }) => (
        <Form noValidate>
          
          {success && (
  <Alert
    severity="success"
    sx={{ mb: 3, color: "green" }}
    onClose={() => setSuccess("")}
  >
    {success}
  </Alert>
)}

{error && (
  <Alert
    severity="error"
    sx={{ mb: 3, color: "red" }}
    onClose={() => setError("")}
  >
    {error}
  </Alert>
)}
<Box
  display="flex"
  gap={2}
  mb={3}
  justifyContent="center"
  alignItems="center"
  sx={{
    flexDirection: { xs: "column", sm: "row" },  
  }}
>
  <div
    className={`box a ${values.isBuyer ? "selected" : ""}`}
    onClick={() =>
      handleChange({
        target: { name: "isBuyer", value: !values.isBuyer },
      })
    }
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: "5px",
      }}
    >
      <DirectionsCarIcon style={{ fontSize: 50 }} />
      <h4 style={{ fontWeight: "bolder" }}>Car Buyer</h4>
    </div>
  </div>

  <div
    className={`box a ${values.isSeller ? "selected" : ""}`}
    onClick={() =>
      handleChange({
        target: { name: "isSeller", value: !values.isSeller },
      })
    }
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: "5px",
      }}
    >
      <DirectionsCarIcon style={{ fontSize: 50 }} />
      <h4 style={{ fontWeight: "bolder" }}>Car Seller</h4>
    </div>
  </div>
</Box>

       
             <Grid  container spacing={2} justifyContent="center" alignItems="center">
  <Grid size={{sx:12,sm:6,md:6}} display="flex" justifyContent="center" alignItems="center">
    <TextField
      fullWidth
      name="userName"
      label="userName"
      required
      value={values.userName}
      onChange={handleChange}
      disabled={loading}
      sx={textFieldSx}
      InputLabelProps={labelSx}
    />
  </Grid>

  <Grid size={{sx:12,sm:6,md:6}}>
    <TextField
      fullWidth
      name="name"
      label="First Name"
      required
      value={values.name}
      onChange={handleChange}
      disabled={loading}
      sx={textFieldSx}
      InputLabelProps={labelSx}
    />
  </Grid>

  <Grid size={{sx:12,sm:6,md:6}}>
    <TextField
      fullWidth
      name="surname"
      label="Last Name"
      required
      value={values.surname}
      onChange={handleChange}
      disabled={loading}
      sx={textFieldSx}
      InputLabelProps={labelSx}
    />
  </Grid>

  <Grid size={{sx:12,sm:6,md:6}}>
    <TextField
      fullWidth
      name="emailAddress"
      label="Email Address"
      type="email"
      required
      value={values.emailAddress}
      onChange={handleChange}
      disabled={loading}
      sx={textFieldSx}
      InputLabelProps={labelSx}
    />
  </Grid>

  <Grid size={{sx:12,sm:6,md:6}}>
    <TextField
      fullWidth
      name="city"
      label="City"
      required
      value={values.city}
      onChange={handleChange}
      disabled={loading}
      sx={textFieldSx}
      InputLabelProps={labelSx}
    />
  </Grid>
        <Grid size={{sx:12,sm:6,md:6}}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  required
                  value={values.password}
                  onChange={handleChange}
                  disabled={loading}
                  sx={textFieldSx}
                  InputLabelProps={labelSx}
                />
              </Grid>
</Grid>


          
            <Box sx={{textAlign:'center'}}> 
              <Button
                type="submit"
                variant="contained"
                size="medium"
                disabled={loading}
                sx={{ mt: 1 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Sign Up'}
              </Button>
              <Typography variant="body2" color="white" align="center" sx={{ mt: 2}}>
                By signing up, you agree to our Terms and Privacy Policy
              </Typography>
        </Box>
         
        </Form>
      )}
    </Formik>
    </Box>
  );
}

export default SignupForm;

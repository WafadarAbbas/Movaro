import React, { useEffect, useState } from "react";
 import Swal from "sweetalert2";
 import AccountCircleIcon from "@mui/icons-material/AccountCircle"
 import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import {
  Divider,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  Box,Alert,
  FormControlLabel,
  Switch,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import ApiCall from "../../Apicall/ApiCall";
import "./Box.css";

function Profile() {
const [selected, setSelected] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
 const [initialValues, setInitialValues] = useState({
    userName: "",
    name: "",
    surname: "",
    emailAddress: "",
    isActive: false,
    fullName: "",
    adress: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    mobileNumber: "",
    profileImage: "",
    isSeller: false,
    isBuyer: false,
    roleNames: ["admin"],
     lastLoginTime: "",
  creationTime: "",
  });
 

    const fetchUserData = async () => {
        setLoading(true); 
      try {
         
        const sessionResponse = await ApiCall({
          url: "https://localhost:44311/api/services/app/Session/GetCurrentLoginInformations",
          method: "GET",
        });

        const userId = sessionResponse.data?.result?.user?.id;
        console.log(userId);
        

        if (userId) {
          setSelected(userId);
          const userResponse = await ApiCall({
            url: `https://localhost:44311/api/services/app/User/Get?Id=${userId}`,
            method: "GET",
          });

          const userData = userResponse.data?.result;

       
        if (userData) {
  setInitialValues((prev) => ({
    ...prev,
      id: userData.id || "",
    userName: userData.userName || "",
    name: userData.name || "",
    surname: userData.surname || "",
    emailAddress: userData.emailAddress || "",
    isActive: userData.isActive ?? false, 
    fullName: userData.fullName || "",
    adress: userData.adress || "",
    city: userData.city || "",
    state: userData.state || "",
    country: userData.country || "",
    postalCode: userData.postalCode || "",
    mobileNumber: userData.mobileNumber || "",
    profileImage: userData.profileImage || "",
    isSeller: userData.isSeller ?? false,
    isBuyer: userData.isBuyer ?? false,
    roleNames: userData.roleNames?.length ? userData.roleNames : [""],
     lastLoginTime: userData.lastLoginTime || "",
  creationTime: userData.creationTime || "",
  }));
      const getImageUrl = (path) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `https://localhost:44311/${path}`;
  };

  setImage(getImageUrl(userData.profileImage));
}
        }
      } catch (error) {
        console.error("API Error:", error);
      }finally {
    setLoading(false);  
  }
    };
  useEffect(() => {
    fetchUserData();
  }, []);

const formik = useFormik({
  initialValues,
  enableReinitialize: true,  
  onSubmit: async (values, { resetForm }) => {
     console.log(values);
     
      setLoading(true);
    try {
      const response = await ApiCall({
        url: "https://localhost:44311/api/services/app/User/Update",
        method: "PUT",
        data: values,  
      });

      if (response.data?.success) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your profile has been successfully updated.",
          confirmButtonText: "OK",
        }).then(() => {
     
      window.location.reload();
    });
            resetForm();
      // fetchUserData();
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: response.data?.error?.message || "Something went wrong",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("API Error:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong while updating your profile",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);  
    }
  },
});

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setImage(base64String); 
      formik.setFieldValue("profileImage", base64String);  
    };
    reader.readAsDataURL(file);
  }
};
  return (
    <Paper
      elevation={5}
      sx={{
        padding: 3,
        margin: "20px auto",
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" component="h1" sx={{ fontWeight: "bold" }}>
        Profile
      </Typography>
      <Divider
        sx={{
          marginTop: 1,
          marginBottom: 2,
          borderBottomWidth: 2,
          width: "100%",
          backgroundColor: "black",
        }}
      />
 <Box sx={{  display: "flex",
      alignItems: "center",      
      justifyContent: "center",marginBottom:2 }}>
<input
  type="file"
  accept="image/*"
  id="profileImage"
  style={{ display: "none" , backgroundColor:"#aaa",}}  
  onChange={handleImageChange}
/>

<label htmlFor="profileImage">
  <Box
    sx={{
      width: 150,
      height: 150,
      borderRadius: "50%",
      border: "2px dashed #aaa",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "0.3s",
      overflow: "hidden",
      "&:hover": {
        borderColor: "#1976d2",
        transform: "scale(1.05)",
      },
    }}
  >
    {image ? (
      <img
        src={image}
        alt="profile"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
    ) : (
      <AccountCircleIcon sx={{ fontSize: 80, color: "#aaa" }} />
    )}
  </Box>
</label>
      {/* <Typography variant="caption" display="block" sx={{marginLeft:1 ,padding:1,borderRadius:3  }}>
        Upload Image
      </Typography> */}
      
      </Box>
      <form onSubmit={formik.handleSubmit}>
        {/* {formik.values.isProfileValidate ? (
  <Alert severity="success" sx={{ mb: 3 , mt: 2}}>
    Profile is validated ✅
  </Alert>
) : (
  <Alert severity="error" sx={{ mb: 3,  mt: 2}}>
    Profile is not validated ❌
  </Alert>
)} */}
        <Grid container spacing={2}>
          {/* User Details */}
          <Grid size={{xs:12,sm:6,md:6,lg:6}} >
            <TextField
              fullWidth
              name="userName"
              label="Username"
              value={formik.values.userName}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid size={{xs:12,sm:6,md:6,lg:6}}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid size={{xs:12,sm:6,md:6,lg:6}}>
            <TextField
              fullWidth
              name="surname"
              label="Surname"
              value={formik.values.surname}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid size={{xs:12,sm:6,md:6,lg:6}}>
            <TextField
              fullWidth
              name="emailAddress"
              label="Email Address"
              type="email"
              value={formik.values.emailAddress}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid size={{xs:12,sm:6,md:6,lg:6}}>
            <TextField
              fullWidth
              name="fullName"
              label="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid size={{xs:12,sm:6,md:6,lg:6}}>
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.isActive}
                  onChange={(e) =>
                    formik.setFieldValue("isActive", e.target.checked)
                  }
                />
              }
              label="Active"
            />
          </Grid>

          {/* Address Info */}
          <Grid size={{xs:12,sm:6,md:6,lg:6}}>
            <TextField
              fullWidth
              name="adress"
              label="Address"
              value={formik.values.adress}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid size={{xs:12,sm:6,md:6,lg:6}}>
            <TextField
              fullWidth
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid size={{xs:12,sm:6,md:6,lg:6}}>
            <TextField
              fullWidth
              name="state"
              label="State"
              value={formik.values.state}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid size={{xs:12,sm:6,md:6,lg:6}}>
            <TextField
              fullWidth
              name="country"
              label="Country"
              value={formik.values.country}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid size={{xs:12,sm:6,md:6,lg:6}}>
            <TextField
              fullWidth
              name="postalCode"
              label="Postal Code"
              value={formik.values.postalCode}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid size={{xs:12,sm:6,md:6,lg:6}}>
            <TextField
              fullWidth
              name="mobileNumber"
              label="Mobile Number"
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
            />
          </Grid>


          
 
   <Grid size={{xs:6,sm:6,md:6,lg:6}}> 
    <div
      className={`box a ${formik.values.isBuyer ? "selected" : ""}`}
      onClick={() =>
        formik.setFieldValue("isBuyer", !formik.values.isBuyer)
      }
      style={{
      width: "100%",
        height: "100px",
        border: formik.values.isBuyer ? "3px solid #1976d2" : "",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "0.3s",
      }}
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
        <DirectionsCarIcon style={{ fontSize: 50, color: formik.values.isBuyer ? "#1976d2" : "#555" }} />
        <h4 style={{ fontWeight: "bolder" }}>Car Buyer</h4>
      </div>
    </div>
 </Grid>
  <Grid size={{xs:6,sm:6,md:6,lg:6}}> 
    <div
      className={`box a ${formik.values.isSeller ? "selected" : ""}`}
      onClick={() =>
        formik.setFieldValue("isSeller", !formik.values.isSeller)
      }
      style={{
         width: "100%",
        height: "100px",
        border: formik.values.isSeller ? "3px solid #1976d2" : "",
        borderRadius: "12px",
        cursor: "pointer",
        transition: "0.3s",
      }}
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
        <DirectionsCarIcon style={{ fontSize: 50, color: formik.values.isSeller ? "#1976d2" : "#555" }} />
        <h4 style={{ fontWeight: "bolder" }}>Car Seller</h4>
      </div>
    </div>
    </Grid>
  


          
          {/* <Grid size={{xs:12,sm:4,md:4,lg:4}}>
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.isProfileValidate}
                  onChange={(e) =>
                    formik.setFieldValue("isProfileValidate", e.target.checked)
                  }
                />
              }
              label="Profile Validated"
            />
          </Grid> */}

          {/* <Grid size={{xs:12,sm:4,md:4,lg:4}}>
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.isSeller}
                  onChange={(e) =>
                    formik.setFieldValue("isSeller", e.target.checked)
                  }
                />
              }
              label="Seller"
            />
          </Grid> */}

          {/* <Grid size={{xs:12,sm:4,md:4,lg:4}}>
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.isBuyer}
                  onChange={(e) =>
                    formik.setFieldValue("isBuyer", e.target.checked)
                  }
                />
              }
              label="Buyer"
            />
          </Grid> */}



        </Grid>
 

 
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Button type="submit" variant="contained"  sx={{backgroundColor:"rgb(255, 159, 67)",color:"white"}} size="large"  disabled={loading}>
            {loading ? (
      <>
        <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
        Loading ...
      </>
    ) : (
      "Submit"
    )}
          </Button>
          
        </Box>
      </form>
    </Paper>
  );
}

export default Profile;

import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext.js";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  Container,
  CircularProgress,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { Formik, Form } from "formik";
import { AppSettings } from "./../../config/app-settings.js";
import ApiCall from "../../Apicall/ApiCall.js";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Compo/spinner.jsx"; 
const ChooseAction = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const context = useContext(AppSettings);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await ApiCall({
          url: "https://localhost:44311/api/services/app/Session/GetCurrentLoginInformations",
          method: "GET",
        });
        const id = response.data?.result?.user?.id;
        setUserId(id);
      } catch (err) {
        console.error("Error fetching user ID:", err);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    context.handleSetAppSidebarNone(true);
    context.handleSetAppHeaderNone(true);
    context.handleSetAppContentClass("p-0");

    return () => {
      context.handleSetAppSidebarNone(false);
      context.handleSetAppHeaderNone(false);
      context.handleSetAppContentClass("");
    };

  }, []);
  const { refreshUserInfo } = useUser();
  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
            {loading ? (
              <LoadingSpinner />   
            ) : (
      <Formik
        enableReinitialize
        initialValues={{
          sellerUserId: userId,
          sellerDealStatus: "",
          sellerDealActive: true,
          sellerDealComplete: false,
          vahicleTypeOptionId: null,
          vahicleTypeOptionName: "",
          sellerDrivingLicensePath: "",
          sellerDrivingLicenseValidate: true,
          carInfoId: null,
          carValuationBySeller: 0
        }}
        // onSubmit={async (values) => {
        //   setLoading(true);
        //   try {
        //     const response = await ApiCall({
        //       url: "https://localhost:44311/api/services/app/ContractMain/Create",
        //       method: "POST",
        //       data: values,
        //     });

        //     const id = response.data?.result?.id;
        //     if (id) {
        //       localStorage.setItem("currentContractID", id);
        //     }

        //     if (values.sellerDealStatus === "Seller") {


        //       setTimeout(() => {
        //         refreshUserInfo();
        //         navigate("/SellerProfile");
        //       }, 200);
        //     } else if (values.sellerDealStatus === "Buyer") {
        //       setTimeout(() => {
        //         refreshUserInfo();
        //         navigate("/");
        //       }, 200);
        //     }
        //   } catch (error) {
        //     console.error("API Error:", error);
        //   } finally {
        //     setLoading(false);
        //   }
        // }}
onSubmit={async (values) => {
  setLoading(true);
 

  try {
    const response = await ApiCall({
      url: "https://localhost:44311/api/services/app/ContractMain/Create",
      method: "POST",
      data: values,
    });

    // ApiCall returns response for success, or error data for failure
    if (response && response.status === 200) {
      // Successful response, navigate accordingly
      const id = response.data?.result?.id;
      if (id) localStorage.setItem("currentContractID", id);

      refreshUserInfo();

      if (values.sellerDealStatus === "Seller") {
        navigate("/SellerProfile");
      } else if (values.sellerDealStatus === "Buyer") {
        navigate("/");
      }
    } else {
      // Backend returned an error
      const backendMessage =
        response?.error?.message ||
        response?.message ||
        "Something went wrong!";
      Swal.fire("Error", backendMessage, "error");
    }
  } catch (error) {
    // Unexpected error (network, code issues, etc.)
    const message = error?.message || "Something went wrong!";
    Swal.fire("Error", message, "error");
  } finally {
    setLoading(false);
 
  }
}}




      >
        {({ values, setFieldValue, submitForm }) => (
          <Form>
 
            <Box>
              <Typography variant="h5" fontWeight="bold" mb={1}>
                What do you want to do today?
              </Typography>

              <Typography variant="body1" color="text.secondary" mb={4}>
                Buy and sell vehicles safely!
              </Typography>

              <Grid container spacing={2}>
                {/* SELLER CARD */}
                <Grid size={{ xs: 12, sm: 6 }}>
            
                  <Card
                    onClick={() => {
                      setFieldValue("sellerDealStatus", "Seller");
                   
                      submitForm();
                    }}
                    sx={{
                      borderRadius: 3,
                      textAlign: "center",
                      p: 2,
                      boxShadow: 3,
                      cursor: "pointer",

                      border: "2px solid transparent",
                      transition: "0.3s",

                      "&:hover": {
                        transform: "translateY(-6px)",
                        borderColor: "#ff9f43",

                        boxShadow:
                          "0px 8px 22px rgba(255, 159, 67, 0.4)", 

                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          backgroundColor: "#fcebdaff",
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          mx: "auto",
                          mb: 2,
                        }}
                      >
                        <DirectionsCarIcon sx={{ color: "#ff9f43", fontSize: 30 }} />
                      </Box>

                      <Typography variant="subtitle1" fontWeight="bold">
                        I want to sell
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 2, mb: 2 }}
                      >
                        Create a sale, set price and terms, and get a code for the buyer.
                      </Typography>

   
                    </CardContent>
                  </Card>



                </Grid>

                {/* BUYER CARD */}
                <Grid size={{ xs: 12, sm: 6 }}>
  
                  <Card
                    onClick={() => {
                      setFieldValue("sellerDealStatus", "Buyer");
                     
                      submitForm();
                    }}
                    sx={{
                      borderRadius: 3,
                      textAlign: "center",
                      p: 2,
                      boxShadow: 3,
                      cursor: "pointer",

                      border: "2px solid transparent",
                      transition: "0.3s",

                      "&:hover": {
                        transform: "translateY(-6px)",
                        borderColor: "#ff9f43",
                        boxShadow: "0px 8px 22px rgba(255, 159, 67, 0.4)",
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          backgroundColor: "#fcebdaff",
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          mx: "auto",
                          mb: 2,
                        }}
                      >
                        <DirectionsCarIcon sx={{ color: "#ff9f43", fontSize: 30 }} />
                      </Box>

                      <Typography variant="subtitle1" fontWeight="bold">
                        I want to buy
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 2, mb: 2 }}
                      >
                        Enter registration number or scan the seller’s QR code to continue.
                      </Typography>
  
                      
                    </CardContent>
                  </Card>


                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>

    //                                  {loading && (
    //   <Box sx={{ mt: 2, textAlign: "center" }}>
    //     <CircularProgress size={24}  sx={{ color: "#ff9f43" }} />
    //   </Box>
    // )}
      )}
    </Container>
  );
};

export default ChooseAction;

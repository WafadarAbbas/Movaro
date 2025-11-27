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
    // eslint-disable-next-line
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
        onSubmit={async (values) => {
          setLoading(true);  
          try {
            const response = await ApiCall({
              url: "https://localhost:44311/api/services/app/ContractMain/Create",
              method: "POST",
              data: values,
            });
 
            const id = response.data?.result?.id;
            if (id) {
              localStorage.setItem("currentContractID", id);
            }

            if (values.sellerDealStatus === "Seller") {
         

            setTimeout(() => {
  refreshUserInfo();  
  navigate("/SellerProfile");
}, 200);
            } else if (values.sellerDealStatus === "Buyer") {
                    setTimeout(() => {
  refreshUserInfo();  
  navigate("/");
}, 200);
            }
          } catch (error) {
            console.error("API Error:", error);
          } finally {
            setLoading(false); // 🟢 Stop loading
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
                    onClick={() => setFieldValue("sellerDealStatus", "Seller")}
                    sx={{
                      borderRadius: 3,
                      textAlign: "center",
                      p: 2,
                      boxShadow:
                        values.sellerDealStatus === "Seller" ? 8 : 3,
                      border:
                        values.sellerDealStatus === "Seller"
                          ? "2px solid #ff9f43"
                          : "2px solid transparent",
                      backgroundColor:
                        values.sellerDealStatus === "Seller"
                          ? "#fff3e0"
                          : "#fff",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        transition: "0.3s",
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
                        <DirectionsCarIcon
                          sx={{ color: "#ff9f43", fontSize: 30 }}
                        />
                      </Box>

                      <Typography variant="subtitle1" fontWeight="bold">
                        I want to sell
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1, mb: 2 }}
                      >
                        Create a sale, set price and terms, and get a code for
                        the buyer.
                      </Typography>

                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          backgroundColor: "#ff9f43",
                          fontWeight: "bold",
                          textTransform: "none",
                          "&:hover": { backgroundColor: "#ff9f43" },
                        }}
                        onClick={submitForm}
                        disabled={
                          values.sellerDealStatus !== "Seller" || loading
                        }
                      >
                        {loading && values.sellerDealStatus === "Seller" ? (
                          <CircularProgress
                            size={24}
                            sx={{ color: "white" }}
                          />
                        ) : (
                          "SELECT"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>

                {/* BUYER CARD */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Card
                    onClick={() => setFieldValue("sellerDealStatus", "Buyer")}
                    sx={{
                      borderRadius: 3,
                      textAlign: "center",
                      p: 2,
                      boxShadow:
                        values.sellerDealStatus === "Buyer" ? 8 : 3,
                      border:
                        values.sellerDealStatus === "Buyer"
                          ? "2px solid #ff9f43"
                          : "2px solid transparent",
                      backgroundColor:
                        values.sellerDealStatus === "Buyer"
                          ? "#fcebdaff"
                          : "#fff",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        transition: "0.3s",
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
                        <DirectionsCarIcon
                          sx={{ color: "#ff9f43", fontSize: 30 }}
                        />
                      </Box>

                      <Typography variant="subtitle1" fontWeight="bold">
                        I want to buy
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1, mb: 2 }}
                      >
                        Enter registration number or scan the seller’s QR code
                        to continue.
                      </Typography>

                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          backgroundColor: "#b9b9b9ff",
                          // fontWeight: "bold",
                          // textTransform: "none",
                          // "&:hover": { backgroundColor: "#ff9f43" },
                        }}
                        onClick={submitForm}
                        // disabled={
                        //   values.sellerDealStatus !== "Buyer" || loading
                        // }
                      >
                        {loading && values.sellerDealStatus === "Buyer" ? (
                          <CircularProgress
                            size={24}
                            sx={{ color: "white" }}
                          />
                        ) : (
                          "SELECT"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default ChooseAction;

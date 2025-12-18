import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  Paper,
} from "@mui/material";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { Formik, Form } from "formik";
import ApiCall from "../../Apicall/ApiCall.js";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Compo/spinner.jsx";
const ChooseAction = () => {
  const { t } = useTranslation();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
 
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



  const { refreshUserInfo } = useUser();
  return (
    <Container
      maxWidth="md"
      sx={{
        textAlign: "center",
        marginTop: 3,
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

            if (response && response.status === 200) {
              const id = response.data?.result?.id;
              if (id) localStorage.setItem("currentContractID", id);

              refreshUserInfo();

              if (values.sellerDealStatus === "Seller") {
                navigate("/SellerProfile");
              } else if (values.sellerDealStatus === "Buyer") {
                navigate("/BuyerProfile");
              }
            } else {
              const backendMessage =
                response?.error?.message || response?.message || "Something went wrong!";
              Swal.fire("Error", backendMessage, "error");
            }
          } catch (error) {
            const message = error?.message || "Something went wrong!";
            Swal.fire("Error", message, "error");
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ values, setFieldValue, submitForm }) => (
          <Form>
            <Paper
              elevation={1}
              sx={{
                px: { xs: 2, md: 15 },
                py: { xs: 5, md: 5 },
                borderRadius: "12px",
                transition: "0.4s ease",
                filter: loading ? "blur(8px)" : "none",
                pointerEvents: loading ? "none" : "auto",
                opacity: loading ? 0.5 : 1,
              }}
            >
              <Typography variant="h5" fontWeight="bold" mb={1}>
                {t("chooseAction.title")}
              </Typography>

              <Typography variant="body1" color="text.secondary" mb={4}>
                {t("chooseAction.subtitle")}
              </Typography>

              <Grid container spacing={2}>

                <Grid size={{ xs: 6, sm: 6 }}>
                  <Card
                    onClick={() => {
                      setFieldValue("sellerDealStatus", "Seller");
                      submitForm();
                    }}
                    sx={{
                      borderRadius: 3,
                      textAlign: "center",
                      p: 1,
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
                        {t("chooseAction.sellCardTitle")}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1, mb: 2 }}
                      >
                        {t("chooseAction.sellCardDesc")}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>


                <Grid size={{ xs: 6, sm: 6 }}>
                  <Card
                    onClick={() => {
                      navigate("/BuyerProfile");
                    }}
                    sx={{
                      borderRadius: 3,
                      textAlign: "center",
                      p: 1,
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
                    <CardContent sx={{ p: 1 }}>
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
                        {t("chooseAction.buyCardTitle")}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 2, mb: 2 }}
                      >
                        {t("chooseAction.buyCardDesc")}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

              </Grid>
            </Paper>
          </Form>
        )}
      </Formik>
    </Container>

  );
};

export default ChooseAction;

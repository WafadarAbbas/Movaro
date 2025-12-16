import React, { useRef, useState, useEffect, useContext } from "react";
import { Formik, Form, Field } from "formik";
import { AppSettings } from "../../config/app-settings.js";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { FaCar, FaMotorcycle, FaShip, FaTrailer, FaTruck, } from "react-icons/fa";
import { MdElectricScooter } from "react-icons/md";
import "../../Compo/LoadingText.css";
import { Stepper, Step, StepLabel, Button, Box, Typography, TextField, Paper, Divider, Grid, Container, RadioGroup, Radio, FormControlLabel } from "@mui/material";
import { motion } from "framer-motion";
import ApiCall from "../../Apicall/ApiCall.js";
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import { FaMoneyBillWave } from "react-icons/fa";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import FormGroup from '@mui/material/FormGroup';

import SearchIcon from "@mui/icons-material/Search";
import QRCode from "react-qr-code";
import CryptoJS from "crypto-js";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../../context/UserContext.js";
import { FaCarSide } from "react-icons/fa";
import { Skeleton } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import GavelIcon from "@mui/icons-material/Gavel";
import DescriptionIcon from "@mui/icons-material/Description";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { useTranslation } from "react-i18next";
const steps = ["Choose Vehicles", "Vehicle", "Connecting", "Connecting"];



function BuyerProfile() {

  const { userId } = useUser();
  const { t, i18n } = useTranslation();
  // -------------------Maneging States-------------------------------

  const [activeStep, setActiveStep] = useState(0);
  const [vehicleData, setVehicleData] = useState([]);
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const [valuationToastShown, setValuationToastShown] = useState(false);
  const [sellerValuation, setSellerValuation] = useState(null);
  const [storedId, setStoredId] = useState(null);
  const [contractMainData, setContractMainData] = useState(null);
  const [registration, setRegistration] = useState("");
  const [sellerUserId, setSellerUserId] = useState(null);
  const [contractId, setContractId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [QR, setQR] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [oldValuation, setOldValuation] = useState(null);


  const context = useContext(AppSettings);
  // ------------------- Getting Current Seller ID from Local Storage -------------------------------
  useEffect(() => {
    const id = localStorage.getItem("currentContractID");
    if (id) {
      setStoredId(parseInt(id));
    }
  }, []);

  // useEffect(() => {
  //   const fetchContractMain = async () => {
  //     if (activeStep === 2 && contractId) {
  //       setLoading(true);
  //       setError("");

  //       try {
  //         const response = await ApiCall({
  //           url: `https://localhost:44311/api/services/app/ContractMain/GetContractMainById?Id=${contractId}`,
  //           method: "GET",
  //         });

  //         if (response.data?.result) {
  //           setContractMainData(response.data.result);
  //         } else if (response?.error) {
  //           const backendError =
  //             response.error.details ||
  //             response.error.message ||
  //             "⚠ Internal server error occurred.";

  //           setError(backendError);
  //         } else {
  //           setError("❌ Contract not found.");
  //         }

  //       } catch (err) {
  //         console.error("Error fetching contract:", err);
  //         setError("⚠ Something went wrong while fetching contract data.");
  //       } finally {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchContractMain();
  // }, [activeStep, contractId]);



  useEffect(() => {
    const fetchContractMain = async () => {
      if ((activeStep === 2 || activeStep === 4) && contractId) {
        setLoading(true);
        setError("");

        try {
          const response = await ApiCall({
            url: `https://localhost:44311/api/services/app/ContractMain/GetContractMainById?Id=${contractId}`,
            method: "GET",
          });

          const data = response.data?.result;

          if (!data) {
            const backendError =
              response?.error?.details ||
              response?.error?.message ||
              "❌ Contract not found.";
            setError(backendError);
            return;
          }

          setContractMainData(data);
          console.log(data);

        } catch (err) {
          console.error("Error fetching contract:", err);
          setError("⚠ Something went wrong while fetching contract data.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchContractMain();
  }, [activeStep, contractId]);



  const validationSchemas = [

    Yup.object({
      vahicleTypeOptionId: Yup.number()
        .nullable()
        .required("Please select a vehicle type"),
    }),

  ];


  const handleSearch = async () => {
    if (!registration) return;

    setLoading(true);
    setError("");
    setSellerUserId(null);
    setContractId(null);

    try {
      const response = await ApiCall({
        url: `https://localhost:44311/api/services/app/CarInfo/GetActiveCarForBuyerByRegNo?Id=${registration}`,
        method: "GET",
      });

      if (response.data?.result) {

        const raw = response.data.result;


        setSellerUserId(raw.sellerUserId || null);
        setContractId(raw.contractId || null);
        toast.success("Car found successfully!", {
          position: "bottom-right",
        });
        console.log("SellerUserId:", raw.sellerUserId);
        console.log("ContractId:", raw.contractId);

        //     Swal.fire({
        //       icon: "success",
        //       title: "Car Found!",
        //       html: `
        //   <b>Seller User ID:</b> ${raw.sellerUserId}<br/>
        //   <b>Contract ID:</b> ${raw.contractId}
        // `,
        //       confirmButtonColor: "#ff9f43",
        //     });

      } else if (response?.error) {

        const backendError =
          response.error.details ||
          response.error.message ||
          "⚠️ Internal server error occurred.";

        setError(backendError);

      }
      else {
        setError("❌ Car not found, please check the registration number.");
      }
    } catch (error) {
      console.error("Error fetching car info:", error);
      setError("⚠️ Something went wrong while fetching car info.");
    } finally {
      setLoading(false);
    }
  };


  // ------------------- Api Calls-------------------------------


  const handleBuyerSuccess = async () => {
    if (!contractMainData) return;

    setSubmitting(true);

    try {
      const payload = {
        sellerUserId: contractMainData.sellerUserId,
        sellerUserFullName: contractMainData.sellerUserFullName,
        sellerDealStatus: contractMainData.sellerDealStatus,
        sellerDealActive: contractMainData.sellerDealActive,
        sellerDealComplete: contractMainData.sellerDealComplete,
        vahicleTypeOptionId: contractMainData.vahicleTypeOptionId,
        vahicleTypeOptionVahicleTypeName: contractMainData.vahicleTypeOptionVahicleTypeName,
        vahicleTypeOptionName: contractMainData.vahicleTypeOptionName,
        sellerDrivingLicensePath: "",
        sellerDrivingLicenseValidate: contractMainData.sellerDrivingLicenseValidate,

        carInfoId: contractMainData.carInfoId,
        carInfoRegistrationNo: contractMainData.carInfoRegistrationNo,
        carInfoVehicleDesignation: contractMainData.carInfoVehicleDesignation,
        carInfoTradeName: contractMainData.carInfoTradeName,
        carInfoYearModel: contractMainData.carInfoYearModel,
        carInfoVehicleYears: contractMainData.carInfoVehicleYears,
        carInfoRegistrationDate: contractMainData.carInfoRegistrationDate,
        carInfoNumberOfUsers: contractMainData.carInfoNumberOfUsers,
        carInfoWaxelbarge: contractMainData.carInfoWaxelbarge,
        carInfoFourWheelDrive: contractMainData.carInfoFourWheelDrive,
        carInfoFuel: contractMainData.carInfoFuel,
        carInfoElectricVehicleConfiguration:
          contractMainData.carInfoElectricVehicleConfiguration,
        carInfoInspectionDate: contractMainData.carInfoInspectionDate,
        carInfoInspectionDateEMPTYe: contractMainData.carInfoInspectionDateEMPTYe,
        carInfoDispensationInspectionGroup:
          contractMainData.carInfoDispensationInspectionGroup,
        carInfoInspectionGroup: contractMainData.carInfoInspectionGroup,
        carInfoFeedingStall: contractMainData.carInfoFeedingStall,
        carInfoInspectionStation: contractMainData.carInfoInspectionStation,
        carInfoInspectionProgramCode: contractMainData.carInfoInspectionProgramCode,
        carInfoPreviousInspectionDate:
          contractMainData.carInfoPreviousInspectionDate,
        carInfoPreviousInspectionProgramCode:
          contractMainData.carInfoPreviousInspectionProgramCode,
        carInfoTax: contractMainData.carInfoTax,
        carInfoMalus: contractMainData.carInfoMalus,
        carValuationBySeller: contractMainData.carValuationBySeller,


        buyerUserId: userId,
        buyerDealStatus: contractMainData.buyerDealStatus,
        buyerDealConnected: true,
        buyerDealConfirmed: contractMainData.buyerDealConfirmed,

        lastModificationTime: contractMainData.lastModificationTime,
        lastModifierUserId: contractMainData.lastModifierUserId,
        creationTime: contractMainData.creationTime,
        creatorUserId: contractMainData.creatorUserId,
        id: contractMainData.id
      };


      console.log("📌 PAYLOAD SENT TO UPDATE:", payload);

      const contractUpdateRes = await ApiCall({
        url: "https://localhost:44311/api/services/app/ContractMain/Update",
        method: "PUT",
        data: payload,
      });

      console.log("✅ UPDATE RESPONSE:", contractUpdateRes);


      if (contractUpdateRes?.success === false || contractUpdateRes?.error) {
        const errorMsg =
          contractUpdateRes?.error?.details ||
          contractUpdateRes?.error?.message ||
          "Something went wrong while updating contract!";
        Swal.fire("❌ Error", errorMsg, "error");
      } else {
        setUpdated(true);
        Swal.fire("✅ Success", "Buyer deal marked connected!", "success");



        setTimeout(() => {
          setActiveStep(3);
        }, 2000);
      }
    } catch (error) {
      console.error("❌ Update error:", error);
      const errorMsg =
        error?.error?.details ||
        error?.error?.message ||
        error?.response?.data?.error?.message ||
        error?.message ||
        "Unexpected server error!";
      Swal.fire("❌ Error", errorMsg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchVehicleOptions = async () => {
      try {
        setLoading(true);
        const response = await ApiCall({
          url: "https://localhost:44311/api/services/app/VahicleTypeOption/GetAll",
          method: "GET",
        });

        if (response?.data?.result?.items) {
          setVehicleData(response.data.result.items);
        } else {
          setVehicleData([]);
        }
      } catch (err) {
        setError(err.message || "API call failed");
      } finally {
        setLoading(false);
      }
    };

    if (activeStep === 0) {
      fetchVehicleOptions();
    }
  }, [activeStep]);


  useEffect(() => {
    if (activeStep === 3 && contractId) {
      let interval;

      const checkValuation = async () => {
        try {
          const res = await ApiCall({
            url: `https://localhost:44311/api/services/app/ContractMain/GetContractMainById?Id=${contractId}`,
            method: "GET",
          });

          const latestData = res?.result || res?.data?.result;
          setContractMainData(latestData);


          const valuation = latestData.carValuationBySeller;


          if (!valuation || valuation === 0) {
            setSellerValuation(null);
          }


          else {
            setSellerValuation(valuation);


            if (!valuationToastShown) {
              toast.success("💰 Seller has added car valuation!", {
                position: "top-right",
              });
              setValuationToastShown(true);
            }


            if (interval) clearInterval(interval);
          }
        } catch (err) {
          console.error("Error fetching latest contract:", err);
        }
      };


      checkValuation();


      interval = setInterval(checkValuation, 10000);

      return () => clearInterval(interval);
    }
  }, [activeStep, contractId, valuationToastShown]);


  useEffect(() => {
    if (activeStep !== 4 || !contractId) return;

    const fetchVehicleInfo = async () => {
      try {
        const res = await ApiCall({
          url: `https://localhost:44311/api/services/app/ContractMain/GetContractMainById?Id=${contractId}`,
          method: "GET",
        });

        const latest = res?.result || res?.data?.result;


        const newValuation = latest?.carValuationBySeller;

        if (oldValuation !== null && newValuation !== oldValuation) {
          Swal.fire({
            icon: "info",
            title: "Valuation Updated",
            text: `Seller changed valuation from ${oldValuation} to ${newValuation}`,
          });
        }


        setOldValuation(newValuation);



        setContractMainData(latest);

      } catch (err) {
        console.error("Error fetching vehicle info:", err);
      }
    };


    fetchVehicleInfo();


    const intervalId = setInterval(fetchVehicleInfo, 10000);

    return () => clearInterval(intervalId);

  }, [activeStep, contractId, oldValuation]);

  return (
    <Container maxWidth="md">
      <Paper
        elevation={4}
        sx={{
          margin: "10px auto",
          p: 2,
          mt: 1,
          borderRadius: 3,
          backgroundColor: "#fff",
        }}
      >


        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            mb: 2,
            mt: 1,
            width: "100%",
            overflow: "hidden",
            "& .MuiStepLabel-label": {
              fontSize: "0.8rem",
              "@media (max-width: 600px)": { fontSize: "0.65rem" },
            },
            "& .MuiSvgIcon-root": {
              width: "17px",
              height: "17px",
            },
            "& .MuiStepConnector-line": {
              minHeight: "2px",
            },
            "& .MuiStepLabel-root .Mui-completed": {
              color: "green",
            },
            "& .MuiStepLabel-root .Mui-active": {
              color: "#ff9f43",
            },
            "& .MuiStepLabel-label.Mui-active": {
              fontWeight: "bold",
            },
          }}
        >
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>


        <Divider sx={{ height: 1, backgroundColor: "#a1a0a0ff" }} />

        {/*----------------------- Step 0 ---------------------- */}
        {/* {activeStep === 0 && (
          <Container maxWidth="md">
            <Typography variant="h6" align="center" fontWeight="bold" mb={1}>
              What do you want to do today?
            </Typography>
            <Typography variant="subtitle1" align="center" color="text.secondary" mb={2}>
              Buy and sell vehicles safely!
            </Typography>
            <Typography variant="subtitle2" align="center" color="text.secondary" mb={1}>
              What do you want to buy?
            </Typography>

            <Container maxWidth="sm">
              {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" py={6}>
                  <div className="loader"></div>
                </Box>
              ) : error ? (
                <Typography color="error" align="center" fontWeight="bold" py={3}>
                  {error}
                </Typography>
              ) : vehicleData.length === 0 ? (
                <Typography align="center" fontWeight="bold" py={3}>
                  No Vehicle Types Found
                </Typography>
              ) : (
                <Grid container spacing={3} mb={3}>
                  {vehicleData.map((veh) => (
                    <Grid size={{ xs: 6, sm: 6, md: 4 }} key={veh.id}>
                      <Paper
                        elevation={3}
                        onClick={() => setActiveStep(1)}     // ⬅ click → go to next step
                        sx={{
                          borderRadius: 2,
                          textAlign: "center",
                          cursor: "pointer",
                          border: "1px solid #ccc",
                          backgroundColor: "white",
                          transition: "0.2s",
                          "&:hover": {
                            border: "1px solid #ff9f43",
                            transform: "scale(1.05)"
                          }
                        }}
                      >
                        <Box
                          sx={{
                            width: 55,
                            height: 55,
                            borderRadius: "50%",
                            backgroundColor: "#fbe7d4ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 24,
                            margin: "8px auto"
                          }}
                        >
                          {veh.vahicleTypeName.toLowerCase().includes("car") && <FaCar color="#ff9f43" />}
                          {veh.vahicleTypeName.toLowerCase().includes("motorcycle") && <FaMotorcycle color="#ff9f43" />}
                          {veh.vahicleTypeName.toLowerCase().includes("truck") && <FaTruck color="#ff9f43" />}
                          {veh.vahicleTypeName.toLowerCase().includes("boat") && <FaShip color="#ff9f43" />}
                          {veh.vahicleTypeName.toLowerCase().includes("camper") && <FaTrailer color="#ff9f43" />}
                          {veh.vahicleTypeName.toLowerCase().includes("moped") && <MdElectricScooter color="#ff9f43" />}
                        </Box>

                        <Typography fontWeight="bold" py={1}>
                          {veh.vahicleTypeName}
                        </Typography>


                      </Paper>
                    </Grid>
                  ))}
                </Grid>

              )}


            </Container>
          </Container>
        )} */}

        {activeStep === 0 && (
          <Container maxWidth="md">
            <Typography
              variant="h5"
              align="center"
              fontWeight="bold"
              mb={1}
              mt={1}
            >
              {t('buyer.headerTitle')}
            </Typography>

            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              mb={2}
            >
              {t('buyer.headerSubtitle')}
            </Typography>

            <Typography
              variant="h6"
              align="center"
              // color="text.secondary"
              mb={1}
            >
              {t('buyer.subHeaderTitle')}
            </Typography>


            <Container maxWidth="sm">
              {loading ? (
                <Grid container spacing={3} mb={3}>
                  {[...Array(6)].map((_, i) => (
                    <Grid size={{ xs: 6, sm: 6, md: 4 }} key={i}>
                      <Paper
                        elevation={3}
                        sx={{
                          borderRadius: 2,
                          textAlign: "center",
                          p: 2,
                        }}
                      >
                        <Skeleton
                          variant="circular"
                          width={55}
                          height={55}
                          sx={{ margin: "8px auto" }}
                        />
                        <Skeleton
                          variant="text"
                          width="60%"
                          sx={{ margin: "10px auto" }}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ) : error ? (
                <Typography color="error" align="center" fontWeight="bold" py={3}>
                  {error}
                </Typography>
              ) : vehicleData.length === 0 ? (
                <Typography align="center" fontWeight="bold" py={3}>
                  No Vehicle Types Found
                </Typography>
              ) : (
                <Grid container spacing={3} mb={3}>
                  {vehicleData.map((veh) => (
                    <Grid size={{ xs: 6, sm: 6, md: 4 }} key={veh.id}>
                      <Paper
                        elevation={3}
                        onClick={() => setActiveStep(1)} // ⬅ click → go to next step
                        sx={{
                          borderRadius: 2,
                          textAlign: "center",
                          cursor: "pointer",
                          border: "1px solid #ccc",
                          backgroundColor: "white",
                          transition: "0.2s",
                          "&:hover": {
                            border: "1px solid #ff9f43",
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: 55,
                            height: 55,
                            borderRadius: "50%",
                            backgroundColor: "#fbe7d4ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 24,
                            margin: "8px auto",
                          }}
                        >
                          {veh.vahicleTypeName.toLowerCase().includes("car") && <FaCar color="#ff9f43" />}
                          {veh.vahicleTypeName.toLowerCase().includes("motorcycle") && <FaMotorcycle color="#ff9f43" />}
                          {veh.vahicleTypeName.toLowerCase().includes("truck") && <FaTruck color="#ff9f43" />}
                          {veh.vahicleTypeName.toLowerCase().includes("boat") && <FaShip color="#ff9f43" />}
                          {veh.vahicleTypeName.toLowerCase().includes("camper") && <FaTrailer color="#ff9f43" />}
                          {veh.vahicleTypeName.toLowerCase().includes("moped") && <MdElectricScooter color="#ff9f43" />}
                        </Box>

                        <Typography fontWeight="bold" py={1}>
                          {veh.vahicleTypeName}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Container>
          </Container>
        )}


        {/*----------------------- Step 1 ---------------------- */}

        {activeStep === 1 && (
          <Box textAlign="center" py={1}>

            <Typography variant="h6" fontWeight="bold" mb={1}>
              {t('buyer.startPurchaseTitle')}  {/* English & Swedish handled via i18n */}
            </Typography>

            <Typography mb={3} color="gray">
              {t('buyer.startPurchaseSubtitle')}
            </Typography>


            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={3}
              mb={3}
              gap={1}
            >
              <TextField
                placeholder="Enter registration number"
                variant="outlined"
                size="small"
                value={registration}
                onChange={(e) => setRegistration(e.target.value)}
                sx={{
                  width: "300px",
                  backgroundColor: "#fff",

                  "& .MuiOutlinedInput-root": {
                    borderRadius: "15px",
                    "& fieldset": {
                      borderColor: "#d5d5d5",
                    },
                    "&:hover fieldset": {
                      borderColor: "#ff9f63",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff9f63",
                      borderWidth: "2px",
                    },
                  },
                }}
              />



              <Button
                variant="contained"
                onClick={handleSearch}
                disabled={loading}
                sx={{
                  backgroundColor: "#ff9f43",
                  "&:hover": { backgroundColor: "#e68a33" },
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  minWidth: "50px",
                  padding: "6px",
                }}
              >
                {loading ? "..." : <SearchIcon />}
              </Button>
            </Box>

            {error && (
              <Box mt={2} textAlign="center">
                <Typography
                  sx={{
                    color: "red",
                    fontWeight: "bold",
                    background: "#ffe5e5",
                    display: "inline-block",
                    padding: "6px 14px",
                    borderRadius: "6px",
                  }}
                >
                  {error}
                </Typography>
              </Box>
            )}
            <Box display="flex" justifyContent="right" gap={2}>


              <Button
                variant="contained"
                sx={{ background: "#ff9f43" }}
                onClick={() => setActiveStep(2)}
                disabled={!contractId || loading}
              >
                Continue
              </Button>
            </Box>
          </Box>
        )}

        {activeStep === 2 && (
          <Box py={2}>

            <Typography variant="h6" fontWeight="bold" align="center" mt={1}>
              {t("buyer.connectSellerTitle")}
            </Typography>

            <Typography
              variant="subtitle2"
              align="center"
              color="text.secondary"
              mb={2}
            >
              {t("buyer.connectSellerSubtitle")}
            </Typography>

            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleBuyerSuccess}
                disabled={submitting || updated}
                sx={{
                  padding: "10px 30px",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  animation:
                    !submitting && !updated ? "pulse 1.5s infinite" : "none",

                  "@keyframes pulse": {
                    "0%": {
                      transform: "scale(1)",
                      boxShadow: "0 0 0 0 rgba(0,123,255, 0.7)",
                    },
                    "70%": {
                      transform: "scale(1.12)",
                      boxShadow: "0 0 0 10px rgba(0,123,255, 0)",
                    },
                    "100%": {
                      transform: "scale(1)",
                      boxShadow: "0 0 0 0 rgba(0,123,255, 0)",
                    },
                  },
                }}
              >
                {submitting
                  ? t("buyer.updating")
                  : updated
                    ? t("buyer.connected")
                    : t("buyer.connectWithSeller")}
              </Button>

              {updated && (
                <Box mt={3}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => setActiveStep(3)}
                    sx={{
                      padding: "10px 30px",
                      borderRadius: "10px",
                      fontWeight: "bold"
                    }}
                  >
                    Next
                  </Button>
                </Box>
              )}
            </Box>

          </Box>
        )}

        {activeStep === 3 && (
          <Box py={2}>

            <Container maxWidth="md">
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: "center",
                }}
              >
                {/* Vehicle Icon (Same logic as step 0) */}
                <Box sx={{ mb: 3, fontSize: "48px", color: "#00d4c4" }}>
                  {contractMainData?.vahicleTypeOptionName?.toLowerCase().includes("car") && (
                    <FaCar />
                  )}
                  {contractMainData?.vahicleTypeOptionName?.toLowerCase().includes("motorcycle") && (
                    <FaMotorcycle />
                  )}
                  {contractMainData?.vahicleTypeOptionName?.toLowerCase().includes("truck") && (
                    <FaTruck />
                  )}
                  {contractMainData?.vahicleTypeOptionName?.toLowerCase().includes("boat") && (
                    <FaShip />
                  )}
                  {contractMainData?.vahicleTypeOptionName?.toLowerCase().includes("camper") && (
                    <FaTrailer />
                  )}
                  {contractMainData?.vahicleTypeOptionName?.toLowerCase().includes("moped") && (
                    <MdElectricScooter />
                  )}
                </Box>


                <Typography variant="h6" gutterBottom>
                  {t("buyer.dealConnected")}
                </Typography>

                {sellerValuation ? (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    {t("buyer.sellerValuation", { valuation: sellerValuation })}
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 2,
                      color: "red",
                      fontWeight: "bold",
                      animation: "pulse 2.5s infinite",
                      "@keyframes pulse": {
                        "0%": { transform: "scale(0.9)", boxShadow: "0 0 0 0 rgba(255, 0, 0, 0.7)" },
                        "70%": { transform: "scale(1.05)", boxShadow: "0 0 0 10px rgba(255, 0, 0, 0)" },
                        "100%": { transform: "scale(0.9)", boxShadow: "0 0 0 0 rgba(255, 0, 0, 0)" },
                      },
                    }}
                  >
                    {t("buyer.waitingValuation")}
                  </Typography>
                )}



                <Button
                  variant="contained"
                  sx={{ mt: 4 }}
                  onClick={() => setActiveStep(4)}
                  disabled={!sellerValuation}
                >
                  Next
                </Button>
              </Paper>
            </Container>


          </Box>
        )}

        {activeStep === 4 && (
          <Box py={2}>

            <Container maxWidth="md">
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  margin: "40px auto",

                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}
                >
                  {t("buyer.vehicleInformation")}

                </Typography>


                {!contractMainData ? (
                  <Typography>Loading vehicle information...</Typography>
                ) : (
                  <Box sx={{ border: '1px solid #ccc', boxShadow: 3, borderRadius: 2, p: 2 }}>
                    <Typography variant="h6" fontWeight="bold" mb={1}>
                      {t("buyer.vehicleInformation")}
                    </Typography>

                    <DataRow label={t("buyer.registrationNo")} value={contractMainData.carInfoRegistrationNo || "-"} />
                    <DataRow label={t("buyer.vehicleDesignation")} value={contractMainData.carInfoVehicleDesignation || "-"} />
                    <DataRow label={t("buyer.tradeName")} value={contractMainData.carInfoTradeName || "-"} />
                    <DataRow label={t("buyer.vehicleYears")} value={contractMainData.carInfoVehicleYears || "-"} />
                    <DataRow label={t("buyer.registrationDate")} value={contractMainData.carInfoRegistrationDate || "-"} />
                    <DataRow label={t("buyer.numberOfUsers")} value={contractMainData.carInfoNumberOfUsers || "-"} />
                    <DataRow label={t("buyer.waxelbarge")} value={contractMainData.carInfoWaxelbarge || "-"} />
                    <DataRow label={t("buyer.fourWheelDrive")} value={contractMainData.carInfoFourWheelDrive ? "Yes" : "No"} />
                    <DataRow label={t("buyer.fuel")} value={contractMainData.carInfoFuel || "-"} />
                    <DataRow label={t("buyer.inspectionDate")} value={contractMainData.carInfoInspectionDate || "-"} />
                    <DataRow label={t("buyer.previousInspectionDate")} value={contractMainData.carInfoPreviousInspectionDate || "-"} />
                    <DataRow label={t("buyer.inspectionStation")} value={contractMainData.carInfoInspectionStation || "-"} />
                    <DataRow label={t("buyer.inspectionGroup")} value={contractMainData.carInfoInspectionGroup || "-"} />
                    <DataRow label={t("buyer.feedingStall")} value={contractMainData.carInfoFeedingStall || "-"} />
                    <DataRow label={t("buyer.tax")} value={contractMainData.carInfoTax || "-"} />
                    <DataRow label={t("buyer.malus")} value={contractMainData.carInfoMalus || "-"} />
                    <DataRow label={t("buyer.valuation")} value={contractMainData.carValuationBySeller || "-"} />
                  </Box>


                )}
                <Box sx={{
                  border: '1px solid #ccc',
                  boxShadow: 3,
                  borderRadius: 2,
                  p: 2,
                  mt: 2
                }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FaMoneyBillWave />
                    {t("buyer.pricePayment")}
                  </Typography>

                  <Box sx={{
                    backgroundColor: '#f1efefff',
                    borderRadius: 2,
                    p: 1,
                    mt: 1
                  }}>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ReportGmailerrorredIcon sx={{ fontSize: 16 }} />
                      {t("buyer.pricePaymentInfo")}
                    </Typography>
                  </Box>
                </Box>


                <Box sx={{
                  border: '1px solid #ccc',
                  boxShadow: 3,
                  borderRadius: 2,
                  p: 2,
                  mt: 2
                }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AirportShuttleIcon />
                    {t("buyer.deliveryRisk")}
                  </Typography>

                  <Box sx={{
                    backgroundColor: '#f1efefff',
                    borderRadius: 3,
                    p: 2,
                    mt: 1
                  }}>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ReportGmailerrorredIcon sx={{ fontSize: 16 }} />
                      {t("buyer.deliveryRiskInfo")}
                    </Typography>
                  </Box>
                </Box>



                <Box sx={{ border: '1px solid #ccc', boxShadow: 3, borderRadius: 2, p: 2, mt: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AirportShuttleIcon />
                    {t("buyer.conditionTitle")}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    {t("buyer.conditionInfo1")}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                    {t("buyer.conditionInfo2")}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                    {t("buyer.conditionInfo3")}
                  </Typography>
                </Box>

                <Box sx={{ border: '1px solid #ccc', boxShadow: 3, borderRadius: 2, p: 2, mt: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccountBalanceIcon />
                    {t("buyer.debtsTitle")}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    {t("buyer.debtsInfo")}
                  </Typography>

                  <FormGroup sx={{ mt: 1, gap: 0.5 }}>
                    <FormControlLabel
                      value="none"
                      disabled
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }} />}
                      label={<Typography variant="body2" color="text.secondary">{t("buyer.debtsNone")}</Typography>}
                    />
                    <FormControlLabel
                      value="seller"
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }} />}
                      label={<Typography variant="body2" color="text.secondary">{t("buyer.debtsSeller")}</Typography>}
                    />
                    <FormControlLabel
                      value="buyer"
                      disabled
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }} />}
                      label={<Typography variant="body2" color="text.secondary">{t("buyer.debtsBuyer")}</Typography>}
                    />
                  </FormGroup>
                </Box>

                <Box sx={{ border: '1px solid #ccc', boxShadow: 3, borderRadius: 2, p: 2, mt: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <HomeWorkIcon />
                    {t("buyer.loanTitle")}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1, p: 2, borderRadius: 2, backgroundColor: 'grey.100', color: 'text.secondary', border: '1px solid', borderColor: 'grey.300' }}>
                    {t("buyer.loanInfo")}
                  </Typography>

                  <RadioGroup value={value} onChange={(e) => setValue(e.target.value)} sx={{ mt: 1 }}>
                    <FormControlLabel
                      value="none"
                      control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 14 } }} />}
                      label={<Typography variant="body1">{t("buyer.loanNone")}</Typography>}
                    />
                    <FormGroup sx={{ gap: 0.5 }}>
                      <FormControlLabel
                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} />}
                        label={<Typography variant="body2" color="text.secondary">{t("buyer.loanSeller")}</Typography>}
                      />
                      <FormControlLabel
                        control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 16 } }} />}
                        label={<Typography variant="body2" color="text.secondary">{t("buyer.loanBuyer")}</Typography>}
                      />
                    </FormGroup>
                  </RadioGroup>
                </Box>

                <Box sx={{ border: '1px solid #ccc', boxShadow: 3, borderRadius: 2, p: 2, mt: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DescriptionIcon />
                    {t("buyer.ownershipTitle")}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1, p: 2, borderRadius: 2, backgroundColor: 'grey.100', color: 'text.secondary' }}>
                    {t("buyer.ownershipInfo1")}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    {t("buyer.ownershipInfo2")}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    {t("buyer.ownershipInfo3")}
                  </Typography>
                </Box>

                <Box sx={{ border: '1px solid #ccc', boxShadow: 3, borderRadius: 2, p: 2, mt: 2 }}>
                  <Typography variant="body1" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DirectionsCarFilledIcon />
                    {t("buyer.transportTitle")}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    {t("buyer.transportInfo1")}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                    {t("buyer.transportInfo2")}
                  </Typography>
                </Box>
                {/* <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => setActiveStep(3)}
                >
                  Next
                </Button>
              </Box> */}
              </Paper>
            </Container>
          </Box>
        )}


      </Paper>

    </Container>
  );
}

export default BuyerProfile;


const DataRow = ({ label, value }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
    <Typography sx={{ fontWeight: 500 }}>{label}</Typography>
    <Typography>{value ?? "-"}</Typography>
  </Box>
);







import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import {
  FaCar,
  FaMotorcycle,
  FaShip,
  FaTrailer,
  FaTruck,
} from "react-icons/fa";
import { MdElectricScooter } from "react-icons/md";
import "../../Compo/LoadingText.css";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  TextField,
  Paper,
  Divider,
  Grid,
  Container,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import ApiCall from "../../Apicall/ApiCall.js";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import { FaMoneyBillWave } from "react-icons/fa";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import FormGroup from "@mui/material/FormGroup";
import { useSignalR } from "../../context/SignalRContext.js";
import SearchIcon from "@mui/icons-material/Search";
import { useUser } from "../../context/UserContext.js";
import { Skeleton } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DescriptionIcon from "@mui/icons-material/Description";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
const steps = [
  "Choose Vehicles",
  "Vehicle",
  "Connecting",
  "Valuation",
  "Contract",
];

function BuyerProfile() {
  const { connectToDeal, messages, connection, sendDealMessage } = useSignalR();
  const { t } = useTranslation();
  const { userId } = useUser();
  const navigate = useNavigate();

  // -------------------Maneging States-------------------------------
  const [activeStep, setActiveStep] = useState(0);
  const [vehicleData, setVehicleData] = useState([]);
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const [valuationToastShown, setValuationToastShown] = useState(false);
  const [sellerValuation, setSellerValuation] = useState(null);
  const [contractMainData, setContractMainData] = useState(null);
  const [contractMainData3, setContractMainData3] = useState(null);
  const [registration, setRegistration] = useState("");
  const [contractId, setContractId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [oldValuation, setOldValuation] = useState(null);
  const [isDealValid, setIsDealValid] = useState(false);
  

  useEffect(() => {
    const fetchContractMain = async () => {
      if (activeStep === 4 && contractId) {
        setLoading(true);
        setError("");

        try {
          const response = await ApiCall({
            url: "/ContractMain/GetContractMainById",
            method: "GET",
            params: { Id: contractId },
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

  const handleSearch = async () => {
    if (!registration) return;

    setLoading(true);
    setError("");
    setContractId(null);

    try {
      const carResponse = await ApiCall({
        url: "/CarInfo/GetActiveCarForBuyerByRegNo",
        method: "GET",
        params: { Id: registration },
      });

      if (carResponse.data?.result) {
        const raw = carResponse.data.result;
        const contractId = raw.contractId;

        setContractId(contractId || null);

        try {
          const expiryResponse = await ApiCall({
            url: "/ContractMain/CheckDealExpiry",
            method: "POST",
            data: { id: contractId },
          });

          if (expiryResponse.data?.error) {
            const expiryError =
              expiryResponse.data.error.details ||
              expiryResponse.data.error.message ||
              "⚠️ Deal expiry check failed.";
            setError(expiryError);
            return;
          }

          setIsDealValid(true);
          // toast.success("Car and contract are valid!", {
          //   position: "bottom-right",
          // });
        } catch (expiryErr) {
          console.error("Error checking deal expiry:", expiryErr);

          if (expiryErr.response?.data?.error) {
            const expiryError =
              expiryErr.response.data.error.details ||
              expiryErr.response.data.error.message ||
              "⚠️ Deal expiry check failed.";
            setError(expiryError);
            setIsDealValid(false);
          } else {
            setError("⚠️ Something went wrong while checking deal expiry.");
          }
          return;
        }
      } else if (
        carResponse.data?.success === false &&
        carResponse.data?.error
      ) {
        const backendError =
          carResponse.data.error.details ||
          carResponse.data.error.message ||
          "⚠️ Internal server error occurred.";
        setError(backendError);
      } else {
        setError("❌ Car not found, please check the registration number.");
      }
    } catch (error) {
      console.error("Error fetching car info:", error);

      if (error.response?.data?.error) {
        const backendError =
          error.response.data.error.details ||
          error.response.data.error.message ||
          "⚠️ Something went wrong while fetching car info.";
        setError(backendError);
      } else {
        setError("⚠️ Something went wrong while fetching car info.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchContract = async () => {
      if (activeStep !== 2) return;
      if (!contractId) return;

      setLoading(true);
      setError("");

      try {
        const response = await ApiCall({
          url: "/ContractMain/GetContractMainById",
          method: "GET",
          params: { Id: contractId },
        });

        const data = response.data?.result;

        if (!data) {
          setError("❌ Contract not found.");
          return;
        }

        setContractMainData3(data);
      } catch (err) {
        console.error(err);
        setError("⚠ Something went wrong while fetching contract data.");
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [activeStep, contractId]);

  useEffect(() => {
    if (activeStep !== 2) return;
    if (!contractMainData3) return;
    if (updated || submitting) return;

    const timer = setTimeout(() => {
      handleBuyerConnect();
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeStep, contractMainData3, updated, submitting]);

  const handleBuyerConnect = async () => {
    if (!contractMainData3) {
      Swal.fire("❌ Error", "No contract info available", "error");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        sellerUserId: contractMainData3.sellerUserId,
        sellerUserFullName: contractMainData3.sellerUserFullName,
        sellerDealStatus: contractMainData3.sellerDealStatus,
        sellerDealActive: contractMainData3.sellerDealActive,
        sellerDealComplete: contractMainData3.sellerDealComplete,
        vahicleTypeOptionId: contractMainData3.vahicleTypeOptionId,
        vahicleTypeOptionVahicleTypeName:
          contractMainData3.vahicleTypeOptionVahicleTypeName,
        vahicleTypeOptionName: contractMainData3.vahicleTypeOptionName,
        sellerDrivingLicensePath: "",
        sellerDrivingLicenseValidate:
          contractMainData3.sellerDrivingLicenseValidate,

        carInfoId: contractMainData3.carInfoId,
        carInfoRegistrationNo: contractMainData3.carInfoRegistrationNo,
        carInfoVehicleDesignation: contractMainData3.carInfoVehicleDesignation,
        carInfoTradeName: contractMainData3.carInfoTradeName,
        carInfoYearModel: contractMainData3.carInfoYearModel,
        carInfoVehicleYears: contractMainData3.carInfoVehicleYears,
        carInfoRegistrationDate: contractMainData3.carInfoRegistrationDate,
        carInfoNumberOfUsers: contractMainData3.carInfoNumberOfUsers,
        carInfoWaxelbarge: contractMainData3.carInfoWaxelbarge,
        carInfoFourWheelDrive: contractMainData3.carInfoFourWheelDrive,
        carInfoFuel: contractMainData3.carInfoFuel,
        carInfoElectricVehicleConfiguration:
          contractMainData3.carInfoElectricVehicleConfiguration,
        carInfoInspectionDate: contractMainData3.carInfoInspectionDate,
        carInfoInspectionDateEMPTYe:
          contractMainData3.carInfoInspectionDateEMPTYe,
        carInfoDispensationInspectionGroup:
          contractMainData3.carInfoDispensationInspectionGroup,
        carInfoInspectionGroup: contractMainData3.carInfoInspectionGroup,
        carInfoFeedingStall: contractMainData3.carInfoFeedingStall,
        carInfoInspectionStation: contractMainData3.carInfoInspectionStation,
        carInfoInspectionProgramCode:
          contractMainData3.carInfoInspectionProgramCode,
        carInfoPreviousInspectionDate:
          contractMainData3.carInfoPreviousInspectionDate,
        carInfoPreviousInspectionProgramCode:
          contractMainData3.carInfoPreviousInspectionProgramCode,
        carInfoTax: contractMainData3.carInfoTax,
        carInfoMalus: contractMainData3.carInfoMalus,
        carValuationBySeller: contractMainData3.carValuationBySeller,

        buyerUserId: userId,
        buyerDealStatus: contractMainData3.buyerDealStatus,
        buyerDealConnected: true,
        buyerDealConfirmed: contractMainData3.buyerDealConfirmed,

        lastModificationTime: contractMainData3.lastModificationTime,
        lastModifierUserId: contractMainData3.lastModifierUserId,
        creationTime: contractMainData3.creationTime,
        creatorUserId: contractMainData3.creatorUserId,
        id: contractMainData3.id,
      };

      const contractUpdateRes = await ApiCall({
        url: "/ContractMain/Update",
        method: "PUT",
        data: payload,
      });

      if (contractUpdateRes?.success === false || contractUpdateRes?.error) {
        const errorMsg =
          contractUpdateRes?.error?.details ||
          contractUpdateRes?.error?.message ||
          "Failed to update contract";
        Swal.fire("❌ Error", errorMsg, "error");
        return;
      }

      if (!connection) {
        await connectToDeal(contractMainData3.id);
      }

      await sendDealMessage("buyer", "Buyer connected to Seller");

      setUpdated(true);

      // Swal.fire("✅ Connected", "Buyer is now connected to Seller!", "success");

      setTimeout(() => {
        setActiveStep((prev) => prev + 1);
      }, 1500);
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Something went wrong!", "error");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchVehicleOptions = async () => {
      try {
        setLoading(true);
        const response = await ApiCall({
          url: "/VahicleTypeOption/GetAll",
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
    if (activeStep === 3) {
      const dealMsg = messages.find(
        (msg) =>
          msg.message === "Buyer connected! Valuation entered" ||
          msg.message === "Seller added valuation"
      );

      if (dealMsg && !valuationToastShown) {
        toast.success("💰 Seller has added car valuation!", {
          position: "top-right",
        });
        setValuationToastShown(true);
        setSellerValuation(true);
      }
    }
  }, [messages, activeStep, valuationToastShown]);

  useEffect(() => {
    if (activeStep !== 4 || !contractId) return;

    const valuationMsg = messages.find(
      (msg) =>
        msg.user === "seller" &&
        (msg.message === "Seller added valuation" ||
          msg.message === "Seller Updated valuation")
    );

    if (!valuationMsg) return;

    const fetchVehicleInfo = async () => {
      try {
        const res = await ApiCall({
          url: "/ContractMain/GetContractMainById",
          method: "GET",
          params: { Id: contractId },
        });

        const latest = res?.result || res?.data?.result;
        if (!latest) return;

        const newValuation = latest.carValuationBySeller;

        if (oldValuation !== null && newValuation !== oldValuation) {
          toast.info(
            `Seller updated valuation from ${oldValuation} → ${newValuation}`,
            { position: "top-right" }
          );
        }
        setOldValuation(newValuation);
        setContractMainData(latest);
        setSellerValuation(newValuation);
        setValuationToastShown(true);
      } catch (err) {
        console.error("Error fetching vehicle info:", err);
      }
    };

    fetchVehicleInfo();
  }, [messages, activeStep, contractId, oldValuation]);

 const handleDealConfirm = async () => {
  if (!contractId) {
    Swal.fire("Error", "Contract ID not found", "error");
    return;
  }

  setLoading(true); 

  try {
    const res = await ApiCall({
      url: "/ContractMain/DealCompletedByBuyer",
      method: "POST",
      data: { id: contractId },
    });

    if (res?.data?.success || res?.success) {
      Swal.fire({
        icon: "success",
        title: "Deal Confirmed",
        text: "Your deal has been completed successfully",
      }).then(() => {
        
        navigate(`/Contract/${contractId}`);
      });
    } else {
      Swal.fire(
        "Failed",
        res?.data?.error?.message || "Deal confirmation failed",
        "error"
      );
    }
  } catch (error) {
    Swal.fire(
      "Error",
      error?.response?.data?.error?.message || "Something went wrong",
      "error"
    );
  } finally {
    setLoading(false);  
  }
};

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
        {activeStep === 0 && (
          <Container maxWidth="md">
            <Typography
              variant="h5"
              align="center"
              fontWeight="bold"
              mb={1}
              mt={1}
            >
              {t("buyer.headerTitle")}
            </Typography>

            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              mb={2}
            >
              {t("buyer.headerSubtitle")}
            </Typography>

            <Typography
              variant="h6"
              align="center"
              // color="text.secondary"
              mb={1}
            >
              {t("buyer.subHeaderTitle")}
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
                <Typography
                  color="error"
                  align="center"
                  fontWeight="bold"
                  py={3}
                >
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
                        onClick={() => setActiveStep(1)}
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
                          {veh.vahicleTypeName
                            .toLowerCase()
                            .includes("car") && <FaCar color="#ff9f43" />}
                          {veh.vahicleTypeName
                            .toLowerCase()
                            .includes("motorcycle") && (
                            <FaMotorcycle color="#ff9f43" />
                          )}
                          {veh.vahicleTypeName
                            .toLowerCase()
                            .includes("truck") && <FaTruck color="#ff9f43" />}
                          {veh.vahicleTypeName
                            .toLowerCase()
                            .includes("boat") && <FaShip color="#ff9f43" />}
                          {veh.vahicleTypeName
                            .toLowerCase()
                            .includes("camper") && (
                            <FaTrailer color="#ff9f43" />
                          )}
                          {veh.vahicleTypeName
                            .toLowerCase()
                            .includes("moped") && (
                            <MdElectricScooter color="#ff9f43" />
                          )}
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
              {t("buyer.startPurchaseTitle")}
            </Typography>

            <Typography mb={3} color="gray">
              {t("buyer.startPurchaseSubtitle")}
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
                onClick={async () => {
                  if (contractId && isDealValid) {
                    await connectToDeal(contractId);
                    setActiveStep(2);
                  }
                }}
                disabled={!contractId || !isDealValid || loading}
              >
                Continue
              </Button>
            </Box>
          </Box>
        )}
        {/*----------------------- Step 2 ---------------------- */}
        {activeStep === 2 && (
          <Box py={2}>
            <Typography variant="h6" fontWeight="bold" align="center" mt={1}>
              {t("buyer.connectSellerTitle")}
            </Typography>

            <Box sx={{ mt: 4, textAlign: "center" }}>
              {!updated ? (
                <>
                  <Typography color="text.secondary">
                    Connecting with seller, please wait...
                  </Typography>
                </>
              ) : (
                <Typography color="success.main" fontWeight="bold">
                  ✅ Connected successfully
                </Typography>
              )}
            </Box>

            <Typography
              variant="subtitle2"
              align="center"
              color="text.secondary"
              mt={7}
            >
              The page updates automatically when the seller is ready.
            </Typography>
            <Typography
              variant="subtitle2"
              align="center"
              color="text.secondary"
              mb={2}
            >
              You don't need to do anything
            </Typography>
          </Box>
        )}
        {/*----------------------- Step 3 ---------------------- */}
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
                  {contractMainData?.vahicleTypeOptionName
                    ?.toLowerCase()
                    .includes("car") && <FaCar />}
                  {contractMainData?.vahicleTypeOptionName
                    ?.toLowerCase()
                    .includes("motorcycle") && <FaMotorcycle />}
                  {contractMainData?.vahicleTypeOptionName
                    ?.toLowerCase()
                    .includes("truck") && <FaTruck />}
                  {contractMainData?.vahicleTypeOptionName
                    ?.toLowerCase()
                    .includes("boat") && <FaShip />}
                  {contractMainData?.vahicleTypeOptionName
                    ?.toLowerCase()
                    .includes("camper") && <FaTrailer />}
                  {contractMainData?.vahicleTypeOptionName
                    ?.toLowerCase()
                    .includes("moped") && <MdElectricScooter />}
                </Box>

                <Typography variant="h6" gutterBottom>
                  {t("buyer.dealConnected")}
                </Typography>

                {sellerValuation ? (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    {t("buyer.sellerValue")}
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
                        "0%": {
                          transform: "scale(0.9)",
                          boxShadow: "0 0 0 0 rgba(255, 0, 0, 0.7)",
                        },
                        "70%": {
                          transform: "scale(1.05)",
                          boxShadow: "0 0 0 10px rgba(255, 0, 0, 0)",
                        },
                        "100%": {
                          transform: "scale(0.9)",
                          boxShadow: "0 0 0 0 rgba(255, 0, 0, 0)",
                        },
                      },
                    }}
                  >
                    {t("buyer.waitingValuation")}
                  </Typography>
                )}

                <Button
                  variant="contained"
                  color="success"
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
        {/*----------------------- Step 4 ---------------------- */}
        {activeStep === 4 && (
          <Box py={2}>
            <Container maxWidth="md">
              {!contractMainData ? (
                <Typography>Loading vehicle information...</Typography>
              ) : (
                <Box
                  sx={{
                    border: "1px solid #ccc",
                    boxShadow: 3,
                    borderRadius: 2,
                    p: 1,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    {t("buyer.vehicleInformation")}
                  </Typography>

                  <DataRow
                    label={t("buyer.registrationNo")}
                    value={contractMainData.carInfoRegistrationNo || "-"}
                  />
                  <DataRow
                    label={t("buyer.vehicleDesignation")}
                    value={contractMainData.carInfoVehicleDesignation || "-"}
                  />
                  <DataRow
                    label={t("buyer.tradeName")}
                    value={contractMainData.carInfoTradeName || "-"}
                  />
                  <DataRow
                    label={t("buyer.vehicleYears")}
                    value={contractMainData.carInfoVehicleYears || "-"}
                  />
                  <DataRow
                    label={t("buyer.registrationDate")}
                    value={contractMainData.carInfoRegistrationDate || "-"}
                  />
                  <DataRow
                    label={t("buyer.numberOfUsers")}
                    value={contractMainData.carInfoNumberOfUsers || "-"}
                  />
                  <DataRow
                    label={t("buyer.waxelbarge")}
                    value={contractMainData.carInfoWaxelbarge || "-"}
                  />
                  <DataRow
                    label={t("buyer.fourWheelDrive")}
                    value={
                      contractMainData.carInfoFourWheelDrive ? "Yes" : "No"
                    }
                  />
                  <DataRow
                    label={t("buyer.fuel")}
                    value={contractMainData.carInfoFuel || "-"}
                  />
                  <DataRow
                    label={t("buyer.inspectionDate")}
                    value={contractMainData.carInfoInspectionDate || "-"}
                  />
                  <DataRow
                    label={t("buyer.previousInspectionDate")}
                    value={
                      contractMainData.carInfoPreviousInspectionDate || "-"
                    }
                  />
                  <DataRow
                    label={t("buyer.inspectionStation")}
                    value={contractMainData.carInfoInspectionStation || "-"}
                  />
                  <DataRow
                    label={t("buyer.inspectionGroup")}
                    value={contractMainData.carInfoInspectionGroup || "-"}
                  />
                  <DataRow
                    label={t("buyer.feedingStall")}
                    value={contractMainData.carInfoFeedingStall || "-"}
                  />
                  <DataRow
                    label={t("buyer.tax")}
                    value={contractMainData.carInfoTax || "-"}
                  />
                  <DataRow
                    label={t("buyer.malus")}
                    value={contractMainData.carInfoMalus || "-"}
                  />
                  <DataRow
                    label={t("buyer.valuation")}
                    value={
                      contractMainData.carValuationBySeller ? (
                        <span style={{ fontWeight: "bold" }}>
                          {Number(
                            contractMainData.carValuationBySeller
                              .toString()
                              .replace(/\s/g, "")
                          )
                            .toLocaleString("en-US")
                            .replace(/,/g, " ")}
                        </span>
                      ) : (
                        "-"
                      )
                    }
                  />
                </Box>
              )}
              <Box
                sx={{
                  border: "1px solid #ccc",
                  boxShadow: 3,
                  borderRadius: 2,
                  p: 2,
                  mt: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <FaMoneyBillWave />
                  {t("buyer.pricePayment")}
                </Typography>

                <Box
                  sx={{
                    backgroundColor: "#f1efefff",
                    borderRadius: 2,
                    p: 1,
                    mt: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <ReportGmailerrorredIcon sx={{ fontSize: 16 }} />
                    {t("buyer.pricePaymentInfo")}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  border: "1px solid #ccc",
                  boxShadow: 3,
                  borderRadius: 2,
                  p: 2,
                  mt: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <AirportShuttleIcon />
                  {t("buyer.deliveryRisk")}
                </Typography>

                <Box
                  sx={{
                    backgroundColor: "#f1efefff",
                    borderRadius: 3,
                    p: 2,
                    mt: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <ReportGmailerrorredIcon sx={{ fontSize: 16 }} />
                    {t("buyer.deliveryRiskInfo")}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  border: "1px solid #ccc",
                  boxShadow: 3,
                  borderRadius: 2,
                  p: 2,
                  mt: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <AirportShuttleIcon />
                  {t("buyer.conditionTitle")}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "text.secondary" }}
                >
                  {t("buyer.conditionInfo1")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5, color: "text.secondary" }}
                >
                  {t("buyer.conditionInfo2")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 0.5, color: "text.secondary" }}
                >
                  {t("buyer.conditionInfo3")}
                </Typography>
              </Box>

              <Box
                sx={{
                  border: "1px solid #ccc",
                  boxShadow: 3,
                  borderRadius: 2,
                  p: 2,
                  mt: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <AccountBalanceIcon />
                  {t("buyer.debtsTitle")}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "text.secondary" }}
                >
                  {t("buyer.debtsInfo")}
                </Typography>

                <FormGroup sx={{ mt: 1, gap: 0.5 }}>
                  <FormControlLabel
                    value="none"
                    disabled
                    control={
                      <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 14 } }} />
                    }
                    label={
                      <Typography variant="body2" color="text.secondary">
                        {t("buyer.debtsNone")}
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="seller"
                    control={
                      <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 14 } }} />
                    }
                    label={
                      <Typography variant="body2" color="text.secondary">
                        {t("buyer.debtsSeller")}
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="buyer"
                    disabled
                    control={
                      <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 14 } }} />
                    }
                    label={
                      <Typography variant="body2" color="text.secondary">
                        {t("buyer.debtsBuyer")}
                      </Typography>
                    }
                  />
                </FormGroup>
              </Box>

              <Box
                sx={{
                  border: "1px solid #ccc",
                  boxShadow: 3,
                  borderRadius: 2,
                  p: 2,
                  mt: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <HomeWorkIcon />
                  {t("buyer.loanTitle")}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "grey.100",
                    color: "text.secondary",
                    border: "1px solid",
                    borderColor: "grey.300",
                  }}
                >
                  {t("buyer.loanInfo")}
                </Typography>

                <RadioGroup
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  sx={{ mt: 1 }}
                >
                  <FormControlLabel
                    value="none"
                    control={
                      <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 14 } }} />
                    }
                    label={
                      <Typography variant="body1">
                        {t("buyer.loanNone")}
                      </Typography>
                    }
                  />
                  <FormGroup sx={{ gap: 0.5 }}>
                    <FormControlLabel
                      control={
                        <Radio
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }}
                        />
                      }
                      label={
                        <Typography variant="body2" color="text.secondary">
                          {t("buyer.loanSeller")}
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Radio
                          sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }}
                        />
                      }
                      label={
                        <Typography variant="body2" color="text.secondary">
                          {t("buyer.loanBuyer")}
                        </Typography>
                      }
                    />
                  </FormGroup>
                </RadioGroup>
              </Box>

              <Box
                sx={{
                  border: "1px solid #ccc",
                  boxShadow: 3,
                  borderRadius: 2,
                  p: 2,
                  mt: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <DescriptionIcon />
                  {t("buyer.ownershipTitle")}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "grey.100",
                    color: "text.secondary",
                  }}
                >
                  {t("buyer.ownershipInfo1")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "text.secondary" }}
                >
                  {t("buyer.ownershipInfo2")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "text.secondary" }}
                >
                  {t("buyer.ownershipInfo3")}
                </Typography>
              </Box>

              <Box
                sx={{
                  border: "1px solid #ccc",
                  boxShadow: 3,
                  borderRadius: 2,
                  p: 2,
                  mt: 2,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <DirectionsCarFilledIcon />
                  {t("buyer.transportTitle")}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "text.secondary" }}
                >
                  {t("buyer.transportInfo1")}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mt: 1, color: "text.secondary" }}
                >
                  {t("buyer.transportInfo2")}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 4,
                  mb: 2,
                }}
              >
            <Button
  variant="contained"
  color="success"
  size="large"
  onClick={handleDealConfirm}
  disabled={loading}  
  startIcon={loading && <CircularProgress size={20} color="inherit" />}
>
  {loading ? "Confirming..." : "Deal Confirm"}
</Button>
              </Box>
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

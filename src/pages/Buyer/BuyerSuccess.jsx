import React, { useContext, useEffect, useState } from "react";
import ApiCall from "../../Apicall/ApiCall";
import { AppSettings } from "./../../config/app-settings.js";
import Swal from "sweetalert2";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Button,
  Paper,
  Container,
  Grid,
} from "@mui/material";
import {
  FaCar,
  FaMotorcycle,
  FaShip,
  FaTrailer,
  FaTruck,
} from "react-icons/fa";
import { MdElectricScooter } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DescriptionIcon from "@mui/icons-material/Description";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import BuyerHeader from "./BuyerHeader.js";
import { useTranslation } from "react-i18next";
import { useSignalR } from "../../context/SignalRContext.js";
import { useUser } from "../../context/UserContext.js";

export default function BuyerSuccess() {
  const { connectToDeal, messages, connection, sendDealMessage } = useSignalR();
  const { t } = useTranslation();
  const context = useContext(AppSettings);
  const [contractData, setContractData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [updated, setUpdated] = useState(false);
  const [sellerValuation, setSellerValuation] = useState(null);
  const [valuationToastShown, setValuationToastShown] = useState(false);
  const [vehicleInfo, setVehicleInfo] = useState(null);
  const [contractId, setContractId] = useState(null);
  const [oldValuation, setOldValuation] = useState(null);
  const [error, setError] = useState("");
  const [isDealValid, setIsDealValid] = useState(false);
    const { userId } = useUser();

  const steps = ["Connect Deal", "Valuation", "Contract"];

  useEffect(() => {
    context.setAppHeaderNone(true);

    return () => {
      context.setAppHeaderNone(false);
    };
  }, []);

  useEffect(() => {
    if (activeStep !== 0) return;

    const dataFromLocalStorage = localStorage.getItem("data");
    let contractIdFromLocalStorage = null;

    if (dataFromLocalStorage) {
      try {
        const parsed = JSON.parse(dataFromLocalStorage);
        contractIdFromLocalStorage = parsed.contractId;
        setContractId(contractIdFromLocalStorage);
      } catch (err) {
        console.error("Error parsing data:", err);
      }
    }

    if (!contractIdFromLocalStorage) {
      console.warn("ContractId not found.");
      setLoading(false);
      return;
    }

    const checkExpiryAndFetchContract = async () => {
      setLoading(true);
      setError("");
      setIsDealValid(false);

      try {
        const expiryRes = await ApiCall({
          url: "/ContractMain/CheckDealExpiry",
          method: "POST",
          data: { id: contractIdFromLocalStorage },
        });

        if (expiryRes.data?.error) {
          const expiryError =
            expiryRes.data.error.message ||
            expiryRes.data.error.details ||
            "⚠️ Deal expiry check failed.";
          setError(expiryError);
          setIsDealValid(false);
          return;
        }

        setIsDealValid(true);

        const contractRes = await ApiCall({
          url: "/ContractMain/GetContractMainById",
          method: "GET",
          params: { Id: contractIdFromLocalStorage },
        });

        const data = contractRes?.result || contractRes?.data?.result;
        setContractData(data);
        setVehicleInfo(data);
      } catch (err) {
        console.error("❌ Error during expiry check or contract fetch:", err);
        setError(
          err.response?.data?.error?.details ||
            err.response?.data?.error?.message ||
            "⚠️ Something went wrong while fetching contract."
        );
        setIsDealValid(false);
      } finally {
        setLoading(false);
      }
    };

    checkExpiryAndFetchContract();
  }, [activeStep]);

  useEffect(() => {
    if (!contractId) return;
    if (!isDealValid) return;
    if (error) return;

    let isConnected = false;

    const connect = async () => {
      try {
        await connectToDeal(contractId);
        isConnected = true;

      } catch (err) {
        console.error("Error connecting via SignalR:", err);
        Swal.fire("❌ Error", "Unable to connect via SignalR", "error");
      }
    };

    connect();

    return () => {
      isConnected = false;
    };
  }, [contractId, isDealValid, error]);

  useEffect(() => {
    if (activeStep !== 0) return;
    if (!contractData) return;
    if (!isDealValid) return;
    if (updated || submitting) return;

    const timer = setTimeout(() => {
      handleBuyerSuccess();
    }, 3000);

    return () => clearTimeout(timer);
  }, [activeStep, contractData, isDealValid, updated, submitting]);

  const handleBuyerSuccess = async () => {
    if (!contractData) return;

    setSubmitting(true);

    try {
      const payload = {
        sellerUserId: contractData.sellerUserId,
        sellerUserFullName: contractData.sellerUserFullName,
        sellerDealStatus: contractData.sellerDealStatus,
        sellerDealActive: contractData.sellerDealActive,
        sellerDealComplete: contractData.sellerDealComplete,
        vahicleTypeOptionId: contractData.vahicleTypeOptionId,
        vahicleTypeOptionVahicleTypeName:
          contractData.vahicleTypeOptionVahicleTypeName,
        vahicleTypeOptionName: contractData.vahicleTypeOptionName,
        sellerDrivingLicensePath: "",
        sellerDrivingLicenseValidate: contractData.sellerDrivingLicenseValidate,

        carInfoId: contractData.carInfoId,
        carInfoRegistrationNo: contractData.carInfoRegistrationNo,
        carInfoVehicleDesignation: contractData.carInfoVehicleDesignation,
        carInfoTradeName: contractData.carInfoTradeName,
        carInfoYearModel: contractData.carInfoYearModel,
        carInfoVehicleYears: contractData.carInfoVehicleYears,
        carInfoRegistrationDate: contractData.carInfoRegistrationDate,
        carInfoNumberOfUsers: contractData.carInfoNumberOfUsers,
        carInfoWaxelbarge: contractData.carInfoWaxelbarge,
        carInfoFourWheelDrive: contractData.carInfoFourWheelDrive,
        carInfoFuel: contractData.carInfoFuel,
        carInfoElectricVehicleConfiguration:
          contractData.carInfoElectricVehicleConfiguration,
        carInfoInspectionDate: contractData.carInfoInspectionDate,
        carInfoInspectionDateEMPTYe: contractData.carInfoInspectionDateEMPTYe,
        carInfoDispensationInspectionGroup:
          contractData.carInfoDispensationInspectionGroup,
        carInfoInspectionGroup: contractData.carInfoInspectionGroup,
        carInfoFeedingStall: contractData.carInfoFeedingStall,
        carInfoInspectionStation: contractData.carInfoInspectionStation,
        carInfoInspectionProgramCode: contractData.carInfoInspectionProgramCode,
        carInfoPreviousInspectionDate:
          contractData.carInfoPreviousInspectionDate,
        carInfoPreviousInspectionProgramCode:
          contractData.carInfoPreviousInspectionProgramCode,
        carInfoTax: contractData.carInfoTax,
        carInfoMalus: contractData.carInfoMalus,
        carValuationBySeller: contractData.carValuationBySeller,

        // 👇 BUYER UPDATE
        buyerUserId: userId,
        buyerDealStatus: contractData.buyerDealStatus,
        buyerDealConnected: true,
        buyerDealConfirmed: contractData.buyerDealConfirmed,

        lastModificationTime: contractData.lastModificationTime,
        lastModifierUserId: contractData.lastModifierUserId,
        creationTime: contractData.creationTime,
        creatorUserId: contractData.creatorUserId,
        id: contractData.id,
      };

     

      const contractUpdateRes = await ApiCall({
        url: "/ContractMain/Update",
        method: "PUT",
        data: payload,
      });

      if (contractUpdateRes?.success === false || contractUpdateRes?.error) {
        throw new Error(
          contractUpdateRes?.error?.details ||
            contractUpdateRes?.error?.message ||
            "Contract update failed"
        );
      }

      if (!connection) {
        await connectToDeal(contractData.id);
      }
      await sendDealMessage("buyer", "Buyer connected to Seller");
      setUpdated(true);
      // Swal.fire("✅ Success", "Buyer connected & seller notified!", "success");
    } catch (error) {
      console.error("❌ Buyer update error:", error);

      Swal.fire(
        "❌ Error",
        error?.message || "Unexpected server error!",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (activeStep !== 1 || !contractId) return;

    const valuationMsg = messages.find(
      (msg) =>
        msg.user === "seller" &&
        (msg.message === "Seller added valuation" ||
          msg.message === "Seller Updated valuation")
    );

    if (!valuationMsg || valuationToastShown) return;

    const fetchLatestValuation = async () => {
      try {
        const res = await ApiCall({
          url: "/ContractMain/GetContractMainById",
          method: "GET",
          params: { Id: contractId },
        });

        const latest = res?.result || res?.data?.result;
        const valuation = latest?.carValuationBySeller;

        if (!valuation || valuation === 0) return;
        setContractData(latest);
        setSellerValuation(valuation);

        toast.success("💰 Seller has added car valuation!", {
          position: "top-right",
        });

        setValuationToastShown(true);
      } catch (err) {
        console.error("Step-1 valuation fetch error:", err);
      }
    };

    fetchLatestValuation();
  }, [messages, activeStep, contractId, valuationToastShown]);

  useEffect(() => {
    if (activeStep !== 2 || !contractId) return;

    const valuationMsg = messages.find(
      (msg) =>
        msg.user === "seller" &&
        (msg.message === "Seller added valuation" ||
          msg.message === "Seller Updated valuation")
    );

    if (!valuationMsg) return;

    const fetchLatestContract = async () => {
      try {
        const res = await ApiCall({
          url: "/ContractMain/GetContractMainById",
          method: "GET",
          params: { Id: contractData.id },
        });

        const latest = res?.result || res?.data?.result;
        if (!latest) return;

        const newValuation = latest.carValuationBySeller;

        if (oldValuation !== null && oldValuation !== newValuation) {
          toast.info(
            `💰 Seller updated car valuation from ${oldValuation} to ${newValuation}!`,
            { position: "top-right" }
          );
        } else if (oldValuation === null && newValuation) {
          // toast.success("💰 Seller has added car valuation!", {
          //   position: "top-right",
          // });
        }
        setOldValuation(newValuation);
        setVehicleInfo(latest);
        setSellerValuation(newValuation);
        setValuationToastShown(true);
      } catch (err) {
        console.error("Error fetching updated valuation:", err);
      }
    };

    fetchLatestContract();
  }, [messages, activeStep, contractId, oldValuation]);

  const handleDealConfirm = async () => {
    if (!contractId) {
      Swal.fire("Error", "Contract ID not found", "error");
      return;
    }

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
          text: "Your deal has been confirmed successfully",
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
    }
  };

  return (
    <>
      <BuyerHeader />

      <Container>
        <Paper sx={{ p: 1, mt: 1 }}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 1 }}>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 4 }}>
            {activeStep === 0 && (
              <Container maxWidth="md">
                {loading ? (
                  <Typography>{t("buyerauth.step0.loading")}</Typography>
                ) : error ? (
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      mb: 3,
                      textAlign: "center",
                      borderRadius: 3,
                      backgroundColor: "#ffe6e6",
                      color: "#d32f2f",
                    }}
                  >
                    <Typography variant="body1">{error}</Typography>
                  </Paper>
                ) : contractData ? (
                  <Paper
                    elevation={3}
                    sx={{ p: 4, textAlign: "center", borderRadius: 3 }}
                  >
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                      {t("buyerauth.step0.title")}
                    </Typography>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        border: "1px solid #e0e0e0",
                        textAlign: "left",
                        mt: 3,
                      }}
                    >
                      <Box
                        sx={{ mb: 2, textAlign: "center", fontSize: "60px" }}
                      >
                        {contractData?.vahicleTypeOptionName
                          ?.toLowerCase()
                          .includes("car") && <FaCar />}
                        {contractData?.vahicleTypeOptionName
                          ?.toLowerCase()
                          .includes("motorcycle") && <FaMotorcycle />}
                        {contractData?.vahicleTypeOptionName
                          ?.toLowerCase()
                          .includes("truck") && <FaTruck />}
                        {contractData?.vahicleTypeOptionName
                          ?.toLowerCase()
                          .includes("boat") && <FaShip />}
                        {contractData?.vahicleTypeOptionName
                          ?.toLowerCase()
                          .includes("camper") && <FaTrailer />}
                        {contractData?.vahicleTypeOptionName
                          ?.toLowerCase()
                          .includes("moped") && <MdElectricScooter />}
                      </Box>

                      <Grid container spacing={2}>
                        <Grid size={{ xs: 6, md: 6 }}>
                          <Typography fontWeight="bold">
                            {t("buyerauth.step0.vehicleType")}
                          </Typography>
                          <Typography>
                            {contractData.vahicleTypeOptionName ||
                              t("buyer.step0.na")}
                          </Typography>
                        </Grid>

                        <Grid size={{ xs: 6, md: 6 }}>
                          <Typography fontWeight="bold">
                            {t("buyerauth.step0.name")}
                          </Typography>
                          <Typography>
                            {contractData.carInfoVehicleDesignation ||
                              t("buyerauth.step0.na")}
                          </Typography>
                        </Grid>

                        <Grid size={{ xs: 6, md: 6 }}>
                          <Typography fontWeight="bold">
                            {t("buyerauth.step0.registrationNo")}
                          </Typography>
                          <Typography>
                            {contractData.carInfoRegistrationNo ||
                              t("buyerauth.step0.na")}
                          </Typography>
                        </Grid>

                        <Grid size={{ xs: 6, md: 6 }}>
                          <Typography fontWeight="bold">
                            {t("buyerauth.step0.firstInspectionDate")}
                          </Typography>
                          <Typography>
                            {contractData.carInfoInspectionDate
                              ? contractData.carInfoInspectionDate.split("T")[0]
                              : t("buyerauth.step0.na")}
                          </Typography>
                        </Grid>

                        <Grid size={{ xs: 6, md: 6 }}>
                          <Typography fontWeight="bold">
                            {t("buyerauth.step0.registrationDate")}
                          </Typography>
                          <Typography>
                            {contractData.carInfoRegistrationDate
                              ? contractData.carInfoRegistrationDate.split(
                                  "T"
                                )[0]
                              : t("buyerauth.step0.na")}
                          </Typography>
                        </Grid>

                        <Grid size={{ xs: 6, md: 6 }}>
                          <Typography fontWeight="bold">
                            {t("buyerauth.step0.contractId")}
                          </Typography>
                          <Typography>
                            {contractData.id || t("buyerauth.step0.na")}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>

                    {/* <Box sx={{ mt: 3 }}>
                      <Button
                        variant="contained"
                        disabled={submitting || updated || !isDealValid}  
                        onClick={handleBuyerSuccess}
                        sx={{
                          animation: !submitting && !updated ? "pulse 1.5s infinite" : "none",
                          "@keyframes pulse": {
                            "0%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(0,123,255,0.7)" },
                            "70%": { transform: "scale(1.15)", boxShadow: "0 0 0 10px rgba(0,123,255,0)" },
                            "100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(0,123,255,0)" },
                          },
                        }}
                      >
                        {submitting
                          ? t("buyerauth.step0.updating")
                          : updated
                            ? t("buyerauth.step0.connected")
                            : t("buyerauth.step0.connect")}
                      </Button>
                    </Box> */}
                    <Box sx={{ mt: 3, textAlign: "center" }}>
                      {!updated ? (
                        <Typography color="text.secondary">
                          Connecting with seller, please wait...
                        </Typography>
                      ) : (
                        <Typography
                          color="success.main"
                          fontWeight="bold"
                        ></Typography>
                      )}
                    </Box>

                    <Box
                      sx={{
                        mt: 4,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        disabled={!updated || !isDealValid}
                        onClick={() => setActiveStep(1)}
                      >
                        {t("buyerauth.step0.next")}
                      </Button>
                    </Box>
                  </Paper>
                ) : (
                  <Typography>{t("buyerauth.step0.noData")}</Typography>
                )}
              </Container>
            )}

            {activeStep === 1 && (
              <Container maxWidth="md">
                <Paper
                  elevation={3}
                  sx={{
                    p: 4,

                    textAlign: "center",
                  }}
                >
                  <Box sx={{ mb: 3, fontSize: "48px", color: "#00d4c4" }}>
                    {contractData?.vahicleTypeOptionName
                      ?.toLowerCase()
                      .includes("car") && <FaCar />}
                    {contractData?.vahicleTypeOptionName
                      ?.toLowerCase()
                      .includes("motorcycle") && <FaMotorcycle />}
                    {contractData?.vahicleTypeOptionName
                      ?.toLowerCase()
                      .includes("truck") && <FaTruck />}
                    {contractData?.vahicleTypeOptionName
                      ?.toLowerCase()
                      .includes("boat") && <FaShip />}
                    {contractData?.vahicleTypeOptionName
                      ?.toLowerCase()
                      .includes("camper") && <FaTrailer />}
                    {contractData?.vahicleTypeOptionName
                      ?.toLowerCase()
                      .includes("moped") && <MdElectricScooter />}
                  </Box>

                  <Typography variant="h6" gutterBottom>
                    {t("buyerauth.step1.title")}
                  </Typography>

                  {sellerValuation ? (
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      {t("buyerauth.step1.valuation", {
                        value: sellerValuation,
                      })}
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
                      {t("buyerauth.step1.waiting")}
                    </Typography>
                  )}

                  <Button
                    variant="contained"
                    sx={{ mt: 4 }}
                    color="success"
                    onClick={() => setActiveStep(2)}
                    disabled={!sellerValuation}
                  >
                    {t("buyerauth.step1.next")}
                  </Button>
                </Paper>
              </Container>
            )}

            {activeStep === 2 && (
              <Container maxWidth="md">
                <Paper elevation={3} sx={{ p: 4, margin: "40px auto" }}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
                  >
                    {t("buyerauth.step2.title")}
                  </Typography>

                  {!vehicleInfo ? (
                    <Typography>{t("buyerauth.step2.loading")}</Typography>
                  ) : (
                    <Box
                      sx={{
                        border: "1px solid #ccc",
                        boxShadow: 3,
                        borderRadius: 2,
                        p: 2,
                      }}
                    >
                      <DataRow
                        label="Registration No"
                        value={vehicleInfo.carInfoRegistrationNo}
                      />
                      <DataRow
                        label="Vehicle Designation"
                        value={vehicleInfo.carInfoVehicleDesignation}
                      />
                      <DataRow
                        label="Trade Name"
                        value={vehicleInfo.carInfoTradeName}
                      />
                      <DataRow
                        label="Vehicle Years"
                        value={vehicleInfo.carInfoVehicleYears}
                      />
                      <DataRow
                        label="Registration Date"
                        value={vehicleInfo.carInfoRegistrationDate}
                      />
                      <DataRow
                        label="Number of Users"
                        value={vehicleInfo.carInfoNumberOfUsers}
                      />
                      <DataRow
                        label="Waxelbarge"
                        value={vehicleInfo.carInfoWaxelbarge}
                      />
                      <DataRow
                        label="4-Wheel Drive"
                        value={vehicleInfo.carInfoFourWheelDrive ? "Yes" : "No"}
                      />
                      <DataRow label="Fuel" value={vehicleInfo.carInfoFuel} />
                      <DataRow
                        label="Inspection Date"
                        value={vehicleInfo.carInfoInspectionDate}
                      />
                      <DataRow
                        label="Previous Inspection Date"
                        value={vehicleInfo.carInfoPreviousInspectionDate}
                      />
                      <DataRow
                        label="Inspection Station"
                        value={vehicleInfo.carInfoInspectionStation}
                      />
                      <DataRow
                        label="Inspection Group"
                        value={vehicleInfo.carInfoInspectionGroup}
                      />
                      <DataRow
                        label="Feeding Stall"
                        value={vehicleInfo.carInfoFeedingStall}
                      />
                      <DataRow label="Tax" value={vehicleInfo.carInfoTax} />
                      <DataRow
                        label="Malus"
                        value={vehicleInfo.carInfoMalus || "-"}
                      />
                      <DataRow
                        label="Valuation"
                        value={
                          vehicleInfo.carValuationBySeller
                            ? vehicleInfo.carValuationBySeller
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                            : "-"
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
                      {t("buyerauth.step2.priceInfo")}
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "#f1efefff",
                        borderRadius: 1,
                        p: 1,
                        mt: 1,
                      }}
                    >
                      <Typography variant="body2">
                        {t("buyerauth.step2.priceDesc")}
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
                      {t("buyerauth.step2.deliveryInfo")}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {t("buyerauth.step2.deliveryDesc")}
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
                      <AirportShuttleIcon />
                      {t("buyerauth.step2.conditionInfo")}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {t("buyerauth.step2.conditionDesc1")}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {t("buyerauth.step2.conditionDesc2")}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 0.5 }}>
                      {t("buyerauth.step2.conditionDesc3")}
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
                      <DescriptionIcon />
                      {t("buyerauth.step2.ownership")}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {t("buyerauth.step2.ownershipDesc1")}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {t("buyerauth.step2.ownershipDesc2")}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {t("buyerauth.step2.ownershipDesc3")}
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
                      {t("buyerauth.step2.transportAgency")}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {t("buyerauth.step2.transportAgencyDesc1")}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {t("buyerauth.step2.transportAgencyDesc2")}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      mt: 4,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      size="large"
                      onClick={handleDealConfirm}
                    >
                      Deal Confirm
                    </Button>
                  </Box>
                </Paper>
              </Container>
            )}
          </Box>
        </Paper>
      </Container>
    </>
  );
}

const DataRow = ({ label, value }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
    <Typography sx={{ fontWeight: 500 }}>{label}</Typography>
    <Typography>{value ?? "-"}</Typography>
  </Box>
);

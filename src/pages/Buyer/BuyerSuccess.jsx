 
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
  Button,Paper, Stack 
} from "@mui/material";


export default function BuyerSuccess() {
  const context = useContext(AppSettings);

  const [contractData, setContractData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [updated, setUpdated] = useState(false);
const [sellerValuation, setSellerValuation] = useState(null);
  const steps = ["Connect Deal", "Valuation"];


 
  useEffect(() => {
    context.handleSetAppSidebarNone(true);
    context.handleSetAppHeaderNone(true);
    context.handleSetAppContentClass("p-0");

    const fetchContract = async () => {
      try {
        const res = await ApiCall({
          url: "https://localhost:44311/api/services/app/ContractMain/GetContractMainById?Id=2242",
          method: "GET",
        });

        const data = res?.result || res?.data?.result;
        setContractData(data);
      } catch (error) {
        console.error("❌ Error fetching contract:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContract();

    return () => {
      context.handleSetAppSidebarNone(false);
      context.handleSetAppHeaderNone(false);
      context.handleSetAppContentClass("");
    };
  }, [context]);

 

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
        vahicleTypeOptionVahicleTypeName: contractData.vahicleTypeOptionVahicleTypeName,
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
// 👇 BUYER UPDATE FIELDS
        // 👇 BUYER UPDATE FIELDS
        buyerUserId: contractData.buyerUserId, // Or user id if needed
        buyerDealStatus: contractData.buyerDealStatus,
        buyerDealConnected: true, // UPDATE THIS
        buyerDealConfirmed: contractData.buyerDealConfirmed,

        lastModificationTime: contractData.lastModificationTime,
        lastModifierUserId: contractData.lastModifierUserId,
        creationTime: contractData.creationTime,
        creatorUserId: contractData.creatorUserId,
        id: contractData.id
      };


      console.log("📌 PAYLOAD SENT TO UPDATE:", payload);

      const contractUpdateRes = await ApiCall({
        url: "https://localhost:44311/api/services/app/ContractMain/Update",
        method: "PUT",
        data: payload,
      });

      console.log("✅ UPDATE RESPONSE:", contractUpdateRes);

      // Check if ABP returned success or error
      if (contractUpdateRes?.success === false || contractUpdateRes?.error) {
        const errorMsg =
          contractUpdateRes?.error?.details ||
          contractUpdateRes?.error?.message ||
          "Something went wrong while updating contract!";
        Swal.fire("❌ Error", errorMsg, "error");
      } else {
        setUpdated(true);
        Swal.fire("✅ Success", "Buyer deal marked connected!", "success");
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
  if (activeStep === 1 && contractData?.id) {
    let interval;

    const checkValuation = async () => {
      try {
        const res = await ApiCall({
          url: `https://localhost:44311/api/services/app/ContractMain/GetContractMainById?Id=${contractData.id}`,
          method: "GET",
        });

        const latestData = res?.result || res?.data?.result;
        setContractData(latestData); // update main contract state
        const valuation = latestData.carValuationBySeller;

        if (!valuation || valuation === 0) {
          Swal.fire({
            icon: "warning",
            title: "Wait!",
            text: "Seller has not added car valuation yet.",
            confirmButtonText: "OK",
          });
          setSellerValuation(null);
        } else {
          Swal.fire({
            icon: "info",
            title: "Car Valuation",
            text: `Car Valuation by Seller: ${valuation}`,
            confirmButtonText: "OK",
          });
          setSellerValuation(valuation);
        }
      } catch (err) {
        console.error("Error fetching latest contract:", err);
      }
    };

    checkValuation();  

    interval = setInterval(checkValuation, 60000);  

    return () => clearInterval(interval);  
  }
}, [activeStep, contractData?.id]);



return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {activeStep === 0 && (
          <>
  {loading ? (
    <Typography>Loading contract...</Typography>
  ) : contractData ? (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        // maxWidth: 500,
        margin: "40px auto",
        textAlign: "center",
      }}
    >
     
        <Typography variant="h6" >Contract ID: {contractData.id}</Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleBuyerSuccess}
          disabled={submitting || updated}
        >
          {submitting
            ? "Updating..."
            : updated
            ? "Updated!"
            : "Connect Buyer Deal"}
        </Button>

      <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
  <Button
    variant="contained"
    color="success"
    onClick={() => setActiveStep(1)}
   disabled={!updated}
    size="small"
  >
    Next
  </Button>
</Box>

       
    </Paper>
  ) : (
    <Typography>No contract data found</Typography>
  )}
</>

        )}

   {activeStep === 1 && (
  <Paper
    elevation={3}
    sx={{
      p: 4,
      margin: "40px auto",
      maxWidth: 500,
      textAlign: "center",
    }}
  >
    <Typography variant="h6" gutterBottom>
      Buyer deal successfully connected! ✅
    </Typography>

    {sellerValuation ? (
      <Typography variant="body1" sx={{ mt: 2 }}>
        Car Valuation by Seller: {sellerValuation}
      </Typography>
    ) : (
      <Typography variant="body1" sx={{ mt: 2, color: "warning.main" }}>
        Waiting for seller to add valuation...
      </Typography>
    )}

    <Button
      variant="contained"
      sx={{ mt: 4 }}
      onClick={() => console.log("Next step or finish")}
    >
      Next
    </Button>
  </Paper>
)}
      </Box>
    </Box>
  );
}
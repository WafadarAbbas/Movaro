
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
  Button, Paper, Container, Grid
} from "@mui/material";
import { FaCar, FaMotorcycle, FaShip, FaTrailer, FaTruck, } from "react-icons/fa";
import { MdElectricScooter } from "react-icons/md";
import { FaMoneyBillWave } from "react-icons/fa";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function BuyerSuccess() {
  const context = useContext(AppSettings);

  const [contractData, setContractData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [updated, setUpdated] = useState(false);
  const [sellerValuation, setSellerValuation] = useState(null);
  const [valuationToastShown, setValuationToastShown] = useState(false);
  const [vehicleInfo, setVehicleInfo] = useState(null);
  const [contracId, setContractId] = useState(null);
  const [oldValuation, setOldValuation] = useState(null);
  const steps = ["Connect Deal", "Valuation", "Contract"];



  useEffect(() => {
    context.handleSetAppSidebarNone(true);
    context.handleSetAppHeaderNone(true);
    context.handleSetAppContentClass("p-0");

    const fetchContract = async () => {
      try {
        const res = await ApiCall({
          url: "https://localhost:44311/api/services/app/ContractMain/GetContractMainById?Id=2272",
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
        buyerUserId: contractData.buyerUserId,
        buyerDealStatus: contractData.buyerDealStatus,
        buyerDealConnected: true,
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




  // useEffect(() => {
  //   if (activeStep === 1 && contractData?.id) {
  //     let interval;

  //     const checkValuation = async () => {
  //       try {
  //         const res = await ApiCall({
  //           url: `https://localhost:44311/api/services/app/ContractMain/GetContractMainById?Id=${contractData.id}`,
  //           method: "GET",
  //         });

  //         const latestData = res?.result || res?.data?.result;
  //         setContractData(latestData);
  //         setContractId(latestData.id);

  //         const valuation = latestData.carValuationBySeller;

  //         if (!valuation || valuation === 0) {
  //           // Swal.fire({
  //           //   icon: "warning",
  //           //   title: "Wait!",
  //           //   text: "Seller has not added car valuation yet.",
  //           //   confirmButtonText: "OK",
  //           // });
  //           setSellerValuation(null);
  //         } else {
  //           setSellerValuation(valuation);


  //           if (!valuationToastShown) {
  //             toast.success("💰 Seller has added car valuation!", {
  //               position: "top-right",
  //             });
  //             setValuationToastShown(true);
  //           }
  //         }
  //       } catch (err) {
  //         console.error("Error fetching latest contract:", err);
  //       }
  //     };

  //     checkValuation();
  //     interval = setInterval(checkValuation, 10000);

  //     return () => clearInterval(interval);
  //   }
  // }, [activeStep, contractData?.id, valuationToastShown]);

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
        setContractData(latestData);
        setContractId(latestData.id);

        const valuation = latestData.carValuationBySeller;

        // ---- IF VALUATION NOT YET ADDED ----
        if (!valuation || valuation === 0) {
          setSellerValuation(null);
        }

        // ---- IF VALUATION IS FINALLY ADDED ----
        else {
          setSellerValuation(valuation);

          // Show toast only once
          if (!valuationToastShown) {
            toast.success("💰 Seller has added car valuation!", {
              position: "top-right",
            });
            setValuationToastShown(true);
          }

          // 🔥 STOP API CALLS WHEN VALUATION ARRIVES
          if (interval) clearInterval(interval);
        }
      } catch (err) {
        console.error("Error fetching latest contract:", err);
      }
    };

    // First call
    checkValuation();

    // Start polling
    interval = setInterval(checkValuation, 10000);

    return () => clearInterval(interval);
  }
}, [activeStep, contractData?.id, valuationToastShown]);



useEffect(() => {
  if (activeStep !== 2 || !contracId) return;

  const fetchVehicleInfo = async () => {
    try {
      const res = await ApiCall({
        url: `https://localhost:44311/api/services/app/ContractMain/GetContractMainById?Id=${contracId}`,
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

      
      setVehicleInfo(latest);

    } catch (err) {
      console.error("Error fetching vehicle info:", err);
    }
  };

   
  fetchVehicleInfo();

 
  const intervalId = setInterval(fetchVehicleInfo, 30000);

  return () => clearInterval(intervalId);

}, [activeStep, contracId, oldValuation]);





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
          <Container maxWidth="md">
            {loading ? (
              <Typography>Loading contract...</Typography>
            ) : contractData ? (
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 3,
                }}
              >

                <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                  Connect with Seller
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

                  <Box sx={{ mb: 2, textAlign: "center", fontSize: "60px" }}>
                    {contractData?.vahicleTypeOptionName?.toLowerCase().includes("car") && (
                      <FaCar />
                    )}
                    {contractData?.vahicleTypeOptionName?.toLowerCase().includes("motorcycle") && (
                      <FaMotorcycle />
                    )}
                    {contractData?.vahicleTypeOptionName?.toLowerCase().includes("truck") && (
                      <FaTruck />
                    )}
                    {contractData?.vahicleTypeOptionName?.toLowerCase().includes("boat") && (
                      <FaShip />
                    )}
                    {contractData?.vahicleTypeOptionName?.toLowerCase().includes("camper") && (
                      <FaTrailer />
                    )}
                    {contractData?.vahicleTypeOptionName?.toLowerCase().includes("moped") && (
                      <MdElectricScooter />
                    )}
                  </Box>


                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Vehicle Type
                      </Typography>
                      <Typography variant="body2">
                        {contractData.vahicleTypeOptionName || "N/A"}
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Name
                      </Typography>
                      <Typography variant="body2">
                        {contractData.carInfoVehicleDesignation || "N/A"}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Registration No
                      </Typography>
                      <Typography variant="body2">
                        {contractData.carInfoRegistrationNo || "N/A"}
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        First Inspection Date
                      </Typography>
                      <Typography variant="body2">
                        {contractData.carInfoInspectionDate
                          ? contractData.carInfoInspectionDate.split("T")[0]
                          : "N/A"}
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Registration Date
                      </Typography>
                      <Typography variant="body2">
                        {contractData.carInfoRegistrationDate
                          ? contractData.carInfoRegistrationDate.split("T")[0]
                          : "N/A"}
                      </Typography>
                    </Grid>

                    <Grid size={{ xs: 6 }}>
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        Contract ID
                      </Typography>
                      <Typography variant="body2">
                        {contractData.id || "N/A"}
                      </Typography>
                    </Grid>


                  </Grid>
                </Paper>


                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBuyerSuccess}
                    disabled={submitting || updated}
                    sx={{
                      animation: !submitting && !updated ? 'pulse 1.5s infinite' : 'none',
                      '@keyframes pulse': {
                        '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(0,123,255, 0.7)' },
                        '70%': { transform: 'scale(1.15)', boxShadow: '0 0 0 10px rgba(0,123,255, 0)' },
                        '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(0,123,255, 0)' },
                      },
                    }}
                  >
                    {submitting
                      ? "Updating..."
                      : updated
                        ? "Connected!"
                        : "Connect with Seller"}
                  </Button>
                </Box>



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
            {/* Vehicle Icon (Same logic as step 0) */}
            <Box sx={{ mb: 3, fontSize: "48px", color: "#00d4c4" }}>
              {contractData?.vahicleTypeOptionName?.toLowerCase().includes("car") && (
                <FaCar />
              )}
              {contractData?.vahicleTypeOptionName?.toLowerCase().includes("motorcycle") && (
                <FaMotorcycle />
              )}
              {contractData?.vahicleTypeOptionName?.toLowerCase().includes("truck") && (
                <FaTruck />
              )}
              {contractData?.vahicleTypeOptionName?.toLowerCase().includes("boat") && (
                <FaShip />
              )}
              {contractData?.vahicleTypeOptionName?.toLowerCase().includes("camper") && (
                <FaTrailer />
              )}
              {contractData?.vahicleTypeOptionName?.toLowerCase().includes("moped") && (
                <MdElectricScooter />
              )}
            </Box>


            <Typography variant="h6" gutterBottom>
              Buyer deal successfully connected! ✅
            </Typography>

            {sellerValuation ? (
              <Typography variant="body1" sx={{ mt: 2 }}>
                Car Valuation by Seller: {sellerValuation}
              </Typography>
            ) : (
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  color: "red",           
                  fontWeight: "bold",
                  animation: "pulse 2.5s infinite", // 🔥 Animation apply

                  "@keyframes pulse": {
                    "0%": {
                      transform: "scale(0.9)",
                      boxShadow: "0 0 0 0 rgba(255, 0, 0, 0.7)",   // red glow
                    },
                    "70%": {
                      transform: "scale(1.05)",
                      boxShadow: "0 0 0 10px rgba(255, 0, 0, 0)",  // red fade out
                    },
                    "100%": {
                      transform: "scale(0.9)",
                      boxShadow: "0 0 0 0 rgba(255, 0, 0, 0)",
                    },
                  },
                }}
              >
                Waiting for seller to add valuation...
              </Typography>

            )}


            <Button
              variant="contained"
              sx={{ mt: 4 }}
              onClick={() => setActiveStep(2)}
              disabled={!sellerValuation}
            >
              Next
            </Button>
          </Paper>
             </Container>
        )}


        {activeStep === 2 && (

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
                Vehicle Information
              </Typography>


              {!vehicleInfo ? (
                <Typography>Loading vehicle information...</Typography>
              ) : (
                <Box sx={{
                  border: '1px solid #ccc',
                  boxShadow: 3,
                  borderRadius: 2,
                  p: 2
                }}>
                  <DataRow label="Registration No" value={vehicleInfo.carInfoRegistrationNo} />
                  <DataRow label="Vehicle Designation" value={vehicleInfo.carInfoVehicleDesignation} />
                  <DataRow label="Trade Name" value={vehicleInfo.carInfoTradeName} />

                  <DataRow label="Vehicle Years" value={vehicleInfo.carInfoVehicleYears} />
                  <DataRow label="Registration Date" value={vehicleInfo.carInfoRegistrationDate} />
                  <DataRow label="Number of Users" value={vehicleInfo.carInfoNumberOfUsers} />
                  <DataRow label="Waxelbarge" value={vehicleInfo.carInfoWaxelbarge} />
                  <DataRow label="4-Wheel Drive" value={vehicleInfo.carInfoFourWheelDrive ? "Yes" : "No"} />
                  <DataRow label="Fuel" value={vehicleInfo.carInfoFuel} />
                  <DataRow label="Inspection Date" value={vehicleInfo.carInfoInspectionDate} />
                  <DataRow label="Previous Inspection Date" value={vehicleInfo.carInfoPreviousInspectionDate} />
                  <DataRow label="Inspection Station" value={vehicleInfo.carInfoInspectionStation} />
                  <DataRow label="Inspection Group" value={vehicleInfo.carInfoInspectionGroup} />
                  <DataRow label="Feeding Stall" value={vehicleInfo.carInfoFeedingStall} />
                  <DataRow label="Tax" value={vehicleInfo.carInfoTax} />
                  <DataRow label="Malus" value={vehicleInfo.carInfoMalus || "-"} />
                   <DataRow label="Valuation" value={vehicleInfo.carValuationBySeller || "-"} />
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
                  Price and Payment
                </Typography>
                {/* <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
                  {sellerValuation}
                </Typography> */}
                <Box
                  sx={{
                    backgroundColor: '#f1efefff',
                    borderRadius: 10,
                    p: 1,
                    mt: 1
                  }}
                >
                  <Typography variant="body3" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <ReportGmailerrorredIcon sx={{ fontSize: 16 }} />
                    Delivery will only take place when full payment is confirmed in the app.
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
                  Delivery and risk
                </Typography>
                <Box
                  sx={{
                    backgroundColor: '#f1efefff',
                    borderRadius: 3,
                    p: 2,
                    mt: 1
                  }}
                >
                  <Typography variant="body3" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <ReportGmailerrorredIcon sx={{ fontSize: 16 }} />
                    The risk passes to the buyer when the vehicle is taken into possession.
                    <br />
                    This means that the buyer is responsible for the vehicle from the time of handover.
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
                  Condition and defects
                </Typography>

                <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
                  The vehicle is sold in its existing condition.
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                  Defects can also be claimed in its existing condition if the seller has provided incorrect information, omitted essential information, or if the vehicle is significantly worse than could reasonably be expected.
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, color: 'text.secondary' }}>
                  Meddela fel utan onödigt dröjsmål och senast inom två år från leverans.
                </Typography>
              </Box>

              <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => setActiveStep(3)}
                >
                  Next
                </Button>
              </Box>
            </Paper>
          </Container>

        )}



      </Box>
    </Box>
  );
}


const DataRow = ({ label, value }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
    <Typography sx={{ fontWeight: 500 }}>{label}</Typography>
    <Typography>{value ?? "-"}</Typography>
  </Box>
);
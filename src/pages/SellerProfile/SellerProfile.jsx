import React, { useRef, useState, useEffect, useContext } from "react";
import { Formik, Form, Field } from "formik";
import { AppSettings } from "./../../config/app-settings.js";
import * as Yup from "yup";
import { FormControlLabel } from "@mui/material"
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { FaCar, FaMotorcycle, FaShip, FaTrailer, FaTruck, } from "react-icons/fa";
import { MdElectricScooter } from "react-icons/md";
import { Search as SearchIcon } from "@mui/icons-material";
import { FaEdit } from "react-icons/fa";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import CircularProgress from "@mui/material/CircularProgress";
import "../../Compo/LoadingText.css";
import { Stepper, Step, StepLabel, Button, Box, Typography, TextField, Paper, Divider, Grid, Container, RadioGroup, Radio } from "@mui/material";
import { motion } from "framer-motion";
import ApiCall from "../../Apicall/ApiCall";
import QRCode from "react-qr-code";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpadteValuation from "./updatevaluation";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DescriptionIcon from "@mui/icons-material/Description";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import FormGroup from '@mui/material/FormGroup';


const steps = ["Choose Vehicles", "Vehicle", "Sale Created", "Submission", "Contract"];


function SellerProfile() {
  const createRef = useRef(null);
  const refClose = useRef(null);
  const { t, i18n } = useTranslation();

  // -------------------Maneging States-------------------------------
  const [value, setValue] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [vehicleData, setVehicleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [registration, setRegistration] = useState("");
  const [carData, setCarData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [storedId, setStoredId] = useState(null);
  const [contractData, setContractData] = useState(null);
  const [fetchedCarInfo, setFetchedCarInfo] = useState(null);
  const [updatedCarInfoId, setUpdatedCarInfoId] = useState(null);
  const [lastId, setLastId] = useState(null);
  const [fetchedContractInfo, setFetchedContractInfo] = useState(null);
  const [valuationSubmitted, setValuationSubmitted] = useState(false);
  const [finalContract, setFinalContract] = useState(null);
  const [finalContractvaluation, setfinalContractvaluation] = useState(null);
  const [contractId, setcontractId] = useState(null);
  const [carId, setcarId] = useState(null);
  const [QR, setQR] = useState("");
  const [buyerConnected, setBuyerConnected] = useState(false);
  const [buyerToastShown, setBuyerToastShown] = useState(false);
  const context = useContext(AppSettings);
  // ------------------- Getting Current Seller ID from Local Storage -------------------------------
  useEffect(() => {
    const id = localStorage.getItem("currentContractID");
    if (id) {
      setStoredId(parseInt(id));
    }
  }, []);

  // useEffect(() => {
  //   if (carData) {
  //     toast.success("Retrieved vehicle information", {
  //       position: "bottom-right",
  //     });
  //   }
  // }, [carData]);

  useEffect(() => {
    if (activeStep === 3) {
      const fetchAndEncryptData = async () => {
        // if (!contractData || !carData) {
        //   Swal.fire("⚠️ Warning", "Missing contract or car data!", "warning");
        //   return;
        // }

        try {
          const response = await ApiCall({
            url: `https://localhost:44311/api/services/app/ContractMain/GetContractMainById?Id=${contractData.id}`,
            method: "GET",
          });

          const contractData3 = response.result || response.data?.result;

          if (!contractData3) {
            Swal.fire("❌ Error", "Failed to fetch latest contract data!", "error");
            return;
          }

          console.log("📦 Full Contract Data:", contractData3);


          const currentTime = new Date().toISOString();
          const minimalData = {
            id: contractData3.id,
            sellerUserId: contractData3.sellerUserId,
            time: currentTime,
          };

          console.log("Data to Encrypt:", minimalData);


          const secretKey = "MySuperSecretKey123";
          const encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(minimalData),
            secretKey
          ).toString();

          console.log(encrypted);

          const qrUrl = `http://localhost:3000/Buyer/${encodeURIComponent(encrypted)}`;

          setQR(qrUrl);

          console.log("🔒 Encrypted URL:", qrUrl);
        } catch (error) {
          console.error("❌ Error fetching contract data:", error);
          Swal.fire(
            "❌ Error",
            error.response?.data?.error?.message || "Unexpected server error.",
            "error"
          );
        }
      };

      fetchAndEncryptData();
    }
  }, [activeStep]);

  // -------------------Validation Schemas-------------------------------


  const validationSchemas = [

    Yup.object({
      vahicleTypeOptionId: Yup.number()
        .nullable()
        .required("Please select a vehicle type"),
    }),

  ];

  // ------------------- Api Calls-------------------------------
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
    const fetchContract = async () => {
      if (!storedId) return;

      try {
        const response = await ApiCall({
          url: `https://localhost:44311/api/services/app/ContractMain/GetContractMainById?Id=${storedId}`,
          method: "GET",
        });


        const data = response.data?.result;
        setContractData(data);

      } catch (error) {
        console.error("❌ Error fetching ContractMain data:", error);
      }
    };

    fetchContract();
  }, [storedId]);



  // const handleSearch = async () => {
  //   if (!registration) return;

  //   setLoading(true);
  //   setError("");
  //   setCarData(null);

  //   try {
  //     const response = await ApiCall({
  //       url: `https://localhost:44311/api/services/app/CarInfo/GetVehicleInfo?Id=${registration}`,
  //       method: "GET",
  //     });

  //     if (response.data?.result && response.data.result.length > 0) {
  //       const raw = response.data.result[0];
  //       setCarData(raw);

  //       const finalData = convertCarData(raw);

  //     } else if (response?.error) {

  //       const backendError =
  //         response.error.details ||
  //         response.error.message ||
  //         "⚠️ Internal server error occurred.";

  //       setError(backendError);

  //     }
  //     else {
  //       setError("❌ Car not found, please check the registration number.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching car info:", error);
  //     setError("⚠️ Something went wrong while fetching car info.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSearch = async () => {
    if (!registration) return;

    setLoading(true);
    setError("");
    setCarData(null);

    try {

      const searchRes = await ApiCall({
        url: `https://localhost:44311/api/services/app/CarInfo/GetVehicleInfo?Id=${registration}`,
        method: "GET",
      });

      if (!searchRes?.data?.result?.length) {
        setError("❌ Car not found, please check the registration number.");
        return;
      }

      const rawCar = searchRes.data.result[0];
      setCarData(rawCar);

      const carCreateRes = await ApiCall({
        url: "https://localhost:44311/api/services/app/CarInfo/Create",
        method: "POST",
        data: convertCarData(rawCar),
      });


      if (carCreateRes?.success === false) {
        throw new Error(
          carCreateRes?.error?.details ||
          carCreateRes?.error?.message ||
          "Car creation failed."
        );
      }

      const newCar = carCreateRes?.result || carCreateRes?.data?.result;

      if (!newCar?.id) {
        throw new Error("Car created but ID not received.");
      }

      // 3️⃣ GET CONTRACT
      const contractRes = await ApiCall({
        url: `https://localhost:44311/api/services/app/ContractMain/GetContractMainById?Id=${contractData.id}`,
        method: "GET",
      });

      const latestContract = contractRes?.result || contractRes?.data?.result;

      if (!latestContract) {
        throw new Error("Failed to fetch contract data.");
      }

      // 4️⃣ UPDATE CONTRACT
      const contractPayload = {
        ...latestContract,
        carInfoId: newCar.id,
        carInfoVehicleDesignation: newCar.vehicleDesignation,
        carInfoTradeName: newCar.tradeName,
        carInfoYearModel: newCar.yearModel,
        carInfoVehicleYears: newCar.vehicleYears,
        carInfoRegistrationDate: newCar.registrationDate,
        carInfoNumberOfUsers: newCar.numberOfUsers,
        carInfoWaxelbarge: newCar.waxelbarge,
        carInfoFourWheelDrive: newCar.fourWheelDrive?.toString() || "False",
        carInfoFuel: newCar.fuel,
        carInfoElectricVehicleConfiguration: newCar.electricVehicleConfiguration,
        carInfoInspectionDate: newCar.inspectionDate,
        carInfoInspectionDateEMPTY: newCar.inspectionDateEMPTY,
        carInfoDispensationInspectionGroup: newCar.dispensationInspectionGroup,
        carInfoInspectionGroup: newCar.inspectionGroup,
        carInfoFeedingStall: newCar.feedingStall,
        carInfoInspectionStation: newCar.inspectionStation,
        carInfoInspectionProgramCode: newCar.inspectionProgramCode,
        carInfoPreviousInspectionDate: newCar.previousInspectionDate,
        carInfoPreviousInspectionProgramCode: newCar.previousInspectionProgramCode,
        carInfoTax: newCar.tax,
        carInfoMalus: newCar.malus,
        carValuationBySeller: 0,
        vahicleTypeOptionVahicleTypeName: latestContract.vahicleTypeOptionName || "",
        vahicleTypeOptionId: latestContract.vahicleTypeOptionId,
        sellerDealComplete: false,
        sellerDrivingLicensePath: "",
      };

      const updateRes = await ApiCall({
        url: "https://localhost:44311/api/services/app/ContractMain/Update",
        method: "PUT",
        data: contractPayload,
      });

      if (updateRes?.success === false) {
        throw new Error(
          updateRes?.error?.details ||
          updateRes?.error?.message ||
          "Contract update failed."
        );
      }

      // 5️⃣ DONE
      // Swal.fire("✅ Success", "Car linked with contract successfully!", "success");
      toast.success("Retrieved vehicle information", {
        position: "bottom-right",
      });
      setActiveStep(3);

    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", err.message || "Unexpected error occurred", "error");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const fetchCarInfo = async () => {
      if (activeStep === 4 && updatedCarInfoId) {
        try {
          const response = await ApiCall({
            url: `https://localhost:44311/api/services/app/CarInfo/GetCarInfoById?Id=${updatedCarInfoId}`,
            method: "GET",
          });

          const carData = response?.result || response?.data?.result;

          if (carData) {
            setFetchedCarInfo(carData);
          } else {
            Swal.fire("⚠️ Warning", "No car data found!", "warning");
          }
        } catch (error) {
          console.error("❌ Error fetching car info:", error);

        }
      }
    };

    fetchCarInfo();
  }, [activeStep, updatedCarInfoId]);


  useEffect(() => {
    const fetchContractInfo = async () => {
      if (activeStep === 4 && lastId) {
        try {
          const response = await ApiCall({
            url: `https://localhost:44311/api/services/app/ContractMain/GetContractMainById?Id=${lastId}`,
            method: "GET",
          });
          const contractData = response?.result || response?.data?.result;

          if (contractData) {
            setFetchedContractInfo(contractData);
          } else {
            Swal.fire("⚠️ Warning", "No contract data found!", "warning");
          }
        } catch (error) {
          console.error("❌ Error fetching contract info:", error);
        }
      }
    };

    fetchContractInfo();
  }, [activeStep, lastId]);

  const numberToWords = (num) => {
    if (!num) return "";
    const words = require("number-to-words");
    return words.toWords(num).replace(/\b\w/g, (char) => char.toUpperCase());
  };


  useEffect(() => {
    if (activeStep !== 3 || !contractData?.id) return;

    let interval;

    const fetchBuyerStatus = async () => {
      try {
        const res = await ApiCall({
          url: `https://localhost:44311/api/services/app/ContractMain/GetContractMainById?Id=${contractData.id}`,
          method: "GET",
        });

        const latest = res?.result || res?.data?.result;
        const isConnected = latest?.buyerDealConnected ?? false;

        setBuyerConnected(isConnected);


        if (isConnected && !buyerToastShown) {
          toast.success("🎉 Buyer connected to deal!", {
            position: "top-right",
          });
          setBuyerToastShown(true);
        }


        if (isConnected && interval) {
          clearInterval(interval);
        }

      } catch (err) {
        console.error("Error fetching buyerDealConnected:", err);
      }
    };

    fetchBuyerStatus();
    interval = setInterval(fetchBuyerStatus, 20000);

    return () => clearInterval(interval);
  }, [activeStep, contractData?.id, buyerToastShown]);


  const convertCarData = (carData) => {
    return {
      registrationNo: carData?.registreringsnummer || "",
      vehicleDesignation: carData?.fordonsuppgifter?.fordonsbenamning || "",
      tradeName: carData?.fordonsuppgifter?.handelsbeteckning || "",
      yearModel: carData?.fordonsuppgifter?.arsmodell || "",
      vehicleYears: carData?.fordonsuppgifter?.fordonsar?.toString() || "",
      registrationDate: carData?.fordonsuppgifter?.registreringsdatum || null,
      numberOfUsers: carData?.fordonBrukareAgare?.antalBrukare?.toString() || "",
      waxelbarge: carData?.tekniskData?.vaxellada || "",
      fourWheelDrive: carData?.tekniskData?.fyrhjulsdrift || false,
      fuel: carData?.tekniskData?.drivmedel?.map(x => x.drivmedel).join(", ") || "",
      electricVehicleConfiguration: carData?.miljoklassning?.elfordonKonfiguration || "",
      inspectionDate: carData?.besiktning?.besiktningsdatum || null,
      inspectionDateEMPTY: carData?.besiktning?.besiktningsdatumTOM || null,
      dispensationInspectionGroup: carData?.besiktning?.dispensbesiktningsgrupp || "",
      inspectionGroup: carData?.besiktning?.besiktningsgrupp || "",
      feedingStall: carData?.besiktning?.matarstallning?.toString() || "",
      inspectionStation: carData?.besiktning?.besiktningsstation || "",
      inspectionProgramCode: carData?.besiktning?.besiktningsprogramkod?.toString() || "",
      previousInspectionDate: carData?.besiktning?.foregaendeBesiktningsdatum || null,
      previousInspectionProgramCode: carData?.besiktning?.foregaendeBesiktningsprogramkod?.toString() || "",
      tax: carData?.beraknat?.skatt?.skatt?.toString() || "",
      malus: carData?.beraknat?.skatt?.malus?.toString() || "",
    };
  };


  const [refreshFinalContract, setRefreshFinalContract] = useState(false);
  useEffect(() => {
    const fetchFinalContract = async () => {
      if (activeStep === 5 && lastId) {
        try {
          const response = await ApiCall({
            url: `https://localhost:44311/api/services/app/ContractMain/GetContractMainById?Id=${lastId}`,
            method: "GET",
          });

          const finalData = response?.result || response?.data?.result;

          if (finalData) {
            setFinalContract(finalData);
            setfinalContractvaluation(finalData.carValuationBySeller || null)
            setcontractId(finalData.id || null)
            setcarId(finalData.carInfoId || null)
          } else {
            Swal.fire("⚠️ Warning", "Final contract data not found!", "warning");
          }
        } catch (error) {
          console.error("❌ Error fetching final contract info:", error);
        }
      }
    };

    fetchFinalContract();
  }, [activeStep, lastId, refreshFinalContract]);

  const InfoRow = ({ icon, label, value }) => (
    <Box display="flex" alignItems="center" gap={1.5} mb={1.5}>


      <Box
        sx={{
          backgroundColor: "#fdf6f0ff",
          p: 1,
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 36,
          minHeight: 36
        }}
      >
        {icon}
      </Box>


      <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
        <Typography fontSize="12px" color="gray">
          {label}
        </Typography>
        <Typography fontSize="14px" fontWeight="bold">
          {value || "N/A"}
        </Typography>
      </Box>

    </Box>
  );

  return (
    <Container maxWidth="md">
      <Paper
        elevation={4}
        sx={{
          margin: "10px auto",
          p: 2,
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
              "@media (max-width: 600px)": { fontSize: "0.60rem" },
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

        {activeStep < 1 && (
          <Formik
            initialValues={{
              vahicleTypeOptionId: null,
              vahicleTypeOptionName: "",
              vahicleTypeOptionVahicleTypeName: ""
            }}

            validationSchema={validationSchemas[activeStep]}


            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                setLoading(true);
                setSubmitting(true);


                const storedIdFromLocal = parseInt(localStorage.getItem("currentContractID"), 10);


                if (!storedIdFromLocal || storedIdFromLocal !== storedId) {
                  Swal.fire("❌ Error", "Contract ID mismatch. Cannot update contract.", "error");
                  return;
                }


                const finalValues = {
                  ...values,
                  sellerUserId: userId,
                  creatorUserId: userId,
                  id: storedId,
                  sellerDealStatus: contractData.sellerDealStatus,
                  sellerDealActive: contractData.sellerDealActive,
                  sellerDealComplete: contractData.sellerDealComplete,
                  carInfoId: contractData.carInfoId,
                  creationTime: new Date().toISOString(),
                  lastModificationTime: new Date().toISOString(),
                  buyerDealStatus: "",
                  sellerDrivingLicensePath: "",
                  sellerDrivingLicenseValidate: true,
                  lastModifierUserId: 0
                };



                const response = await ApiCall({
                  url: "https://localhost:44311/api/services/app/ContractMain/Update",
                  method: "PUT",
                  data: finalValues,
                });

                if (response?.data?.success) {
                  resetForm();
                  setSubmitted(true);
                  setActiveStep(2);
                } else {
                  Swal.fire("❌ Error", response?.data?.error?.message || "Submission failed.", "error");
                }

              } catch (err) {
                Swal.fire("❌ Error", err.message || "Submission failed.", "error");
              } finally {
                setLoading(false);
                setSubmitting(false);
              }
            }}

          >
            {({ submitForm, setFieldValue }) => (
              <Form>

                <Container maxWidth="md">
                  <Typography variant="h6" align="center" fontWeight="bold" mb={2} mt={1}>
                    {t("seller.headerTitle")}
                  </Typography>
                  <Typography variant="subtitle1" align="center" color="text.secondary" mb={1}>
                    {t("seller.headerSubtitle")}
                  </Typography>

                  <Container maxWidth="sm"  >

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
                        {t("seller.noVehicleTypes")}
                      </Typography>
                    ) : (
                      <Grid container spacing={3} mb={3}>
                        {vehicleData.map((veh) => (
                          <Grid size={{ xs: 6, sm: 6, md: 4 }} key={veh.id}>
                            <Paper
                              elevation={3}
                              onClick={() => {
                                setFieldValue("vahicleTypeOptionId", veh.id);
                                setFieldValue("vahicleTypeOptionName", veh.vahicleTypeName);
                                setFieldValue("vahicleTypeOptionVahicleTypeName", veh.vahicleTypeName);

                                setTimeout(() => {
                                  submitForm();
                                }, 0);
                              }}

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

              </Form>
            )}
          </Formik>
        )}




        {/* ------------------ FORM 2 ------------------ */}
        {/* {activeStep === 2 && (
          <Formik
            initialValues={{

            }}
            enableReinitialize



            onSubmit={async (values, { setSubmitting }) => {
              if (!carData) {
                Swal.fire("Error", "Please search for the car first!", "error");
                return;
              }

              setError("");
              setSubmitting(true);

              try {
                const carCreateRes = await ApiCall({
                  url: "https://localhost:44311/api/services/app/CarInfo/Create",
                  method: "POST",
                  data: convertCarData(carData),
                });


                if (carCreateRes?.success === false) {
                  const backendError =
                    carCreateRes?.error?.details ||
                    carCreateRes?.error?.message ||
                    "Car creation failed.";

                  Swal.fire("❌ Error", backendError, "error");
                  setSubmitting(false);
                  return;
                }


                const newCarData = carCreateRes?.result || carCreateRes?.data?.result;


                if (!newCarData?.id) {
                  console.warn("Car created but ID not received. Skipping alert.");
                  setSubmitting(false);
                  return;
                }


                const contractRes = await ApiCall({
                  url: `https://localhost:44311/api/services/app/ContractMain/GetContractMainById?Id=${contractData.id}`,
                  method: "GET",
                });

                const latestContract = contractRes?.result || contractRes?.data?.result;

                if (!latestContract) {
                  throw new Error("Failed to fetch latest contract data.");
                }


                const contractPayload = {
                  ...latestContract,
                  carInfoId: newCarData.id,
                  carInfoVehicleDesignation: newCarData.vehicleDesignation,
                  carInfoTradeName: newCarData.tradeName,
                  carInfoYearModel: newCarData.yearModel,
                  carInfoVehicleYears: newCarData.vehicleYears,
                  carInfoRegistrationDate: newCarData.registrationDate,
                  carInfoNumberOfUsers: newCarData.numberOfUsers,
                  carInfoWaxelbarge: newCarData.waxelbarge,
                  carInfoFourWheelDrive: newCarData.fourWheelDrive?.toString() || "False",
                  carInfoFuel: newCarData.fuel,
                  carInfoElectricVehicleConfiguration: newCarData.electricVehicleConfiguration,
                  carInfoInspectionDate: newCarData.inspectionDate,
                  carInfoInspectionDateEMPTY: newCarData.inspectionDateEMPTY,
                  carInfoDispensationInspectionGroup: newCarData.dispensationInspectionGroup,
                  carInfoInspectionGroup: newCarData.inspectionGroup,
                  carInfoFeedingStall: newCarData.feedingStall,
                  carInfoInspectionStation: newCarData.inspectionStation,
                  carInfoInspectionProgramCode: newCarData.inspectionProgramCode,
                  carInfoPreviousInspectionDate: newCarData.previousInspectionDate,
                  carInfoPreviousInspectionProgramCode: newCarData.previousInspectionProgramCode,
                  carInfoTax: newCarData.tax,
                  carInfoMalus: newCarData.malus,
                  carValuationBySeller: 0,
                  vahicleTypeOptionVahicleTypeName: latestContract.vahicleTypeOptionName || "",
                  vahicleTypeOptionId: latestContract.vahicleTypeOptionId,
                  sellerDealComplete: false,
                  sellerDrivingLicensePath: "",
                };


                const contractUpdateRes = await ApiCall({
                  url: "https://localhost:44311/api/services/app/ContractMain/Update",
                  method: "PUT",
                  data: contractPayload,
                });

                const status = contractUpdateRes?.status;
                const isError =
                  contractUpdateRes?.success === false || status >= 400;

                if (!isError && (status === 200 || status === 201)) {
                  Swal.fire("✅ Success", "Contract updated successfully!", "success");
                  setValuationSubmitted(true);
                  setActiveStep(3);
                } else {
                  const errMsg =
                    contractUpdateRes?.error?.details ||
                    contractUpdateRes?.error?.message ||
                    "Something went wrong while updating the contract.";
                  Swal.fire("❌ Error", errMsg, "error");
                }
              } catch (error) {
                console.error("❌ Error during submission:", error);
                Swal.fire("❌ Error", error.message || "Unexpected error occurred.", "error");
              } finally {
                setSubmitting(false);
              }
            }}







          >
            {({ values, handleChange, handleSubmit, isSubmitting, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <Box textAlign="center" mt={2}>
                  <Typography variant="h5" fontWeight="bold">
                    {t("seller.startSaleTitle")}
                  </Typography>
                  <Typography variant="subtitle1" mt={1}>
                    {t("seller.startSaleSubtitle")}
                  </Typography>


                  <Box display="flex" justifyContent="center" alignItems="center" mt={3} mb={3} gap={1}>
                    <TextField
                      placeholder="Enter registration number"
                      variant="outlined"
                      size="small"
                      value={registration}
                      onChange={(e) => setRegistration(e.target.value)}
                      sx={{ width: "300px", backgroundColor: "#fff", borderRadius: "8px" }}
                    // InputProps={{
                    //   startAdornment: (
                    //     <InputAdornment position="start">
                    //       <SearchIcon color="action" />
                    //     </InputAdornment>
                    //   ),
                    // }}
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
                        minWidth: "50px",   // optional: button width for icon
                        padding: "6px"      // optional: icon padding
                      }}
                    >
                      {loading ? "..." : <SearchIcon />}
                    </Button>
                  </Box>





                  {error && (
                    <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                      {error}
                    </div>
                  )}


                  {carData && (
                    <Box display="flex" justifyContent="flex-end" mt={5}>
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: "#ff9f43",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <CircularProgress size={20} color="inherit" />
                            Submitting...
                          </>
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </Box>
                  )}
                </Box>
              </Form>
            )}
          </Formik>
        )} */}

        {activeStep === 2 && (
          <Box textAlign="center" mt={2}>

            <Typography variant="h6" fontWeight="bold">
              {t("seller.startSaleTitle")}
            </Typography>
            <Typography variant="subtitle2" mt={1} color="text.secondary">
              {t("seller.startSaleSubtitle")}
            </Typography>

            <Box display="flex" justifyContent="center" alignItems="center" mt={2} mb={3} gap={1}>
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
                    borderRadius: "18px", // yahan apni rounded value de sakte ho
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
                  padding: "6px"
                }}
              >
                {loading ? "..." : <SearchIcon />}
              </Button>
            </Box>

            {error && (
              <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                {error}
              </div>
            )}

          </Box>
        )}


        {/* ------------------ FORM 3 ------------------ */}

        {activeStep === 3 && (


          <Formik
            initialValues={{
              sellerDealComplete: true,
            }}
            onSubmit={async (values, { setSubmitting }) => {
              // if (!contractData || !carData) {
              //   Swal.fire("⚠️ Warning", "Missing contract or car data!", "warning");
              //   return;
              // }

              try {

                const response = await ApiCall({
                  url: `https://localhost:44311/api/services/app/ContractMain/Get?Id=${contractData.id}`,
                  method: "GET",
                });

                const contractData2 = response.result || response.data?.result;





                if (!contractData2) {
                  Swal.fire("❌ Error", "Failed to fetch latest contract data!", "error");
                  return;
                }

                const payload = {
                  ...contractData2,
                  sellerDealComplete: true,
                  sellerDrivingLicensePath: "",
                };



                const updateRes = await ApiCall({
                  url: "https://localhost:44311/api/services/app/ContractMain/Update",
                  method: "PUT",
                  data: payload,
                });




                const status = updateRes?.status;
                const isError = updateRes?.success === false || status >= 400;

                if (!isError && (status === 200 || status === 201)) {

                  const respData = updateRes?.data || updateRes;


                  const returnedCarInfoId =
                    respData?.result?.carInfoId ??
                    respData?.carInfoId ??
                    respData?.result?.carInfo?.id ??
                    null;

                  const returnedId =
                    respData?.result?.id ??
                    respData?.id ??
                    null;


                  if (returnedCarInfoId) setUpdatedCarInfoId(returnedCarInfoId);


                  if (returnedId) setLastId(returnedId);


                  Swal.fire("✅ Success", "Contract updated successfully!", "success");
                  setActiveStep(4);
                } else {
                  const errorMsg =
                    updateRes?.error?.details ||
                    updateRes?.error?.message ||
                    "Something went wrong while updating the contract.";
                  Swal.fire("❌ Error", errorMsg, "error");
                }
              } catch (err) {
                console.error("❌ Error finalizing contract:", err);

                const errorMsg =
                  err.response?.data?.error?.details ||
                  err.response?.data?.error?.message ||
                  "Unexpected server error occurred.";

                Swal.fire("❌ Error", errorMsg, "error");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box textAlign="center" py={2}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {t("seller.SaleCreated")}
                    </Typography>


                    <Box
                      sx={{
                        display: "inline-block",
                        padding: 1,
                        bgcolor: "background.paper",
                        borderRadius: 1,
                        boxShadow: 2,
                      }}
                    >


                      {QR ? (
                        <QRCode
                          value={QR}
                          size={220}
                          level="M"
                          bgColor="#ffffff"
                          fgColor="#000000"
                          includeMargin={false}
                        />
                      ) : (
                        <Typography color="gray" fontSize="14px">
                          Generating QR...
                        </Typography>
                      )}


                    </Box>

                    <Container maxWidth="sm" sx={{ marginTop: 5 }}>

                      <Typography variant="body2" gutterBottom sx={{ marginTop: 1 }}>
                        {t("seller.askBuyer")}
                      </Typography>

                      <Typography variant="subtitle2" color="green" gutterBottom sx={{
                        marginTop: 2, backgroundColor: "#c6f7d4ff", p: 1,
                        borderRadius: 1,
                      }}>
                        ✅ {t("seller.available")}
                      </Typography>

                      <Typography variant="subtitle2" color="green" fontWeight="bold" sx={{
                        marginTop: 2, backgroundColor: "#c6f7d4ff", p: 1,
                        borderRadius: 1,
                      }}>
                        {t("seller.proceed")}
                      </Typography>

                    </Container>

                  </Box>

                  <Box display="flex" justifyContent="center" gap={2} mt={3}>


                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      disabled={!buyerConnected}
                    >
                      {isSubmitting ? "Finalizing..." : "Start Sale"}
                    </Button>


                  </Box>
                </motion.div>
              </Form>
            )}
          </Formik>

        )}

        {/* ------------------ STEP 4 ------------------ */}


        {activeStep === 4 && (
          <Formik
            initialValues={{

            }}
            enableReinitialize
            onSubmit={async (values, { setSubmitting }) => {
              try {
                if (!fetchedContractInfo) {
                  Swal.fire("⚠️ Warning", "No contract info to submit!", "warning");
                  return;
                }
                const rawValue = values.carValuationBySeller.replace(/\s/g, "");

                const payload = {
                  ...fetchedContractInfo,
                  sellerDrivingLicensePath: "",
                  carValuationBySeller: rawValue,
                };

                const response = await ApiCall({
                  url: "https://localhost:44311/api/services/app/ContractMain/Update",
                  method: "PUT",
                  data: payload,
                });

                const isSuccess = response?.success === true || response?.status === 200;

                if (isSuccess) {
                  Swal.fire("✅ Success", "Contract submitted successfully!", "success");
                  setActiveStep(5);
                } else {
                  Swal.fire(
                    "❌ Error",
                    response?.error?.details || "Failed to submit contract!",
                    "error"
                  );
                }
              } catch (error) {
                console.error("❌ Error submitting contract:", error);
                Swal.fire("❌ Error", "Unexpected server error occurred!", "error");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ handleSubmit, values, isSubmitting, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.4 }}
                >
                  <Box>     <Typography
                    variant="h6"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: "bold", marginBottom: 3, marginTop: 1 }}
                  >
                    {t("seller.sellCarForTitle")}
                  </Typography></Box>
                  {fetchedCarInfo ? (
                    <Paper
                      elevation={4}
                      sx={{ p: 3, mt: 2, borderRadius: 3, border: "1px solid #d7d7d7ff" }}
                    >
                      <Typography variant="h6" gutterBottom mb={2} sx={{ fontWeight: "bold" }}>
                        <strong> {fetchedCarInfo?.name} </strong>
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid size={{ xs: 6, md: 6 }}>
                          <Typography>
                            <strong>{t("seller.registrationNo")}:</strong> {fetchedCarInfo?.registrationNo}
                          </Typography>
                          <Typography>
                            <strong>{t("seller.vehicle")}:</strong> {fetchedCarInfo?.vehicleDesignation}
                          </Typography>
                          <Typography>
                            <strong>{t("seller.vehicleYears")}:</strong> {fetchedCarInfo?.vehicleYears}
                          </Typography>
                        </Grid>

                        <Grid size={{ xs: 6, md: 6 }}>
                          <Typography>
                            <strong>{t("seller.numberOfUsers")}:</strong> {fetchedCarInfo?.numberOfUsers}
                          </Typography>
                          <Typography>
                            <strong>{t("seller.axleWeight")}:</strong> {fetchedCarInfo?.waxelbarge}
                          </Typography>
                          <Typography>
                            <strong>{t("seller.fuel")}:</strong> {fetchedCarInfo?.fuel}
                          </Typography>
                        </Grid>
                      </Grid>

                    </Paper>
                  ) : (
                    <Typography align="center" sx={{ mt: 4, color: "gray" }}>
                      {t("seller.fetchingCarDetails")}
                    </Typography>
                  )}
                  <Box display="flex" justifyContent="center" mt={2}>
                    <TextField
                      label="Valuation by Seller"
                      size="small"
                      value={values.carValuationBySeller}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, "");
                        if (!/^\d*$/.test(value)) return;


                        const formatted = new Intl.NumberFormat("en-US")
                          .format(Number(value))
                          .replace(/,/g, " ");

                        setFieldValue("carValuationBySeller", formatted);
                      }}
                      variant="outlined"
                      sx={{ width: "100%", maxWidth: 200 }}
                    />
                    {values.carValuationBySeller && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ m: 1, fontStyle: "italic" }}
                      >
                        {numberToWords(
                          parseInt(values.carValuationBySeller.replace(/\s/g, ""))
                        )}
                      </Typography>
                    )}
                  </Box>

                  <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting || !values.carValuationBySeller}
                      sx={{
                        backgroundColor: "#ff9f43",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#e78c35",
                        }
                      }}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </Box>

                </motion.div>
              </Form>
            )}
          </Formik>
        )}

        {activeStep === 5 && (
          <  Paper
            elevation={3}
            sx={{
              p: 4,
              margin: "40px auto",

            }}
          >

            <Typography
              variant="h6"
              sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
            >
              {t("seller.vehicleInformation")}
            </Typography>

            {!finalContract ? (
              <Typography>Loading vehicle information...</Typography>
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
                  label={t("seller.car.steps.registrationNo")}
                  value={finalContract.carInfoRegistrationNo || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.vehicleDesignation")}
                  value={finalContract.carInfoVehicleDesignation || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.tradeName")}
                  value={finalContract.carInfoTradeName || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.yearModel")}
                  value={finalContract.carInfoYearModel || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.vehicleYears")}
                  value={finalContract.carInfoVehicleYears || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.registrationDate")}
                  value={finalContract.carInfoRegistrationDate || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.numberOfUsers")}
                  value={finalContract.carInfoNumberOfUsers || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.axleWeight")}
                  value={finalContract.carInfoWaxelbarge || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.fourWheelDrive")}
                  value={
                    finalContract.carInfoFourWheelDrive?.toString().toLowerCase() === "true"
                      ? t("seller.car.steps.yes")
                      : t("seller.car.steps.no")
                  }
                />

                <DataRow
                  label={t("seller.car.steps.fuel")}
                  value={finalContract.carInfoFuel || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.evConfig")}
                  value={finalContract.carInfoElectricVehicleConfiguration || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.inspectionDate")}
                  value={finalContract.carInfoInspectionDate || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.prevInspectionDate")}
                  value={finalContract.carInfoPreviousInspectionDate || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.inspectionStation")}
                  value={finalContract.carInfoInspectionStation || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.inspectionGroup")}
                  value={finalContract.carInfoInspectionGroup || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.feedingStall")}
                  value={finalContract.carInfoFeedingStall || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.tax")}
                  value={finalContract.carInfoTax || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.malus")}
                  value={finalContract.carInfoMalus || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.valuation")}
                  value={
                    <Typography sx={{ fontWeight: "bold" }}>
                      {finalContract.carValuationBySeller || "-"}
                      <FaEdit
                        onClick={() => createRef.current.click()}
                        style={{
                          cursor: "pointer",
                          fontSize: "20px",
                          color: "#ff9f63",
                          marginLeft: 8,
                        }}
                        title="Edit"
                      />
                    </Typography>
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
                <AirportShuttleIcon />
                {t("seller.deliveryRisk.title")}
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
                  sx={{ display: "flex", alignItems: "flex-start", gap: 0.5 }}
                >
                  <ReportGmailerrorredIcon sx={{ fontSize: 16, mt: "2px" }} />
                  {t("seller.deliveryRisk.description")}
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
                {t("seller.deliveryRisk.title")}
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
                  sx={{ display: "flex", alignItems: "flex-start", gap: 0.5 }}
                >
                  <ReportGmailerrorredIcon sx={{ fontSize: 16, mt: "2px" }} />
                  {t("seller.deliveryRisk.description")}
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
                {t("seller.conditionDefects.title")}
              </Typography>

              <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                {t("seller.conditionDefects.line1")}
              </Typography>

              <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary" }}>
                {t("seller.conditionDefects.line2")}
              </Typography>

              <Typography variant="body2" sx={{ mt: 0.5, color: "text.secondary" }}>
                {t("seller.conditionDefects.line3")}
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
                sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}
              >
                <AccountBalanceIcon />
                {t("seller.debts.title")}
              </Typography>

              <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                {t("seller.debts.subtitle")}
              </Typography>

              <FormGroup sx={{ mt: 1, gap: 0.5 }}>
                <FormControlLabel
                  value="none"
                  disabled
                  control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 14 } }} />}
                  label={<Typography variant="body2" color="text.secondary">{t("seller.debts.options.none")}</Typography>}
                />

                <FormControlLabel
                  value="seller"
                  control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 14 } }} />}
                  label={<Typography variant="body2" color="text.secondary">{t("seller.debts.options.seller")}</Typography>}
                />

                <FormControlLabel
                  value="buyer"
                  disabled
                  control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 14 } }} />}
                  label={<Typography variant="body2" color="text.secondary">{t("seller.debts.options.buyer")}</Typography>}
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
                sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}
              >
                <HomeWorkIcon />
                {t("seller.loan.title")}
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
                {t("seller.loan.description")}
              </Typography>

              <RadioGroup
                value={value}
                onChange={(e) => setValue(e.target.value)}
                sx={{ mt: 1 }}
              >
                <FormControlLabel
                  value="none"
                  control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 14 } }} />}
                  label={<Typography variant="body1">{t("seller.loan.options.none")}</Typography>}
                />

                <FormGroup sx={{ gap: 0.5 }}>
                  <FormControlLabel
                    value="seller"
                    control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }} />}
                    label={<Typography variant="body2" color="text.secondary">{t("seller.loan.options.seller")}</Typography>}
                  />
                  <FormControlLabel
                    value="buyer"
                    control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }} />}
                    label={<Typography variant="body2" color="text.secondary">{t("seller.loan.options.buyer")}</Typography>}
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
                sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}
              >
                <DescriptionIcon />
                {t("seller.ownership.title")}
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
                {t("seller.ownership.description1")}
              </Typography>

              <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                {t("seller.ownership.description2")}
              </Typography>

              <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                {t("seller.ownership.description3")}
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
                sx={{ fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}
              >
                <DirectionsCarFilledIcon />
                {t("seller.transportAgency.title")}
              </Typography>

              <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                {t("seller.transportAgency.description1")}
              </Typography>

              <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                {t("seller.transportAgency.description2")}
              </Typography>
            </Box>




          </Paper>
        )}






        <UpadteValuation open={createRef} close={refClose} contractId={contractId} carvaluation={finalContractvaluation} carId={carId} onUpdated={() => setRefreshFinalContract(prev => !prev)} />
      </Paper>
    </Container>
  );
}

export default SellerProfile;






const DataRow = ({ label, value }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
    <Typography sx={{ fontWeight: 500 }}>{label}</Typography>
    <Typography>{value ?? "-"}</Typography>
  </Box>
);



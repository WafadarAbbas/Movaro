import React, { useRef, useState, useEffect ,useContext} from "react";
import { Formik, Form, Field } from "formik";
import { AppSettings } from "./../../config/app-settings.js";
import * as Yup from "yup";
import { Switch, FormControlLabel } from "@mui/material"
import Swal from "sweetalert2";
import { PhotoCamera } from "@mui/icons-material";
import { FaCar, FaMotorcycle, FaShip, FaTrailer, FaTruck, } from "react-icons/fa";
import { MdElectricScooter } from "react-icons/md";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import NumbersIcon from "@mui/icons-material/Numbers";
import SettingsIcon from "@mui/icons-material/Settings";
import SpeedIcon from "@mui/icons-material/Speed";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaletteIcon from "@mui/icons-material/Palette";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { FaMoneyBillWave, FaEdit } from "react-icons/fa";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BusinessIcon from "@mui/icons-material/Business";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import LuggageIcon from "@mui/icons-material/Luggage";
import CircularProgress from "@mui/material/CircularProgress";
import "../../Compo/LoadingText.css";
import { Stepper, Step, StepLabel, Button, Box, InputAdornment, Typography, TextField, Paper, Divider, Grid, Container, Tooltip, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ApiCall from "../../Apicall/ApiCall";
import QRCode from "react-qr-code";
import CryptoJS from "crypto-js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpadteValuation from "./updatevaluation";


const steps = ["Choose Vehicles", "Documnents", "Vehicle", "Sale Created", "Submission", "Contract"];


function SellerProfile() {
  const createRef = useRef(null);
  const refClose = useRef(null);


  // -------------------Maneging States-------------------------------

  const [activeStep, setActiveStep] = useState(0);
  const [vehicleData, setVehicleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [registration, setRegistration] = useState("");
  const [carData, setCarData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [storedId, setStoredId] = useState(null);
  const [contractData, setContractData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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

   useEffect(() => {
      context.handleSetAppSidebarNone(true);
      context.handleSetAppHeaderNone(false);
      context.handleSetAppContentClass("p-0");
  
      return () => {
        context.handleSetAppSidebarNone(false);
        context.handleSetAppHeaderNone(false);
        context.handleSetAppContentClass("");
      };
  
    }, []);

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

          console.log("🧩 Data to Encrypt:", minimalData);


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

    Yup.object({
      sellerDrivingLicensePath: Yup.string()
        .required("Driving license is required"),
      sellerDrivingLicenseValidate: Yup.boolean()
        .oneOf([true], "You must validate the Driving license"),
    }),
  ];






  // ------------------- Api Calls-------------------------------


  // Api call For Vehicle options
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

  const handleSearch = async () => {
    if (!registration) return;

    setLoading(true);
    setError("");
    setCarData(null);

    try {
      const response = await ApiCall({
        url: `https://localhost:44311/api/services/app/CarInfo/GetVehicleInfo?Id=${registration}`,
        method: "GET",
      });

      if (response.data?.result && response.data.result.length > 0) {
        const raw = response.data.result[0];
        setCarData(raw);

        const finalData = convertCarData(raw);

        console.log("Converted:", finalData);


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

  let interval; // 👈 interval yahan declare

  const fetchBuyerStatus = async () => {
    try {
      const res = await ApiCall({
        url: `https://localhost:44311/api/services/app/ContractMain/GetContractMainById?Id=${contractData.id}`,
        method: "GET",
      });

      const latest = res?.result || res?.data?.result;
      const isConnected = latest?.buyerDealConnected ?? false;

      setBuyerConnected(isConnected);

      // 🎉 Toast only once
      if (isConnected && !buyerToastShown) {
        toast.success("🎉 Buyer connected to deal!", {
          position: "top-right",
        });
        setBuyerToastShown(true);
      }

      // 🛑 STOP POLLING WHEN CONNECTED
      if (isConnected && interval) {
        clearInterval(interval);
      }

    } catch (err) {
      console.error("Error fetching buyerDealConnected:", err);
    }
  };

  fetchBuyerStatus();
  interval = setInterval(fetchBuyerStatus, 10000);

  return () => clearInterval(interval);
}, [activeStep, contractData?.id, buyerToastShown]);


  // const convertCarData = (carData) => {
  //   return {
  //     registrationNo: carData?.registreringsnummer || "",
  //     vehicleDesignation: carData?.fordonsuppgifter?.fordonsbenamning || "",
  //     tradeName: carData?.fordonsuppgifter?.handelsbeteckning || "",
  //     yearModel: carData?.fordonsuppgifter?.arsmodell || "",
  //     vehicleYears: carData?.fordonsuppgifter?.fordonsar?.toString() || "",
  //     registrationDate: carData?.fordonsuppgifter?.registreringsdatum || null,
  //     numberOfUsers: carData?.fordonBrukareAgare?.antalBrukare?.toString() || "",
  //     waxelbarge: carData?.tekniskData?.vaxellada || "",
  //     fourWheelDrive: carData?.tekniskData?.fyrhjulsdrift || false,
  //     fuel: carData?.tekniskData?.drivmedel?.map(x => x.drivmedel).join(", ") || "",
  //     electricVehicleConfiguration: carData?.miljoklassning?.elfordonKonfiguration || "",
  //     inspectionDate: carData?.besiktning?.besiktningsdatum || null,
  //     inspectionDateEMPTY: carData?.besiktning?.besiktningsdatumTOM || null,
  //     dispensationInspectionGroup: carData?.besiktning?.dispensbesiktningsgrupp || "",
  //     inspectionGroup: carData?.besiktning?.besiktningsgrupp || "",
  //     feedingStall: carData?.besiktning?.matarstallning?.toString() || "",
  //     inspectionStation: carData?.besiktning?.besiktningsstation || "",
  //     inspectionProgramCode: carData?.besiktning?.besiktningsprogramkod?.toString() || "",
  //     previousInspectionDate: carData?.besiktning?.foregaendeBesiktningsdatum || null,
  //     previousInspectionProgramCode: carData?.besiktning?.foregaendeBesiktningsprogramkod?.toString() || "",
  //     tax: carData?.beraknat?.skatt?.skatt?.toString() || "",
  //     malus: carData?.beraknat?.skatt?.malus?.toString() || "",
  //   };
  // };

 
const convertCarData = () => {
  return {
    registrationNo: "ABS111",
    vehicleDesignation: "TOYOTA PRIUS",
    tradeName: "",
    yearModel: "",
    vehicleYears: "2006",
    registrationDate: "2006-11-24T00:00:00",
    numberOfUsers: "7",
    waxelbarge: "V",
    fourWheelDrive: false,
    fuel: "Bensin, El",
    electricVehicleConfiguration: null,
    inspectionDate: "2025-08-14T00:00:00",
    inspectionDateEMPTY: "2026-10-31T00:00:00",
    dispensationInspectionGroup: null,
    inspectionGroup: "36/24/14",
    feedingStall: "388358",
    inspectionStation: "CARSPECT STOCKHOLM BOTKYRKA NORSBORG",
    inspectionProgramCode: "6",
    previousInspectionDate: "2025-08-11T00:00:00",
    previousInspectionProgramCode: "5",
    tax: "360",
    malus: null
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
  }, [activeStep, lastId,refreshFinalContract]);



  return (
    <Paper
      elevation={4}
      sx={{
        margin: "10px auto",
        p: 2,
        borderRadius: 3,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h6" fontWeight="bold" align="center" gutterBottom>
        Sell Your Vehicle Here
      </Typography>

      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          mb: 2,
          "& .MuiStepLabel-label": {
            fontSize: "0.8rem", // smaller text
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

      {/* ------------------ FORM 1 ------------------ */}
      {activeStep < 2 && (
        <Formik

          initialValues={{
            vahicleTypeOptionId: null,
            vahicleTypeOptionName: "",
            sellerDrivingLicensePath: "",
            sellerDrivingLicenseValidate: false,
            vahicleTypeOptionVahicleTypeName: ""
          }}
          validationSchema={validationSchemas[activeStep]}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (activeStep === 1) {




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
                buyerDealStatus: '',
                lastModifierUserId: 0
              };




              try {
                setLoading(true);
                setSubmitting(true);
                setErrorMessage("");
                setSuccessMessage("");
                const response = await ApiCall({
                  url: "https://localhost:44311/api/services/app/ContractMain/Update",
                  method: "PUT",
                  data: finalValues,
                });

                if (response?.data?.success) {

                  setSuccessMessage("✅ Data submitted successfully!");

                  resetForm();
                  setSubmitted(true);
                  setActiveStep(2);
                } else {

                  setErrorMessage(response?.data?.error || "❌ Submission failed");

                }
              } catch (err) {

                setErrorMessage(err.message || "❌ Submission failed");
              } finally {
                setLoading(false);
                setSubmitting(false);
              }

            } else {
              setActiveStep((prev) => prev + 1);
            }
          }}
        >
          {({ errors, touched, handleSubmit, values, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {activeStep === 0 && (
                  <motion.div
                    key="step1"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Container maxWidth="md">
                      <Typography
                        variant="h6"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: "bold", marginBottom: 3, marginTop: 1 }}
                      >
                        What Do You Want To Sell Today?
                      </Typography>

                      {loading ? (

                        <div className="loader"></div>

                      ) : error ? (
                        <Typography color="error">{error}</Typography>
                      ) : vehicleData.length > 0 ? (
                        <Grid container spacing={6}>
                          {vehicleData.map((veh) => {
                            const isSelected = values.vahicleTypeOptionId === veh.id;
                            return (
                              <Grid size={{ xs: 6, sm: 6, md: 4 }} key={veh.id}>
                                <Paper
                                  elevation={isSelected ? 6 : 2}
                                  onClick={() => {
                                    if (values.vahicleTypeOptionId === veh.id) {

                                      setFieldValue("vahicleTypeOptionId", null);
                                      setFieldValue("vahicleTypeOptionName", "");
                                      setFieldValue("vahicleTypeOptionVahicleTypeName", "");

                                    } else {

                                      setFieldValue("vahicleTypeOptionId", veh.id);
                                      setFieldValue("vahicleTypeOptionName", veh.vahicleTypeName);
                                      setFieldValue("vahicleTypeOptionVahicleTypeName", veh.vahicleTypeName);

                                    }
                                  }}
                                  sx={{

                                    borderRadius: 2,
                                    textAlign: "center",
                                    cursor: "pointer",
                                    border: isSelected ? "2px solid #ff9f43" : "2px solid #ccc",
                                    backgroundColor: isSelected ? "#fbf2eaff" : "#fff",
                                    position: "relative",

                                    transition: "all 0.1s ease",
                                    "&:hover": {
                                      transform: "scale(1.02)",
                                      border: "2px solid #ff9f43",
                                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                                      "& svg": { color: "#ff9f43" },
                                    },
                                  }}
                                >
                                  {isSelected && (
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        top: 8,
                                        right: 8,
                                        width: 20,
                                        height: 20,
                                        borderRadius: "50%",
                                        backgroundColor: "#ff9f43",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "#fff",
                                        fontSize: 14,
                                      }}
                                    >
                                      ✓
                                    </Box>
                                  )}

                                  {/* Icon */}
                                  <Box sx={{ fontSize: 40, mb: 1 }}>
                                    {veh.vahicleTypeName.toLowerCase().includes("car") && <FaCar />}
                                    {veh.vahicleTypeName.toLowerCase().includes("motorcycle") && <FaMotorcycle />}
                                    {veh.vahicleTypeName.toLowerCase().includes("truck") && <FaTruck />}
                                    {veh.vahicleTypeName.toLowerCase().includes("boat") && <FaShip />}
                                    {veh.vahicleTypeName.toLowerCase().includes("camper") && <FaTrailer />}
                                    {veh.vahicleTypeName.toLowerCase().includes("moped") && <MdElectricScooter />}
                                  </Box>

                                  <Typography>{veh.vahicleTypeName}</Typography>
                                </Paper>

                              </Grid>
                            );
                          })}
                        </Grid>
                      ) : (
                        <Typography>No vehicle types found</Typography>
                      )}

                      {touched.vahicleTypeOptionId &&
                        errors.vahicleTypeOptionId && (
                          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                            {errors.vahicleTypeOptionId}
                          </Typography>
                        )}
                    </Container>
                  </motion.div>
                )}

                {activeStep === 1 && (
                  <motion.div
                    key="step2"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Box mb={1} mt={1} textAlign="center">
                      <Typography
                        variant="h6"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: "bold", marginBottom: 1 }}
                      >
                        Verify yourself as Seller
                      </Typography>
                      <Container maxWidth="md" >
                        <Typography
                          variant="subtitle2"
                          align="center"
                          // gutterBottom
                          sx={{ marginBottom: 2 }}
                        >
                          To sell a vehicle through Movaro you need to upload picture of your driving licence. This is security requirement form Sweden transport agency, and is only done once
                        </Typography>
                      </Container>
                      <input
                        type="file"
                        accept="image/*"
                        id="sellerDrivingLicensePath"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {

                              setFieldValue("sellerDrivingLicensePath", reader.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <label htmlFor="sellerDrivingLicensePath">
                        <Paper
                          sx={{
                            p: 1,
                            border: "1px dashed #ccc",
                            cursor: "pointer",
                            borderRadius: 2,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 210,
                            height: 150,
                            overflow: "hidden",
                            textAlign: "center",
                            flexDirection: "column",
                            "&:hover": { backgroundColor: "#f5f5f5" },
                          }}
                        >
                          {values.sellerDrivingLicensePath ? (
                            <img
                              src={values.sellerDrivingLicensePath}
                              alt="Uploaded"
                              style={{ width: "100%", height: "100%", objectFit: "fill" }}
                            />
                          ) : (
                            <>
                              <PhotoCamera sx={{ fontSize: 40, color: "#ccc", mb: 1 }} />
                              <Typography variant="body2" color="textSecondary">
                                Click to upload image
                              </Typography>
                            </>
                          )}
                        </Paper>
                      </label>

                      {touched.sellerDrivingLicensePath && errors.sellerDrivingLicensePath && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                          {errors.sellerDrivingLicensePath}
                        </Typography>
                      )}
                    </Box>

                    <Box mt={3} display="flex" justifyContent="center">
                      <FormControlLabel
                        control={
                          <Switch
                            checked={values.sellerDrivingLicenseValidate}
                            size="small"
                            onChange={(e) =>
                              setFieldValue("sellerDrivingLicenseValidate", e.target.checked)
                            }
                            sx={{
                              "& .MuiSwitch-switchBase.Mui-checked": {
                                color: "#ff9f63",
                              },
                              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                backgroundColor: "#ff9f63",
                              },
                            }}
                          />
                        }
                        label="I confirm the document is valid"
                      />
                    </Box>
                    <Box>  {errorMessage && (
                      <div className="mt-3 p-2 text-red-600 bg-red-100 border border-red-300 rounded">
                        {errorMessage}
                      </div>
                    )}

                      {successMessage && (
                        <div className="mt-3 p-2 text-green-600 bg-green-100 border border-green-300 rounded">
                          {successMessage}
                        </div>
                      )}</Box>


                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation */}
              <Box display="flex" justifyContent="space-between" mt={5}>
                <Button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => prev - 1)}
                  sx={{ color: "#ff9f43" }}
                >
                  Back
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: "#ff9f43", color: "white" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : activeStep === 1 ? (
                    "Submit Documents"
                  ) : (
                    "Next"
                  )}
                </Button>
              </Box>

            </Form>
          )}
        </Formik>
      )}

      {/* ------------------ FORM 2 ------------------ */}
      {activeStep === 2 && (
        <Formik
          initialValues={{
            // valuationBySeller: carData?.valuationBySeller || "",
          }}
          enableReinitialize



          onSubmit={async (values, { setSubmitting }) => {
            // if (!carData) {
            //   Swal.fire("Error", "Please search for the car first!", "error");
            //   return;
            // }

            // setError("");
            // setSubmitting(true);

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
                return; // optional: if you want to stop further execution
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
                  Start Your Sale
                </Typography>
                <Typography variant="subtitle1" mt={1}>
                  Enter the registration number of the car you want to sell
                </Typography>


                <Box display="flex" justifyContent="center" alignItems="center" mt={3} gap={1}>
                  <TextField
                    placeholder="Enter registration number"
                    variant="outlined"
                    size="small"
                    value={registration}
                    onChange={(e) => setRegistration(e.target.value)}
                    sx={{ width: "300px", backgroundColor: "#fff", borderRadius: "8px" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
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
                      borderRadius: "8px",
                    }}
                  >
                    {loading ? "Searching..." : "Search"}
                  </Button>
                </Box>

                {carData && (
                  <Paper
                    elevation={4}
                    sx={{
                      mt: 4,
                      p: 2,
                      maxWidth: 1200,
                      mx: "auto",
                      textAlign: "left",
                      borderRadius: "16px",
                      background: "linear-gradient(140deg, #ffffffff 20%, #fad3aeff 100%)",
                    }}
                  >
                    <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
                      {carData.registrationNo}
                    </Typography>
                    <Box style={{ textAlign: "center", marginBottom: 20 }}>
                      {carData.profileImage ? (
                        <img
                          src={carData.profileImage}
                          alt="Car"
                          style={{
                            width: 300,
                            height: 150,
                            objectFit: "cover",
                            borderRadius: 10,
                            border: "2px solid #ccc",
                          }}
                        />
                      ) : (
                        <DirectionsCarIcon sx={{ fontSize: 80, color: "gray" }} />
                      )}
                    </Box>




                    <Grid container spacing={1}>
                      <Grid size={{ xs: 12, md: 4 }} >
                        <Typography margin={1}><ConfirmationNumberIcon /> <b>Registration:</b> {carData?.registreringsnummer}</Typography>
                        <Typography margin={1}><DirectionsCarIcon /> <b>Vehicle Designation:</b> {carData?.fordonsuppgifter?.fordonsbenamning || "N/A"}</Typography>
                        <Typography margin={1}><BusinessIcon /> <b>Trade Name:</b> {carData?.fordonsuppgifter?.handelsbeteckning || "N/A"}</Typography>
                        <Typography margin={1}><NumbersIcon /> <b>Vehicle Years:</b> {carData?.fordonsuppgifter?.fordonsar || "N/A"}</Typography>
                        <Typography margin={1}><CalendarMonthIcon /> <b>Year Model:</b> {carData?.fordonsuppgifter?.arsmodell || "N/A"}</Typography>
                        <Typography margin={1}>
                          <LocalGasStationIcon /> <b>Fuel:</b> {carData?.tekniskData?.drivmedel?.map(d => d.drivmedel).join(", ") || "N/A"}
                        </Typography>
                        <Typography margin={1}>
                          <SettingsIcon /> <b>Gearbox:</b> {carData?.tekniskData?.vaxellada || "N/A"}
                        </Typography>
                        <Typography margin={1}><SpeedIcon /> <b>Electric Vehicle Config:</b> {carData?.miljoklassning?.elfordonKonfiguration || "N/A"}</Typography>
                        <Typography margin={1}><SettingsSuggestIcon /> <b>Four Wheel Drive:</b> {carData?.tekniskData?.fyrhjulsdrift ? "Yes" : "No"}</Typography>
                      </Grid>

                      <Grid size={{ xs: 12, md: 4 }} >
                        <Typography margin={1}><CategoryIcon /> <b>Inspection Group:</b> {carData?.besiktning?.besiktningsgrupp || "N/A"}</Typography>
                        <Typography margin={1}><AutoModeIcon /> <b>Dispensation Inspection Group:</b> {carData?.besiktning?.dispensbesiktningsgrupp || "N/A"}</Typography>
                        <Typography margin={1}><SettingsSuggestIcon /> <b>Previous Inspection Program:</b> {carData?.besiktning?.foregaendeBesiktningsprogramkod || "N/A"}</Typography>
                        <Typography margin={1}>
                          <InsertDriveFileIcon /> <b>Inspection Date:</b> {carData?.besiktning?.besiktningsdatum === "0001-01-01T00:00:00" ? "N/A" : carData?.besiktning?.besiktningsdatum}
                        </Typography>

                        <Typography margin={1}><SpeedIcon /> <b>Feeding Stall:</b> {carData?.besiktning?.matarstallning || "N/A"}</Typography>
                        <Typography margin={1}><CategoryIcon /> <b>Tax:</b> {carData?.beraknat?.skatt?.skatt || "N/A"}</Typography>
                      </Grid>

                      <Grid size={{ xs: 12, md: 4 }} >
                        <Typography margin={1}><PersonIcon /> <b>Number of Users:</b> {carData?.fordonBrukareAgare?.antalBrukare || "N/A"}</Typography>
                        <Typography margin={1}>
                          <DirectionsCarIcon /> <b>Previous Inspection Date:</b> {carData?.besiktning?.foregaendeBesiktningsdatum === "0001-01-01T00:00:00" ? "N/A" : carData?.besiktning?.foregaendeBesiktningsdatum}
                        </Typography>
                        <Typography margin={1}>
                          <AutoModeIcon /> <b>Registration Date:</b> {carData?.fordonsuppgifter?.registreringsdatum === "0001-01-01T00:00:00" ? "N/A" : carData?.fordonsuppgifter?.registreringsdatum}
                        </Typography>
                        <Typography margin={1}><SettingsIcon /> <b>Inspection Program Code:</b> {carData?.besiktning?.besiktningsprogramkod || "N/A"}</Typography>
                        <Typography margin={1}><SettingsIcon /> <b>Inspection Station:</b> {carData?.besiktning?.besiktningsstation || "N/A"}</Typography>
                        <Typography margin={1}>
                          <CheckCircleIcon /> <b>Contract Signed by Seller:</b> N/A
                        </Typography>
                        <Typography margin={1}><NumbersIcon /> <b>Malus:</b> {carData?.beraknat?.skatt?.malus || "N/A"}</Typography>
                      </Grid>
                    </Grid>



                  </Paper>
                )}


                {error && (
                  <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                    {error}
                  </div>
                )}


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
              </Box>
            </Form>
          )}
        </Formik>
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
                    Sale is now created!
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
                      Ask the buyer to scan the QR code or enter the registration number in
                      their app to connect to the deal.
                    </Typography>

                    <Typography variant="subtitle2" color="green" gutterBottom sx={{
                      marginTop: 2, backgroundColor: "#c6f7d4ff", p: 1,
                      borderRadius: 1,
                    }}>
                      ✅ Available for the buyer: Yes
                    </Typography>

                    <Typography variant="subtitle2" color="green" fontWeight="bold" sx={{
                      marginTop: 2, backgroundColor: "#c6f7d4ff", p: 1,
                      borderRadius: 1,
                    }}>
                      Proceed to the purchase contract.
                    </Typography>

                  </Container>

                </Box>

                <Box display="flex" justifyContent="center" gap={2} mt={3}>

                  <Button
                    variant="outlined"
                    color="warning"
                    onClick={() => setActiveStep(2)}
                  >
                    Back
                  </Button>
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
                  What Do You Want To Sell the car for?
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
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography><strong>Registration No:</strong> {fetchedCarInfo?.registrationNo}</Typography>
                        <Typography><strong>Vehicle:</strong> {fetchedCarInfo?.vehicleDesignation}</Typography>
                        <Typography><strong>Vehicle Years:</strong> {fetchedCarInfo?.vehicleYears}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <Typography><strong>Number Of Users:</strong> {fetchedCarInfo?.numberOfUsers}</Typography>
                        <Typography><strong>Waxel barge:</strong> {fetchedCarInfo?.waxelbarge}</Typography>
                        <Typography><strong>Fuel:</strong> {fetchedCarInfo?.fuel}</Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                ) : (
                  <Typography align="center" sx={{ mt: 4, color: "gray" }}>
                    Fetching Car details...
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
            Vehicle Information
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
              <DataRow label="Registration No" value={finalContract.carInfoRegistrationNo || "-"} />
              <DataRow label="Vehicle Designation" value={finalContract.carInfoVehicleDesignation || "-"} />
              <DataRow label="Trade Name" value={finalContract.carInfoTradeName || "-"} />
              <DataRow label="Year Model" value={finalContract.carInfoYearModel || "-"} />
              <DataRow label="Vehicle Years" value={finalContract.carInfoVehicleYears || "-"} />
              <DataRow label="Registration Date" value={finalContract.carInfoRegistrationDate || "-"} />
              <DataRow label="Number of Users" value={finalContract.carInfoNumberOfUsers || "-"} />
              <DataRow label="Waxelbarge" value={finalContract.carInfoWaxelbarge || "-"} />
              <DataRow
                label="4-Wheel Drive"
                value={
                  finalContract.carInfoFourWheelDrive?.toString().toLowerCase() === "true"
                    ? "Yes"
                    : "No"
                }
              />
              <DataRow label="Fuel" value={finalContract.carInfoFuel || "-"} />
              <DataRow label="EV Config" value={finalContract.carInfoElectricVehicleConfiguration || "-"} />
              <DataRow label="Inspection Date" value={finalContract.carInfoInspectionDate || "-"} />
              <DataRow
                label="Prev Inspection Date"
                value={finalContract.carInfoPreviousInspectionDate || "-"}
              />
              <DataRow
                label="Inspection Station"
                value={finalContract.carInfoInspectionStation || "-"}
              />
              <DataRow
                label="Inspection Group"
                value={finalContract.carInfoInspectionGroup || "-"}
              />
              <DataRow
                label="Feeding Stall"
                value={finalContract.carInfoFeedingStall || "-"}
              />
              <DataRow label="Tax" value={finalContract.carInfoTax || "-"} />
              <DataRow label="Malus" value={finalContract.carInfoMalus || "-"} />
              <DataRow
                label="Valuation"
                value={
                  <Typography sx={{ fontWeight: "bold" }}>
                    {finalContract.carValuationBySeller || "-"}
                    <FaEdit
                      onClick={() => createRef.current.click()}
                      style={{
                        cursor: "pointer",
                        fontSize: "20px",
                        color: "blue",
                      }}
                      title="Edit"
                    />
                  </Typography>
                }
              />

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



        </Paper>
      )}






      <UpadteValuation open={createRef} close={refClose} contractId={contractId} carvaluation={finalContractvaluation}  carId={carId}  onUpdated={() => setRefreshFinalContract(prev => !prev)} />
    </Paper>
  );
}

export default SellerProfile;






const DataRow = ({ label, value }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
    <Typography sx={{ fontWeight: 500 }}>{label}</Typography>
    <Typography>{value ?? "-"}</Typography>
  </Box>
);


{/* <Box sx={{
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
            <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
              {finalContractvaluation}
            </Typography>
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


          </Box> */}
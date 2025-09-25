import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
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
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BusinessIcon from "@mui/icons-material/Business";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import LuggageIcon from "@mui/icons-material/Luggage";
import CircularProgress from "@mui/material/CircularProgress";

import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box, InputAdornment,
  Typography,
  TextField,
  Paper,
  Divider,
  Grid,Container
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ApiCall from "../../Apicall/ApiCall";
import SaleSuccess from "./SaleSuccess";
const steps = [
  "Step 1: Choose Vehicles",
  "Step 2: Documnents",
  "Step 3: Valuation",
  "Step 4: Sale Created",
];

function SellerProfile() {

  const [activeStep, setActiveStep] = useState(0);
  const [vehicleData, setVehicleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [registration, setRegistration] = useState("");
  const [carData, setCarData] = useState(null);

  const validationSchemas = [

    Yup.object({
      vahicleTypeOptionId: Yup.number()
        .nullable()
        .required("Please select a vehicle type"),
    }),

    Yup.object({
      documentPath: Yup.string(),
      documentValidate: Yup.boolean(),
    }),
  ];

 
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

  const [userId, setUserId] = useState(null);

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
        url: `https://localhost:44311/api/services/app/CarInfo/GetCarInfoByRegistration?Id=${registration}`,
        method: "GET",
      });
      if (response.data.result) {
        setCarData(response.data.result);
      } else {
        setError("❌ Car not found, please check the registration number.");
      }
    } catch (error) {
      console.error("Error fetching car info:", error);
      setError("❌ Car not found, please check the registration number.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 1000,
        margin: "auto",
        mt: 5,
        p: 4,
        borderRadius: 3,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
Sell Your Vehicle Here
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, "& .MuiStepLabel-root .Mui-completed": { color: "green" }, "& .MuiStepLabel-root .Mui-active": { color: "#ff9f43" }, "& .MuiStepLabel-label.Mui-active": { fontWeight: "bold" } }}>
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
            documentPath: "",
            documentValidate: false,
            userId: userId || null,
          }}
          validationSchema={validationSchemas[activeStep]}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (activeStep === 1) {

              const finalValues = { ...values, userId: userId };
              console.log("Submitting values:", finalValues);
              
              try {
                setLoading(true);
                setSubmitting(true);

                const response = await ApiCall({
                  url: "https://localhost:44311/api/services/app/Seller/Create",
                  method: "POST",
                  data: finalValues,
                });

                if (response?.data?.success) {
                  Swal.fire("Success", "Data submitted successfully!", "success");
                  resetForm();
                  setSubmitted(true);
                  setActiveStep(2);  
                } else {
                  Swal.fire("Error", response?.data?.error || "Submission failed", "error");
                }
              } catch (err) {
                Swal.fire("Error", err.message || "Submission failed", "error");
              } finally {
                setLoading(false);
                setSubmitting(false);
              }
              
            } else {
             
              setActiveStep((prev) => prev + 1);
            }
          }}
        >
          {({ errors, touched, handleSubmit, values, setFieldValue ,isSubmitting}) => (
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
                    <Box>
                      <Typography
                        variant="h6"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: "bold", marginBottom: 3 }}
                      >
                        What Do You Want To Sell Today?
                      </Typography>

                      {loading ? (
                        <Typography>Loading vehicle types…</Typography>
                      ) : error ? (
                        <Typography color="error">{error}</Typography>
                      ) : vehicleData.length > 0 ? (
                        <Grid container spacing={2}>
                          {vehicleData.map((veh) => {
                            const isSelected = values.vahicleTypeOptionId === veh.id;
                            return (
                              <Grid size={{ xs: 6, sm: 6, md: 4 }} key={veh.id}>
                                <Paper
                                  elevation={isSelected ? 6 : 2}
                                  onClick={() => {
                                    if (values.vahicleTypeOptionId === veh.id) {

                                      setFieldValue("vahicleTypeOptionId", null);

                                    } else {

                                      setFieldValue("vahicleTypeOptionId", veh.id);

                                    }
                                  }}
                                  sx={{
                                    p: 1,
                                    borderRadius: 2,
                                    textAlign: "center",
                                    cursor: "pointer",
                                    border: isSelected ? "3px solid #ff9f43" : "1px solid #ccc",
                                    backgroundColor: isSelected ? "#fbf2eaff" : "#fff",
                                    position: "relative",

                                    transition: "all 0.1s ease",
                                    "&:hover": {
                                      transform: "scale(1.02)",
                                      border: "3px solid #ff9f43",
                                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                                      "& svg": { color: "#ff9f43" }, // ✅ icon color changes on hover
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
                                  <Box sx={{ fontSize: 50, mb: 1 }}>
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
                    </Box>
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
                    <Box mb={2} mt={2} textAlign="center">
                      <Typography
                        variant="h6"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: "bold", marginBottom: 2 }}
                      >
                        Verify yourself as Seller
                      </Typography>
                      <Container maxWidth="md" >
                        <Typography
                        variant="subtitle1"
                        align="center"
                        // gutterBottom
                        sx={{  marginBottom: 3 }}
                      >
                       To sell a vehicle through Movaro you need to upload picture of your driving licence. This is security requirement form Pakistani transport agency, and is only done once
                      </Typography>
                      </Container>
                      <input
                        type="file"
                        accept="image/*"
                        id="documentPath"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {

                              setFieldValue("documentPath", reader.result);
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <label htmlFor="documentPath">
                        <Paper
                          sx={{
                            p: 2,
                            border: "1px dashed #ccc",
                            cursor: "pointer",
                            borderRadius: 2,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 200,
                            height: 200,
                            overflow: "hidden",
                            textAlign: "center",
                            flexDirection: "column",
                            "&:hover": { backgroundColor: "#f5f5f5" },
                          }}
                        >
                          {values.documentPath ? (
                            <img
                              src={values.documentPath}
                              alt="Uploaded"
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
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

                      {touched.documentPath && errors.documentPath && (
                        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                          {errors.documentPath}
                        </Typography>
                      )}
                    </Box>

                    <Box mt={3} display="flex" justifyContent="center">
                      <FormControlLabel
                        control={
                          <Switch
                            checked={values.documentValidate}
                            onChange={(e) =>
                              setFieldValue("documentValidate", e.target.checked)
                            }
                            color="primary"
                          />
                        }
                        label="I confirm the document is valid"
                      />
                    </Box>



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
    disabled={isSubmitting} // Formik ka isSubmitting
  >
    {isSubmitting ? (
      <CircularProgress size={24} sx={{ color: "white" }} />
    ) : activeStep === 1 ? (
      "Submit Valuation"
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
          initialValues={{ valuationBySeller: "" }}

          onSubmit={async (values, { setSubmitting }) => {

            const companyVal = Number(carData.valuationCompany);
            const individualVal = Number(carData.valuationIndividual);
            const sellerVal = Number(values.valuationBySeller);

            if (sellerVal < companyVal - 50000 || sellerVal > companyVal + 50000) {
              setError("❌ Seller valuation must be within ±50,000 of company valuation");
              return;
            }

            if (sellerVal < individualVal - 50000 || sellerVal > individualVal + 50000) {
              setError("❌ Seller valuation must be within ±50,000 of individual valuation");
              return;
            }

            setError("");


            console.log("✅ Valid Valuation:", sellerVal);

            if (!carData) {
              Swal.fire("Error", "Please search for the car first!", "error");
              return;
            }


            const payload = {
              ...carData,
              profileImage: "",
              valuationBySeller: values.valuationBySeller,
            };

            console.log("Submitting payload:", payload);
          try {
              setSubmitting(true)
      const response = await ApiCall({
        url: "https://localhost:44311/api/services/app/CarInfo/Update",
        method: "PUT", // Update ke liye PUT use hota hai
        data: payload,
      });

      console.log("API Response:", response);

      Swal.fire("Success!", "Price submitted 🎉", "success");
      setActiveStep(3);  
    } catch (error) {
      console.error("API Error:", error);
      Swal.fire("Error", "Failed to update car info ❌", "error");
    } finally {
      setSubmitting(false);
    }
     
          }}
        >
          {({ values, handleChange, handleSubmit ,isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Box textAlign="center" mt={2}>
                <Typography variant="h5" fontWeight="bold">
                  Start Your Sale
                </Typography>
                <Typography variant="subtitle1" mt={1}>
                  Enter the registration number of the car you want to sell
                </Typography>

                {/* Search Box */}
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

                {error && (
                  <Typography variant="subtitle1" color="error" mt={3}>
                    {error}
                  </Typography>
                )}

                {/* Car Info Box */}
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
                      {carData.name} ({carData.year})
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
                      {/* Left Column */}
                      <Grid size={{xs:12,md:4}}>
                        <Typography margin={1}><ConfirmationNumberIcon /> <b>Registration:</b> {carData.registrationNo}</Typography>
                        <Typography margin={1}><DirectionsCarIcon /> <b>Name:</b> {carData.name}</Typography>
                        <Typography margin={1}><BusinessIcon /> <b>Company:</b> {carData.company}</Typography>
                        <Typography margin={1}><NumbersIcon /> <b>Chassis No:</b> {carData.chassisNo}</Typography>
                        <Typography margin={1}><SettingsIcon /> <b>Engine No:</b> {carData.engineNo}</Typography>
                        <Typography margin={1}><SpeedIcon /> <b>Horse Power:</b> {carData.horsePower}</Typography>
                        <Typography margin={1}><CalendarMonthIcon /> <b>Year:</b> {carData.year}</Typography>
                        <Typography margin={1}><PaletteIcon /> <b>Color:</b> {carData.color}</Typography>
                        <Typography margin={1}><LuggageIcon /> <b>Trunk Volume:</b> {carData.trunkVolume}</Typography>
                        
                      </Grid>

                      {/* Middle Column */}
                      <Grid size={{xs:12,md:4}}>
                        <Typography margin={1}><CategoryIcon /> <b>Classification:</b> {carData.classification}</Typography>
                        <Typography margin={1}><AutoModeIcon /> <b>Generation:</b> {carData.generation}</Typography>
                        <Typography margin={1}><SettingsSuggestIcon /> <b>Transmission:</b> {carData.transmission}</Typography>
                        <Typography margin={1}><DirectionsCarIcon /> <b>Drivetrain:</b> {carData.drivetrain}</Typography>
                        
                        <Typography margin={1}><CategoryIcon /> <b>Trim Level:</b> {carData.trimLevel}</Typography>
                        <Typography margin={1}><LocalGasStationIcon /> <b>Tank Volume:</b> {carData.tankVolume}</Typography>
                        <Typography margin={1}><PersonIcon /> <b>Owner:</b> {carData.owner}</Typography>
                        <Typography margin={1}><AirlineSeatReclineNormalIcon /> <b>Seats:</b> {carData.numberOfSeats}</Typography>
                      </Grid>

                      {/* Right Column */}

                      <Grid size={{xs:12,md:4}}>
                        <Typography margin={1}><SpeedIcon /> <b>Acceleration:</b> {carData.acceleration}</Typography>
                        <Typography margin={1}><InsertDriveFileIcon /> <b>Stolen Report:</b> {carData.stolenReport}</Typography>
                        <Typography margin={1}><BusinessIcon /> <b>Valuation Company:</b> {carData.valuationCompany}</Typography>
                        <Typography margin={1}><CategoryIcon /> <b>Valuation Individual:</b> {carData.valuationIndividual}</Typography>
                        <Typography margin={1}><b>In Traffic:</b> {carData.inTraffic ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</Typography>
                        <Typography margin={1}><b>Is Domestic:</b> {carData.isDomestic ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</Typography>
                        <Typography margin={1}><b>Is Repaired:</b> {carData.isRepaired ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</Typography>
                        <Typography margin={1}><b>Contract Signed by Seller:</b> {carData.isContractSignedBySeller ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</Typography>
                      </Grid>
                    </Grid>


                  </Paper>
                )}

{carData && (
                <Box mt={3} textAlign="center">
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Valuation By Seller (PKR)
                  </Typography>
                  <TextField
                    label="Valluation By Seller"
                    name="valuationBySeller"
                    value={values.valuationBySeller}
                    onChange={handleChange}
                    variant="outlined"
                    size="small"
                    disabled={!carData}
                    sx={{ width: "300px", borderRadius: 2 }}
                  />
                </Box>
                )}
                {error && (
                  <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                    {error}
                  </div>
                )}


                <Box display="flex" justifyContent="space-between" mt={5}>
                  <Button onClick={() => setActiveStep(1)} sx={{ color: "#ff9f43" }}>
                    Back
                  </Button>
             <Button
  type="submit"
  variant="contained"
  disabled={isSubmitting}
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
    "Submit Valuation"
  )}
</Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      )}


      {/* --------- Step 4: Success --------- */}
      {activeStep === 3 && (
        <motion.div
          key="step4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
       <SaleSuccess/>

         <Button  variant="contained" onClick={() => {
          
    setActiveStep(0);  
  }} sx={{ backgroundColor: "#ff9f43", color: "white" }}>
                    Complete
                  </Button>
        </motion.div>
        
      )}
    </Paper>
  );
}

export default SellerProfile;
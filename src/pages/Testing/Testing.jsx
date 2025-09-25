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
  Grid,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ApiCall from "../../Apicall/ApiCall";
const steps = [
  "Step 1: Name",
  "Step 2: Number",
  "Step 3: Price",
  "Step 4: Items",
];

function TestingPage() {

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
        maxWidth: 600,
        margin: "auto",
        mt: 5,
        p: 4,
        borderRadius: 3,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Multi-Step Form Flow
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
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
              setSubmitted(true);
              setActiveStep(2);
              // try {
              //   setLoading(true);
              //   setSubmitting(true);

              //   const response = await ApiCall({
              //     url: "https://localhost:44311/api/services/app/Seller/Create",
              //     method: "POST",
              //     data: finalValues,
              //   });

              //   if (response?.data?.success) {
              //     Swal.fire("Success", "Data submitted successfully!", "success");
              //     resetForm();
              //     setSubmitted(true);
              //     setActiveStep(2);  
              //   } else {
              //     Swal.fire("Error", response?.data?.error || "Submission failed", "error");
              //   }
              // } catch (err) {
              //   Swal.fire("Error", err.message || "Submission failed", "error");
              // } finally {
              //   setLoading(false);
              //   setSubmitting(false);
              // }
            } else {
              // ✅ Step 1 → Step 2
              setActiveStep((prev) => prev + 1);
            }
          }}
        >
          {({ errors, touched, handleSubmit, values, setFieldValue }) => (
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
                    <Box mb={2} textAlign="center">
                      <Typography
                        variant="h6"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: "bold", marginBottom: 3 }}
                      >
                        Upload Document and Validate it
                      </Typography>
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
                >
                  {activeStep === 1 ? "Submit First Form" : "Next"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      )}

      {/* ------------------ FORM 2 ------------------ */}
      {activeStep === 2 && (
        <Formik
          initialValues={{ price: "" }}
          // validationSchema={validationSchemas2[0]}
          onSubmit={(values, { setSubmitting }) => {
            console.log("Form 2 Submitted:", values);
            Swal.fire("Success!", "Price submitted 🎉", "success");
            setActiveStep(3); // move to Step 4
            setSubmitting(false);
          }}
        >
          {({ errors, touched, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                <motion.div
                  key="step3"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
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
                    {error && (
                      <Typography variant="subtitle1" color="error" mt={3}>
                        {error}
                      </Typography>
                    )}

                    {carData && (
                      <Paper
                        elevation={4}
                        sx={{
                          mt: 4,
                          p: 3,
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
                        <Grid container spacing={3}>
                          <Grid size={{ xs: 12, md: 4 }} >
                            <Box> <Typography margin={1}><ConfirmationNumberIcon /> <b>Registration:</b> {carData.registrationNo || "No Data ❌"}</Typography></Box>
                            <Typography margin={1}><DirectionsCarIcon /> <b>Name:</b> {carData.name || "No Data ❌"}</Typography>
                            <Typography margin={1}><BusinessIcon /> <b>Company:</b> {carData.company || "No Data ❌"}</Typography>
                            <Typography margin={1}><NumbersIcon /> <b>Chassis No:</b> {carData.chassisNo || "No Data ❌"}</Typography>
                            <Typography margin={1}><SettingsIcon /> <b>Engine No:</b> {carData.engineNo || "No Data ❌"}</Typography>
                            <Typography margin={1}><SpeedIcon /> <b>Horse Power:</b> {carData.horsePower || "No Data ❌"}</Typography>
                            <Typography margin={1}><CalendarMonthIcon /> <b>Year:</b> {carData.year || "No Data ❌"}</Typography>
                            <Typography margin={1}><PaletteIcon /> <b>Color:</b> {carData.color || "No Data ❌"}</Typography>
                          </Grid>


                          <Grid size={{ xs: 12, md: 4 }}>
                            <Typography margin={1}><CategoryIcon /> <b>Classification:</b> {carData.classification || "No Data ❌"}</Typography>
                            <Typography margin={1}><AutoModeIcon /> <b>Generation:</b> {carData.generation || "No Data ❌"}</Typography>
                            <Typography margin={1}><SettingsSuggestIcon /> <b>Transmission:</b> {carData.transmission || "No Data ❌"}</Typography>
                            <Typography margin={1}><DirectionsCarIcon /> <b>Drivetrain:</b> {carData.drivetrain || "No Data ❌"}</Typography>
                            <Typography margin={1}><SpeedIcon /> <b>Acceleration:</b> {carData.acceleration || "No Data ❌"}</Typography>
                            <Typography margin={1}><CategoryIcon /> <b>Trim Level:</b> {carData.trimLevel || "No Data ❌"}</Typography>
                            <Typography margin={1}><LocalGasStationIcon /> <b>Tank Volume:</b> {carData.tankVolume || "No Data ❌"}</Typography>
                            <Typography margin={1}><PersonIcon /> <b>Owner:</b> {carData.owner || "No Data ❌"}</Typography>
                          </Grid>


                          <Grid size={{ xs: 12, md: 4 }}>
                            <Typography margin={1}><LuggageIcon /> <b>Trunk Volume:</b> {carData.trunkVolume || "No Data ❌"}</Typography>
                            <Typography margin={1}><AirlineSeatReclineNormalIcon /> <b>Seats:</b> {carData.numberOfSeats || "No Data ❌"}</Typography>
                            <Typography margin={1}><InsertDriveFileIcon /> <b>Stolen Report:</b> {carData.stolenReport || "No Data ❌"}</Typography>
                            <Typography margin={1}><BusinessIcon /> <b>Valuation Company:</b> {carData.valuationCompany || "No Data ❌"}</Typography>
                            <Typography margin={1}><CategoryIcon /> <b>Valuation Individual:</b> {carData.valuationIndividual || "No Data ❌"}</Typography>
                            <Typography margin={1}>
                              <b>In Traffic:</b>{" "}
                              {carData.inTraffic ? (
                                <CheckCircleIcon color="success" />
                              ) : (
                                <CancelIcon color="error" />
                              )}
                            </Typography>

                          </Grid>
                        </Grid>



                      </Paper>
                    )}
                    <Divider sx={{ marginTop: 5 }} />
                    <Box
                      mt={3}
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"   // ✅ yahan add kiya
                    >

                      <Typography margin={1}>
                        <AttachMoneyIcon /> <b>Current Price</b>
                      </Typography>

                      <TextField
                        label="Current Price (PKR)"
                        variant="outlined"
                        size="small"
                        sx={{
                          width: "300px",
                          backgroundColor: "#fff",
                          borderRadius: "8px",
                        }}
                      />
                    </Box>
                  </Box>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <Box display="flex" justifyContent="space-between" mt={5}>
                <Button
                  onClick={() => setActiveStep(1)}
                  sx={{ color: "#ff9f43" }}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: "#ff9f43", color: "white" }}
                >
                  Submit Price
                </Button>
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
          <Box textAlign="center" py={5}>
            <Typography variant="h4" color="green" fontWeight="bold">
              🎉 All Steps Completed Successfully!
            </Typography>
          </Box>
        </motion.div>
      )}
    </Paper>
  );
}

export default TestingPage;
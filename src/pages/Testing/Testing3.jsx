// import { Box, Paper, Typography, Grid, Container } from "@mui/material";
// import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
// import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
// import BusinessIcon from "@mui/icons-material/Business";
// import NumbersIcon from "@mui/icons-material/Numbers";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
// import SettingsIcon from "@mui/icons-material/Settings";
// import SpeedIcon from "@mui/icons-material/Speed";
// import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
// import CategoryIcon from "@mui/icons-material/Category";
// import AutoModeIcon from "@mui/icons-material/AutoMode";
// import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
// import PersonIcon from "@mui/icons-material/Person";
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";

// import React from "react";
 

// function Testing3() {
//   const carData = {
//     registrationNo: "ZZR108",
//     registreringsnummer: "ABC123",
//     fordonsuppgifter: {
//       fordonsbenamning: "XC60",
//       handelsbeteckning: "Volvo XC60",
//       fordonsar: 2020,
//       arsmodell: 2021,
//       registreringsdatum: "2020-06-15",
//     },
//     tekniskData: {
//       drivmedel: [{ drivmedel: "Gasoline" }],
//       vaxellada: "Automatic",
//       fyrhjulsdrift: true,
//     },
//     miljoklassning: { elfordonKonfiguration: "N/A" },
//     besiktning: {
//       besiktningsgrupp: "Group A",
//       dispensbesiktningsgrupp: "None",
//       foregaendeBesiktningsprogramkod: "FP123",
//       besiktningsdatum: "2022-05-10",
//       foregaendeBesiktningsdatum: "2021-05-10",
//       matarstallning: "Front",
//       besiktningsprogramkod: "BP2022",
//       besiktningsstation: "Station 1",
//     },
//     beraknat: {
//       skatt: {
//         skatt: 5000,
//         malus: 200,
//       },
//     },
//     fordonBrukareAgare: { antalBrukare: 1 },
//   };

//   return (
//     <Container  maxWidth="sm">
//       <Paper
//         elevation={4}
//         sx={{
//           mt: 4,
//           p: 2,
//           maxWidth: 1200,
//           mx: "auto",
//           textAlign: "left",
//           borderRadius: "16px",
//           // background: "linear-gradient(140deg, #ffffffff 20%, #fad3aeff 100%)",
//         }}
//       >
//         <Typography variant="h6" color="#ff9f43" fontWeight="bold" gutterBottom>
//           {carData.registrationNo} , {carData.fordonsuppgifter.arsmodell}
//         </Typography>

//         <Grid container spacing={1}>
//            <Grid size={{xs:12,md:6}}>
//             <Typography margin={1}>
//               <ConfirmationNumberIcon /> <b>Registration:</b> {carData.registreringsnummer}
//             </Typography>
//             <Typography margin={1}>
//               <DirectionsCarIcon /> <b>Vehicle Designation:</b>{" "}
//               {carData.fordonsuppgifter.fordonsbenamning}
//             </Typography>
           
//             <Typography margin={1}>
//               <NumbersIcon /> <b>Vehicle Years:</b> {carData.fordonsuppgifter.fordonsar}
//             </Typography>
          
//             <Typography margin={1}>
//               <LocalGasStationIcon /> <b>Fuel:</b>{" "}
//               {carData.tekniskData.drivmedel.map((d) => d.drivmedel).join(", ")}
//             </Typography>
            
        
//           </Grid>

//          <Grid size={{xs:12,md:6}}>
//            <Typography margin={1}>
//               <BusinessIcon /> <b>Trade Name:</b>{" "}
//               {carData.fordonsuppgifter.handelsbeteckning}
//             </Typography>
//               <Typography margin={1}>
//               <CalendarMonthIcon /> <b>Year Model:</b> {carData.fordonsuppgifter.arsmodell}
//             </Typography>
//                 <Typography margin={1}>
//               <SettingsSuggestIcon /> <b>Four Wheel Drive:</b>{" "}
//               {carData.tekniskData.fyrhjulsdrift ? "Yes" : "No"}
//             </Typography>
//             <Typography margin={1}>
//               <SettingsIcon /> <b>Gearbox:</b> {carData.tekniskData.vaxellada}
//             </Typography>
          
//           </Grid>
//         </Grid>
//       </Paper>
//     </Container>
//   );
// }

// export default Testing3;
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Container,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";
import ApiCall from "../../Apicall/ApiCall";

function Testing3() {
  const [registration, setRegistration] = useState("");
  const [loading, setLoading] = useState(false);
  const [carData, setCarData] = useState(null);

  const handleCheckCar = async () => {
    if (!registration) {
      Swal.fire("Missing", "Please enter registration number", "warning");
      return;
    }

    setLoading(true);
    setCarData(null);

    try {
      const res = await ApiCall({
        url: "/CarInfo/GetVehicleInfo",
        method: "GET",
        params: { Id: registration },
      });

      console.log("API SUCCESS RESPONSE 👉", res);

      const result = res?.data?.result;

      if (!result || result.length === 0) {
        Swal.fire("Not Found", "Car not found", "info");
        return;
      }

      setCarData(result[0]);
      Swal.fire("Success", "Car data fetched successfully", "success");

    } catch (err) {
      console.error("API ERROR 👉", err);

      const backendError = err?.response?.data?.error;

      if (backendError) {
        Swal.fire(
          backendError.message || "Error",
          backendError.details || "Backend error occurred",
          "error"
        );
      } else {
        Swal.fire("Error", err.message || "Unexpected error", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3, mt: 5 }}>
        <Typography variant="h6" mb={2}>
          Car API Test
        </Typography>

        <TextField
          fullWidth
          label="Registration Number"
          value={registration}
          onChange={(e) => setRegistration(e.target.value)}
        />

        <Button
          fullWidth
          sx={{ mt: 2 }}
          variant="contained"
          onClick={handleCheckCar}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Check Car"}
        </Button>

        {carData && (
          <Box mt={3}>
            <Typography variant="subtitle2">Result:</Typography>
            <pre style={{ fontSize: 12 }}>
              {JSON.stringify(carData, null, 2)}
            </pre>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default Testing3;

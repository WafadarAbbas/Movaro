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


import { Box, Paper, Typography, Grid, Container } from "@mui/material";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BusinessIcon from "@mui/icons-material/Business";
import NumbersIcon from "@mui/icons-material/Numbers";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import React from "react";

function Testing3() {
  const carData = {
    registrationNo: "ZZR108",
    registreringsnummer: "ABC123",
    fordonsuppgifter: {
      fordonsbenamning: "XC60",
      handelsbeteckning: "Volvo XC60",
      fordonsar: 2020,
      arsmodell: 2021,
      registreringsdatum: "2020-06-15",
    },
    tekniskData: {
      drivmedel: [{ drivmedel: "Gasoline" }],
      vaxellada: "Automatic",
      fyrhjulsdrift: true,
    },
  };

  const InfoRow = ({ icon, label, value }) => (
    <Box display="flex" alignItems="center" gap={1.5} mb={1}>
      <Box
        sx={{
          backgroundColor: "#fdf6f0ff",
          p: 0.8,
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography fontSize="12px" color="gray">
          {label}
        </Typography>
        <Typography fontWeight="bold">
          {value}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: "16px",
          backgroundColor: "#ffffff",
        }}
      >
        {/* HEADER */}
        <Typography
          fontWeight="bold"
          sx={{ fontSize: "16px", mb: 2 }}
        >
          {carData.fordonsuppgifter.handelsbeteckning}, {carData.fordonsuppgifter.arsmodell}
        </Typography>

        <Grid container spacing={2}>
          {/* LEFT */}
             <Grid size={{xs:12,md:6}}>
            <InfoRow
              icon={<ConfirmationNumberIcon sx={{color:"#ff9f43"}}  fontSize="small" />}
              label="Registreringsnummer"
              value={carData.registreringsnummer}
            />
            <InfoRow
              icon={<LocalGasStationIcon  sx={{color:"#ff9f43"}}  fontSize="small" />}
              label="Bränsle"
              value={carData.tekniskData.drivmedel.map(d => d.drivmedel).join(", ")}
            />
            <InfoRow
              icon={<SettingsSuggestIcon  sx={{color:"#ff9f43"}}  fontSize="small" />}
              label="Drivning"
              value={carData.tekniskData.fyrhjulsdrift ? "Fyrhjulsdrift" : "Tvåhjulsdrift"}
            />
          </Grid>

          {/* RIGHT */}
            <Grid size={{xs:12,md:6}}>
            <InfoRow
              icon={<BusinessIcon  sx={{color:"#ff9f43"}}  fontSize="small" />}
              label="Mätarställning"
              value="13 605 mil"
            />
            <InfoRow
              icon={<SettingsIcon  sx={{color:"#ff9f43"}}  fontSize="small" />}
              label="Växellåda"
              value={carData.tekniskData.vaxellada}
            />
            <InfoRow
              icon={<NumbersIcon  sx={{color:"#ff9f43"}}  fontSize="small" />}
              label="Motor"
              value="3604 cc, 421 hk"
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Testing3;

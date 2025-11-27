import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

const Footer = ({
  logo,
  onScrollToSection,
  onScrollToPriser,
  onScrollToQuestion,
  onScrollToGuider,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#ff9f63",
        color: "#ffff",
 
        overflow: "hidden",
        pt: 15,
        pb: 3,
        clipPath: "polygon(0 10%, 100% 0, 100% 100%, 0% 100%)",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
      
          <Grid size={{ xs: 12, md: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <img
                src={logo}
                alt="logo"
                style={{ height: 40, width: 70, display: "block" }}
              />
              <Typography variant="body2" fontWeight={600}>
                Trygg affär för fordon i ett flöde
              </Typography>
            </Box>
          </Grid>

         
          <Grid size={{ xs: 4, md: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {[
                { label: "Hur det funkar", action: onScrollToSection },
                { label: "Priser", action: onScrollToPriser },
                { label: "Frågor och svar", action: onScrollToQuestion },
                { label: "Guider", action: onScrollToGuider },
              ].map((item, index) => (
                <Typography
                  key={index}
                  fontWeight={600}
                  variant="subtitle2"
                  sx={{
                    cursor: "pointer",
                    color: "#fff",
                    transition: "color 0.3s ease",
                    "&:hover": { color: "#004050ff" },
                  }}
                  onClick={item.action}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          </Grid>

         
          <Grid size={{ xs: 4, md: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {["Villkor", "Integritet", "Cookies", " "].map((item, index) => (
                <Typography
                  key={index}
                   fontWeight={600}
                  variant="subtitle2"
                  color="#fff"
                  sx={{ cursor: "pointer" }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>

        
          <Grid size={{ xs: 4, md: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {["Support", "Press", "Om oss", " "].map((item, index) => (
                <Typography
                  key={index}
                   fontWeight={600}
                  variant="subtitle2"
                  color="#fff"
                  sx={{ cursor: "pointer" }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>

       
        <Box
          sx={{
            borderBottom: "1px solid rgba(255,255,255,0.2)",
            my: 3,
          }}
        />

      
        <Typography
          variant="body2"
          align="center"
          sx={{ color: "rgba(255,255,255,0.9)" }}
        >
          © 2024 Klargo. Alla rättigheter förbehållna.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

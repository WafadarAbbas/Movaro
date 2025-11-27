import React, { useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
 
export default function PrimaryAppBar({ logoSrc, onScrollToSection,onScrollToPriser ,onScrollToQuestion,onScrollToGuider }) {
  const menuLabels = ["Hur det funkar", "Priser", "Frågor och svar", "Guider"];

 
 ;
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(6px)",
      }}
      elevation={1}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ position: "relative", minHeight: 64 }}>
          {/* Left: logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src={logoSrc}
              alt="logo"
              style={{ height: 60, width: "auto", display: "block" }}
            />
          </Box>

         
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 2,
              alignItems: "center",
            }}
          >
            {menuLabels.map((label, index) => (
              <Button
                key={index}
                onClick={() => {
                   
                  if (label === "Hur det funkar" && onScrollToSection) {
                    onScrollToSection();
                  }
                  else if (label === "Priser" && onScrollToPriser) {
                    onScrollToPriser();
                  }
                   else if (label === "Frågor och svar" && onScrollToQuestion) {
                    onScrollToQuestion();
                  }

                   else if (label === "Guider" && onScrollToGuider) {
                    onScrollToGuider();
                  }
                  
                }}
                sx={{
                  textTransform: "none",
                  color: "#000",
                  fontWeight: 700,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "0%",
                    height: "2px",
                    bottom: 0,
                    left: 0,
                    backgroundColor: "#ff9f63",
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

           <Box sx={{ marginLeft: "auto", display: { xs: "none", md: "flex" } }}>
            <Button
              variant="contained"
                   
              sx={{
                backgroundColor: "#ff9f63",
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                px: 3,
                borderRadius: 2,
                "&:hover": { backgroundColor: "#ff8840" },
              }}
            >
              Logga in
            </Button>
          </Box>

         
          <Box sx={{ marginLeft: "auto", display: { xs: "flex", md: "none" } }}>
            <IconButton edge="end" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
     
    </AppBar>
  );
}


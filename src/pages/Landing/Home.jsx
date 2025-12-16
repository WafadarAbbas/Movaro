import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Box, Container, Grid, Typography, Stack, Button, LinearProgress, Paper, List, Card, CardContent,
  ListItem,
  ListItemIcon,
  ListItemText, Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { AppSettings } from "../../config/app-settings.js";
import "./Home.css";
import ShieldOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { useTranslation } from "react-i18next";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Footer from "./Footer.jsx";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import LoginModal from "./loginModal.js";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  FaCar,
  FaMotorcycle,
  FaTruck,
  FaShip,
  FaTrailer,
} from "react-icons/fa";
import { MdElectricScooter } from "react-icons/md";
import logo from "../../assets/Klargo1.png";
import { Link } from "react-router-dom";

const Home = () => {
  const { t, i18n } = useTranslation();
  const context = useContext(AppSettings);
  const servicesSectionRef = React.useRef(null);
  const PriserSectionRef = React.useRef(null);
  const questionsSectionRef = React.useRef(null);
  const guiderSectionRef = React.useRef(null);
  const createRef = useRef(null);
  const refClose = useRef(null);


  const [langAnchorEl, setLangAnchorEl] = useState(null);
  const langOpen = Boolean(langAnchorEl);

  const handleLangClick = (e) => setLangAnchorEl(e.currentTarget);
  const handleLangClose = () => setLangAnchorEl(null);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("appLanguage", lang);
    handleLangClose();
  };

  useEffect(() => {
    context.setAppHeaderNone(true);

    return () => {
      context.setAppHeaderNone(false);
    };
  }, []);

  const scrollToServices = () => {
    servicesSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToPriser = () => {
    PriserSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToQuestions = () => {
    questionsSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToGuider = () => {
    guiderSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const [hoveredCard, setHoveredCard] = useState(null);


  const cards = [
    {
      id: 1,
      title: t("home.cards.contract.title"),
      lines: [
        "home.cards.contract.line1",
        "home.cards.contract.line2",
        "home.cards.contract.line3",
        "home.cards.contract.line4"
      ]
    },
    {
      id: 2,
      title: t("home.cards.payment.title"),
      lines: [
        "home.cards.payment.line1",
        "home.cards.payment.line2",
        "home.cards.payment.line3",
        "home.cards.payment.line4"
      ]
    },
    {
      id: 3,
      title: t("home.cards.insurance.title"),
      lines: [
        "home.cards.insurance.line1",
        "home.cards.insurance.line2",
        "home.cards.insurance.line3",
        "home.cards.insurance.line4"
      ]
    },
    {
      id: 4,
      title: t("home.cards.ownership.title"),
      lines: [
        "home.cards.ownership.line1",
        "home.cards.ownership.line2",
        "home.cards.ownership.line3",
        "home.cards.ownership.line4",
        "home.cards.ownership.line5"
      ]
    }
  ];

  const iconsMap = {
    ShieldOutlinedIcon: <ShieldOutlinedIcon sx={{ fontSize: 25, color: "#ff9f63" }} />,
    DescriptionOutlinedIcon: <DescriptionOutlinedIcon sx={{ fontSize: 25, color: "#ff9f63" }} />,
    CreditCardOutlinedIcon: <CreditCardOutlinedIcon sx={{ fontSize: 25, color: "#ff9f63" }} />,
    CheckCircleOutlineOutlinedIcon: <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 25, color: "#ff9f63" }} />,
    VerifiedUserOutlinedIcon: <VerifiedUserOutlinedIcon sx={{ fontSize: 25, color: "#ff9f63" }} />,
  };
  const ServiceCards = t("home.serviceCards", { returnObjects: true });


  const iconsMap2 = {
    PersonOutlineIcon: <PersonOutlineIcon sx={{ fontSize: 32, color: "#ff9f63" }} />,
    LockOutlinedIcon: <LockOutlinedIcon sx={{ fontSize: 32, color: "#ff9f63" }} />,
    VerifiedUserOutlinedIcon: <VerifiedUserOutlinedIcon sx={{ fontSize: 32, color: "#ff9f63" }} />,
  };


  const vehicles = [
    {
      key: "car",
      label: t("home.vehicles.car.label"),
      message: t("home.vehicles.car.message"),
      Icon: FaCar,
    },
    {
      key: "motorcycle",
      label: t("home.vehicles.motorcycle.label"),
      message: t("home.vehicles.motorcycle.message"),
      Icon: FaMotorcycle,
    },
    {
      key: "scooter",
      label: t("home.vehicles.scooter.label"),
      message: t("home.vehicles.scooter.message"),
      Icon: MdElectricScooter,
    },
    {
      key: "ship",
      label: t("home.vehicles.ship.label"),
      message: t("home.vehicles.ship.message"),
      Icon: FaShip,
    },
    {
      key: "trailer",
      label: t("home.vehicles.trailer.label"),
      message: t("home.vehicles.trailer.message"),
      Icon: FaTrailer,
    },
    {
      key: "truck",
      label: t("home.vehicles.truck.label"),
      message: t("home.vehicles.truck.message"),
      Icon: FaTruck,
    },
  ];

  const cardsss = [
    {
      icon: <DescriptionOutlinedIcon sx={{ fontSize: 40, color: "#ff9f63" }} />,
      title: t("home.dealCards.sell.title"),
      text: t("home.dealCards.sell.text"),
      list: t("home.dealCards.sell.list", { returnObjects: true }),
      button: t("home.dealCards.sell.button"),
    },
    {
      icon: <CreditCardOutlinedIcon sx={{ fontSize: 40, color: "#ff9f63" }} />,
      title: t("home.dealCards.buy.title"),
      text: t("home.dealCards.buy.text"),
      list: t("home.dealCards.buy.list", { returnObjects: true }),
      button: t("home.dealCards.buy.button"),
    },
  ];



  const [selected, setSelected] = useState("car");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (label) => {
    setAnchorEl(null);
    if (label === "Hur det funkar") scrollToServices();
    else if (label === "Priser") scrollToPriser();
    else if (label === "Frågor och svar") scrollToQuestions();
    else if (label === "Guider") scrollToGuider();
  };



  return (
    <Box  >
      <Box>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(6px)",
          }}
          elevation={1}
        >
          <Container maxWidth="lg">
            <Toolbar sx={{ position: "relative", minHeight: 64 }}>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <img
                  src={logo}
                  alt="logo"
                  style={{
                    height: "30px",
                    width: "auto",
                    objectFit: "contain",
                    display: "block"
                  }}
                />
              </Box>



              <Box
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: { xs: "none", md: "flex" },
                  gap: 2,
                  alignItems: "center",
                }}
              >
                {t("home.navLinks", { returnObjects: true }).map((link, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      if (link.key === "howItWorks") scrollToServices();
                      else if (link.key === "pricing") scrollToPriser();
                      else if (link.key === "faq") scrollToQuestions();
                      else if (link.key === "guides") scrollToGuider();
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
                      "&:hover::after": { width: "100%" },
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                  >
                    {link.label}
                  </Button>
                ))}
              </Box>



              <Box sx={{ marginLeft: "auto", display: { xs: "none", md: "flex" } }}>

                <Typography
                  onClick={handleLangClick}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    px: 1.5,
                    py: 0.5,
                    marginRight: 1,
                    border: "1px solid #c1c1c1",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: 500,
                    fontSize: 12,
                    color: "gray",
                    "&:hover": { borderColor: "#ff6f00" },
                  }}
                >
                  {i18n.language === "sv" ? "Svenska" : "English"}
                  <ArrowDropDownIcon fontSize="small" />
                </Typography>

                <Menu
                  anchorEl={langAnchorEl}
                  open={langOpen}
                  onClose={handleLangClose}
                  PaperProps={{
                    sx: {
                      borderRadius: "12px",
                      border: "2px solid #ff9f63",
                      mt: 1,
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => changeLanguage("en")}
                    sx={{
                      fontSize: "13px",
                      backgroundColor: "transparent !important",
                      "&:hover": { backgroundColor: "#ffecd1", color: "#ff6f00" },
                    }}
                  >
                    English
                  </MenuItem>
                  <MenuItem
                    onClick={() => changeLanguage("sv")}
                    sx={{
                      fontSize: "13px",
                      backgroundColor: "transparent !important",
                      "&:hover": { backgroundColor: "#ffecd1", color: "#ff6f00" },
                    }}
                  >
                    Svenska
                  </MenuItem>
                </Menu>
                <Button
                  variant="contained"
                  onClick={() => createRef.current.click()}
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
                  {t("home.loginButton")}
                </Button>
              </Box>


              <Box sx={{ marginLeft: "auto", display: { xs: "flex", md: "none" } }}>
                <IconButton edge="end" aria-label="menu" onClick={handleMenuOpen}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  {["Hur det funkar", "Priser", "Frågor och svar", "Guider"].map(
                    (label) => (
                      <MenuItem
                        key={label}
                        onClick={() => handleMenuClose(label)}
                        sx={{ textTransform: "none", fontWeight: 700, color: "#000" }}
                      >
                        {label}
                      </MenuItem>
                    )
                  )}

                  <MenuItem>
                     <Typography
                  onClick={handleLangClick}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    px: 1.5,
                    py: 0.5,
                    marginRight: 1,
                    border: "1px solid #c1c1c1",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: 500,
                    fontSize: 12,
                    color: "gray",
                    "&:hover": { borderColor: "#ff6f00" },
                  }}
                >
                  {i18n.language === "sv" ? "Svenska" : "English"}
                  <ArrowDropDownIcon fontSize="small" />
                </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        setAnchorEl(null);
                        setTimeout(() => {
                          createRef.current.click();
                        }, 0);
                      }}
                      sx={{
                        backgroundColor: "#ff9f63",
                        color: "#fff",
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: 2,
                        "&:hover": { backgroundColor: "#ff8840" },
                      }}
                    >
                      Logga in
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>


            </Toolbar>
          </Container>
        </AppBar>
      </Box>




      {/* ----------------------------------------------------------- */}



      <Box sx={{
        bgcolor: "#fffbf9ff",
        minHeight: "100vh",
        py: 6,
      }}>
        <Container>
          <Grid container spacing={4} alignItems="center">

            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ p: 4 }}>
                <Typography variant="h2" fontWeight={600} gutterBottom>
                  {t("home.heroTitle")}
                </Typography>
                <Typography variant="h5" >
                  {t("home.heroSubtitle")}
                </Typography>

                <Box mt={2} >

                  <Stack direction="row" justifyContent="center" spacing={2} mb={3}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#ff9f63",

                        fontWeight: 600,
                        textTransform: "none",
                        px: 3,
                        py: 1.2,
                        borderRadius: "10px",
                        "&:hover": {
                          backgroundColor: "#ff8d47",
                        },
                      }}
                    >
                      {t("home.startDeal")}
                    </Button>

                    <Button
                      variant="outlined"
                      sx={{
                        color: "#ff9f63",
                        borderColor: "#ff9f63",
                        fontWeight: 600,
                        textTransform: "none",
                        px: 3,
                        py: 1.2,
                        borderRadius: "10px",
                        "&:hover": {
                          borderColor: "#ff8d47",
                          color: "#ff8d47",
                          backgroundColor: "#fdf6f1ff",
                        },
                      }}
                    >
                      {t("home.seeHowItWorks")}
                    </Button>
                  </Stack>


                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                    flexWrap="wrap"
                    mb={1}
                  >
                    <ShieldOutlinedIcon sx={{ fontSize: 18, color: "#555" }} />
                    <Typography variant="body2">{t("home.security.bankId")}</Typography>

                    <LockOutlinedIcon sx={{ fontSize: 18, color: "#555" }} />
                    <Typography variant="body2">
                      {t("home.security.dataSecurity")}
                    </Typography>

                    <DescriptionOutlinedIcon sx={{ fontSize: 18, color: "#555" }} />
                    <Typography variant="body2">
                      {t("home.security.trustedSources")}
                    </Typography>
                  </Stack>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    mt={2}
                  >
                    {t("home.security.partners")}
                  </Typography>
                </Box>
              </Box>

            </Grid>


            <Grid size={{ xs: 5, md: 7 }}>
              <Box className="card-stack">
                {cards.map((card, index) => (


                  <Box
                    key={card.id}
                    className={`stack-card card${index + 1} ${hoveredCard === card.id ? "active" : ""
                      }`}
                    onMouseEnter={() => setHoveredCard(card.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    sx={{
                      backgroundColor: ' #fff1e9ff',
                      borderRadius: 2,
                      borderRadius: '24px',

                    }}
                  >
                    <Box

                    >
                      <Typography variant="subtitle1" fontWeight={600}>
                        {card.title}
                      </Typography>
                      {card.lines.map((lineKey, i) => (
                        <Typography
                          key={i}
                          variant="body2"
                          mt={i === 0 ? 2 : 0}
                          mb={2}
                        >
                          {t(lineKey)}
                        </Typography>
                      ))}
                    </Box>
                  </Box>

                ))}


              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>


      {/* ----------------------------------------------------------- */}
      {/* <Box sx={{ bgcolor: "#ffffff", }}>

        <Container  >
          <Typography variant="h4" fontWeight={600} mb={4} pt={10} textAlign="center">
            Stöd för flera fordonstyper
          </Typography>

          {selected && (

            <Typography variant="subtitle1" color="text.secondary" mt={5} textAlign="center">
              {
                vehicles.find((v) => v.key === selected)?.message
              }
            </Typography>

          )}

          <Box textAlign="center" mt={6} pb={10}>

            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              mb={3}
            >
              {vehicles.map(({ key, label, Icon }) => (
                <Grid
                  size={{ xs: 4, md: 2 }}
                  key={key}
                  display="flex"
                  justifyContent="center"
                >
                  <Button
                    variant="outlined"
                    onClick={() => setSelected(key)}
                    startIcon={<Icon />}
                    sx={{
                      textTransform: "none",
                      borderRadius: "10px",
                      padding: "10px 20px",
                      borderColor:
                        selected === key ? "#ff9f63" : "rgba(0,0,0,0.12)",
                      color: selected === key ? "#ff9f63" : "inherit",
                      backgroundColor:
                        selected === key ? "rgba(255,159,99,0.06)" : "transparent",
                      "&:hover": {
                        borderColor: "#ff9f63",
                        color: "#ff9f63",
                        backgroundColor: "rgba(255,159,99,0.08)",
                      },
                      svg: {
                        fontSize: 20,
                      },
                    }}
                  >
                    {label}
                  </Button>
                </Grid>
              ))}
            </Grid>



          </Box>


        </Container>
      </Box> */}

      <Box sx={{ bgcolor: "#ffffff" }}>
        <Container>
          <Typography variant="h4" fontWeight={600} mb={4} pt={10} textAlign="center">
            {t("home.vehicles.title")}
          </Typography>

          {selected && (
            <Typography variant="subtitle1" color="text.secondary" mt={5} textAlign="center">
              {vehicles.find((v) => v.key === selected)?.message}
            </Typography>
          )}

          <Box textAlign="center" mt={6} pb={10}>
            <Grid container spacing={2} justifyContent="center" alignItems="center" mb={3}>
              {vehicles.map(({ key, label, Icon }) => (
                <Grid size={{ xs: 4, md: 2 }} key={key} display="flex" justifyContent="center">
                  <Button
                    variant="outlined"
                    onClick={() => setSelected(key)}
                    startIcon={<Icon />}
                    sx={{
                      textTransform: "none",
                      borderRadius: "10px",
                      padding: "10px 20px",
                      borderColor: selected === key ? "#ff9f63" : "rgba(0,0,0,0.12)",
                      color: selected === key ? "#ff9f63" : "inherit",
                      backgroundColor: selected === key ? "rgba(255,159,99,0.06)" : "transparent",
                      "&:hover": {
                        borderColor: "#ff9f63",
                        color: "#ff9f63",
                        backgroundColor: "rgba(255,159,99,0.08)",
                      },
                      svg: { fontSize: 20 },
                    }}
                  >
                    {label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* ----------------------------------------------------------- */}

      <Box
        sx={{
          backgroundColor: "#fffbf9ff",
          minHeight: "100vh",
          py: 10,
        }}
      >
        <Container>
          <Typography
            variant="h4"
            fontWeight={600}
            mb={6}
            textAlign="center"
          >
            {t("home.dealCards.dealCardsSectionTitle")}
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            {cardsss.map((card, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Box
                  sx={{
                    bgcolor: "#fff",
                    p: 4,
                    borderRadius: 4,
                    boxShadow: 2,
                    minHeight: 420,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#fdf4eeff",
                        borderRadius: "50%",
                        width: 60,
                        height: 60,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {card.icon}
                    </Box>
                    <Typography variant="h6" fontWeight={600}>
                      {card.title}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {card.text}
                  </Typography>

                  <List dense>
                    {card.list.map((item, i) => (
                      <ListItem key={i} sx={{ py: 0.2 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <CheckCircleIcon sx={{ color: "#ff9f63", fontSize: 18 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={item}
                          primaryTypographyProps={{ fontSize: 14 }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Box textAlign="center" mt={2}>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: "#ff9f63",
                        color: "#ff9f63",
                        borderRadius: 3,
                        px: 4,
                        py: 1,
                        "&:hover": {
                          backgroundColor: "#fef7f3ff",
                          borderColor: "#ff9f63",
                        },
                      }}
                      endIcon={<ArrowForwardIosIcon sx={{ fontSize: 14 }} />}
                    >
                      {card.button}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            textAlign="center"
            mt={4}
          >
            {t("home.confirmationText")}
          </Typography>
        </Container>
      </Box>

      {/* --------------------------------------------------------------------------- */}
      <Box sx={{ backgroundColor: "#fffbf9ff", minHeight: "100vh", py: 10 }}>
        <Container ref={servicesSectionRef}>
          <Typography
            variant="h4"
            fontWeight={600}
            mb={4}
            pt={8}
            textAlign="center"
          >
            {t("home.serviceCardsSectionTitle")}
          </Typography>

          <LinearProgress
            variant="determinate"
            value={60}
            sx={{
              height: 3,
              borderRadius: 5,
              marginBottom: 8,
              backgroundColor: "#ffffffff",
              "& .MuiLinearProgress-bar": {
                borderRadius: 5,
                backgroundColor: "#ff9f63",
              },
            }}
          />

          <Grid container spacing={3} justifyContent="center">
            {ServiceCards.map((card, index) => (
              <Grid size={{ xs: 6, md: 2.3 }} key={index}>
                <Box
                  sx={{
                    bgcolor: "#fff",
                    p: 1,
                    borderRadius: 3,
                    boxShadow: 3,
                    minHeight: 300,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#f9e5dbff",
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      mt: 2
                    }}
                  >
                    {iconsMap[card.icon]}

                  </Box>
                  <Typography variant="h6" fontWeight={600} mb={1} textAlign="center">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" p={1} textAlign="center">
                    {card.text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ----------------------------------------------------------- */}

      <Box sx={{ py: 6, backgroundColor: "#ffff" }}>
        <Container>
          <Typography variant="h4" fontWeight={600} mb={6} textAlign="center">
            {t("home.whyKlargo")}
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {t("home.whyChooseKlargo", { returnObjects: true }).map((card, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <Box
                  sx={{
                    bgcolor: "#ffffffff",
                    p: 1,
                    borderRadius: 3,
                    boxShadow: 3,
                    minHeight: 300,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#f7eee8ff",
                      width: 50,
                      height: 50,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 2,
                      mt: 2
                    }}
                  >
                    {iconsMap2[card.icon]}
                  </Box>
                  <Typography variant="h6" fontWeight={600} mb={1} textAlign={"center"}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign={"center"} p={1}>
                    {card.text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>




      {/* ----------------------------------------------------------- */}

      <Box sx={{
        backgroundColor: "#fffbf9ff", minHeight: "100vh",
      }}>
        <Container
          ref={PriserSectionRef}

        >
          <Typography variant="h3" fontWeight={600} mb={4} pt={10} textAlign="center">
            {t("home.pricingSectionTitle")}
          </Typography>

          <Box
            sx={{
              bgcolor: "#fff4ed",   // soft background
              borderRadius: 3,
              p: 4,
              textAlign: "center",
              boxShadow: "0px 8px 30px rgba(255, 159, 99, 0.5)",
              maxWidth: 500,
              mx: "auto",
            }}
          >
            <Typography variant="h2" fontWeight={700} mb={1}>
              {t("home.pricingAmount")} {t("home.pricingCurrency")}
            </Typography>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              {t("home.pricingSubtitle")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("home.pricingText")}
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {t("home.pricingFooter")}
            </Typography>
          </Box>
        </Container>
      </Box>



      {/* ----------------------------------------------------------- */}

      <Box
        sx={{
          backgroundColor: "#ffff",
          minHeight: "100vh",
          py: 10,
        }}
        ref={questionsSectionRef}
      >
        <Container>
          <Typography
            variant="h4"
            fontWeight={600}
            mb={6}
            textAlign="center"
          >
            {t("home.faqSectionTitle")}
          </Typography>


          <Grid container spacing={3} justifyContent="center">
            {t("home.faqItems", { returnObjects: true }).map((item, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Accordion

                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "18px",
                    padding: 2,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                    overflow: "hidden",
                    "&:before": { display: "none" },
                    "&.Mui-expanded": {
                      border: "1px solid #ff9f63",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#ff9f63" }} />}
                    sx={{
                      "& .MuiAccordionSummary-content": { marginY: 1 },
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={600}>
                      {item.title}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Typography variant="body2" color="text.secondary">
                      {item.content}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>



        </Container>
      </Box>


      {/* ----------------------------------------------------------- */}

      <Box
        sx={{
          backgroundColor: "#fffbf9ff",
          minHeight: "100vh",
          py: 2,

        }}
        ref={guiderSectionRef}
      >
        <Container>
          <Typography
            variant="h4"
            fontWeight={600}
            mb={6}
            textAlign="center"
          >
            {t("home.guideSectionTitle")}
          </Typography>


          <Grid container spacing={4} justifyContent="center">
            {t("home.stepCards", { returnObjects: true }).map((card, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Card
                  sx={{
                    background: "#fff",
                    borderRadius: "20px",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                    height: "100%",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 6, textAlign: "center" }}>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>


        <Container>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              marginTop: 5,
              boxShadow: "0 4px 10px rgba(0,0,0,0.33)",
            }}
          >

            <Typography variant="h5" fontWeight={600} mb={2}>
              {t("home.loanSectionTitle")}
            </Typography>

            {/* === Description === */}
            <Typography variant="body1" color="text.secondary" mb={3}>
              {t("home.loanDescription")}
            </Typography>

            {/* === Example Box === */}
            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                mb: 3,
                bgcolor: "#fff",
              }}
            >
              <Typography variant="subtitle1" fontWeight={600} mb={1}>
                {t("home.loanExampleTitle")}
              </Typography>
              <List sx={{ listStyleType: "disc", pl: 3 }}>

                {t("home.loanExampleList", { returnObjects: true }).map((item, i) => (
                  <ListItem key={i} sx={{ display: "list-item", py: 0 }}>{item}</ListItem>
                ))}
              </List>
            </Paper>


            <Grid container spacing={3}>
              <Grid item>
                <p href="#" underline="hover" sx={{ color: "#00bfa5", fontWeight: 500 }}>
                  {t("home.loanLinks")}

                </p>
              </Grid>
              <Grid item>
                <Typography component="span" color="text.disabled">
                  •
                </Typography>
              </Grid>
              <Grid item>
                <p href="#" underline="hover" sx={{ color: "#00bfa5", fontWeight: 500 }}>
                  {t("home.loanLinks2")}
                </p>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* ----------------------------------------------------------- */}


      <Box
        sx={{
          backgroundColor: "#ffff",
          minHeight: "80vh",
          py: 10,
        }}
      >
        <Container>
          {/* Section title */}
          <Typography
            variant="h4"
            fontWeight={600}
            mb={4}
            textAlign="center"
          >
            {t("home.partnersSectionTitle")}
          </Typography>

          {/* Section subtitle */}
          <Typography
            variant="subtitle1"
            color="text.secondary"
            mb={6}
            textAlign="center"
          >
            {t("home.partnersSectionSubtitle")}
          </Typography>

          {/* Partners list */}
          <Grid container spacing={3} justifyContent="center">
            {t("home.partnersList", { returnObjects: true }).map((partner, index) => (
              <Grid size={{ xs: 3, md: 1.2 }} key={index} textAlign="center">
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                  sx={{
                    display: "inline-block",
                    border: "1px solid #ff9f63",
                    borderRadius: "14px",
                    padding: "6px 16px",
                    backgroundColor: "#fff",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#ff9f63",
                      color: "#fff",
                      borderColor: "#ff9f63",
                    },
                  }}
                >
                  {partner}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>


      {/* ----------------------------------------------------------- */}


      <Footer
        logo={logo}
        onScrollToSection={scrollToServices}
        onScrollToPriser={scrollToPriser}
        onScrollToQuestion={scrollToQuestions}
        onScrollToGuider={scrollToGuider}
      />
      <LoginModal open={createRef} close={refClose} />
    </Box>
  );
};

export default Home;


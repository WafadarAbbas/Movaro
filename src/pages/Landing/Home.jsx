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
 
import {
  FaCar,
  FaMotorcycle,
  FaTruck,
  FaShip,
  FaTrailer,
} from "react-icons/fa";
import { MdElectricScooter } from "react-icons/md";
import logo from ".//logo.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const context = useContext(AppSettings);
  const servicesSectionRef = React.useRef(null);
  const PriserSectionRef = React.useRef(null);
  const questionsSectionRef = React.useRef(null);
  const guiderSectionRef = React.useRef(null);
  const createRef = useRef(null);
  const refClose = useRef(null);


  useEffect(() => {
    context.handleSetAppSidebarNone(true);
    context.handleSetAppHeaderNone(true);
    context.handleSetAppContentClass("p-0");

    return () => {
      context.handleSetAppSidebarNone(false);
      context.handleSetAppHeaderNone(false);
      context.handleSetAppContentClass("");
    };
  }, [context]);

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
      title: "Kontrakt",
      text: (
        <>
          <Typography variant="body2" mt={2} mb={2}>Juridiskt bindande avtal</Typography>
          <Typography variant="body2" mb={2}>Parter: verifierade med BankID</Typography>
          <Typography variant="body2" mb={2}>Fordon: OWN 457</Typography>
          <Typography variant="body2" mb={2}>Tid: 12:41 • Ref: •••9Q2F</Typography>
        </>
      ),
    },
    {
      id: 2,
      title: "Betalning",
      text: (
        <>
          <Typography variant="body2" mt={2} mb={2}>Belopp: 349 000 kr</Typography>
          <Typography variant="body2" mb={2}>Metod: banköverföring</Typography>
          <Typography variant="body2" mb={2}>Partner: Trustly</Typography>
          <Typography variant="body2" mb={2}>Utbetalning: normalt 1–2 bankdagar</Typography>
        </>
      ),
    },
    {
      id: 3,
      title: "Prisförslag",
      text: (
        <>
          <Typography variant="body2" mt={2} mb={2}>Prisförslag klart</Typography>
          <Typography variant="body2" mb={2}>Start: vid köpet</Typography>
          <Typography variant="body2" mb={2}>Exempel:</Typography>
          <Typography variant="body2" mb={2}>Länsförsäkringar, Folksam, Trygg-Hansa, ICA</Typography>
        </>
      ),
    },
    {
      id: 4,
      title: "Ägarbyte",
      text: (
        <>
          <Typography variant="body2" mt={2} mb={2}>Transportstyrelsen</Typography>
          <Typography variant="body2" mb={2}>Öppnas automatiskt</Typography>
          <Typography variant="body2" mb={2}>Uppgifter ifyllda</Typography>
          <Typography variant="body2" mb={2}>Signera med BankID</Typography>
          <Typography variant="body2" mb={2}>Bekräftelse i Klargo</Typography>
        </>
      ),
    },
  ];

  const ServiceCards = [
    {
      icon: <ShieldOutlinedIcon sx={{ fontSize: 25, color: "#ff9f63" }} />,
      title: "Verifiera med BankID",
      text: "Säker identifiering för båda parter.",
    },
    {
      icon: <DescriptionOutlinedIcon sx={{ fontSize: 25, color: "#ff9f63" }} />,
      title: "Skapa och signera kontrakt",
      text: "Gemensamma villkor och pris, digital signering.",
    },
    {
      icon: <CreditCardOutlinedIcon sx={{ fontSize: 25, color: "#ff9f63" }} />,
      title: "Betala säkert",
      text: "Bekräftelse i realtid i appen. Utbetalning inom 1–2 bankdagar.",
    },
    {
      icon: (
        <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 25, color: "#ff9f63" }} />
      ),
      title: "Slutför ägarbyte",
      text: "Transportstyrelsen öppnas automatiskt. Signera med BankID.",
    },
    {
      icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 25, color: "#ff9f63" }} />,
      title: "Välj försäkring",
      text: "Flera alternativ med direkt bekräftelse i appen.",
    },
  ];

  const VarförCards = [
    {
      icon: <PersonOutlineIcon sx={{ fontSize: 32, color: "#ff9f63" }} />,
      title: "Allt i ett flöde",
      text: "Säljare och köpare ser samma sak och följer samma process.",
    },
    {
      icon: <LockOutlinedIcon sx={{ fontSize: 32, color: "#ff9f63" }} />,
      title: "Trygg betalning",
      text: "Pengar hanteras säkert tills affären är klar. Bekräftelse i realtid.",
    },
    {
      icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 32, color: "#ff9f63" }} />,
      title: "Rätt ordning",
      text: "Guidning som speglar processen för ägarbyte hos Transportstyrelsen.",
    },
    {
      icon: <VerifiedUserOutlinedIcon sx={{ fontSize: 32, color: "#ff9f63" }} />,
      title: "Dokument på plats",
      text: "Kontrakt, kvitto och försäkringsbrev sparas.",
    },
  ];

  const vehicles = [
    {
      key: "car",
      label: "Bil",
      message: "Du valde: Bil – försäkring & skatt förklaras i guiden.",
      Icon: FaCar,
    },
    {
      key: "motorcycle",
      label: "MC",
      message: "Du valde: MC – försäkring & skatt förklaras i guiden.",
      Icon: FaMotorcycle,
    },
    {
      key: "scooter",
      label: "Moped",
      message: "Du valde: Moped – försäkring & skatt förklaras i guiden.",
      Icon: MdElectricScooter,
    },
    {
      key: "ship",
      label: "Husbil",
      message: "Du valde: Husbil – försäkring & skatt förklaras i guiden.",
      Icon: FaShip,
    },
    {
      key: "trailer",
      label: "Lätt lastbil",
      message: "Du valde: Lätt lastbil – försäkring & skatt förklaras i guiden.",
      Icon: FaTrailer,
    },
    {
      key: "truck",
      label: "Lastbil",
      message: "Du valde: Lastbil – försäkring & skatt förklaras i guiden.",
      Icon: FaTruck,
    },
  ];

  const cardsss = [
    {
      icon: <DescriptionOutlinedIcon sx={{ fontSize: 40, color: "#ff9f63" }} />,
      title: "Jag ska sälja",
      text: "Skapa affären, ange pris och villkor, signera. Betalning från köparen bekräftas i realtid i appen. Ägarbytet öppnas automatiskt hos Transportstyrelsen och bekräftelsen visas i Klargo.",
      list: ["Pris & villkor", "BankID-signering", "Bekräftad betalning"],
      button: "Utforska säljflödet",
    },
    {
      icon: <CreditCardOutlinedIcon sx={{ fontSize: 40, color: "#ff9f63" }} />,
      title: "Jag ska köpa",
      text: "Anslut via regnummer eller QR. Betala säkert och få bekräftelse i realtid. Välj finansiering eller betala direkt med banköverföring. Försäkring och pris direkt i appen. Ägarbytet öppnas automatiskt hos Transportstyrelsen och bekräftelsen visas i Klargo.",
      list: ["Regnr eller QR", "Finansiering eller direkt", "Försäkring i appen"],
      button: "Utforska köparflödet",
    },
  ];

  const accordionData = [
    { title: "Hur snabbt kommer pengarna?", content: "Du ser betalningen bekräftad i realtid i appen. Utbetalning till konto sker normalt inom 1 till 2 bankdagar.." },
    { title: "Hur går ägarbytet till?", content: "Säljaren genomför ägarbytet hos Transportstyrelsen. Klargo öppnar tjänsten automatiskt och fyller i dina uppgifter. Du signerar med BankID och ser bekräftelsen i appen." },
    { title: "Kan jag välja finansiering som köpare?", content: "Ja. Du kan ansöka i appen och få besked snabbt via våra partners. Du kan också betala direkt med banköverföring.atiskt och fyller i dina uppgifter. Du signerar med BankID och ser bekräftelsen i appen." },
    { title: "Finns det lån på fordonet, kan vi genomföra köpet?", content: "Ja. Vi guidar hur det hanteras i affären och dokumenterar överenskommelsen." },
    { title: "Gäller försäkringen direkt?", content: "Ja. Du väljer försäkringsstart i flödet och får bekräftelse i appen." },
    { title: "Vad kostar det?", content: "Alltid 149 kr per affär oavsett fordonets pris." },
  ];

  const stepCards = [
    {
      title: "Ägarbyte av fordon steg för steg",
      description: "Rätt ordning och begrepp enligt Transportstyrelsens terminologi.",
    },
    {
      title: "Köpa och sälja begagnat",
      description: "Bedrägeriskydd, mätarställning och dokument.",
    },
    {
      title: "Finansiering och försäkring",
      description: "Så fungerar billån och försäkring i praktiken.",
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
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src={logo}
            alt="logo"
            style={{ height: 60, width: "auto", display: "block" }}
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
          {["Hur det funkar", "Priser", "Frågor och svar", "Guider"].map(
            (label) => (
              <Button
                key={label}
                onClick={() => {
                  if (label === "Hur det funkar") scrollToServices();
                  else if (label === "Priser") scrollToPriser();
                  else if (label === "Frågor och svar") scrollToQuestions();
                  else if (label === "Guider") scrollToGuider();
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
                {label}
              </Button>
            )
          )}
        </Box>

        
        <Box sx={{ marginLeft: "auto", display: { xs: "none", md: "flex" } }}>
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
            Logga in
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
        py: 6,
      }}>
        <Container>
          <Grid container spacing={4} alignItems="center">

            <Grid size={{ xs: 12, md: 5 }}>
              <Box sx={{ p: 4 }}>
                <Typography variant="h2" fontWeight={600} gutterBottom>
                  Trygg affär för fordon i ett flöde
                </Typography>
                <Typography variant="h5" >
                  Kontrakt, betalning, ägarbyte och försäkring. Allt samlat och guidat mellan säljare och köpare.
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
                      Starta affären
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
                          backgroundColor:"#fdf6f1ff",
                        },
                      }}
                    >
                      Se hur det funkar
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
                    <Typography variant="body2">BankID</Typography>

                    <LockOutlinedIcon sx={{ fontSize: 18, color: "#555" }} />
                    <Typography variant="body2">Datasäkerhet i Sverige</Typography>


                    <DescriptionOutlinedIcon sx={{ fontSize: 18, color: "#555" }} />
                    <Typography variant="body2">
                      Fordonsdata från betrodda källor
                    </Typography>
                  </Stack>


                  <Typography variant="body2" color="text.secondary" textAlign={"center"} mt={2}>
                    BankID · Zmarta · Bilvision · Klarna · Tink · Nordea
                  </Typography>
                </Box>
              </Box>

            </Grid>


            <Grid size={{ xs: 6, md: 7 }}>
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
                      {card.text}
                    </Box>
                  </Box>

                ))}


              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>


      {/* ----------------------------------------------------------- */}
      <Box sx={{ bgcolor: "#ffffff", }}>

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
              spacing={1}
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
            Välj hur du vill fortsätta
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
                          <CheckCircleIcon
                            sx={{ color: "#ff9f63", fontSize: 18 }}
                          />
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
            Bekräftelse i realtid betyder att betalningen registreras och kvitteras i appen.
            Utbetalning till bankkonto sker normalt inom 1–2 bankdagar.
          </Typography>
        </Container>
      </Box>

      {/* --------------------------------------------------------------------------- */}
      <Box sx={{
        backgroundColor: "#fffbf9ff", minHeight: "100vh",
      }}>
        <Container
          ref={servicesSectionRef}

        >
          <Typography variant="h4" fontWeight={600} mb={4} pt={8} textAlign="center">
            Allt i ett, steg för steg
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
          {/* size={{xs:3,md:2}} */}
          <Grid container spacing={3} justifyContent="center">
            {ServiceCards.map((card, index) => (
              <Grid size={{ xs: 6, md: 2.3 }} key={index}>
                <Box
                  sx={{
                    bgcolor: "#fff",
                    p: 1,
                    borderRadius: 3,
                    boxShadow: 3,
                    // textAlign: "center",
                    minHeight: 300,
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "center",
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
                    {card.icon}
                  </Box>
                  <Typography variant="h6" fontWeight={600} mb={1} textAlign={"center"}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" p={1}>
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
        py: 6, backgroundColor: "#ffff",
      }}>
        <Container>
          <Typography variant="h4" fontWeight={600} mb={6} textAlign="center">
            Varför välja Klargo
          </Typography>

          {/* size={{xs:3,md:2}} */}
          <Grid container spacing={3} justifyContent="center">
            {VarförCards.map((card, index) => (
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
                    {card.icon}
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
            En enkel prislapp
          </Typography>

          <Box
            sx={{
              bgcolor: "#fff4ed",   // soft background
              borderRadius: 3,
              p: 4,
              textAlign: "center",
              boxShadow: "0px 8px 30px rgba(255, 159, 99, 0.5)",
              maxWidth: 400,
              mx: "auto",
            }}
          >
            <Typography variant="h1" fontWeight={700} mb={1}>
              149 kr
            </Typography>
            <Typography variant="subtitle1" fontWeight={600} mb={1}>
              per affär
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gäller alla fordonstyper i Klargo.
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              Inga procent | Inga dolda avgifter
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
            Vanliga frågor
          </Typography>


          <Grid container spacing={3} justifyContent="center">
            {accordionData.map((item, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Accordion
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: "26px",
                    padding: 3,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
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
            Lär dig processen
          </Typography>


          <Grid container spacing={4} justifyContent="center">
            {stepCards.map((card, index) => (
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
              border: "1px solid #e0e0e0", marginTop: 5
            }}
          >
            {/* === Title === */}
            <Typography variant="h5" fontWeight={600} mb={2}>
              Om billån i Klargo
            </Typography>

            {/* === Description === */}
            <Typography variant="body1" color="text.secondary" mb={3}>
              Finansiering erbjuds via partners. Individuell prövning och villkor gäller.
              Effektiv ränta beror på kreditprofil och löptid.
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
                Exempel
              </Typography>
              <List sx={{ listStyleType: "disc", pl: 3 }}>
                <ListItem sx={{ display: "list-item", py: 0 }}>
                  Effektiv ränta från 5,99%
                </ListItem>
                <ListItem sx={{ display: "list-item", py: 0 }}>
                  Uppläggningsavgift från 0 kr
                </ListItem>
                <ListItem sx={{ display: "list-item", py: 0 }}>
                  Exakta villkor visas i appen före ansökan
                </ListItem>
              </List>
            </Paper>


            <Grid container spacing={3}>
              <Grid item>
                <p href="#" underline="hover" sx={{ color: "#00bfa5", fontWeight: 500 }}>
                  Vanliga frågor om finansiering
                </p>
              </Grid>
              <Grid item>
                <Typography component="span" color="text.disabled">
                  •
                </Typography>
              </Grid>
              <Grid item>
                <p href="#" underline="hover" sx={{ color: "#00bfa5", fontWeight: 500 }}>
                  Integritet och kreditprövning
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
          <Typography
            variant="h4"
            fontWeight={600}
            mb={4}
            textAlign="center"
          >
            Partners och trygghet
          </Typography>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            mb={6}
            textAlign="center"
          >
            Klargo använder etablerade betalnings-, data- och försäkringspartners. Exakta erbjudanden kan variera per affär.
          </Typography>

          <Grid container spacing={1} justifyContent="center">
            {[
              "BankID",
              "Bilvision",
              "Trustly",
              "Klarna",
              "Tink",
              "Nordea",
              "Zmarta",
            ].map((item, index) => (
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
                  {item}
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



  {/* <AppBar
        position="static"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(6px)",
        }}
        elevation={1}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ position: "relative", minHeight: 64 }}>
            
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <img
                src={logo}
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
              {["Hur det funkar", "Priser", "Frågor och svar", "Guider"].map(
                (label, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      if (label === "Hur det funkar") scrollToServices();
                      else if (label === "Priser") scrollToPriser();
                      else if (label === "Frågor och svar") scrollToQuestions();
                      else if (label === "Guider") scrollToGuider();
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
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                  >
                    {label}
                  </Button>
                )
              )}
            </Box>

         
            <Box sx={{ marginLeft: "auto", display: { xs: "none", md: "flex" } }}>
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
      </AppBar> */}


import { Link } from 'react-router-dom';
// import DropdownProfile from './dropdown/profile.jsx';
import logo from '../../assets/Klargo1.png';
import 'bootstrap/dist/css/bootstrap.min.css';
 
import { useTranslation } from "react-i18next";
import { Container } from "@mui/material";
import React, { useState } from "react";
import { Menu, MenuItem, Typography, Avatar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {FaSignOutAlt } from "react-icons/fa";
import PersonIcon from "@mui/icons-material/Person";
import { useUser } from "../../context/UserContext.js";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
function BuyerHeader() {
    const navigate = useNavigate();
    const {i18n } = useTranslation();
    const { userName } = useUser();
    const [langAnchorEl, setLangAnchorEl] = useState(null);
    const langOpen = Boolean(langAnchorEl);
    const [language, setLanguage] = useState(
        localStorage.getItem("appLanguage") === "sv" ? "Svenska" : "English"
    );

    const handleLangClick = (event) => setLangAnchorEl(event.currentTarget);
    const handleLangClose = () => setLangAnchorEl(null);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/Buyer");
    };

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("appLanguage", lang);
        setLanguage(lang === "sv" ? "Svenska" : "English");
        handleLangClose();
    };



    return (

        <div
            id="header"
            className="app-header"
            style={{
                borderBottom: '1px solid #ddd',
                background: '#fff'
            }}
        >
            <Container maxWidth="lg">
                <div
                    className="d-flex justify-content-between align-items-center "
                >

                    <div className="d-flex align-items-center">


                        <Link

                            className="navbar-brand"
                            style={{
                                color: 'black',
                                fontSize: '18px',
                                fontWeight: 500,
                                textDecoration: 'none'
                            }}
                        >
                            <img
                                src={logo}
                                alt="Klargo"
                                style={{
                                    width: '140px',
                                    height: 'auto'
                                }}
                            />
                        </Link>
                    </div>


                    <div className="d-none d-lg-flex align-items-center gap-3">

                        <Box sx={{ mr: 2 }}>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    mr: 2,
                                }}
                            >
                                <Typography
                                    onClick={handleLangClick}
                                    variant="subtitle3"
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 1,
                                        padding: "6px 8px",
                                        borderRadius: "10px",
                                        border: "1px solid #c1c1c1ff",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        fontSize: { xs: "0.6rem", sm: "0.75rem", md: "0.75rem" },
                                        color: "gray",
                                        "&:hover": { border: "1px solid #ff6f00" },
                                    }}
                                >
                                    {i18n.language === "en" ? "English" : "Svenska"}
                                    <ArrowDropDownIcon sx={{ fontSize: 16 }} />
                                </Typography>
                                <Typography
                                    variant="subtitle3"
                                    onClick={handleClick}
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: 1,
                                        padding: "6px 12px",
                                        borderRadius: "10px",
                                        border: "1px solid #c1c1c1ff",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        color: "gray",
                                        "&:hover": {
                                            border: "1px solid #ff6f00",

                                        },
                                    }}
                                >
                                    <PersonIcon sx={{ fontSize: 16 }} />  {userName || "Guest"}
                                </Typography>
                            </Box>

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

                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    sx: {
                                        borderRadius: "12px",

                                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                        border: "2px solid #ff9f63",
                                        minWidth: 160,
                                        marginTop: 1,
                                    },
                                }}
                            >


                                <MenuItem
                                    onClick={handleLogout}
                                    sx={{
                                        fontSize: "14px",
                                        backgroundColor: "transparent !important",
                                        "&.Mui-focusVisible": {
                                            backgroundColor: "transparent !important",
                                        },
                                        "&.Mui-selected": {
                                            backgroundColor: "transparent !important",
                                        },
                                        "&:hover": {
                                            backgroundColor: "#ffecd1",
                                            color: "#ff6f00",
                                        },
                                    }}
                                >
                                    <FaSignOutAlt style={{ marginRight: 8 }} /> Log Out
                                </MenuItem>

                            </Menu>
                        </Box>
                    </div>


                    <div className="d-lg-none">
                        <Box sx={{ mr: 2 }}>

                            <Typography
                                variant="subtitle3"
                                onClick={handleClick}
                                sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 1,
                                    padding: "6px 12px",
                                    borderRadius: "10px",
                                    border: "1px solid #c1c1c1ff",
                                    fontWeight: 600,
                                    cursor: "pointer",
                                    color: "gray",
                                    "&:hover": {
                                        border: "1px solid #ff6f00",

                                    },
                                }}
                            >
                                <PersonIcon sx={{ fontSize: 16 }} />  {userName || "Guest"}
                            </Typography>


                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    sx: {
                                        borderRadius: "12px",

                                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                        border: "2px solid #ff9f63",
                                        minWidth: 160,
                                        marginTop: 1,
                                    },
                                }}
                            >


                                <MenuItem
                                    onClick={handleLogout}
                                    sx={{
                                        fontSize: "14px",
                                        backgroundColor: "transparent !important",
                                        "&.Mui-focusVisible": {
                                            backgroundColor: "transparent !important",
                                        },
                                        "&.Mui-selected": {
                                            backgroundColor: "transparent !important",
                                        },
                                        "&:hover": {
                                            backgroundColor: "#ffecd1",
                                            color: "#ff6f00",
                                        },
                                    }}
                                >
                                    <FaSignOutAlt style={{ marginRight: 8 }} /> Log Out
                                </MenuItem>

                            </Menu>
                        </Box>
                    </div>
                </div>
            </Container>


        </div>

    );
}

export default BuyerHeader;

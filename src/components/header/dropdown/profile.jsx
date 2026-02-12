

import React, { useState } from "react";
import { Menu, MenuItem, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaSignOutAlt } from "react-icons/fa";
import PersonIcon from "@mui/icons-material/Person";
import { useUser } from "../../../context/UserContext";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTranslation } from "react-i18next";
function DropdownProfile() {
  const navigate = useNavigate();
  const { userName,loading } = useUser();
  const {   i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);


  const [langAnchorEl, setLangAnchorEl] = useState(null);
  const langOpen = Boolean(langAnchorEl);
const [language, setLanguage] = useState(
  localStorage.getItem("appLanguage") === "sv" ? "Svenska" : "English"
);


  const handleLangClick = (event) => setLangAnchorEl(event.currentTarget);
  const handleLangClose = () => setLangAnchorEl(null);


  const handleLogout = () => {
    localStorage.clear();
    navigate("/home");
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("appLanguage", lang);
    setLanguage(lang === "sv" ? "Svenska" : "English");
    handleLangClose();
  };
  return (
    <Box sx={{ mr: 1 }}>


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
          onClick={handleClick}
          variant="subtitle3"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            padding: "6px 9px",
            borderRadius: "10px",
            border: "1px solid #c1c1c1ff",
            fontWeight: 600,
            cursor: "pointer",
            color: "gray",
            fontSize: { xs: "0.6rem", sm: "0.75rem", md: "0.75rem" },
            "&:hover": { border: "1px solid #ff6f00" },
          }}
        >
          <PersonIcon sx={{ fontSize: { xs: 12, sm: 16, md: 18 } }} />
          {loading ? "..." : userName || "Guest"}
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
          onClick={() => navigate("/Profile")}
          sx={{
            fontSize: "14px",
            backgroundColor: "transparent !important",  // force remove background
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
          <FaUserEdit style={{ marginRight: 8 }} /> Update Profile
        </MenuItem>

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
  );
}

export default DropdownProfile;

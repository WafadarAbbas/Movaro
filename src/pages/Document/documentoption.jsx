import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import { useTranslation } from "react-i18next";

const DocumentOption = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fafafa",
        px: 2,
      }}
    >
      {/* Title */}
      <Typography variant="h4" fontWeight={600} gutterBottom>
        {t("document.title")}
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={4}>
        {t("document.subtitle")}
      </Typography>

      {/* Cards */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Contract of sale */}
        <Card sx={{ width: 320, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <DescriptionOutlinedIcon />
              <Typography variant="h6" fontWeight={600}>
                {t("document.contractTitle")}
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" mb={3}>
              {t("document.contractDesc")}
            </Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{ textTransform: "none", py: 1 }}
            >
              {t("document.previewBtn")}
            </Button>
          </CardContent>
        </Card>

        {/* Vehicle report */}
        <Card sx={{ width: 320, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <DirectionsCarOutlinedIcon />
              <Typography variant="h6" fontWeight={600}>
                {t("document.vehicleTitle")}
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" mb={3}>
              {t("document.vehicleDesc")}
            </Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{ textTransform: "none", py: 1 }}
            >
              {t("document.previewBtn")}
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default DocumentOption;

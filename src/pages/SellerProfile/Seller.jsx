
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import ApiCall from "../../Apicall/ApiCall";
import { Edit, Delete, Autorenew } from "@mui/icons-material";

export default function Seller() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userStatus, setUserStatus] = useState("Seller");
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async (status, skip, maxCount) => {
    setLoading(true);
    try {
      const response = await ApiCall({
        url: `https://localhost:44311/api/services/app/ContractMain/GetAll?UserStatus=${status}&SkipCount=${skip}&MaxResultCount=${maxCount}`,
        method: "GET",
      });

      if (response.data && response.data.result) {
        const result = response.data.result;
        setData(result.items || []);
        setTotalCount(result.totalCount || result.items?.length || 0);
      } else {
        setData([]);
        setTotalCount(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(userStatus, page * pageSize, pageSize);
  }, [userStatus, pageSize, page]);

  const handlePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  const handleNext = () => {
    const maxPage = Math.ceil(totalCount / pageSize) - 1;
    if (page < maxPage) setPage((prev) => prev + 1);
  };

  return (
    <Box p={3} boxShadow={1} borderRadius={2} bgcolor="white">
      <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
        {userStatus} Contracts
      </Typography>


      <Container maxWidth="md" sx={{ mt: 2 }}>
        <FormControl
          fullWidth
          size="small"
          sx={{
            mb: 2,
            "& .MuiInputLabel-root": { fontSize: "0.85rem" },
            "& .MuiSelect-select": { fontSize: "0.85rem", py: 0.8 },
          }}
        >
          <InputLabel>User Type</InputLabel>
          <Select
            value={userStatus}
            label="User Type"
            onChange={(e) => {
              setUserStatus(e.target.value);
              setPage(0);
            }}
          >
            <MenuItem value="Seller" sx={{ fontSize: "0.85rem" }}>
              Seller
            </MenuItem>
            <MenuItem value="Buyer" sx={{ fontSize: "0.85rem" }}>
              Buyer
            </MenuItem>
          </Select>
        </FormControl>
      </Container>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {data.length > 0 ? (
            <Box>

              <Box
                component={Paper}
                padding={1.5}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6" fontWeight="bold">
                  Contracts
                </Typography>


                <FormControl
                  size="small"
                  sx={{
                    minWidth: 60,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                    },
                    "& .MuiSelect-select": { fontSize: "0.85rem", py: 0.6 },
                  }}
                >
                  <InputLabel>Rows</InputLabel>
                  <Select
                    value={pageSize}
                    label="Rows"
                    onChange={(e) => {
                      setPageSize(e.target.value);
                      setPage(0);
                    }}
                  >
                    {[5, 10, 15, 30].map((size) => (
                      <MenuItem key={size} value={size} sx={{ fontSize: "0.85rem" }}>
                        {size}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              {/* Table */}
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table
                  sx={{
                    minWidth: 650,
                    fontSize: "0.85rem",
                    "& td, & th": { py: 0.9, px: 1.2 },
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontSize: "0.95rem" }}><b>Seller Name</b></TableCell>
                      <TableCell sx={{ fontSize: "0.95rem" }}><b>Vehicle Type</b></TableCell>
                      <TableCell sx={{ fontSize: "0.95rem" }}><b>Registration No</b></TableCell>
                      <TableCell sx={{ fontSize: "0.95rem" }}><b>Company</b></TableCell>
                      <TableCell sx={{ fontSize: "0.95rem" }}><b>Valuation</b></TableCell>
                      <TableCell sx={{ fontSize: "0.95rem" }}><b>Deal Active</b></TableCell>
                      <TableCell sx={{ fontSize: "0.95rem" }}><b>Deal Complete</b></TableCell>
                      <TableCell sx={{ fontSize: "0.95rem" }}><b>Actions</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ fontSize: "0.85rem" }}>
                          {item.sellerUserFullName || "—"}
                        </TableCell>
                        <TableCell
                          sx={{ fontSize: "0.85rem", color: "primary.main" }}>
                          {item.vahicleTypeOptionName || "—"}
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.85rem", fontWeight: "bold" }}>
                          {item.carInfoRegistrationNo || "—"}
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.85rem", fontWeight: "bold" }}>
                          {item.carInfoCompany || "—"}
                        </TableCell>
                        <TableCell sx={{ fontSize: "0.85rem" }}>
                          {item.carValuationBySeller || "—"}
                        </TableCell>
                        <TableCell>
                          {item.sellerDealActive ? (
                            <CheckCircle sx={{ color: "green", fontSize: 20 }} />
                          ) : (
                            <Cancel sx={{ color: "red", fontSize: 20 }} />
                          )}
                        </TableCell>
                        <TableCell>
                          {item.sellerDealComplete ? (
                            <CheckCircle sx={{ color: "green", fontSize: 20 }} />
                          ) : (
                            <Cancel sx={{ color: "red", fontSize: 20 }} />
                          )}
                        </TableCell>
                        <TableCell  >
                          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                            <Button
                              size="small"
                              variant="outlined"
                              color="primary"
                              onClick={() => console.log("Edit clicked", item.id)}
                              sx={{
                                minWidth: 0,
                                p: 0.5,
                                borderRadius: "50%",
                                borderColor: "#2196f3",
                                "&:hover": { backgroundColor: "rgba(33, 150, 243, 0.1)" },
                              }}
                            >
                              <Edit sx={{ fontSize: 18 }} />
                            </Button>

                       <Button
  size="small"
  variant="outlined"
  color="error"
  onClick={async () => {
    if (window.confirm("Are you sure you want to delete this contract?")) {
      try {
        setLoading(true);  
        const response = await ApiCall({
          url: `https://localhost:44311/api/services/app/ContractMain/Delete?Id=${item.id}`,
          method: "DELETE",
        });
        // success response
        if (response?.data?.success) {
          // alert("Contract deleted successfully!");
          
          fetchData(userStatus, page * pageSize, pageSize);
        } else {
          alert("Failed to delete contract.");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Error deleting contract.");
      } finally {
        setLoading(false);
      }
    }
  }}
  sx={{
    minWidth: 0,
    p: 0.5,
    borderRadius: "50%",
    borderColor: "#f44336",
    "&:hover": { backgroundColor: "rgba(244, 67, 54, 0.1)" },
  }}
>
  <Delete sx={{ fontSize: 18 }} />
</Button>

                            <Button
                              size="small"
                              variant="outlined"
                              color="secondary"
                              onClick={() => console.log("Regenerate clicked", item.id)}
                              sx={{
                                minWidth: 0,
                                p: 0.5,
                                borderRadius: "50%",
                                borderColor: "#9c27b0",
                                "&:hover": { backgroundColor: "rgba(156, 39, 176, 0.1)" },
                              }}
                            >
                              <Autorenew sx={{ fontSize: 18 }} />
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* ✅ Pagination Controls */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={2}
              >
                <Button
                  variant="outlined"
                  size="small"
                  disabled={page === 0}
                  onClick={handlePrev}
                  sx={{
                    color: "#ff9f43",
                    borderColor: "#ff9f43",
                    "&:hover": {
                      borderColor: "#ff9f43",
                      backgroundColor: "rgba(255, 159, 67, 0.1)",
                    },
                  }}
                >
                  Back
                </Button>

                <Typography variant="body2" color="text.secondary">
                  Page {page + 1} of {Math.ceil(totalCount / pageSize) || 1}
                </Typography>

                <Button
                  variant="outlined"
                  size="small"
                  disabled={page >= Math.ceil(totalCount / pageSize) - 1}
                  onClick={handleNext}
                  sx={{
                    color: "#ff9f43",
                    borderColor: "#ff9f43",
                    "&:hover": {
                      borderColor: "#ff9f43",
                      backgroundColor: "rgba(255, 159, 67, 0.1)",
                    },
                  }}
                >
                  Next
                </Button>
              </Box>

            </Box>
          ) : (
            <Typography color="text.secondary" textAlign="center" mt={3}>
              No {userStatus.toLowerCase()} contracts found.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}

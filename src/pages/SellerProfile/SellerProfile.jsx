import React, { useRef, useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { CircularProgress, FormControlLabel } from "@mui/material";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import {
  FaCar,
  FaMotorcycle,
  FaShip,
  FaTrailer,
  FaTruck,
} from "react-icons/fa";
import { MdElectricScooter } from "react-icons/md";
import { Search as SearchIcon } from "@mui/icons-material";
import { FaEdit } from "react-icons/fa";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import "../../Compo/LoadingText.css";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  TextField,
  Paper,
  Divider,
  Grid,
  Container,
  RadioGroup,
  Radio,
} from "@mui/material";
import { motion } from "framer-motion";
import ApiCall from "../../Apicall/ApiCall";
import QRCode from "react-qr-code";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpadteValuation from "./updatevaluation";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DescriptionIcon from "@mui/icons-material/Description";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import FormGroup from "@mui/material/FormGroup";
import { useSignalR } from "../../context/SignalRContext.js";
import { useNavigate } from "react-router-dom";

const steps = [
  "Choose Vehicles",
  "Vehicle",
  "Sale Created",
  "Submission",
  "Contract",
];

function SellerProfile() {
  const createRef = useRef(null);
  const refClose = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { connectToDeal, messages, connection, sendDealMessage } = useSignalR();
  // -------------------Maneging States-------------------------------
  const [value, setValue] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [vehicleData, setVehicleData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [registration, setRegistration] = useState("");
  const [carData, setCarData] = useState(null);
  const [userId, setUserId] = useState(null);
  const [storedId, setStoredId] = useState(null);
  const [contractData, setContractData] = useState(null);
  const [fetchedCarInfo, setFetchedCarInfo] = useState(null);
  const [updatedCarInfoId, setUpdatedCarInfoId] = useState(null);
  const [lastId, setLastId] = useState(null);
  const [fetchedContractInfo, setFetchedContractInfo] = useState(null);
  const [finalContract, setFinalContract] = useState(null);
  const [finalContractvaluation, setfinalContractvaluation] = useState(null);
  const [contractId, setcontractId] = useState(null);
  const [carId, setcarId] = useState(null);
  const [QR, setQR] = useState("");
  const [buyerConnected, setBuyerConnected] = useState(false);
  const [buyerToastShown, setBuyerToastShown] = useState(false);
  const [refreshFinalContract, setRefreshFinalContract] = useState(false);
  const [buyerUserName, setBuyerUserName] = useState("");
  const [carRegNo, setCarRegNo] = useState("");

  // ------------------- Getting Current Seller ID from Local Storage -------------------------------
  useEffect(() => {
    const id = localStorage.getItem("currentContractID");
    if (id) {
      setStoredId(parseInt(id));
    }
  }, []);

  useEffect(() => {
    if (activeStep === 3) {
      const fetchAndEncryptData = async () => {
        try {
          const response = await ApiCall({
            url: "/ContractMain/GetContractMainById",
            method: "GET",
            params: { Id: contractData.id },
          });

          const contractData3 = response.result || response.data?.result;

          if (!contractData3) {
            Swal.fire(
              "❌ Error",
              "Failed to fetch latest contract data!",
              "error",
            );
            return;
          }

          // console.log("📦 Full Contract Data:", contractData3);
          setCarRegNo(contractData3.carInfoRegistrationNo || "");

          const currentTime = new Date().toISOString();
          const minimalData = {
            contractId: contractData3.id,
            sellerUserId: contractData3.sellerUserId,
            time: currentTime,
          };

          console.log("Data to Encrypt:", minimalData);

          const secretKey = "Klargo3613";
          const encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(minimalData),
            secretKey,
          ).toString();

          console.log(encrypted);

          const qrUrl = `http://localhost:3000/Buyer/${encodeURIComponent(
            encrypted,
          )}`;

          setQR(qrUrl);

          console.log("🔒 Encrypted URL:", qrUrl);
        } catch (error) {
          console.error("❌ Error fetching contract data:", error);
          Swal.fire(
            "❌ Error",
            error.response?.data?.error?.message || "Unexpected server error.",
            "error",
          );
        }
      };

      fetchAndEncryptData();
    }
  }, [activeStep]);

  // -------------------Validation Schemas-------------------------------

  const validationSchemas = [
    Yup.object({
      vahicleTypeOptionId: Yup.number()
        .nullable()
        .required("Please select a vehicle type"),
    }),
  ];

  // ------------------- Api Calls-------------------------------
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await ApiCall({
          url: "/Session/GetCurrentLoginInformations", // relative URL
          method: "GET",
        });
        const id = response.data?.result?.user?.id;
        setUserId(id);
      } catch (err) {
        console.error("Error fetching user ID:", err);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchVehicleOptions = async () => {
      try {
        setLoading(true);
        const response = await ApiCall({
          url: "/VahicleTypeOption/GetAll", // relative to baseURL
          method: "GET",
        });

        if (response?.data?.result?.items) {
          setVehicleData(response.data.result.items);
        } else {
          setVehicleData([]);
        }
      } catch (err) {
        setError(err.message || "API call failed");
      } finally {
        setLoading(false);
      }
    };

    if (activeStep === 0) {
      fetchVehicleOptions();
    }
  }, [activeStep]);

  useEffect(() => {
    const fetchContract = async () => {
      if (!storedId) return;

      try {
        const response = await ApiCall({
          url: "/ContractMain/GetContractMainById",
          method: "GET",
          params: { Id: storedId },
        });

        const data = response.data?.result;
        setContractData(data);
      } catch (error) {
        console.error("❌ Error fetching ContractMain data:", error);
      }
    };

    fetchContract();
  }, [storedId]);

  // const handleSearch = async () => {
  //   if (!registration) return;

  //   setLoading(true);
  //   setError("");
  //   setCarData(null);

  //   try {
  //     const countRes = await ApiCall({
  //       url: "/ContractMain/CarApiCountCheck",
  //       method: "POST",
  //       data: { id: contractData.id },
  //     });

  //     if (countRes?.data?.success === false || countRes?.data?.limitReached) {
  //       Swal.fire({
  //         icon: "error",
  //         title: countRes?.data?.error?.message || "Not Allowed",
  //         text: countRes?.data?.error?.details || "API limit exceeded",
  //       });
  //       return;
  //     }

  //     const searchRes = await ApiCall({
  //       url: "/CarInfo/GetVehicleInfo",
  //       method: "GET",
  //       params: { Id: registration },
  //     });

  //     if (!searchRes?.data?.result?.length) {
  //       setError("❌ Car not found, please check the registration number.");
  //       return;
  //     }

  //     const rawCar = searchRes.data.result[0];
  //     setCarData(rawCar);

  //     const carCreateRes = await ApiCall({
  //       url: "/CarInfo/Create",
  //       method: "POST",
  //       data: convertCarData(rawCar),
  //     });

  //     if (carCreateRes?.success === false) {
  //       throw new Error(
  //         carCreateRes?.error?.details ||
  //           carCreateRes?.error?.message ||
  //           "Car creation failed."
  //       );
  //     }

  //     const newCar = carCreateRes?.result || carCreateRes?.data?.result;

  //     if (!newCar?.id) {
  //       throw new Error("Car created but ID not received.");
  //     }

  //     // 3️⃣ Fetch latest Contract
  //     const contractRes = await ApiCall({
  //       url: "/ContractMain/GetContractMainById",
  //       method: "GET",
  //       params: { Id: contractData.id },
  //     });

  //     const latestContract = contractRes?.result || contractRes?.data?.result;

  //     if (!latestContract) {
  //       throw new Error("Failed to fetch contract data.");
  //     }

  //     // 4️⃣ Prepare Contract Payload
  //     const contractPayload = {
  //       ...latestContract,
  //       carInfoId: newCar.id,
  //       carInfoVehicleDesignation: newCar.vehicleDesignation,
  //       carInfoTradeName: newCar.tradeName,
  //       carInfoYearModel: newCar.yearModel,
  //       carInfoVehicleYears: newCar.vehicleYears,
  //       carInfoRegistrationDate: newCar.registrationDate,
  //       carInfoNumberOfUsers: newCar.numberOfUsers,
  //       carInfoWaxelbarge: newCar.waxelbarge,
  //       carInfoFourWheelDrive: newCar.fourWheelDrive?.toString() || "False",
  //       carInfoFuel: newCar.fuel,
  //       carInfoElectricVehicleConfiguration:
  //         newCar.electricVehicleConfiguration,
  //       carInfoInspectionDate: newCar.inspectionDate,
  //       carInfoInspectionDateEMPTY: newCar.inspectionDateEMPTY,
  //       carInfoDispensationInspectionGroup: newCar.dispensationInspectionGroup,
  //       carInfoInspectionGroup: newCar.inspectionGroup,
  //       carInfoFeedingStall: newCar.feedingStall,
  //       carInfoInspectionStation: newCar.inspectionStation,
  //       carInfoInspectionProgramCode: newCar.inspectionProgramCode,
  //       carInfoPreviousInspectionDate: newCar.previousInspectionDate,
  //       carInfoPreviousInspectionProgramCode:
  //         newCar.previousInspectionProgramCode,
  //       carInfoTax: newCar.tax,
  //       carInfoMalus: newCar.malus,
  //       carValuationBySeller: 0,
  //       vahicleTypeOptionVahicleTypeName:
  //         latestContract.vahicleTypeOptionName || "",
  //       vahicleTypeOptionId: latestContract.vahicleTypeOptionId,
  //       sellerDealComplete: false,
  //       sellerDrivingLicensePath: "",
  //     };

  //     // 5️⃣ Update ContractMain
  //     const updateRes = await ApiCall({
  //       url: "/ContractMain/Update",
  //       method: "PUT",
  //       data: contractPayload,
  //     });

  //     if (updateRes?.success === false) {
  //       throw new Error(
  //         updateRes?.error?.details ||
  //           updateRes?.error?.message ||
  //           "Contract update failed."
  //       );
  //     }

  //     // 6️⃣ Connect via SignalR
  //     if (contractData?.id) {
  //       try {
  //         await connectToDeal(contractData.id);
  //         setActiveStep(2);
  //         // toast.info("✅ Connected to deal", { position: "top-right" });
  //       } catch (err) {
  //         console.error("Error connecting via SignalR:", err);
  //         Swal.fire("❌ Error", "Unable to connect via SignalR", "error");
  //       }
  //     }

  //     // toast.success("Retrieved vehicle information", { position: "bottom-right" });
  //     setActiveStep(3);
  //   } catch (err) {
  //     console.error(err);

  //     // ✅ Enhanced backend error handling
  //     const backendError = err?.response?.data?.error;
  //     if (backendError) {
  //       Swal.fire({
  //         icon: "error",
  //         title: backendError.message || "Server Error",
  //         text: backendError.details || "Something went wrong on the server",
  //       });
  //     } else {
  //       Swal.fire(
  //         "❌ Error",
  //         err.message || "Unexpected error occurred",
  //         "error"
  //       );
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchCarInfo = async () => {
      if (activeStep === 4 && updatedCarInfoId) {
        try {
          const response = await ApiCall({
            url: "/CarInfo/GetCarInfoById",
            method: "GET",
            params: { Id: updatedCarInfoId },
          });

          const carData = response?.result || response?.data?.result;

          if (carData) {
            setFetchedCarInfo(carData);
          } else {
            Swal.fire("⚠️ Warning", "No car data found!", "warning");
          }
        } catch (error) {
          console.error("❌ Error fetching car info:", error);
        }
      }
    };

    fetchCarInfo();
  }, [activeStep, updatedCarInfoId]);

  useEffect(() => {
    const fetchContractInfo = async () => {
      if (activeStep === 4 && lastId) {
        try {
          const response = await ApiCall({
            url: "/ContractMain/GetContractMainById",
            method: "GET",
            params: { Id: lastId },
          });

          const contractData = response?.result || response?.data?.result;

          if (contractData) {
            setFetchedContractInfo(contractData);
          } else {
            Swal.fire("⚠️ Warning", "No contract data found!", "warning");
          }
        } catch (error) {
          console.error("❌ Error fetching contract info:", error);
        }
      }
    };

    fetchContractInfo();
  }, [activeStep, lastId]);

  const numberToWords = (num) => {
    if (!num) return "";
    const words = require("number-to-words");
    return words.toWords(num).replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // useEffect(() => {
  //   if (activeStep !== 3 || !contractData.id) return;

  //   const buyerMsg = messages.find(
  //     msg => msg.user === "buyer" && msg.message === "Buyer connected to Seller"
  //   );

  //   if (buyerMsg && !buyerToastShown) {
  //     setBuyerConnected(true);
  //     toast.success(" Buyer connected to deal!", {
  //       position: "top-right",
  //     });
  //     setBuyerToastShown(true);
  //   }
  // }, [messages, activeStep, contractData?.id, buyerToastShown]);

  useEffect(() => {
    if (activeStep !== 3 || !contractData?.id) return;

    const buyerMsg = messages.find(
      (msg) =>
        msg.user === "buyer" && msg.message === "Buyer connected to Seller",
    );

    if (buyerMsg && !buyerToastShown) {
      const fetchBuyerInfo = async () => {
        try {
          // Step 1: Get contract details
          const contractRes = await ApiCall({
            url: "/ContractMain/GetContractMainById",
            method: "GET",
            params: { Id: contractData.id },
          });

          const contractResult =
            contractRes?.result || contractRes?.data?.result;

          if (contractResult?.buyerUserId) {
            // Step 2: Get buyer user info
            const userRes = await ApiCall({
              url: "/User/Get",
              method: "GET",
              params: { Id: contractResult.buyerUserId },
            });

            const userResult = userRes?.result || userRes?.data?.result;

            if (userResult?.userName) {
              setBuyerUserName(userResult.userName); // <-- store in state
            }
          }

          setBuyerConnected(true);

          toast.success("Buyer connected to deal!", {
            position: "top-right",
          });
          setBuyerToastShown(true);
        } catch (error) {
          console.error("Error fetching buyer info:", error);
        }
      };

      fetchBuyerInfo();
    }
  }, [messages, activeStep, contractData?.id, buyerToastShown]);

  // const handleSellerDealConfirm = async () => {
  //   if (!lastId) {
  //     Swal.fire("Error", "Contract ID not found", "error");
  //     return;
  //   }

  //   try {
  //     const res = await ApiCall({
  //       url: "/ContractMain/DealCompletedBySeller",
  //       method: "POST",
  //       data: {
  //         id: lastId,
  //       },
  //     });

  //     if (res?.data?.success || res?.success) {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Deal Confirmed",
  //         text: "Deal has been completed successfully by seller",
  //       });
  //     } else {
  //       Swal.fire(
  //         "Failed",
  //         res?.data?.error?.message || "Deal confirmation failed",
  //         "error"
  //       );
  //     }
  //   } catch (error) {
  //     Swal.fire(
  //       "Error",
  //       error?.response?.data?.error?.message || "Something went wrong",
  //       "error"
  //     );
  //   }
  // };

  const handleSellerDealConfirm = async () => {
    if (!lastId) {
      Swal.fire("Error", "Contract ID not found", "error");
      return;
    }

    setLoading(true); // start loading

    try {
      const res = await ApiCall({
        url: "/ContractMain/DealCompletedBySeller",
        method: "POST",
        data: { id: lastId },
      });

      if (res?.data?.success || res?.success) {
        Swal.fire({
          icon: "success",
          title: "Deal Confirmed",
          text: "Deal has been completed successfully by seller",
        }).then(() => {
          navigate(`/Contract/${lastId}`);
        });
      } else {
        Swal.fire(
          "Failed",
          res?.data?.error?.message || "Deal confirmation failed",
          "error",
        );
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.error?.message || "Something went wrong",
        "error",
      );
    } finally {
      setLoading(false); // stop loading
    }
  };

  // const convertCarData = (carData) => {
  //   return {
  //     registrationNo: carData?.registreringsnummer || "",
  //     vehicleDesignation: carData?.fordonsuppgifter?.fordonsbenamning || "",
  //     tradeName: carData?.fordonsuppgifter?.handelsbeteckning || "",
  //     yearModel: carData?.fordonsuppgifter?.arsmodell || "",
  //     vehicleYears: carData?.fordonsuppgifter?.fordonsar?.toString() || "",
  //     registrationDate: carData?.fordonsuppgifter?.registreringsdatum || null,
  //     numberOfUsers:
  //       carData?.fordonBrukareAgare?.antalBrukare?.toString() || "",
  //     waxelbarge: carData?.tekniskData?.vaxellada || "",
  //     fourWheelDrive: carData?.tekniskData?.fyrhjulsdrift || false,
  //     fuel:
  //       carData?.tekniskData?.drivmedel?.map((x) => x.drivmedel).join(", ") ||
  //       "",
  //     electricVehicleConfiguration:
  //       carData?.miljoklassning?.elfordonKonfiguration || "",
  //     inspectionDate: carData?.besiktning?.besiktningsdatum || null,
  //     inspectionDateEMPTY: carData?.besiktning?.besiktningsdatumTOM || null,
  //     dispensationInspectionGroup:
  //       carData?.besiktning?.dispensbesiktningsgrupp || "",
  //     inspectionGroup: carData?.besiktning?.besiktningsgrupp || "",
  //     feedingStall: carData?.besiktning?.matarstallning?.toString() || "",
  //     inspectionStation: carData?.besiktning?.besiktningsstation || "",
  //     inspectionProgramCode:
  //       carData?.besiktning?.besiktningsprogramkod?.toString() || "",
  //     previousInspectionDate:
  //       carData?.besiktning?.foregaendeBesiktningsdatum || null,
  //     previousInspectionProgramCode:
  //       carData?.besiktning?.foregaendeBesiktningsprogramkod?.toString() || "",
  //     tax: carData?.beraknat?.skatt?.skatt?.toString() || "",
  //     malus: carData?.beraknat?.skatt?.malus?.toString() || "",
  //   };
  // };

  useEffect(() => {
    const fetchFinalContract = async () => {
      if (activeStep === 5 && lastId) {
        try {
          const response = await ApiCall({
            url: "/ContractMain/GetContractMainById",
            method: "GET",
            params: { Id: lastId },
          });

          const finalData = response?.result || response?.data?.result;

          if (finalData) {
            setFinalContract(finalData);
            setfinalContractvaluation(finalData.carValuationBySeller || null);
            setcontractId(finalData.id || null);
            setcarId(finalData.carInfoId || null);
          } else {
            Swal.fire(
              "⚠️ Warning",
              "Final contract data not found!",
              "warning",
            );
          }
        } catch (error) {
          console.error("❌ Error fetching final contract info:", error);
        }
      }
    };

    fetchFinalContract();
  }, [activeStep, lastId, refreshFinalContract]);

  // ------------------------------------------

  const generateRegistrationNumber = () => {
    // generate 3 random uppercase letters
    const letters = Array.from({ length: 3 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26)),
    ).join("");

    // generate 3 random digits
    const numbers = Math.floor(100 + Math.random() * 900); // ensures 3 digits

    return letters + numbers;
  };

  const dummyCarApiResponse = [
    {
      Registreringsnummer: generateRegistrationNumber(),
      Fordonsuppgifter: {
        Fordonsbenamning: "TOYOTA PRIUS",
        Handelsbeteckning: null,
        Arsmodell: null,
        Fordonsar: 2006,
        Registreringsdatum: "2006-11-24T00:00:00",
      },
      FordonBrukareAgare: {
        AntalBrukare: 7,
      },
      TekniskData: {
        Vaxellada: "V",
        Fyrhjulsdrift: false,
        Drivmedel: [{ Drivmedel: "Bensin" }, { Drivmedel: "El" }],
      },
      Miljoklassning: {
        ElfordonKonfiguration: null,
      },
      Besiktning: {
        Besiktningsdatum: "2025-08-14T00:00:00",
        BesiktningsdatumTOM: "2026-10-31T00:00:00",
        Dispensbesiktningsgrupp: null,
        Besiktningsgrupp: "36/24/14",
        Matarstallning: 388358,
        Besiktningsstation: "CARSPECT STOCKHOLM BOTKYRKA NORSBORG",
        Besiktningsprogramkod: 6,
        ForegaendeBesiktningsdatum: "2025-08-11T00:00:00",
        ForegaendeBesiktningsprogramkod: 5,
      },
      Beraknat: {
        Skatt: {
          Skatt: 360,
          Malus: null,
        },
      },
    },
  ];

  const handleSearch = async () => {
    if (!registration) return;

    setLoading(true);
    setError("");
    setCarData(null);

    try {
      // ❌ PAID API BYPASSED
      // const countRes = await ApiCall({ ... });

      // ❌ PAID API BYPASSED
      // const searchRes = await ApiCall({ ... });

      // ✅ USE DUMMY DATA
      const rawCar = dummyCarApiResponse[0];
      setCarData(rawCar);

      // ✅ Create car using dummy converted data
      const carCreateRes = await ApiCall({
        url: "/CarInfo/Create",
        method: "POST",
        data: convertCarData(rawCar),
      });

      const newCar = carCreateRes?.result || carCreateRes?.data?.result;

      if (!newCar?.id) {
        throw new Error("Car created but ID not received.");
      }

      // 3️⃣ Fetch latest Contract
      const contractRes = await ApiCall({
        url: "/ContractMain/GetContractMainById",
        method: "GET",
        params: { Id: contractData.id },
      });

      const latestContract = contractRes?.result || contractRes?.data?.result;

      if (!latestContract) {
        throw new Error("Failed to fetch contract data.");
      }

      // 4️⃣ Prepare Contract Payload
      const contractPayload = {
        ...latestContract,
        carInfoId: newCar.id,
        carInfoVehicleDesignation: newCar.vehicleDesignation,
        carInfoTradeName: newCar.tradeName,
        carInfoYearModel: newCar.yearModel,
        carInfoVehicleYears: newCar.vehicleYears,
        carInfoRegistrationDate: newCar.registrationDate,
        carInfoNumberOfUsers: newCar.numberOfUsers,
        carInfoWaxelbarge: newCar.waxelbarge,
        carInfoFourWheelDrive: newCar.fourWheelDrive?.toString() || "False",
        carInfoFuel: newCar.fuel,
        carInfoElectricVehicleConfiguration:
          newCar.electricVehicleConfiguration,
        carInfoInspectionDate: newCar.inspectionDate,
        carInfoInspectionDateEMPTY: newCar.inspectionDateEMPTY,
        carInfoDispensationInspectionGroup: newCar.dispensationInspectionGroup,
        carInfoInspectionGroup: newCar.inspectionGroup,
        carInfoFeedingStall: newCar.feedingStall,
        carInfoInspectionStation: newCar.inspectionStation,
        carInfoInspectionProgramCode: newCar.inspectionProgramCode,
        carInfoPreviousInspectionDate: newCar.previousInspectionDate,
        carInfoPreviousInspectionProgramCode:
          newCar.previousInspectionProgramCode,
        carInfoTax: newCar.tax,
        carInfoMalus: newCar.malus,
        carValuationBySeller: 0,
        sellerDealComplete: false,
        sellerDrivingLicensePath: "",
      };

      // 5️⃣ Update ContractMain
      await ApiCall({
        url: "/ContractMain/Update",
        method: "PUT",
        data: contractPayload,
      });

      // 6️⃣ SignalR
      if (contractData?.id) {
        await connectToDeal(contractData.id);
      }

      setActiveStep(3);
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", err.message || "Unexpected error", "error");
    } finally {
      setLoading(false);
    }
  };

  const convertCarData = (carData) => {
    return {
      registrationNo: carData?.Registreringsnummer || "",
      vehicleDesignation: carData?.Fordonsuppgifter?.Fordonsbenamning || "",
      tradeName: carData?.Fordonsuppgifter?.Handelsbeteckning || "",
      yearModel: carData?.Fordonsuppgifter?.Arsmodell || "",
      vehicleYears: carData?.Fordonsuppgifter?.Fordonsar?.toString() || "",
      registrationDate: carData?.Fordonsuppgifter?.Registreringsdatum || null,
      numberOfUsers:
        carData?.FordonBrukareAgare?.AntalBrukare?.toString() || "",
      waxelbarge: carData?.TekniskData?.Vaxellada || "",
      fourWheelDrive: carData?.TekniskData?.Fyrhjulsdrift || false,
      fuel:
        carData?.TekniskData?.Drivmedel?.map((x) => x.Drivmedel).join(", ") ||
        "",
      electricVehicleConfiguration:
        carData?.Miljoklassning?.ElfordonKonfiguration || "",
      inspectionDate: carData?.Besiktning?.Besiktningsdatum || null,
      inspectionDateEMPTY: carData?.Besiktning?.BesiktningsdatumTOM || null,
      dispensationInspectionGroup:
        carData?.Besiktning?.Dispensbesiktningsgrupp || "",
      inspectionGroup: carData?.Besiktning?.Besiktningsgrupp || "",
      feedingStall: carData?.Besiktning?.Matarstallning?.toString() || "",
      inspectionStation: carData?.Besiktning?.Besiktningsstation || "",
      inspectionProgramCode:
        carData?.Besiktning?.Besiktningsprogramkod?.toString() || "",
      previousInspectionDate:
        carData?.Besiktning?.ForegaendeBesiktningsdatum || null,
      previousInspectionProgramCode:
        carData?.Besiktning?.ForegaendeBesiktningsprogramkod?.toString() || "",
      tax: carData?.Beraknat?.Skatt?.Skatt?.toString() || "",
      malus: carData?.Beraknat?.Skatt?.Malus?.toString() || "",
    };
  };

  return (
    <Container maxWidth="md">
      <Paper
        elevation={4}
        sx={{
          margin: "10px auto",
          p: 2,
          borderRadius: 3,
          backgroundColor: "#fff",
        }}
      >
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            mb: 2,
            mt: 1,
            width: "100%",
            overflow: "hidden",
            "& .MuiStepLabel-label": {
              fontSize: "0.8rem",
              "@media (max-width: 600px)": { fontSize: "0.60rem" },
            },
            "& .MuiSvgIcon-root": {
              width: "17px",
              height: "17px",
            },
            "& .MuiStepConnector-line": {
              minHeight: "2px",
            },
            "& .MuiStepLabel-root .Mui-completed": {
              color: "green",
            },
            "& .MuiStepLabel-root .Mui-active": {
              color: "#ff9f43",
            },
            "& .MuiStepLabel-label.Mui-active": {
              fontWeight: "bold",
            },
          }}
        >
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Divider sx={{ height: 1, backgroundColor: "#a1a0a0ff" }} />

        {activeStep < 1 && (
          <Formik
            initialValues={{
              vahicleTypeOptionId: null,
              vahicleTypeOptionName: "",
              vahicleTypeOptionVahicleTypeName: "",
            }}
            validationSchema={validationSchemas[activeStep]}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              try {
                setLoading(true);
                setSubmitting(true);

                const storedIdFromLocal = parseInt(
                  localStorage.getItem("currentContractID"),
                  10,
                );

                if (!storedIdFromLocal || storedIdFromLocal !== storedId) {
                  Swal.fire(
                    "❌ Error",
                    "Contract ID mismatch. Cannot update contract.",
                    "error",
                  );
                  return;
                }

                const finalValues = {
                  ...values,
                  sellerUserId: userId,
                  creatorUserId: userId,
                  id: storedId,
                  sellerDealStatus: contractData.sellerDealStatus,
                  sellerDealActive: contractData.sellerDealActive,
                  sellerDealComplete: contractData.sellerDealComplete,
                  carInfoId: contractData.carInfoId,
                  creationTime: new Date().toISOString(),
                  lastModificationTime: new Date().toISOString(),
                  buyerDealStatus: "",
                  sellerDrivingLicensePath: "",
                  sellerDrivingLicenseValidate: true,
                  lastModifierUserId: 0,
                };

                const response = await ApiCall({
                  url: "/ContractMain/Update",
                  method: "PUT",
                  data: finalValues,
                });

                if (response?.data?.success) {
                  resetForm();
                  setSubmitted(true);
                  setActiveStep(2);
                } else {
                  Swal.fire(
                    "❌ Error",
                    response?.data?.error?.message || "Submission failed.",
                    "error",
                  );
                }
              } catch (err) {
                Swal.fire(
                  "❌ Error",
                  err.message || "Submission failed.",
                  "error",
                );
              } finally {
                setLoading(false);
                setSubmitting(false);
              }
            }}
          >
            {({ submitForm, setFieldValue }) => (
              <Form>
                <Container maxWidth="md">
                  <Typography
                    variant="h6"
                    align="center"
                    fontWeight="bold"
                    mb={2}
                    mt={1}
                  >
                    {t("seller.headerTitle")}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    mb={1}
                  >
                    {t("seller.headerSubtitle")}
                  </Typography>

                  <Container maxWidth="sm">
                    {loading ? (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        py={6}
                      >
                        <div className="loader"></div>
                      </Box>
                    ) : error ? (
                      <Typography
                        color="error"
                        align="center"
                        fontWeight="bold"
                        py={3}
                      >
                        {error}
                      </Typography>
                    ) : vehicleData.length === 0 ? (
                      <Typography align="center" fontWeight="bold" py={3}>
                        {t("seller.noVehicleTypes")}
                      </Typography>
                    ) : (
                      <Grid
                        container
                        spacing={3}
                        mb={3}
                        justifyContent="center"
                        alignItems="center"
                      >
                        {vehicleData.map((veh) => (
                          <Grid size={{ xs: 6, sm: 6, md: 4 }} key={veh.id}>
                            <Paper
                              elevation={3}
                              onClick={() => {
                                setFieldValue("vahicleTypeOptionId", veh.id);
                                setFieldValue(
                                  "vahicleTypeOptionName",
                                  veh.vahicleTypeName,
                                );
                                setFieldValue(
                                  "vahicleTypeOptionVahicleTypeName",
                                  veh.vahicleTypeName,
                                );

                                setTimeout(() => {
                                  submitForm();
                                }, 0);
                              }}
                              sx={{
                                borderRadius: 2,
                                textAlign: "center",
                                cursor: "pointer",
                                border: "1px solid #ccc",
                                backgroundColor: "white",
                                transition: "0.2s",
                                "&:hover": {
                                  border: "1px solid #ff9f43",
                                  transform: "scale(1.05)",
                                },
                              }}
                            >
                              <Box
                                sx={{
                                  width: 60,
                                  height: 60,
                                  borderRadius: "50%",
                                  backgroundColor: "#fbe7d4ff",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 24,
                                  margin: "8px auto",
                                }}
                              >
                                {veh.vahicleTypeName
                                  .toLowerCase()
                                  .includes("car") && <FaCar color="#ff9f43" />}
                                {veh.vahicleTypeName
                                  .toLowerCase()
                                  .includes("motorcycle") && (
                                  <FaMotorcycle color="#ff9f43" />
                                )}
                                {veh.vahicleTypeName
                                  .toLowerCase()
                                  .includes("truck") && (
                                  <FaTruck color="#ff9f43" />
                                )}
                                {veh.vahicleTypeName
                                  .toLowerCase()
                                  .includes("boat") && (
                                  <FaShip color="#ff9f43" />
                                )}
                                {veh.vahicleTypeName
                                  .toLowerCase()
                                  .includes("camper") && (
                                  <FaTrailer color="#ff9f43" />
                                )}
                                {veh.vahicleTypeName
                                  .toLowerCase()
                                  .includes("moped") && (
                                  <MdElectricScooter color="#ff9f43" />
                                )}
                              </Box>

                              <Typography fontWeight="bold" py={1}>
                                {veh.vahicleTypeName}
                              </Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Container>
                </Container>
              </Form>
            )}
          </Formik>
        )}

        {/* ------------------ FORM 2 ------------------ */}
        {activeStep === 2 && (
          <Box textAlign="center" mt={2}>
            <Typography variant="h6" fontWeight="bold">
              {t("seller.startSaleTitle")}
            </Typography>
            <Typography variant="subtitle2" mt={1} color="text.secondary">
              {t("seller.startSaleSubtitle")}
            </Typography>

            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              mt={2}
              mb={3}
              gap={1}
            >
              <TextField
                placeholder="Registration number"
                variant="outlined"
                size="small"
                value={registration}
                onChange={(e) => setRegistration(e.target.value)}
                autoComplete="off"
                sx={{
                  width: 300,
                  "@media (max-width:600px)": {
                    width: 200,
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "18px",
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff9f63",
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                disabled={loading || !registration}
                sx={{
                  backgroundColor: "#ff9f43",
                  "&:hover": { backgroundColor: "#e68a33" },
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  minWidth: "50px",
                  padding: "6px",
                }}
              >
                {loading ? "..." : <SearchIcon />}
              </Button>
            </Box>

            {error && (
              <div style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                {error}
              </div>
            )}
          </Box>
        )}

        {/* ------------------ FORM 3 ------------------ */}

        {activeStep === 3 && (
          <Formik
            initialValues={{
              sellerDealComplete: true,
            }}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await ApiCall({
                  url: "/ContractMain/Get",
                  method: "GET",
                  params: { Id: contractData.id },
                });

                const contractData2 = response.result || response.data?.result;

                if (!contractData2) {
                  Swal.fire(
                    "❌ Error",
                    "Failed to fetch latest contract data!",
                    "error",
                  );
                  return;
                }

                const payload = {
                  ...contractData2,
                  sellerDealComplete: true,
                  sellerDrivingLicensePath: "",
                };

                const updateRes = await ApiCall({
                  url: "/ContractMain/Update",
                  method: "PUT",
                  data: payload,
                });
                const status = updateRes?.status;
                const isError = updateRes?.success === false || status >= 400;

                if (!isError && (status === 200 || status === 201)) {
                  const respData = updateRes?.data || updateRes;

                  const returnedCarInfoId =
                    respData?.result?.carInfoId ??
                    respData?.carInfoId ??
                    respData?.result?.carInfo?.id ??
                    null;

                  const returnedId =
                    respData?.result?.id ?? respData?.id ?? null;

                  if (returnedCarInfoId) setUpdatedCarInfoId(returnedCarInfoId);

                  if (returnedId) setLastId(returnedId);

                  setActiveStep(4);
                } else {
                  const errorMsg =
                    updateRes?.error?.details ||
                    updateRes?.error?.message ||
                    "Something went wrong while updating the contract.";
                  Swal.fire("❌ Error", errorMsg, "error");
                }
              } catch (err) {
                console.error("❌ Error finalizing contract:", err);

                const errorMsg =
                  err.response?.data?.error?.details ||
                  err.response?.data?.error?.message ||
                  "Unexpected server error occurred.";

                Swal.fire("❌ Error", errorMsg, "error");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box textAlign="center" py={2}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {t("seller.SaleCreated")}
                    </Typography>

                    <Box
                      sx={{
                        display: "inline-block",
                        padding: 1,
                        bgcolor: "background.paper",
                        borderRadius: 1,
                        boxShadow: 2,
                      }}
                    >
                      {QR ? (
                        <QRCode
                          value={QR}
                          size={210}
                          level="M"
                          bgColor="#ffffff"
                          fgColor="#000000"
                          includeMargin={false}
                        />
                      ) : (
                        <Typography color="gray" fontSize="14px">
                          Generating QR...
                        </Typography>
                      )}
                    </Box>

                    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
                      <Typography
                        variant="body2"
                        gutterBottom
                        sx={{ marginTop: 1 }}
                      >
                        {t("seller.askBuyer")}
                      </Typography>
                      <Box
                        sx={{
                          mt: 2,
                          p: 1,
                          borderRadius: "12px",
                          border: "2px solid #ff9f63",
                          backgroundColor: "#fffaf5",
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            letterSpacing: 1.5,
                            color: "#333",
                          }}
                        >
                          {carRegNo || "-"}
                        </Typography>
                      </Box>

                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        color={buyerConnected ? "green" : "red"}
                        sx={{
                          marginTop: 2,
                          backgroundColor: buyerConnected
                            ? "#c6f7d4ff"
                            : "#f7c6c6ff",
                          p: 1,
                          borderRadius: 1,
                        }}
                      >
                        {buyerConnected
                          ? `✅${t("seller.available")}`
                          : "❌ Waiting..."}
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        color={buyerConnected ? "green" : "red"}
                        sx={{
                          marginTop: 2,
                          backgroundColor: buyerConnected
                            ? "#c6f7d4ff"
                            : "#f7c6c6ff",
                          p: 1,
                          borderRadius: 1,
                        }}
                      >
                        {buyerConnected
                          ? `${buyerUserName} has connected. ${t(
                              "seller.proceed",
                            )}`
                          : "❌ Waiting for proceed"}
                      </Typography>
                    </Container>
                  </Box>

                  <Box display="flex" justifyContent="center" gap={2} mt={3}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="success"
                      disabled={!buyerConnected}
                    >
                      {isSubmitting ? "Finalizing..." : "Start Sale"}
                    </Button>
                  </Box>
                </motion.div>
              </Form>
            )}
          </Formik>
        )}

        {/* ------------------ STEP 4 ------------------ */}

        {activeStep === 4 && (
          <Formik
            initialValues={{}}
            enableReinitialize
            onSubmit={async (values, { setSubmitting }) => {
              try {
                if (!fetchedContractInfo) {
                  Swal.fire(
                    "⚠️ Warning",
                    "No contract info to submit!",
                    "warning",
                  );
                  return;
                }
                const rawValue = values.carValuationBySeller.replace(/\s/g, "");

                const payload = {
                  ...fetchedContractInfo,
                  sellerDrivingLicensePath: "",
                  carValuationBySeller: rawValue,
                };

                const response = await ApiCall({
                  url: "/ContractMain/Update",
                  method: "PUT",
                  data: payload,
                });

                const isSuccess =
                  response?.success === true || response?.status === 200;
                if (connection) {
                  await sendDealMessage("seller", "Seller added valuation");
                }

                if (isSuccess) {
                  // Swal.fire(
                  //   "✅ Success",
                  //   "Contract submitted successfully!",
                  //   "success"
                  // );
                  setActiveStep(5);
                } else {
                  Swal.fire(
                    "❌ Error",
                    response?.error?.details || "Failed to submit contract!",
                    "error",
                  );
                }
              } catch (error) {
                console.error("❌ Error submitting contract:", error);
                Swal.fire(
                  "❌ Error",
                  "Unexpected server error occurred!",
                  "error",
                );
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ handleSubmit, values, isSubmitting, setFieldValue }) => (
              <Form onSubmit={handleSubmit}>
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.4 }}
                >
                  <Box>
                    {" "}
                    <Typography
                      variant="h6"
                      align="center"
                      gutterBottom
                      sx={{ fontWeight: "bold", marginBottom: 3, marginTop: 1 }}
                    >
                      {t("seller.sellCarForTitle")}
                    </Typography>
                  </Box>
                  {fetchedCarInfo ? (
                    <Paper
                      elevation={4}
                      sx={{
                        p: 3,
                        mt: 2,
                        borderRadius: 3,
                        border: "1px solid #d7d7d7ff",
                      }}
                    >
                      <Typography
                        variant="h6"
                        gutterBottom
                        mb={2}
                        sx={{ fontWeight: "bold" }}
                      >
                        <strong> {fetchedCarInfo?.name} </strong>
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid size={{ xs: 6, md: 6 }}>
                          <Typography>
                            <strong>{t("seller.registrationNo")}:</strong>{" "}
                            {fetchedCarInfo?.registrationNo}
                          </Typography>
                          <Typography>
                            <strong>{t("seller.vehicle")}:</strong>{" "}
                            {fetchedCarInfo?.vehicleDesignation}
                          </Typography>
                          <Typography>
                            <strong>{t("seller.vehicleYears")}:</strong>{" "}
                            {fetchedCarInfo?.vehicleYears}
                          </Typography>
                        </Grid>

                        <Grid size={{ xs: 6, md: 6 }}>
                          <Typography>
                            <strong>{t("seller.numberOfUsers")}:</strong>{" "}
                            {fetchedCarInfo?.numberOfUsers}
                          </Typography>
                          <Typography>
                            <strong>{t("seller.axleWeight")}:</strong>{" "}
                            {fetchedCarInfo?.waxelbarge}
                          </Typography>
                          <Typography>
                            <strong>{t("seller.fuel")}:</strong>{" "}
                            {fetchedCarInfo?.fuel}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  ) : (
                    <Typography align="center" sx={{ mt: 4, color: "gray" }}>
                      {t("seller.fetchingCarDetails")}
                    </Typography>
                  )}
                  <Box display="flex" justifyContent="center" mt={2}>
                    <TextField
                      label="Valuation by Seller"
                      size="small"
                      value={values.carValuationBySeller}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, "");
                        if (!/^\d*$/.test(value)) return;

                        const formatted = new Intl.NumberFormat("en-US")
                          .format(Number(value))
                          .replace(/,/g, " ");

                        setFieldValue("carValuationBySeller", formatted);
                      }}
                      variant="outlined"
                      sx={{ width: "100%", maxWidth: 200 }}
                    />
                    {values.carValuationBySeller && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ m: 1, fontStyle: "italic" }}
                      >
                        {numberToWords(
                          parseInt(
                            values.carValuationBySeller.replace(/\s/g, ""),
                          ),
                        )}
                      </Typography>
                    )}
                  </Box>

                  <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting || !values.carValuationBySeller}
                      sx={{
                        backgroundColor: "#ff9f43",
                        color: "#fff",
                        "&:hover": {
                          backgroundColor: "#e78c35",
                        },
                      }}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </Box>
                </motion.div>
              </Form>
            )}
          </Formik>
        )}

        {activeStep === 5 && (
          <Paper
            elevation={3}
            sx={{
              p: 4,
              margin: "40px auto",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 3, textAlign: "center", fontWeight: "bold" }}
            >
              {t("seller.vehicleInformation")}
            </Typography>

            {!finalContract ? (
              <Typography>Loading vehicle information...</Typography>
            ) : (
              <Box
                sx={{
                  border: "1px solid #ccc",
                  boxShadow: 3,
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <DataRow
                  label={t("seller.car.steps.registrationNo")}
                  value={finalContract.carInfoRegistrationNo || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.vehicleDesignation")}
                  value={finalContract.carInfoVehicleDesignation || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.tradeName")}
                  value={finalContract.carInfoTradeName || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.yearModel")}
                  value={finalContract.carInfoYearModel || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.vehicleYears")}
                  value={finalContract.carInfoVehicleYears || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.registrationDate")}
                  value={finalContract.carInfoRegistrationDate || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.numberOfUsers")}
                  value={finalContract.carInfoNumberOfUsers || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.axleWeight")}
                  value={finalContract.carInfoWaxelbarge || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.fourWheelDrive")}
                  value={
                    finalContract.carInfoFourWheelDrive
                      ?.toString()
                      .toLowerCase() === "true"
                      ? t("seller.car.steps.yes")
                      : t("seller.car.steps.no")
                  }
                />

                <DataRow
                  label={t("seller.car.steps.fuel")}
                  value={finalContract.carInfoFuel || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.evConfig")}
                  value={
                    finalContract.carInfoElectricVehicleConfiguration || "-"
                  }
                />

                <DataRow
                  label={t("seller.car.steps.inspectionDate")}
                  value={finalContract.carInfoInspectionDate || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.prevInspectionDate")}
                  value={finalContract.carInfoPreviousInspectionDate || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.inspectionStation")}
                  value={finalContract.carInfoInspectionStation || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.inspectionGroup")}
                  value={finalContract.carInfoInspectionGroup || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.feedingStall")}
                  value={finalContract.carInfoFeedingStall || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.tax")}
                  value={finalContract.carInfoTax || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.malus")}
                  value={finalContract.carInfoMalus || "-"}
                />

                <DataRow
                  label={t("seller.car.steps.valuation")}
                  value={
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      {finalContract.carValuationBySeller
                        ? finalContract.carValuationBySeller
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                        : "-"}
                      <FaEdit
                        onClick={() => createRef.current.click()}
                        style={{
                          cursor: "pointer",
                          fontSize: "20px",
                          color: "#ff9f63",
                        }}
                        title="Edit"
                      />
                    </Typography>
                  }
                />
              </Box>
            )}

            <Box
              sx={{
                border: "1px solid #ccc",
                boxShadow: 3,
                borderRadius: 2,
                p: 2,
                mt: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <AirportShuttleIcon />
                {t("seller.deliveryRisk.title")}
              </Typography>

              <Box
                sx={{
                  backgroundColor: "#f1efefff",
                  borderRadius: 3,
                  p: 2,
                  mt: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "flex-start", gap: 0.5 }}
                >
                  <ReportGmailerrorredIcon sx={{ fontSize: 16, mt: "2px" }} />
                  {t("seller.deliveryRisk.description")}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                border: "1px solid #ccc",
                boxShadow: 3,
                borderRadius: 2,
                p: 2,
                mt: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <AirportShuttleIcon />
                {t("seller.deliveryRisk.title")}
              </Typography>

              <Box
                sx={{
                  backgroundColor: "#f1efefff",
                  borderRadius: 3,
                  p: 2,
                  mt: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "flex-start", gap: 0.5 }}
                >
                  <ReportGmailerrorredIcon sx={{ fontSize: 16, mt: "2px" }} />
                  {t("seller.deliveryRisk.description")}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                border: "1px solid #ccc",
                boxShadow: 3,
                borderRadius: 2,
                p: 2,
                mt: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <AirportShuttleIcon />
                {t("seller.conditionDefects.title")}
              </Typography>

              <Typography
                variant="body2"
                sx={{ mt: 1, color: "text.secondary" }}
              >
                {t("seller.conditionDefects.line1")}
              </Typography>

              <Typography
                variant="body2"
                sx={{ mt: 0.5, color: "text.secondary" }}
              >
                {t("seller.conditionDefects.line2")}
              </Typography>

              <Typography
                variant="body2"
                sx={{ mt: 0.5, color: "text.secondary" }}
              >
                {t("seller.conditionDefects.line3")}
              </Typography>
            </Box>

            <Box
              sx={{
                border: "1px solid #ccc",
                boxShadow: 3,
                borderRadius: 2,
                p: 2,
                mt: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <AccountBalanceIcon />
                {t("seller.debts.title")}
              </Typography>

              <Typography
                variant="body2"
                sx={{ mt: 1, color: "text.secondary" }}
              >
                {t("seller.debts.subtitle")}
              </Typography>

              <FormGroup sx={{ mt: 1, gap: 0.5 }}>
                <FormControlLabel
                  value="none"
                  disabled
                  control={
                    <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 14 } }} />
                  }
                  label={
                    <Typography variant="body2" color="text.secondary">
                      {t("seller.debts.options.none")}
                    </Typography>
                  }
                />

                <FormControlLabel
                  value="seller"
                  control={
                    <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 14 } }} />
                  }
                  label={
                    <Typography variant="body2" color="text.secondary">
                      {t("seller.debts.options.seller")}
                    </Typography>
                  }
                />

                <FormControlLabel
                  value="buyer"
                  disabled
                  control={
                    <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 14 } }} />
                  }
                  label={
                    <Typography variant="body2" color="text.secondary">
                      {t("seller.debts.options.buyer")}
                    </Typography>
                  }
                />
              </FormGroup>
            </Box>

            <Box
              sx={{
                border: "1px solid #ccc",
                boxShadow: 3,
                borderRadius: 2,
                p: 2,
                mt: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <HomeWorkIcon />
                {t("seller.loan.title")}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "grey.100",
                  color: "text.secondary",
                  border: "1px solid",
                  borderColor: "grey.300",
                }}
              >
                {t("seller.loan.description")}
              </Typography>

              <RadioGroup
                value={value}
                onChange={(e) => setValue(e.target.value)}
                sx={{ mt: 1 }}
              >
                <FormControlLabel
                  value="none"
                  control={
                    <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 14 } }} />
                  }
                  label={
                    <Typography variant="body1">
                      {t("seller.loan.options.none")}
                    </Typography>
                  }
                />

                <FormGroup sx={{ gap: 0.5 }}>
                  <FormControlLabel
                    value="seller"
                    control={
                      <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }} />
                    }
                    label={
                      <Typography variant="body2" color="text.secondary">
                        {t("seller.loan.options.seller")}
                      </Typography>
                    }
                  />
                  <FormControlLabel
                    value="buyer"
                    control={
                      <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 16 } }} />
                    }
                    label={
                      <Typography variant="body2" color="text.secondary">
                        {t("seller.loan.options.buyer")}
                      </Typography>
                    }
                  />
                </FormGroup>
              </RadioGroup>
            </Box>

            <Box
              sx={{
                border: "1px solid #ccc",
                boxShadow: 3,
                borderRadius: 2,
                p: 2,
                mt: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <DescriptionIcon />
                {t("seller.ownership.title")}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  mt: 1,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: "grey.100",
                  color: "text.secondary",
                }}
              >
                {t("seller.ownership.description1")}
              </Typography>

              <Typography
                variant="body2"
                sx={{ mt: 1, color: "text.secondary" }}
              >
                {t("seller.ownership.description2")}
              </Typography>

              <Typography
                variant="body2"
                sx={{ mt: 1, color: "text.secondary" }}
              >
                {t("seller.ownership.description3")}
              </Typography>
            </Box>

            <Box
              sx={{
                border: "1px solid #ccc",
                boxShadow: 3,
                borderRadius: 2,
                p: 2,
                mt: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <DirectionsCarFilledIcon />
                {t("seller.transportAgency.title")}
              </Typography>

              <Typography
                variant="body2"
                sx={{ mt: 1, color: "text.secondary" }}
              >
                {t("seller.transportAgency.description1")}
              </Typography>

              <Typography
                variant="body2"
                sx={{ mt: 1, color: "text.secondary" }}
              >
                {t("seller.transportAgency.description2")}
              </Typography>
            </Box>

            <Box
              sx={{
                mt: 4,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="success"
                size="large"
                onClick={handleSellerDealConfirm}
                disabled={loading}
                startIcon={
                  loading && <CircularProgress size={20} color="inherit" />
                }
              >
                {loading ? "Confirming..." : "Deal Confirm"}
              </Button>
            </Box>
          </Paper>
        )}

        <UpadteValuation
          open={createRef}
          close={refClose}
          contractId={contractId}
          carvaluation={finalContractvaluation}
          carId={carId}
          onUpdated={() => setRefreshFinalContract((prev) => !prev)}
          sendDealMessage={sendDealMessage}
          connection={connection}
        />
      </Paper>
    </Container>
  );
}

export default SellerProfile;

const DataRow = ({ label, value }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
    <Typography sx={{ fontWeight: 500 }}>{label}</Typography>
    <Typography>{value ?? "-"}</Typography>
  </Box>
);

import React, { useRef, useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Button,
  Container,
  Box,
  Divider,
  Grid,
} from "@mui/material";
import { useReactToPrint } from "react-to-print";
import ApiCall from "../../Apicall/ApiCall";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useParams } from "react-router-dom";

const Contract = () => {
  const printRef = useRef(null);

  /* 🔹 STATES */
  const [contractData, setContractData] = useState(null);
  const [sellerData, setSellerData] = useState(null);
  const [buyerData, setBuyerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    if (contractData && sellerData && buyerData) {
      setLoading(false); // all data loaded
    }
  }, [contractData, sellerData, buyerData]);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Contract",
  });

  /* 🔹 FETCH CONTRACT DATA */
  useEffect(() => {
    const fetchContract = async () => {
      try {
        const response = await ApiCall({
          url: "/ContractMain/GetContractMainById",
          method: "GET",
          params: { Id: id },
        });

        if (response?.data?.result) {
          setContractData(response.data.result);
        }
      } catch (error) {
        console.error("Contract API Error:", error);
      }
    };

    fetchContract();
  }, [id]);

  /* 🔹 FETCH SELLER DATA */
  useEffect(() => {
    const fetchSeller = async () => {
      if (!contractData?.sellerUserId) return;

      try {
        const response = await ApiCall({
          url: "/User/Get",
          method: "GET",
          params: { Id: contractData.sellerUserId },
        });

        if (response?.data?.result) setSellerData(response.data.result);
      } catch (error) {
        console.error("Seller API Error:", error);
      }
    };

    fetchSeller();
  }, [contractData?.sellerUserId]);

  useEffect(() => {
    const fetchBuyer = async () => {
      if (!contractData?.buyerUserId) return;

      try {
        const response = await ApiCall({
          url: "/User/Get",
          method: "GET",
          params: { Id: contractData.buyerUserId },
        });

        if (response?.data?.result) setBuyerData(response.data.result);
      } catch (error) {
        console.error("Buyer API Error:", error);
      }
    };

    fetchBuyer();
  }, [contractData?.buyerUserId]);

  return (
    <Container maxWidth="md" sx={{ mt: 2, px: 2 }}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" onClick={handlePrint} disabled={loading}>
          {loading ? "Loading..." : "Print"}
        </Button>
      </Box>

      <Box ref={printRef}>
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            p: { xs: 3, md: 5 },
            borderRadius: 1,
            "@media print": {
              boxShadow: "none",
              borderRadius: 0,
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
            borderBottom="1px solid #b5b5b5"
            pb={1}
          >
            <Typography variant="body1">
              <Box component="span" fontWeight="bold">
                Klargo
              </Box>{" "}
              •{" "}
              <Box component="span" fontSize="0.85rem">
                Contract of sale
              </Box>{" "}
              <Box
                component="span"
                color="gray"
                sx={{ fontSize: "1rem" }} // smaller font
              >
                {contractData?.carInfoRegistrationNo || "XXXX"}
              </Box>
              ·
              <Box
                component="span"
                color="gray"
                sx={{ fontSize: "1rem" }} // smaller font
              >
                {contractData?.carInfoVehicleDesignation || "XXXX"}
              </Box>
            </Typography>

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" marginRight={2}>
                Reference: KLG-2025-001482-REF
              </Typography>

              <Typography variant="body1">
                Datum:{" "}
                <Box component="span" fontWeight="bold">
                  {new Date().toLocaleDateString()}
                </Box>
              </Typography>
            </Box>
          </Box>

          <Box mt={4} borderBottom="1px solid #b5b5b5" pb={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Parties
            </Typography>

            <Box display="flex" justifyContent="space-between" gap={6}>
              {/* Seller */}
              <Box flex={1}>
                <Typography fontWeight="bold" mb={1}>
                  Seller
                </Typography>
                <Box borderTop="1px solid #ddd" pt={1}>
                  <Typography variant="body2">
                    <b>Name:</b> {sellerData?.name || "XXX"}
                  </Typography>
                  <Typography variant="body2">
                    <b>Email:</b> {sellerData?.emailAddress || "XXX"}
                  </Typography>
                  <Typography variant="body2">
                    <b>Phone:</b> {sellerData?.phoneNumber || "XXX"}
                  </Typography>
                </Box>
              </Box>

              {/* Buyer */}
              <Box flex={1}>
                <Typography fontWeight="bold" mb={1}>
                  Buyer
                </Typography>
                <Box borderTop="1px solid #ddd" pt={1}>
                  <Typography variant="body2">
                    <b>Name:</b> {buyerData?.name || "XXX"}
                  </Typography>
                  <Typography variant="body2">
                    <b>Email:</b> {buyerData?.emailAddress || "XXX"}
                  </Typography>
                  <Typography variant="body2">
                    <b>Phone:</b> {buyerData?.phoneNumber || "XXX"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Box mt={3} borderBottom="1px solid #b5b5b5" pb={2}>
            {/* Swedish Text */}
            <Typography variant="body2" mb={1}>
              Detta avtal avser försäljning av ett begagnat fordon mellan två
              privatpersoner. Köplagen (1990:931) gäller, om inte parterna har
              avtalat annat. Klargo är inte part i avtalet utan tillhandahåller
              den digitala tjänst som används för att genomföra affären.
            </Typography>
          </Box>

          <Box mt={3}>
            <Typography variant="body1" fontWeight="bold" mb={2}>
              Vehicle
            </Typography>
            <Box p={2} sx={{ backgroundColor: "#f7f7f7", borderRadius: 2 }}>
              <Box
                display="grid"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                columnGap={8}
                rowGap={3}
              >
                <Box>
                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary">
                      Registration number:
                    </Typography>
                    <Typography fontWeight="bold">
                      {contractData?.carInfoRegistrationNo}
                    </Typography>
                  </Box>

                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary">
                      Model year:
                    </Typography>
                    <Typography fontWeight="bold">
                      {contractData?.carInfoVehicleYears}
                    </Typography>
                  </Box>

                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary">
                      Registration date:
                    </Typography>
                    <Typography fontWeight="bold">
                      {contractData?.carInfoRegistrationDate
                        ? new Date(
                            contractData.carInfoRegistrationDate,
                          ).toLocaleDateString()
                        : "-"}
                    </Typography>
                  </Box>

                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary">
                      Previous owners:
                    </Typography>
                    <Typography fontWeight="bold">
                      {contractData?.carInfoNumberOfUsers}
                    </Typography>
                  </Box>

                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary">
                      Inspection station:
                    </Typography>
                    <Typography fontWeight="bold">
                      {contractData?.carInfoInspectionStation || "-"}
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary">
                      Brand and model:
                    </Typography>
                    <Typography fontWeight="bold">
                      {contractData?.carInfoVehicleDesignation}
                    </Typography>
                  </Box>

                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary">
                      Fuel:
                    </Typography>
                    <Typography fontWeight="bold">
                      {contractData?.carInfoFuel}
                    </Typography>
                  </Box>

                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary">
                      Gearbox:
                    </Typography>
                    <Typography fontWeight="bold">
                      {contractData?.carInfoWaxelbarge || "-"}
                    </Typography>
                  </Box>

                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary">
                      4 Wheel Drive:
                    </Typography>
                    <Typography fontWeight="bold">
                      {contractData?.carInfoFourWheelDrive === "True"
                        ? "Yes"
                        : "No"}
                    </Typography>
                  </Box>

                  <Box mb={2}>
                    <Typography variant="body2" color="text.secondary">
                      Inspection group:
                    </Typography>
                    <Typography fontWeight="bold">
                      {contractData?.carInfoInspectionGroup}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Equipment Included */}
          <Box mt={2}>
            <Typography fontWeight="bold" mb={1}>
              Equipment included
            </Typography>

            <Typography variant="body2">
              Navigation system (PCM), Black leather upholstery, Front and rear
              parking sensors, Adaptive cruise control, Driver assistance,
              Panoramic glass sunroof, Towbar, Electrically adjustable driver's
              seat with memory, Xenon headlights
            </Typography>
          </Box>

          <Box mt={1}>
            <Typography fontWeight="bold" mb={1}>
              Known errors and shortcomings
            </Typography>

            <Typography variant="body2">
              Minor scratch on the right rear fender, approx. 5 cm. Stone chip
              on the windshield, not in the field of vision. The vehicle
              otherwise has no known technical defects.
            </Typography>
          </Box>

          {/* Other Accessories */}
          <Box mt={2}>
            <Typography fontWeight="bold" mb={1}>
              Other accessories
            </Typography>

            <Box component="ul" sx={{ pl: 2, m: 0 }}>
              <li>
                <Typography variant="body2">
                  Summer wheels: Yes (original Porsche 20")
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Winter wheels: Yes (Pirelli Sottozero on alloy rims)
                </Typography>
              </li>
              <li>
                <Typography variant="body2">Roof box: No</Typography>
              </li>
            </Box>
          </Box>

          <Box mt={4}>
            <Typography variant="body2" mb={2}>
              <b>Vehicle data retrieved:</b> 2025-01-14 09:15:32 via Klargo
              (source: Bilvision / Swedish Transport Agency).
            </Typography>

            <Typography variant="body2" mt={1}>
              The seller certifies that the meter reading above is correct upon
              handover.
            </Typography>
          </Box>

          {/* Condition and faults */}
          <Box mt={4}>
            <Typography fontWeight="bold" mb={1}>
              Condition and faults
            </Typography>

            <Typography variant="body2" mb={1}>
              The vehicle is being sold in its current condition.
            </Typography>

            <Typography variant="body2" mb={1}>
              The vehicle is still to be considered defective if it does not
              match the information provided by the seller, if the seller has
              omitted essential information that the buyer could reasonably have
              expected to receive, or if the vehicle is in significantly worse
              condition than the buyer could reasonably have expected
              considering the price and other circumstances.
            </Typography>

            <Typography variant="body2" mb={1}>
              The buyer may not invoke defects that the buyer knew about at the
              time of purchase, or that the buyer should have discovered during
              an examination.
            </Typography>

            <Typography variant="body2">
              The buyer must report defects to the seller within a reasonable
              time after the defect was noticed or should have been noticed.
              Complaints may not be made later than two years from delivery,
              unless the seller has acted grossly negligently or in breach of
              good faith.
            </Typography>
          </Box>

          <Box mt={4}>
            {/* TOP LINE */}
            <Divider sx={{ mb: 3, borderColor: "#8f8e8e" }} />

            <Typography fontWeight="bold" mb={3}>
              Price and payment
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={2.5}>
              <Typography variant="body2" color="text.secondary">
                Total price:
              </Typography>
              <Typography fontWeight="bold">359 000 SEK</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={2.5}>
              <Typography variant="body2" color="text.secondary">
                Down payment:
              </Typography>
              <Typography variant="body2">35,000 SEK (paid)</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={2.5}>
              <Typography variant="body2" color="text.secondary">
                Remaining amount:
              </Typography>
              <Typography fontWeight="bold">324 000 SEK</Typography>
            </Box>

            <Divider sx={{ mt: 3, borderColor: "#8f8e8e" }} />
            <Box mt={3}>
              <Typography variant="body2">
                The purchase price must be paid via Klargo&apos;s payment flow
                at Klargo&apos;s payment partner. Delivery will only take place
                when full payment has been confirmed.
              </Typography>
            </Box>

            {/* BOTTOM LINE */}
            <Divider sx={{ mt: 3, borderColor: "#8f8e8e" }} />
          </Box>

          <Box mt={4}>
            <Typography fontWeight="bold" mb={2}>
              Delivery and risk
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="body2" color="text.secondary">
                Delivery date:
              </Typography>
              <Typography fontWeight="bold">2025-01-20</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="body2" color="text.secondary">
                Time:
              </Typography>
              <Typography fontWeight="bold">14:00</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="body2" color="text.secondary">
                Place of handover:
              </Typography>
              <Typography fontWeight="bold">
                Storgatan 15, 123 45 Stockholm (seller&apos;s address)
              </Typography>
            </Box>

            <Box mt={2}>
              <Divider sx={{ mb: 3, borderColor: "#8f8e8e" }} />
              <Typography variant="body2">
                The risk for the vehicle passes to the buyer upon handover (when
                the vehicle is delivered). The buyer is responsible for the
                vehicle from the time of handover.
              </Typography>
            </Box>

            <Divider sx={{ mt: 3, borderColor: "#8f8e8e" }} />
          </Box>
          <Box mt={4}>
            <Box mb={2.5}>
              <Typography variant="body1" fontWeight="bold" mb={1}>
                Liabilities:
              </Typography>
              <Typography variant="body2">
                No debts attributable to the vehicle are known at the time of
                the agreement.
              </Typography>
              <Divider sx={{ mt: 3, borderColor: "#8f8e8e" }} />
            </Box>

            {/* Loan or mortgage */}
            <Box mb={2.5}>
              <Typography variant="body1" fontWeight="bold" mb={1}>
                Loan or mortgage:
              </Typography>
              <Typography variant="body2">
                There are no loans or mortgages on the vehicle. If the deposit
                or credit is not lifted upon delivery, the buyer may stop
                delivery or cancel the purchase.
              </Typography>
              <Divider sx={{ mt: 3, borderColor: "#8f8e8e" }} />
            </Box>

            {/* Ownership and documents */}
            <Box mb={2.5}>
              <Typography variant="body1" fontWeight="bold" mb={1}>
                Ownership and documents:
              </Typography>
              <Typography variant="body2">
                Ownership remains with the seller until full payment has been
                made. Upon delivery, the seller will hand over the remaining
                documents, such as the registration certificate part 2 and
                service documentation.
              </Typography>

              <Typography variant="body2" mt={1}>
                The seller certifies that the vehicle is not subject to a
                driving ban upon delivery.
              </Typography>
              <Divider sx={{ mt: 3, borderColor: "#8f8e8e" }} />
            </Box>

            {/* Swedish Transport Agency */}
            <Box mb={2.5}>
              <Typography variant="body1" fontWeight="bold" mb={1}>
                Swedish Transport Agency:
              </Typography>
              <Typography variant="body2">
                The parties undertake to carry out the change of ownership
                without delay via the Swedish Transport Agency's e-service (Mina
                sidor) in connection with the handover.
              </Typography>
              <Typography variant="body2" mt={1}>
                This agreement constitutes the basis for the parties' agreement.
                The registration of the change of ownership is carried out with
                the Swedish Transport Agency.
              </Typography>
              <Divider sx={{ mt: 3, borderColor: "#8f8e8e" }} />
            </Box>

            {/* Applicable law and dispute resolution */}
            <Box mb={2.5}>
              <Typography variant="body1" fontWeight="bold" mb={1}>
                Applicable law and dispute resolution:
              </Typography>
              <Typography variant="body2" mt={1}>
                Swedish law applies to this agreement.
              </Typography>
              <Typography variant="body2" mt={1}>
                {" "}
                Disputes that cannot be resolved between the parties are heard
                by a general court, with the district court where the defendant
                has his or her domicile as the first instance.
              </Typography>
              <Divider sx={{ mt: 3, borderColor: "#8f8e8e" }} />
            </Box>
          </Box>

          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Signing
            </Typography>

            <Grid container spacing={2}>
              {/* Seller */}
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    p: 2,
                    width: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <VerifiedIcon sx={{ color: "green", mr: 1 }} />
                    <Typography variant="body2">Signed with BankID</Typography>
                  </Box>

                  <Typography variant="caption" sx={{ color: "#888" }}>
                    SELLER :
                  </Typography>

                  <Typography sx={{ fontWeight: 600 }}>
                    {sellerData?.name || "XXX"}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {sellerData?.bankIdSSN || "XXXXXX"} •{" "}
                    {sellerData?.signedAt || "YYYY-MM-DD HH:mm:ss"}
                  </Typography>
                </Paper>
              </Grid>

              {/* Buyer */}
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    p: 2,
                    width: "100%",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <VerifiedIcon sx={{ color: "green", mr: 1 }} />
                    <Typography variant="body2">Signed with BankID</Typography>
                  </Box>

                  <Typography variant="caption" sx={{ color: "#888" }}>
                    BUYER :
                  </Typography>

                  <Typography sx={{ fontWeight: 600 }}>
                    {buyerData?.name || "XXX"}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {buyerData?.bankIdSSN || "XXXXXX"} •{" "}
                    {buyerData?.signedAt || "YYYY-MM-DD HH:mm:ss"}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Footer note */}
            <Typography variant="body2" sx={{ mt: 2, color: "#555" }}>
              By signing with BankID, the parties confirm that they accept the
              terms of this agreement. The signing details above are stored by
              Klargo.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Contract;

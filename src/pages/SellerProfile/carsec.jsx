import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";

function CarSec({ onSubmit }) {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Submit Valuation
      </Typography>

      <Formik
        initialValues={{ valuationBySeller: "" }}
        onSubmit={(values) => {
          console.log("Valuation by Seller:", values);
          if (onSubmit) onSubmit(); // step 4 me jump
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <Field
              as={TextField}
              name="valuationBySeller"
              label="Valuation By Seller"
              type="number"
              variant="outlined"
              size="small"
              value={values.valuationBySeller}
              onChange={handleChange}
              sx={{ width: "300px", mb: 2 }}
            />
            <Box>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#ff9f43",
                  "&:hover": { backgroundColor: "#e68a33" },
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: "8px",
                }}
              >
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default CarSec;

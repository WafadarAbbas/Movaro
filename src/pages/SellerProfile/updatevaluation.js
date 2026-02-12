import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import ApiCall from "../../Apicall/ApiCall";

const UpadteValuation = (props) => {
  const formik = useFormik({
    initialValues: {
      carValue: props.carvaluation || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      carValue: Yup.number()
        .required("Required")
        .typeError("Only numbers allowed"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await ApiCall({
          url: "/CarContractValDetail/Create",
          method: "POST",
          data: {
            contractMainId: props.contractId,
            carInfoMainId: props.carId,
            valuation: Number(values.carValue),
          },
        });

        const isSuccess = response?.success === true || response?.status === 200;

        if (isSuccess) {
          Swal.fire("Success", "Car valuation Updated!", "success");

          // ✅ Only after successful API call
          if (props.sendDealMessage && props.connection) {
            await props.sendDealMessage(
              "seller",
              "Seller Updated valuation"
            );
          }

          // close modal
          props.close.current.click();

          // refresh parent
          if (props.onUpdated) props.onUpdated();
        } else {
          Swal.fire("Error", "Failed to update valuation!", "error");
        }

      } catch (error) {
        console.error("Error updating valuation:", error);
        Swal.fire("Error", "Unexpected server error occurred!", "error");
      }
    }

  });

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#UpadteValuationModal"
        ref={props.open}
      >
        Valuation Update
      </button>

      <div
        className="modal fade"
        id="UpadteValuationModal"
        tabIndex="-1"
        aria-labelledby="UpadteValuationModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Car Valuation</h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                ref={props.close}
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <label className="form-label fw-bold">Car Valuation</label>

                <input
                  type="number"
                  name="carValue"
                  className="form-control"
                  value={formik.values.carValue}
                  onChange={formik.handleChange}
                />

                {formik.errors.carValue && (
                  <small style={{ color: "red" }}>
                    {formik.errors.carValue}
                  </small>
                )}

                <button type="submit" className="btn btn-primary mt-3">
                  Update
                </button>
              </form>

              <hr />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpadteValuation;

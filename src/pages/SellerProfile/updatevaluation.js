// import React, { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import Swal from "sweetalert2";
// import ApiCall from "../../Apicall/ApiCall";

// const UpadteValuation = (props) => {
//   const formik = useFormik({
//     initialValues: {
//       carValue: props.carvaluation || "",  
//     },

//     validationSchema: Yup.object({
//       carValue: Yup.number()
//         .required("Required")
//         .typeError("Only numbers allowed"),
//     }),

//     onSubmit: async (values) => {
//       try {
//         const response = await ApiCall({
//           url: `https://localhost:44311/api/services/app/ContractMain/UpdateCarValueByContractId?carValue=${values.carValue}`,
//           method: "PUT",
//           data: {
//             id: props.contractId, 
//           },
//         });

//         Swal.fire("Success", "Car valuation updated!", "success");

       
//        props.close.current.click();  

//     if (props.onUpdated) props.onUpdated();

         
//       }catch (error) {
//   console.error("Error updating value:", error);

//   const backendError =
//     error?.error?.details ||
//     error?.error?.message ||
//     error?.message ||
//     "Failed to update valuation";

//   Swal.fire("Error", backendError, "error");
// }
//     },
//   });

//   return (
//     <div>
//       <button
//         type="button"
//         className="btn btn-primary d-none"
//         data-bs-toggle="modal"
//         data-bs-target="#UpadteValuationModal"
//         ref={props.open}
//       >
//        Valuation Update
//       </button>

//       <div
//         className="modal fade"
//         id="UpadteValuationModal"
//         tabIndex="-1"
//         aria-labelledby="UpadteValuationModalLabel"
//         data-bs-backdrop="static"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-md modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title">Update Car Valuation</h5>

//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 ref={props.close}
//               ></button>
//             </div>

//             <div className="modal-body">
//               <form onSubmit={formik.handleSubmit}>
//                 <label className="form-label fw-bold">Car Valuation</label>
//                 <input
//                   type="number"
//                   name="carValue"
//                   className="form-control"
//                   value={formik.values.carValue}
//                   onChange={formik.handleChange}
//                 />

//                 {formik.errors.carValue && (
//                   <small style={{ color: "red" }}>
//                     {formik.errors.carValue}
//                   </small>
//                 )}

//                 <button
//                   type="submit"
//                   className="btn btn-primary mt-3"
//                 >
//                   Update
//                 </button>
//               </form>

//               <hr />

//               {/* Debug (Optional) */}
//               <p><b>Contract ID:</b> {props.contractId}</p>
//               <p><b>Old Valuation:</b> {props.carvaluation}</p>
//                <p><b>Car ID:</b> {props.carId}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpadteValuation;



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
          url: `https://localhost:44311/api/services/app/CarContractValDetail/Create`,
          method: "POST",
          data: {
            contractMainId: props.contractId,
            carInfoMainId: props.carId,
            valuation: Number(values.carValue),
          },
        });

        Swal.fire("Success", "Car valuation added!", "success");

        // close modal
        props.close.current.click();

        // refresh parent
        if (props.onUpdated) props.onUpdated();

      } catch (error) {
        console.error("Error updating valuation:", error);

        const backendError =
          error?.error?.details ||
          error?.error?.message ||
          error?.message ||
          "Failed to update valuation";

        Swal.fire("Error", backendError, "error");
      }
    },
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
                  Save
                </button>
              </form>

              <hr />

              <p><b>Contract ID:</b> {props.contractId}</p>
              <p><b>Car ID:</b> {props.carId}</p>
              <p><b>Old Valuation:</b> {props.carvaluation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpadteValuation;

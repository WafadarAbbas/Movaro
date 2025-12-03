import React, { useState } from "react";
import { Typography, Box, Tabs, Tab, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const CreateTesting3 = (props) => {
 

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreateTesting3Modal"
        ref={props.open}
      >
        Login
      </button>

      <div
        className="modal fade"
        id="CreateTesting3Modal"
        tabIndex="-1"
        aria-labelledby="CreateTesting3ModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateTesting3ModalLabel">
               Login
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                ref={props.close}
                style={{
                  filter:
                    "invert(33%) sepia(94%) saturate(7478%) hue-rotate(356deg) brightness(99%) contrast(103%)",
                }}
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <h1>Wafadar</h1>
                <h3>User ID: {props.userId}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTesting3;

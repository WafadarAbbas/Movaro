import React, { useEffect, useState } from 'react';
 
const CreateDemo = (props) => {
  

 
 
  
 
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#CreateDemoModal"
        ref={props.open}
      >
        Launch CreateDemo modal
      </button>

      <div
        className="modal fade"
        id="CreateDemoModal"
        tabIndex="-1"
        aria-labelledby="CreateDemoModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="CreateDemoModalLabel">
                Create  CreateDemo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                ref={props.close}
                aria-label="Close"
              ></button>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDemo;
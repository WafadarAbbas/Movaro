// LoadingSpinner.jsx
import React from "react";
import "./spinner.css"; // CSS ko alag rakha hai

const LoadingSpinner = () => {
  return (
       <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <svg
        className="pl"
        width="128px"
        height="128px"
        viewBox="0 0 128 128"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className="pl__ring1" cx="64" cy="64" r="60" />
        <circle className="pl__ring2" cx="64" cy="64" r="52.5" />
        <circle className="pl__ring3" cx="64" cy="64" r="46" />
        <circle className="pl__ring4" cx="64" cy="64" r="40.5" />
        <circle className="pl__ring5" cx="64" cy="64" r="36" />
        <circle className="pl__ring6" cx="64" cy="64" r="32.5" />
      </svg>
    </div>

  );
};

export default LoadingSpinner;

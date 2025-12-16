import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../Compo/spinner"; // aapka spinner path

export default function PageNotFound() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: "100px" }}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div style={{
      textAlign: "center",
      paddingTop: "100px",
      fontSize: "30px",
      fontWeight: "bold",
      color: "#ff9f63"
    }}>
      404 | Page Not Found
    </div>
  );
}

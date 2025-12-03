import React, { useRef, useEffect, useState } from "react";
import ApiCall from "../../Apicall/ApiCall";
import CreateTesting3 from "./CreateTesting3";
import { FaEdit } from "react-icons/fa";

function Testing1() {
  const createRef = useRef(null);
  const refClose = useRef(null);

  // 👉 userId ko state me rakha
  const [userId, setUserId] = useState(2);

  const [finalContract, setFinalContract] = useState(null);
  const [carValuation, setCarValuation] = useState(null);

  useEffect(() => {
    const fetchFinalContract = async () => {
      try {
        const response = await ApiCall({
          url: `https://localhost:44311/api/services/app/ContractMain/GetContractMainById?Id=2258`,
          method: "GET",
        });

        const finalData = response?.result || response?.data?.result;

        if (finalData) {
          setFinalContract(finalData);
          setCarValuation(finalData.carValuationBySeller || null);

          // 👉 Example: agar API se userId milta ho to 
          // setUserId(finalData.userId);
        } else {
          console.warn("Final contract data not found!");
        }
      } catch (error) {
        console.error("❌ Error:", error);
      }
    };

    fetchFinalContract();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Car Valuation</h2>

      <table
        style={{
          width: "50%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Field</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Value</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Car Valuation By Seller
            </td>
            <td
              style={{
                border: "1px solid black",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {carValuation ?? "N/A"}

              <FaEdit
                onClick={() => createRef.current.click()}
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                  color: "blue",
                }}
                title="Edit"
              />
            </td>
          </tr>
        </tbody>
      </table>

     
      <CreateTesting3 open={createRef} close={refClose} userId={userId} />
    </div>
  );
}

export default Testing1;


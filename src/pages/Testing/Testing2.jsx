import React, { useEffect, useState } from "react";
import ApiCall from "../../Apicall/ApiCall";

function Testing2() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);

        // ✅ Session API Call
        const sessionResponse = await ApiCall({
          url: "https://localhost:44311/api/services/app/Session/GetCurrentLoginInformations",
          method: "GET",
        });

        const userId = sessionResponse.data?.result?.user?.id;

        if (userId) {
          alert(`✅ User ID: ${userId}`);
        } else {
          alert("⚠️ User ID not found in session response");
        }
      } catch (err) {
        setError(err.message || "API call failed");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div>
      <h2>Session Info</h2>
      <p>Check the alert for User ID 👆 </p>
    </div>
  );
}

export default Testing2;

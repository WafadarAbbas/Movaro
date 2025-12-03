// import React, { useEffect, useState } from "react";
// import { Container, Typography, Box, Card, CardContent } from "@mui/material";
// import CryptoJS from "crypto-js";

// export default function Testing2() {
//   const [data, setData] = useState(null);
//   const passphrase = "MySecretKey123";

//   // 🔒 Hardcoded Encrypted URL (like your example)
//   const hardcodedURL =
//     "http://localhost:3000/Buyer/U2FsdGVkX1%2FrPL8zPb1yxd7fzhw3xq4y2sWkSVfmy8NU1NirMn5HHz1JC3RuDDlC%2BtgDBFD7AjDHkJnTlejKJ7%2BKzyTNX6kD%2BA%2Fm4%2B18lVlq%2Bv7KH7QZhDtkzaBg5fIy";

//   useEffect(() => {
//     try {
//       // Extract ciphertext from hardcoded URL
//       const parts = hardcodedURL.split("/Buyer/");
//       if (parts.length < 2) return;

//       const encoded = parts[1];
//       const ciphertext = decodeURIComponent(encoded);

//       // 🔓 Decrypt using CryptoJS
//       const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
//       const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

//       if (!decryptedText) {
//         setData({ error: "❌ Decryption failed — check passphrase or ciphertext." });
//         return;
//       }

//       // Parse JSON
//       let parsed;
//       try {
//         parsed = JSON.parse(decryptedText);
//       } catch {
//         parsed = decryptedText;
//       }

//       setData(parsed);
//     } catch (err) {
//       console.error("Error during decryption:", err);
//       setData({ error: "⚠️ Unexpected error while decrypting." });
//     }
//   }, []);

//   return (
//     <Container sx={{ position: "relative", mt: 6 }}>
    

//       {/* Decrypted Output */}
//       <Card sx={{ mt: 8, p: 2, boxShadow: 4, borderRadius: 2 }}>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             🔓 Decrypted Data (Hardcoded URL)
//           </Typography>
//           <pre style={{ background: "#f5f5f5", padding: "12px", borderRadius: "8px" }}>
//             {data ? JSON.stringify(data, null, 2) : "Decrypting..."}
//           </pre>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// }

import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";
import CryptoJS from "crypto-js";

export default function Testing2() {
  const [data, setData] = useState(null);
  const passphrase = "MySuperSecretKey123";
 
  const hardcodedURL =
    "http://localhost:3000/Buyer/U2FsdGVkX1%2FWPQykmw9OLgyJirfuFUXwG%2ButeMMnBMg9adER9OvmtxA%2Bnvar3rzK0GTyjTUiuPLypjk2xIkVXmrJP1LhVTpWtOazg3TEu6%2BnRiTvJb0cJWiBrL%2BPnCWO";

  useEffect(() => {
    try {
      const parts = hardcodedURL.split("/Buyer/");
      if (parts.length < 2) return;

      // ✅ Decode URL-encoded ciphertext
      const encodedCipher = parts[1];
      const ciphertext = decodeURIComponent(encodedCipher); 

      console.log("Decoded Cipher:", ciphertext);

       
      const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

      console.log("Decrypted Text:", decryptedText);

      if (!decryptedText) {
        setData({ error: "❌ Decryption failed — check passphrase or ciphertext." });
        return;
      }

      // Try parsing JSON; otherwise keep plain string
      let parsed;
      try {
        parsed = JSON.parse(decryptedText);
      } catch {
        parsed = decryptedText;
      }

      setData(parsed);
    } catch (err) {
      console.error("Error during decryption:", err);
      setData({ error: "⚠️ Unexpected error while decrypting." });
    }
  }, []);

  return (
    <Container sx={{ position: "relative", mt: 6 }}>
      <Card sx={{ mt: 8, p: 2, boxShadow: 4, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
             {data ? JSON.stringify(data, null, 2) : "Decrypting..."}
          </Typography>
          {/* <pre
            style={{
              background: "#f5f5f5",
              padding: "12px",
              borderRadius: "8px",
              whiteSpace: "pre-wrap",
              fontSize: "14px",
            }}
          >
            {data ? JSON.stringify(data, null, 2) : "Decrypting..."}
          </pre> */}
        </CardContent>
      </Card>
    </Container>
  );
}

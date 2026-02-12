

import React, { useEffect, useState } from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";
import CryptoJS from "crypto-js";

export default function Testing2() {
  const [data, setData] = useState(null);
  const passphrase = "Klargo3613";
 
  const hardcodedURL =
    "http://localhost:3000/Buyer/U2FsdGVkX18eFEkhgcLDFeKHNuxgz88vlBBZfChf8WreQ%2BGYNGR%2FPwBNWSPUZxoKoLWnq09mzIdTs5z4vBzH9U5WD261ELX0X6nMkVsIM7KCWRpUpQCIq7PfKL9v7rCy";

  useEffect(() => {
    try {
      const parts = hardcodedURL.split("/Buyer/");
      if (parts.length < 2) return;

       
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
       
        </CardContent>
      </Card>
    </Container>
  );
}


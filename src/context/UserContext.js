import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = useCallback(async () => {
    try {
      const encryptedToken = localStorage.getItem("authToken");
      if (!encryptedToken) {
        setLoading(false);
        return;
      }

      const bytes = CryptoJS.AES.decrypt(encryptedToken, "klargo-secret-key");
      const token = bytes.toString(CryptoJS.enc.Utf8);

      const sessionResponse = await axios.get(
        "https://localhost:44311/api/services/app/Session/GetCurrentLoginInformations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "text/plain",
            "Content-Type": "application/json",
          },
        }
      );

      const fetchedUserName = sessionResponse.data?.result?.user?.userName;
      const email = sessionResponse.data?.result?.user?.emailAddress;
      const id = sessionResponse.data?.result?.user?.id;

      if (fetchedUserName) setUserName(fetchedUserName);
      if (email) setEmailAddress(email);
      if (id) setUserId(id);

    } catch (error) {
      console.error("❌ Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const refreshUserInfo = async () => {
    await fetchUserInfo();
  };

  return (
    <UserContext.Provider
      value={{ userName, emailAddress, userId, refreshUserInfo, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

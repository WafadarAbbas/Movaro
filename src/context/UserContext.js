 
// import React, { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import ApiCall from "../Apicall/ApiCall";
// import CryptoJS from "crypto-js";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [userName, setUserName] = useState("");
//   const [emailAddress, setEmailAddress] = useState("");
//   const [profileImage, setProfileImage] = useState("");

//   const getImageUrl = (path) => {
//     if (!path) return "";
//     return path.startsWith("http") ? path : `https://localhost:44311/${path}`;
//   };

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const encryptedToken = localStorage.getItem("authToken");
//         if (!encryptedToken) return;

//         const bytes = CryptoJS.AES.decrypt(encryptedToken, "my-super-secret-key");
//         const token = bytes.toString(CryptoJS.enc.Utf8);

//         const sessionResponse = await axios.get(
//           "https://localhost:44311/api/services/app/Session/GetCurrentLoginInformations",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               Accept: "text/plain",
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const fetchedUserName = sessionResponse.data?.result?.user?.userName;
//         const email = sessionResponse.data?.result?.user?.emailAddress;
//         const userId = sessionResponse.data?.result?.user?.id;

//         if (fetchedUserName) {
//           setUserName(fetchedUserName);
//           setEmailAddress(email);
//         }

//         if (userId) {
//           const userResponse = await ApiCall({
//             url: `https://localhost:44311/api/services/app/User/Get?Id=${userId}`,
//             method: "GET",
//           });

//           const userData = userResponse.data?.result;
         
//           setProfileImage(getImageUrl(userData?.profileImagePath || userData?.profileImage));
//         }
//       } catch (error) {
//         console.error("Error fetching login info:", error);
//       }
//     };

//     fetchUserInfo();
//   }, []);

//   return (
//     <UserContext.Provider value={{ userName, emailAddress, profileImage }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);



import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import ApiCall from "../Apicall/ApiCall";
import CryptoJS from "crypto-js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (path) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `https://localhost:44311/${path}`;
  };

  const fetchUserInfo = useCallback(async () => {
    try {
      const encryptedToken = localStorage.getItem("authToken");
      if (!encryptedToken) {
        setLoading(false);
        return;
      }

      const bytes = CryptoJS.AES.decrypt(encryptedToken, "my-super-secret-key");
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

      if (fetchedUserName) {
        setUserName(fetchedUserName);
        setEmailAddress(email);
      }

          if (id) setUserId(id);
      if (id) {
        const userResponse = await ApiCall({
          url: `https://localhost:44311/api/services/app/User/Get?Id=${id}`,
          method: "GET",
        });
        const userData = userResponse.data?.result;
        setProfileImage(getImageUrl(userData?.profileImagePath || userData?.profileImage));
      }
    } catch (error) {
      console.error("❌ Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const refreshUserInfo = () => {
    fetchUserInfo();
  };

  return (
    <UserContext.Provider value={{ userName, emailAddress, profileImage, userId,refreshUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);



// import { createContext, useContext, useState } from "react";
// import * as signalR from "@microsoft/signalr";

// const SignalRContext = createContext(null);

// export const SignalRProvider = ({ children }) => {
//   const [connection, setConnection] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [dealId, setDealId] = useState(null);

//   const connectToDeal = async (dealId) => {
//     if (connection) return;

//     const conn = new signalR.HubConnectionBuilder()
//       .withUrl("https://localhost:44311/signalr-notificationHub")
//       .withAutomaticReconnect()
//       .build();

//     conn.on("ReceiveMessage", (user, message) => {
//       setMessages(prev => [...prev, { user, message }]);
//     });

//     await conn.start();
//     await conn.invoke("JoinDealGroup", dealId.toString());

//     setConnection(conn);
//     setDealId(dealId);

//     console.log("✅ Connected to deal:", dealId);
//   };

//   const sendDealMessage = async (user, message) => {
//     if (!connection) return;

//     await connection.invoke(
//       "SendMessageToDeal",
//       dealId.toString(),
//       user,
//       message
//     );
//   };

//   return (
//     <SignalRContext.Provider
//       value={{
//         connectToDeal,
//         sendDealMessage,
//         messages,
//         dealId,
//         connection
//       }}
//     >
//       {children}
//     </SignalRContext.Provider>
//   );
// };

// export const useSignalR = () => useContext(SignalRContext);


import { createContext, useContext, useState, useEffect } from "react";
import * as signalR from "@microsoft/signalr";

const SignalRContext = createContext(null);

export const SignalRProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [dealId, setDealId] = useState(null);

  const connectToDeal = async (newDealId) => {
    // 1️⃣ Cleanup old connection if exists
    if (connection) {
      await connection.stop();
      setConnection(null);
      setMessages([]);
      setDealId(null);
    }

    // 2️⃣ Create new connection
    const conn = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44311/signalr-notificationHub")
      .withAutomaticReconnect()
      .build();

    conn.on("ReceiveMessage", (user, message) => {
      setMessages((prev) => [...prev, { user, message }]);
    });

    // Start connection and join group
    await conn.start();
    await conn.invoke("JoinDealGroup", newDealId.toString());

    // Save new connection
    setConnection(conn);
    setDealId(newDealId);

    console.log("✅ Connected to deal:", newDealId);
  };

  const sendDealMessage = async (user, message) => {
    if (!connection || !dealId) return;
    await connection.invoke("SendMessageToDeal", dealId.toString(), user, message);
  };

  const leaveDealGroup = async () => {
  if (connection && dealId) {
    try {
      await connection.invoke("LeaveDealGroup", dealId.toString());
      await connection.stop();
      setConnection(null);
      setMessages([]);
      setDealId(null);
      console.log("✅ Left deal group and stopped connection");
    } catch (err) {
      console.error("Error leaving deal group:", err);
    }
  }
};


  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (connection) connection.stop();
    };
  }, [connection]);

  return (
    <SignalRContext.Provider
      value={{
        connectToDeal,
        sendDealMessage,
        messages,
        dealId,
         leaveDealGroup,
        connection,
      }}
    >
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = () => useContext(SignalRContext);

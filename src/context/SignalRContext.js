

import { createContext, useContext, useState } from "react";
import * as signalR from "@microsoft/signalr";

const SignalRContext = createContext(null);

export const SignalRProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [dealId, setDealId] = useState(null);

  const connectToDeal = async (dealId) => {
    if (connection) return;

    const conn = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44311/signalr-notificationHub")
      .withAutomaticReconnect()
      .build();

    conn.on("ReceiveMessage", (user, message) => {
      setMessages(prev => [...prev, { user, message }]);
    });

    await conn.start();
    await conn.invoke("JoinDealGroup", dealId.toString());

    setConnection(conn);
    setDealId(dealId);

    console.log("✅ Connected to deal:", dealId);
  };

  const sendDealMessage = async (user, message) => {
    if (!connection) return;

    await connection.invoke(
      "SendMessageToDeal",
      dealId.toString(),
      user,
      message
    );
  };

  return (
    <SignalRContext.Provider
      value={{
        connectToDeal,
        sendDealMessage,
        messages,
        dealId,
        connection
      }}
    >
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = () => useContext(SignalRContext);

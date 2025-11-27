 




import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

 

function Testing1() {
  const [messages, setMessages] = useState([]);

  

  return (
    <div style={{ padding: 20 }}>
      <h2>React Connected to NotificationHub</h2>
 
    </div>
  );
}

export default Testing1;

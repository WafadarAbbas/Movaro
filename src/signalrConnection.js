import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";

function signalrConnection() {
  useEffect(() => {
    // 🔥 Your static JWT Token (same jo tum ne diya)
    const STATIC_TOKEN =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9lbWFpbGFkZHJlc3MiOiJhZG1pbkBhc3BuZXRib2lsZXJwbGF0ZS5jb20iLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6ImNjMDljZTJmLTI3YWYtMjA3YS03MjIwLTNhMWNlNWEzOTIyYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwic3ViIjoiMSIsImp0aSI6ImI4YTVjNWY4LTA1OWQtNGVjOS1iMzZmLWYzZDc4MDNmMmMzYyIsImlhdCI6MTc2MzM1ODk2OCwibmJmIjoxNzYzMzU4OTY4LCJleHAiOjE3NjM0NDUzNjgsImlzcyI6Ik1PVkFSTyIsImF1ZCI6Ik1PVkFSTyJ9.sC0PEWWD0B2rBjDqWoPU9wyLxKpSpoHQEHfMSnHXlwc";

    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44311/signalr-notification", {
        accessTokenFactory: () => STATIC_TOKEN
      })
      .withAutomaticReconnect()
      .build();

    connection.on("DealConnected", (message) => {
      console.log("🔥 SignalR Received ->", message);
      alert("SignalR Message: " + message);
    });

    connection
      .start()
      .then(() => console.log("✅ SignalR Connected Successfully"))
      .catch((err) => console.error("❌ SignalR Connection Error:", err));

    return () => {
      connection.stop();
    };
  }, []);

  return null;
}

export default signalrConnection;

import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import io from "socket.io-client";

// Connect to the WebSocket server
const socket = io("https://thawing-dawn-87843-f5b692533558.herokuapp.com/");

const WebSocketListener = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("WebSocketListener mounted");
    socket.on("order-completed", (data) => {
      console.log("Order completed:", data.orderId);
      const targetUrl = `/order-done/${data.orderId}`;
      console.log(`Navigating to ${targetUrl}`);
      window.location.href = targetUrl;
      console.log(`Navigation attempted to ${targetUrl}`);
    });

    return () => {
      console.log("Cleaning up event listener");
      socket.off("order-completed");
    };
  }, [navigate]);
};

export default WebSocketListener;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

// Connect to the WebSocket server
const socket = io("https://thawing-dawn-87843-f5b692533558.herokuapp.com/");

const WebSocketListener = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("WebSocketListener mounted");

    const handleOrderCompleted = async (order) => {
      console.log("Order completed:", order);
      localStorage.setItem("order", JSON.stringify(order));

      if (order.status === "Processed") {
        const targetUrl = `/order-done`;
        console.log(`Navigating to ${targetUrl}`);
        window.location.href = targetUrl;
      } else if (order.status === "Paid") {
        const targetUrl = "/order-fulfilled";
        console.log(`Navigating to ${targetUrl}`);
        window.location.href = targetUrl;
      } else if (order.status === "Order not found") {
        const targetUrl = "/error";
        console.log(`Navigating to ${targetUrl}`);
        window.location.href = targetUrl;
      }
    };

    socket.on("order-completed", handleOrderCompleted);

    return () => {
      console.log("Cleaning up event listener");
      socket.off("order-completed", handleOrderCompleted);
    };
  }, [navigate]);

  return null;
};

export default WebSocketListener;

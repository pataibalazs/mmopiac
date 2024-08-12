import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

// Connect to the WebSocket server
const socket = io("https://thawing-dawn-87843-f5b692533558.herokuapp.com/");

const WebSocketListener = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("WebSocketListener mounted");

    const handleOrderCompleted = async (data) => {
      console.log("Order completed:", data.orderId);

      try {
        // Make a request to the endpoint with the order ID using fetch
        const response = await fetch(
          `https://thawing-dawn-87843-f5b692533558.herokuapp.com/orders-check?orderId=${data.orderId}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        const status = responseData.status;
        console.log(`Order status: ${status}`);

        if (status === "Processed") {
          const targetUrl = `/order-done/${data.orderId}`;
          console.log(`Navigating to ${targetUrl}`);
          window.location.href = targetUrl;
        } else if (status === "Paid") {
          const targetUrl = "/order-fulfilled";
          console.log(`Navigating to ${targetUrl}`);
          window.location.href = targetUrl;
        } else if (status === "Order not found") {
          const targetUrl = "/error";
          console.log(`Navigating to ${targetUrl}`);
          window.location.href = targetUrl;
        }
      } catch (error) {
        console.error("Error fetching order status:", error);
        window.location.href = "/error"; // Redirect to error page in case of failure
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

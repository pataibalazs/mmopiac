import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mosaic } from "react-loading-indicators";

const TradeChatPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateOrder = async () => {
      try {
        const response = await fetch(
          `https://thawing-dawn-87843-f5b692533558.herokuapp.com/orders-check?orderId=${orderId}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        const status = responseData.status;
        console.log(`Order status: ${status}`);

        if (status === "Processed") {
          setIsValid(true);
        } else if (status === "Paid") {
          navigate("/order-fulfilled");
        } else if (status === "Order not found") {
          navigate("/error");
        }
      } catch (error) {
        console.error("Error fetching order status:", error);
        navigate("/error");
      } finally {
        setIsLoading(false);
      }
    };

    validateOrder();
  }, [orderId, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Mosaic color="#f59e0b" size="large" text="" textColor="" />
      </div>
    );
  }

  if (!isValid) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="bg-green-600 w-full py-4">
        <h1 className="text-3xl text-white text-center">TradeChatPage</h1>
        <h1 className="text-3xl text-white text-center">{orderId}</h1>
      </header>

      <main className="flex flex-col items-center mt-10 p-6 bg-white shadow-md rounded-lg w-11/12 md:w-2/3 lg:w-1/2">
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Our Mission</h2>
          <p className="text-gray-700 text-center">
            At MMO Bazaar, our mission is to provide gamers with the best
            virtual items and currencies for their favorite MMO games. We strive
            to offer a seamless shopping experience with a focus on customer
            satisfaction and security.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Who We Are</h2>
          <p className="text-gray-700 text-center">
            MMO Bazaar is a dedicated team of gamers and developers passionate
            about online gaming. We understand the needs of our customers
            because we share the same passion for immersive gaming experiences.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4 text-center">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Wide range of in-game items</li>
            <li>Various virtual currencies</li>
            <li>Secure transactions</li>
            <li>24/7 customer support</li>
          </ul>
        </section>
      </main>

      <footer className="bg-green-600 w-full py-4 mt-auto">
        <p className="text-white text-center">
          &copy; 2024 MMO Bazaar. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default TradeChatPage;

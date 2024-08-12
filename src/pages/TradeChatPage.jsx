import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <main className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg w-11/12 mt-10">
        <div className="bg-white">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-5xl lg:text-center">
              <p className="mt-2 text-md font-bold tracking-tight text-amber-500">
                Valuta átadása
              </p>
              <p className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl">
                Kövesd a lépéseket
              </p>
              <div className="flex flex-col items-center">
              <p className="text-lg mt-6 font-normal mb-6 text-left w-10/12 ">
                A játékbeli valuta megkapásához <span className="font-bold">kattints jobb alsó sarokban található kék chat ablak ikonra</span>, ahol a felvesszük veled a kapcsolatot és megbeszéljük, hogy hol találkozzunk a játékban. 
              </p>
              <p className="text-lg font-normal mb-6 text-left w-10/12 ">
              Nagyon fontos, hogy semmiképpen sem a játékban fogunk veled kommunikálni, hanem az oldalon található chatablakon keresztül. Tehát bárki ír rád a játékon belül a tranzakcióval kapcsolatban valószínűleg rossz szándékkal teszi.
              </p>
              </div>
              
              <div className="flex justify-center mt-4 mb-10">
                <img
                  className="w-11/12 rounded-xl"
                  src="/pictures/banner.png"
                  alt="Logo"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TradeChatPage;

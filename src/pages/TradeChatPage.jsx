import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BuyingProcessBar from "../components/BuyingProcessBar";
import { Crisp } from "crisp-sdk-web";

const TradeChatPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderIdState, setOrderIdState] = useState(null); // State to hold the orderId

  useEffect(() => {
    const storedOrder = localStorage.getItem("order");
    if (storedOrder) {
      const { email, gamerName, orderId, status } = JSON.parse(storedOrder);

      // Validate the order before configuring Crisp
      fetch(
        "https://thawing-dawn-87843-f5b692533558.herokuapp.com/validate-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, gamerName, orderId, status }),
        }
      )
        .then((response) => response.json())
        .then((validateResult) => {
          if (validateResult.valid) {
            // If the order is valid, configure Crisp
            Crisp.configure("146e3b82-53e8-43c3-a362-55e5566ea395");

            Crisp.user.setEmail(email);
            Crisp.user.setNickname(gamerName);
            Crisp.session.setData({
              payment_status: status,
              gameName: gamerName,
              orderId: orderId,
              email: email,
            });

            setOrderIdState(orderId); // Save orderId to state
          } else {
            console.error("Order validation failed.");
            // Handle invalid order scenario, e.g., navigate to an error page
            navigate("/error");
          }
        })
        .catch((error) => {
          console.error("Error during order validation:", error);
          // Handle error during validation, e.g., navigate to an error page
          navigate("/error");
        });
    }
  }, [orderId, navigate]);

  const handleButtonClick = async () => {
    if (orderIdState) {
      // Use the orderId from state

      // Initiate the fetch request but don't wait for it to complete
      fetch(
        "https://thawing-dawn-87843-f5b692533558.herokuapp.com/update-order-status",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentTransactionId: orderIdState,
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              console.error("Failed to update order status:", errorData);
              // Handle error (e.g., show a message to the user) if necessary
            });
          }
        })
        .catch((error) => {
          console.error("Error occurred while updating order status:", error);
          // Handle error (e.g., show a message to the user) if necessary
        });

      // Navigate immediately after starting the request
      navigate("/order-fulfilled");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <BuyingProcessBar step="2" />

      <main className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg w-11/12 mt-6">
        <div className="bg-white mx-auto">
          <div className="mx-auto max-w-9xl text-center">
            <p className="mt-2 text-md font-bold tracking-tight text-amber-500">
              Valuta átadása
            </p>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Kövesd a lépéseket
            </p>
            <div className="flex flex-col items-center">
              <p className="text-lg mt-6 font-normal mb-6 text-left w-11/12">
                A játékbeli valuta megszerzéséhez{" "}
                <span className="font-bold">
                  kattints a jobb alsó sarokban található kék chat ikonra, ahol
                  egyeztetünk a találkozó helyéről
                </span>
                . A kommunikáció csak az oldalon keresztül zajlik, így ha valaki
                a játékban ír, ne válaszolj, mert valószínűleg rossz szándékú.
                Ne zárd be az oldalt; ha mégis megtörténik, nincs gond, vedd fel
                velünk a kapcsolatot a chatben, és segítünk. Ha megkaptad a
                valutát, nyomd meg a "Megkaptam a rendelt valutát" gombot.
              </p>
            </div>
            <button
              type="button"
              className="rounded-md bg-amber-500 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition ease-in-out"
              onClick={handleButtonClick}
            >
              Megkaptam a rendelt valutát
            </button>
            <div className="flex justify-center mt-4 mb-10">
              <img
                className="w-11/12 rounded-xl"
                src="/pictures/banner.png"
                alt="Banner"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TradeChatPage;

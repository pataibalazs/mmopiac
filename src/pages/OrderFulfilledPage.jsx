import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BuyingProcessBar from "../components/BuyingProcessBar";

const OrderFulfilledPage = () => {
  useEffect(() => {
    // Remove the 'order' item from localStorage when the component mounts
    localStorage.removeItem("order");
  }, []);

  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <BuyingProcessBar step="3" />
        <main className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg w-11/12 mt-10">
          <div className="bg-white">
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-5xl lg:text-center">
                <p className="mt-2 text-md font-bold tracking-tight text-amber-500">
                  Rendelés teljesítve
                </p>
                <p className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl">
                  Köszönjük a vásárlást!
                </p>
                <p className="text-lg mt-6 font-normal mb-6">
                  Köszönjük, hogy minket választottál, ha van kedved írj rólunk
                  véleményt az{" "}
                  <Link
                    to="/reviews"
                    className="text-md font-semibold leading-7 text-amber-500"
                  >
                    Értékelések
                  </Link>{" "}
                  menüpont alatt.
                </p>
                <Link
                  to="/"
                  className="text-md font-semibold leading-7 text-amber-500 mt-6"
                >
                  <span aria-hidden="true">&larr;</span> Vissza a főoldalra
                </Link>{" "}
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
    </div>
  );
};

export default OrderFulfilledPage;

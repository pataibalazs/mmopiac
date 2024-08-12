import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <main className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg w-11/12 mt-10">
        <div className="bg-white">
          <div className="mx-auto max-w-8xl flex items-center gap-10">
            <div className="mx-auto max-w-5xl lg:text-left">
              <p className="mt-2 text-3xl font-bold tracking-tight text-amber-500">
                404
              </p>
              <p className="mt-2 text-4xl font-bold tracking-tight  sm:text-4xl">
                Oldal nem található
              </p>
              <p className="text-lg mt-6 font-normal mb-6">
                Sajnáljuk, nem találtuk meg a keresett oldalt.
              </p>
              <Link
                to="/"
                className="text-md font-semibold leading-7 text-amber-500 mt-6"
              >
                <span aria-hidden="true">&larr;</span> Vissza a főoldalra
              </Link>{" "}
            </div>
            <div className="flex justify-center mt-4 mb-10">
              <img
                className="w-11/12 rounded-xl"
                src="/pictures/desert.jpg"
                alt="Logo"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;

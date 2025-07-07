import React, { useEffect, useState } from "react";
import Accordion from "../components/Accordion";
import ReviewCard from "../components/ReviewCard"; // Import the ReviewCard component
import { Link, useNavigate } from "react-router-dom";
import { Crisp } from "crisp-sdk-web";

const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Crisp.configure("146e3b82-53e8-43c3-a362-55e5566ea395");

    const fetchComments = async () => {
      try {
        const response = await fetch(
          "https://thawing-dawn-87843-f5b692533558.herokuapp.com/db/get_homepage_comments"
        );
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div>
      <div className="flex justify-center bg-gray-100">
        <img
          className="w-11/12 rounded-md"
          src="/pictures/banner.png"
          alt="Logo"
        />
      </div>
      <div className="bg-gray-100 flex justify-center">
        <main className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg w-11/12 mt-10">
          <div className="flex flex-col items-center justify-center">
            <p className="mt-2 text-md font-bold tracking-tight text-amber-500 text-center">
              Vásárolj
            </p>
            <div className="font-bold text-3xl mb-2">Vegyél Metin2 Aranyat</div>
            <div className="text-lg">
              A legjobb helyen jársz ha szeretnél Metin2, illetve egyéb privát
              szerverekre aranyat venni!
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-center items-center space-y-6 lg:space-y-0 lg:space-x-8 p-10 w-full">
            {/* Metin2 Gold Card */}
            <div
              onClick={() => navigate("/all-products")}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer w-full max-w-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-amber-500/20 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    METIN2 ARANY
                  </h3>
                  <div className="text-4xl font-extrabold text-white mb-2">
                    €10
                  </div>
                  <div className="text-lg text-white/90 font-medium">
                    per millió arany
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
                  <p className="text-white text-lg font-semibold">
                    Vegyél Metin2 Aranyat
                  </p>
                  <p className="text-white/80 text-sm mt-1">
                    Gyors és biztonságos szállítás
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/all-products");
                  }}
                  className="w-full bg-white text-amber-600 font-bold py-3 px-6 rounded-xl hover:bg-amber-50 transition-colors duration-200 shadow-lg"
                >
                  Vásárlás Most
                </button>
              </div>
            </div>

            {/* Solaris Gold Card */}
            <div
              onClick={() => navigate("/all-products")}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-700 p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer w-full max-w-md"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-violet-600/20 to-indigo-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-center">
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    SOLARIS ARANY
                  </h3>
                  <div className="text-4xl font-extrabold text-white mb-2">
                    €20
                  </div>
                  <div className="text-lg text-white/90 font-medium">
                    per millió arany
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
                  <p className="text-white text-lg font-semibold">
                    Vegyél Metin2 Aranyat
                  </p>
                  <p className="text-white/80 text-sm mt-1">
                    Prémium szerver, gyors kiszállítás
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/all-products");
                  }}
                  className="w-full bg-white text-purple-600 font-bold py-3 px-6 rounded-xl hover:bg-purple-50 transition-colors duration-200 shadow-lg"
                >
                  Vásárlás Most
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="font-bold text-3xl mb-8 mt-14">
              Gyakori kérdések
            </div>
          </div>
          <Accordion />
          <div className="flex flex-col items-center justify-center w-full">
            <div className="font-bold text-3xl mb-2 mt-14">Vélemények</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10">
            {reviews.map((review) => (
              <ReviewCard
                key={review.id}
                name={review.username}
                rating={review.rating}
                comment={review.comment_text}
                date={review.comment_date}
                homepage={true}
              />
            ))}
          </div>
          <div className="text-lg mt-1">
            Ha szeretnél még több véleményt olvasni, látogass el az{" "}
            <Link
              to="/reviews"
              className="text-md font-semibold leading-7 text-amber-500"
            >
              Értékelések
            </Link>{" "}
            menüpontra.
          </div>
          <div className="mx-auto w-11/12 lg:text-center mt-14 mb-10">
            <p className="mt-2 text-3xl font-bold">Rólunk</p>
            <div className="flex justify-between">
              <p className="mt-6 text-lg leading-8 text-gray-900 text-left">
                Mi, akik évek óta Metin2 és más privát szervereken játszunk,
                látjuk, ahogy az MMO-k és a játékosok is idősödnek. Egyre
                nagyobb az igény egy olyan szolgáltatás iránt, ahol aranyat és
                tárgyakat lehet valódi pénzért biztonságosan vásárolni. Jelenleg
                a szervereken hirdetett Discord és Facebook csoportok szolgálnak
                erre a célra, ám tapasztalataink szerint ezeken a helyeken
                gyakoriak a csalások és visszaélések, vagy maga az oldal is
                átverésre épül. Ismerőseinket számtalanszor becsapták a Facebook
                csoportos üzletelések során, hamis bankinformációkkal és account
                visszaigénylésekkel. Ezért úgy gondoltuk, hogy létrehozunk egy
                megbízható oldalt, ahol ezek a tranzakciók biztonságosan és
                anonim módon zajlanak, és ahol a vásárlóknak nem kell félniük a
                rossz szándékú szereplőktől. A felhasználóinknak a következőt
                tudjuk biztosítani:
              </p>
              <img
                className="w-5/12 mt-8 ml-4 rounded-md"
                src="/pictures/aboutuspic.jpg"
                alt="Logo"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;

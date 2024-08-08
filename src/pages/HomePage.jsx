import React, { useEffect, useState } from "react";
import PurchaseCard from "../components/PurchaseCard";
import Accordion from "../components/Accordion";
import ReviewCard from "../components/ReviewCard"; // Import the ReviewCard component
import { Link } from "react-router-dom";

const Homepage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
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
        <img className="w-11/12 rounded-sm" src="/pictures/banner.png" alt="Logo" />
      </div>
      <div className="bg-gray-100 flex justify-center">
        <main className="flex flex-col items-center p-6 bg-white shadow-md rounded-lg w-11/12 mt-14">
          <div className="flex flex-col items-center justify-center">
            <div className="font-bold text-3xl mb-2">Vegyél Metin2 Aranyat</div>
            <div className="text-lg">
              A legjobb helyen jársz ha szeretnél Metin2, illetve egyéb privát
              szerverekre aranyat venni!
            </div>
          </div>
          <div className="flex justify-center space-x-10 p-10">
            <PurchaseCard
              title="METIN2 ARANY"
              price={10}
              backgroundImage="./pictures/purchaseCardBgGreen.webp"
              itemId="metin-gold"
              itemDescription="High-quality replica of The Starry Night by the Dutch post-impressionist painter Vincent van Gogh."
              itemImage="./pictures/metin2-gold.webp"
            />
            <PurchaseCard
              title="SOLARIS ARANY"
              price={20}
              backgroundImage="./pictures/purchaseCardBgPurple.webp"
              itemId="solaris-gold"
              itemDescription="High-quality replica of The Starry Night by the Dutch post-impressionist painter Vincent van Gogh."
              itemImage="./pictures/solaris-gold.webp"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="font-bold text-3xl mb-4 mt-14">Gyakori kérdések</div>
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
            <Link to="/reviews" className="text-blue-500 underline">
              Értékelések
            </Link>{" "}
            menüpontra.
          </div>
          <div className="mx-auto w-11/12 lg:text-center mt-14 mb-10">
            <p className="mt-2 text-3xl font-bold">
              Rólunk
            </p>
            <div className="flex justify-between">
              <p className="mt-6 text-lg leading-8 text-gray-900 text-left">
                Mi, akik évek óta Metin2 és más privát szervereken játszunk,
                látjuk, ahogy az MMO-k és a játékosok is idősödnek. Egyre
                nagyobb az igény egy olyan szolgáltatás iránt, ahol aranyat és
                tárgyakat lehet valódi pénzért biztonságosan vásárolni.
                Jelenleg a szervereken hirdetett Discord és Facebook csoportok
                szolgálnak erre a célra, ám tapasztalataink szerint ezeken a
                helyeken gyakoriak a csalások és visszaélések, vagy maga az
                oldal is átverésre épül. Ismerőseinket számtalanszor becsapták
                a Facebook csoportos üzletelések során, hamis
                bankinformációkkal és account visszaigénylésekkel. Ezért úgy
                gondoltuk, hogy létrehozunk egy megbízható oldalt, ahol ezek a
                tranzakciók biztonságosan és anonim módon zajlanak, és ahol a
                vásárlóknak nem kell félniük a rossz szándékú szereplőktől. A
                felhasználóinknak a következőt tudjuk biztosítani:
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

export default Homepage;

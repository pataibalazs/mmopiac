import React from "react";
import PurchaseCard from "../components/PurchaseCard";
import BuyingProcessBar from "../components/BuyingProcessBar";

const Homepage = () => {
  return (
    <div className="bg-gray-100">
      <BuyingProcessBar step={3} />
      <div className="flex justify-center">
        <img className="w-auto" src="/pictures/banner.png" alt="Logo" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="font-bold text-3xl mt-4">Vegyél Metin2 Aranyat</div>
        <div className="text-lg font-light mt-2">
          A legjobb helyen jársz ha szeretnél Metin2, illetve egyéb privát
          szerverekre aranyat venni!
        </div>
      </div>

      <div className="flex justify-center space-x-10 p-10 bg-gray-100">
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

      <div className="min-h-screen  flex flex-col items-center justify-center"></div>
    </div>
  );
};

export default Homepage;

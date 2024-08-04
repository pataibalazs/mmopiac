import React, { useState } from "react";

const PurchaseCard = ({
  title,
  price,
  backgroundImage,
  itemId,
  itemDescription,
  itemImage,
  quantity,
}) => {
  const [millions, setMillions] = useState("");
  const [eur, setEur] = useState("");

  const handleMillionsChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setMillions(value);
      setEur((value * price).toFixed(3) + " EUR");
    }
  };

  return (
    <div
      className="px-4 rounded-lg shadow-lg text-white w-auto h-72"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full bg-gold-500 py-2 px-4 rounded-t-lg flex justify-center">
        <h2 className="text-2xl font-bold -mt-1">{title}</h2>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-xl mb-6 mt-8 font-bold">€ {price}/M</p>
      </div>

      <div className="flex justify-between items-center mb-4 mt-2">
        <input
          type="number"
          placeholder="Millions"
          value={millions}
          onChange={handleMillionsChange}
          className="w-1/2 p-2 mr-2 bg-gray-800 text-white rounded-lg border border-gray-600"
          min="0"
        />
        <input
          type="text"
          placeholder="EUR"
          value={eur}
          readOnly
          className="w-1/2 p-2 bg-gray-800 text-white rounded-lg border border-gray-600"
        />
      </div>
      <button
        className="buy-button snipcart-add-item w-full py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600"
        data-item-id={itemId}
        data-item-url="https://thawing-dawn-87843-f5b692533558.herokuapp.com/product-validation"
        data-item-price={price}
        data-item-description={itemDescription}
        data-item-image={itemImage}
        data-item-name={title}
        data-item-quantity={millions}
      >
        Megveszem
      </button>
    </div>
  );
};

export default PurchaseCard;

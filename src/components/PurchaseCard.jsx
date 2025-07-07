import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, strapiAPI } from "../utils/auth";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePurchase = async () => {
    // Check if user is logged in
    if (!isAuthenticated()) {
      alert("Vásárláshoz be kell jelentkezned!");
      navigate("/login");
      return;
    }

    // Validate input
    if (!millions || millions <= 0) {
      alert("Kérlek add meg a vásárolni kívánt milliók számát!");
      return;
    }

    setLoading(true);

    try {
      // Make authenticated API call to create order
      const response = await strapiAPI.createOrder({
        productName: title,
        productId: itemId,
        quantity: parseInt(millions),
        unitPrice: price,
        totalPrice: parseFloat((millions * price).toFixed(3)),
        description: itemDescription,
        status: "pending",
      });

      if (response && response.ok) {
        const orderData = await response.json();
        alert(`Sikeres rendelés! Rendelés ID: ${orderData.data.id}`);
        // Reset form
        setMillions("");
        setEur("");
        // Optionally redirect to order confirmation page
        // navigate(`/order-confirmation/${orderData.data.id}`);
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      console.error("Purchase error:", error);
      alert("Hiba történt a rendelés során. Próbáld újra!");
    } finally {
      setLoading(false);
    }
  };

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
        className="buy-button w-full py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handlePurchase}
        disabled={loading}
      >
        {loading ? "Rendelés..." : "Megveszem"}
      </button>
    </div>
  );
};

export default PurchaseCard;

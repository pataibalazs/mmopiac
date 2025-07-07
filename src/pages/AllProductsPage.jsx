import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { strapiAPI } from "../utils/auth";

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      // Fetch all products with vendor information
      const response = await strapiAPI.getProducts();
      if (response && response.ok) {
        const data = await response.json();
        console.log("Products data:", data); // Debug log
        // Sort products by price in ascending order
        const sortedProducts = (data.data || []).sort((a, b) => {
          const aPrice = parseFloat(a.attributes?.price || a.price || 0);
          const bPrice = parseFloat(b.attributes?.price || b.price || 0);
          return aPrice - bPrice;
        });
        setProducts(sortedProducts);
      } else {
        setError("Hiba történt a termékek betöltése során.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Hálózati hiba történt.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Termékek betöltése...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Összes Termék
          </h1>
          <p className="text-xl text-gray-600">
            Böngészd az összes elérhető terméket minden vendortól (ár szerint
            rendezve)
          </p>
        </div>

        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {product.attributes?.name || product.name || "N/A"}
                    </h3>
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Elérhető
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Ár:</span>
                      <span className="text-lg font-bold text-green-600">
                        €{product.attributes?.price || product.price || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Mennyiség:</span>
                      <span className="text-sm font-medium text-gray-900">
                        {product.attributes?.quantity ||
                          product.quantity ||
                          "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Vendor:</span>
                      <span className="text-sm font-medium text-blue-600">
                        {(() => {
                          const vendor = product.attributes?.vendor?.data;
                          if (vendor) {
                            return (
                              vendor.attributes?.name ||
                              vendor.name ||
                              `Vendor ${vendor.id}`
                            );
                          }
                          return "Ismeretlen";
                        })()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      // For now, just show an alert. Later this could open a purchase modal
                      alert(
                        `Vásárlás: ${product.attributes?.name || product.name}`
                      );
                    }}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Vásárlás
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500 text-xl mb-4">
                Nincsenek termékek
              </div>
            </div>
          )}
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Vissza a főoldalra
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;

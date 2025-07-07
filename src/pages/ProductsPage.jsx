import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, strapiAPI, getUser } from "../utils/auth";

const ProductsPage = () => {
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Check for vendor info - first from localStorage, then from API
      const currentUser = getUser();
      let currentVendor = null;

      if (currentUser?.vendor) {
        currentVendor = {
          id: currentUser.vendor.id,
          documentId: currentUser.vendor.documentId,
          attributes: {
            name: currentUser.vendor.name,
            description: currentUser.vendor.description,
          },
        };
        setVendor(currentVendor);
      } else {
        // Fetch vendor from API
        const vendorResponse = await strapiAPI.getUserVendor();
        if (vendorResponse && vendorResponse.ok) {
          const vendorData = await vendorResponse.json();
          if (vendorData.data && vendorData.data.length > 0) {
            currentVendor = vendorData.data[0];
            setVendor(currentVendor);
          } else {
            // No vendor found, redirect to create vendor page
            navigate("/create-vendor");
            return;
          }
        }
      }

      // Fetch vendor products after vendor is set
      if (currentVendor) {
        await fetchVendorProducts(currentVendor);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Hiba történt az adatok betöltése során.");
    } finally {
      setLoading(false);
    }
  };

  const fetchVendorProducts = async (vendorToUse = vendor) => {
    try {
      // Use the dedicated getVendorProducts method that filters by vendor owner
      const productsResponse = await strapiAPI.getVendorProducts();
      if (productsResponse && productsResponse.ok) {
        const productsData = await productsResponse.json();
        console.log("Vendor products:", productsData); // Debug log
        setProducts(productsData.data || []);
      } else {
        console.error("Failed to fetch vendor products");
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching vendor products:", error);
      setProducts([]);
    }
  };

  const handleDeleteProduct = async (productDocumentId) => {
    if (window.confirm("Biztosan törölni szeretnéd ezt a terméket?")) {
      try {
        setLoading(true);
        const response = await strapiAPI.deleteProduct(productDocumentId);

        if (response && response.ok) {
          // Remove product from local state
          setProducts(
            products.filter(
              (product) => product.documentId !== productDocumentId
            )
          );
          console.log("Product deleted successfully");
        } else {
          console.error("Failed to delete product");
          setError("Hiba történt a termék törlése során.");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        setError("Hálózati hiba a termék törlése során.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Adatok betöltése...</p>
        </div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Termékeim
              </h1>
              <p className="text-gray-600 mb-6">
                Még nincs vendor fiókod. Létrehozás után tudsz termékeket
                kezelni.
              </p>
              <button
                onClick={() => navigate("/create-vendor")}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
              >
                Vendor létrehozása
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Termékeim</h1>
          <p className="mt-2 text-sm text-gray-600">
            Kezeld a termékeidet és add hozzá újakat.
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Vendor Info Bar */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            {vendor?.attributes?.name || vendor?.name}
          </h2>
          <p className="text-blue-700 text-sm">
            {vendor?.attributes?.description || vendor?.description}
          </p>
        </div>

        {/* Products Section */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Termékek</h2>
              <button
                onClick={() => navigate("/add-product")}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Új termék hozzáadása
              </button>
            </div>

            {products.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Termék neve
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ár
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mennyiség
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Műveletek
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product.documentId || product.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {product.attributes?.name || product.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          €{product.attributes?.price || product.price || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.attributes?.quantity ||
                            product.quantity ||
                            "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() =>
                              navigate(
                                `/edit-product/${
                                  product.documentId || product.id
                                }`
                              )
                            }
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            Szerkesztés
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteProduct(
                                product.documentId || product.id
                              )
                            }
                            className="text-red-600 hover:text-red-900"
                          >
                            Törlés
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">Nincsenek termékek</p>
                <p className="text-gray-400 text-sm mt-2">
                  Klikk az "Új termék hozzáadása" gombra az első termék
                  létrehozásához.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Back Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate("/vendor-dashboard")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Vissza a Dashboard-hoz
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Profil oldal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

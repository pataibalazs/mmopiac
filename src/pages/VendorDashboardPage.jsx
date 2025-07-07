import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, strapiAPI, getUser } from "../utils/auth";

const VendorDashboardPage = () => {
  const [vendor, setVendor] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    fetchVendorData();
  }, [navigate]);

  const fetchVendorData = async () => {
    try {
      setLoading(true);

      // Check for vendor info - first from localStorage, then from API
      const currentUser = getUser();
      console.log("Current user:", currentUser); // Debug log

      if (currentUser?.vendor) {
        // Use vendor from localStorage
        console.log("Vendor from localStorage:", currentUser.vendor); // Debug log
        setVendor({
          id: currentUser.vendor.id,
          documentId: currentUser.vendor.documentId,
          attributes: {
            name: currentUser.vendor.name,
            description: currentUser.vendor.description,
          },
        });
      } else {
        // Fetch vendor from API
        console.log("Fetching vendor from API..."); // Debug log
        const vendorResponse = await strapiAPI.getUserVendor();
        if (vendorResponse && vendorResponse.ok) {
          const vendorData = await vendorResponse.json();
          console.log("Vendor data from API:", vendorData); // Debug log
          if (vendorData.data && vendorData.data.length > 0) {
            setVendor(vendorData.data[0]);
          } else {
            // No vendor found, redirect to create vendor page
            navigate("/create-vendor");
            return;
          }
        }
      }

      // Fetch vendor orders
      await fetchVendorOrders();
    } catch (error) {
      console.error("Error fetching vendor data:", error);
      setError("Hiba történt az adatok betöltése során.");
    } finally {
      setLoading(false);
    }
  };

  const fetchVendorOrders = async () => {
    try {
      // Fetch orders for this vendor
      const ordersResponse = await strapiAPI.getVendorOrders();
      if (ordersResponse && ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        setOrders(ordersData.data || []);
      }
    } catch (error) {
      console.error("Error fetching vendor orders:", error);
      // Don't set error here, just log it as orders are not critical
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
                Vendor Dashboard
              </h1>
              <p className="text-gray-600 mb-6">Még nincs vendor fiókod.</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Vendor Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Kezeld a vendor fiókodat és termékeidet.
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Vendor Information */}
        <div className="bg-white overflow-hidden shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Vendor információk
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Vendor neve
                </label>
                <p className="mt-1 text-lg text-gray-900 font-semibold">
                  {vendor?.attributes?.name ||
                    vendor?.name ||
                    "Név nem elérhető"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Leírás
                </label>
                <p className="mt-1 text-sm text-gray-900">
                  {vendor?.attributes?.description ||
                    vendor?.description ||
                    "Leírás nem elérhető"}
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => navigate("/edit-vendor")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Vendor szerkesztése
              </button>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white overflow-hidden shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <div className="text-center py-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Termékek kezelése
              </h2>
              <p className="text-gray-600 mb-6">
                A termékeid megtekintéséhez és új termékek hozzáadásához
                látogasd meg a Termékeim oldalt.
              </p>
              <button
                onClick={() => navigate("/products")}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg"
              >
                Ugrás a Termékeim oldalra
              </button>
            </div>
          </div>
        </div>

        {/* Orders Section */}
        <div className="bg-white overflow-hidden shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Megrendelések
            </h2>

            {orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rendelés ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vásárló
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Termék
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mennyiség
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Összeg
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Státusz
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dátum
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.attributes?.customerName ||
                            order.attributes?.user?.data?.attributes
                              ?.username ||
                            "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.attributes?.productName || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.attributes?.quantity || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          €{order.attributes?.totalPrice || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              order.attributes?.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : order.attributes?.status === "processing"
                                ? "bg-blue-100 text-blue-800"
                                : order.attributes?.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {order.attributes?.status === "completed"
                              ? "Teljesítve"
                              : order.attributes?.status === "processing"
                              ? "Feldolgozás alatt"
                              : order.attributes?.status === "pending"
                              ? "Függőben"
                              : order.attributes?.status || "Ismeretlen"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.attributes?.createdAt
                            ? new Date(
                                order.attributes.createdAt
                              ).toLocaleDateString("hu-HU")
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">Nincsenek megrendelések</p>
                <p className="text-gray-400 text-sm mt-2">
                  A megrendelések itt fognak megjelenni, amikor vásárlók
                  rendelnek tőled.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Back to Profile Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => navigate("/profile")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Vissza a profilhoz
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboardPage;

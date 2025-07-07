import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, strapiAPI, getUser } from "../utils/auth";

const ProfilePage = () => {
  const [user, setUser] = useState(getUser());
  const [orders, setOrders] = useState([]);
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    fetchUserData();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      setLoading(true);

      // Fetch user profile with JWT token
      const profileResponse = await strapiAPI.getProfile();
      if (profileResponse && profileResponse.ok) {
        const profileData = await profileResponse.json();
        setUser(profileData);
      }

      // Fetch user orders with JWT token
      const ordersResponse = await strapiAPI.getUserOrders();
      if (ordersResponse && ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        setOrders(ordersData.data || []);
      }

      // Check for vendor info - first from localStorage, then from API
      const currentUser = getUser();
      if (currentUser?.vendor) {
        // Use vendor from localStorage (more up-to-date)
        setVendor({
          id: currentUser.vendor.id,
          documentId: currentUser.vendor.documentId,
          attributes: {
            name: currentUser.vendor.name,
            description: currentUser.vendor.description,
            status: "approved", // We set this as approved when creating
          },
        });
      } else {
        // Fetch user vendor from API
        const vendorResponse = await strapiAPI.getUserVendor();
        if (vendorResponse && vendorResponse.ok) {
          const vendorData = await vendorResponse.json();
          setVendor(
            vendorData.data && vendorData.data.length > 0
              ? vendorData.data[0]
              : null
          );
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Hiba történt az adatok betöltése során.");
    } finally {
      setLoading(false);
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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Profilom</h1>

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* User Info */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Felhasználói adatok
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Felhasználónév
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{user?.username}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Regisztráció dátuma
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {user?.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("hu-HU")
                      : "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Utolsó frissítés
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {user?.updatedAt
                      ? new Date(user.updatedAt).toLocaleDateString("hu-HU")
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Vendor Status */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Vendor státusz
              </h2>
              {vendor ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium text-blue-900">
                      {vendor.attributes?.name}
                    </h3>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        vendor.attributes?.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : vendor.attributes?.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {vendor.attributes?.status === "approved"
                        ? "Jóváhagyva"
                        : vendor.attributes?.status === "pending"
                        ? "Jóváhagyás alatt"
                        : "Elutasítva"}
                    </span>
                  </div>
                  <p className="text-blue-700 text-sm mb-2">
                    {vendor.attributes?.description}
                  </p>
                  <p className="text-blue-600 text-xs">
                    Kategória: {vendor.attributes?.category || "Nincs megadva"}
                  </p>
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                  <p className="text-gray-600 mb-4">Még nincs vendor fiókod.</p>
                  <button
                    onClick={() => navigate("/create-vendor")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
                  >
                    Vendor létrehozása
                  </button>
                </div>
              )}
            </div>

            {/* Orders */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Rendeléseim
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
                          Termék
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mennyiség
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ár
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
                            {order.attributes?.productName || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {order.attributes?.quantity || "N/A"}M
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            €{order.attributes?.totalPrice || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                order.attributes?.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : order.attributes?.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {order.attributes?.status || "pending"}
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
                <p className="text-gray-500">Még nincs rendelésed.</p>
              )}
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => navigate("/")}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
              >
                Vissza a főoldalra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

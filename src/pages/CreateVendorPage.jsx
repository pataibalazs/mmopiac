import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  isAuthenticated,
  strapiAPI,
  getUser,
  getToken,
  setAuthData,
} from "../utils/auth";

const CreateVendorPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.name || !formData.description) {
      setError("Név és leírás kötelező!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");
    console.log("first1");
    try {
      // Step 1: Create the vendor
      const response = await strapiAPI.createVendor({
        name: formData.name,
        description: formData.description,
      });
      console.log("first2");

      if (response && response.ok) {
        const vendorData = await response.json();
        console.log("Vendor created:", vendorData);

        // Step 2: Extract id and documentId from vendor response
        const vendor = vendorData.data;
        const vendorId = vendor.id;
        const vendorDocumentId = vendor.documentId;

        if (!vendorId || !vendorDocumentId) {
          throw new Error("Vendor ID vagy documentId hiányzik a válaszból");
        }

        // Step 3: Associate vendor with user
        const associationResponse = await strapiAPI.associateVendorWithUser(
          vendorId,
          vendorDocumentId
        );

        if (associationResponse && associationResponse.ok) {
          const updatedUserData = await associationResponse.json();
          console.log("Vendor associated with user:", updatedUserData);

          // Step 4: Update user data in localStorage
          const currentUser = getUser();
          const updatedUser = {
            ...currentUser,
            vendor: {
              id: vendorId,
              documentId: vendorDocumentId,
              name: formData.name,
              description: formData.description,
            },
          };

          // Update localStorage with new user data
          setAuthData(getToken(), updatedUser);

          // Trigger custom event to notify Header component
          window.dispatchEvent(new Event("vendorStatusChanged"));

          setSuccess("Vendor sikeresen létrehozva és hozzárendelve!");

          // Reset form
          setFormData({
            name: "",
            description: "",
          });

          // Redirect after 2 seconds
          setTimeout(() => {
            navigate("/vendor-dashboard");
          }, 2000);
        } else {
          const errorData = await associationResponse.json();
          console.error("Association error:", errorData);
          setError(
            "Vendor létrehozva, de hozzárendelés sikertelen. Lépj kapcsolatba az adminnal!"
          );
        }
      } else {
        const errorData = await response.json();
        console.error("Vendor creation error:", errorData);
        if (errorData.error && errorData.error.message) {
          setError(errorData.error.message);
        } else {
          setError("Hiba történt a vendor létrehozása során. Próbáld újra!");
        }
      }
    } catch (error) {
      console.error("Vendor creation error:", error);
      setError(
        error.message || "Hálózati hiba. Ellenőrizd az internetkapcsolatot!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Vendor létrehozása
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Töltsd ki az alábbi adatokat a vendor fiókod létrehozásához.
              </p>
            </div>

            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded">
                {success}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Vendor neve *
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    placeholder="Add meg a vendor nevét"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Leírás *
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    placeholder="Írj egy rövid leírást a vendorodról..."
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Vissza
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Létrehozás..." : "Vendor létrehozása"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateVendorPage;

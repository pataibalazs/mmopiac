import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, strapiAPI, getUser } from "../utils/auth";

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.name || !formData.quantity || !formData.price) {
      setError("Termék neve, mennyisége és ára kötelező!");
      return false;
    }

    const quantity = parseInt(formData.quantity);
    if (isNaN(quantity) || quantity < 0) {
      setError("A mennyiségnek pozitív számnak kell lennie!");
      return false;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price < 0) {
      setError("Az árnak pozitív számnak kell lennie!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      // Step 1: Create the product
      const response = await strapiAPI.createProduct({
        name: formData.name,
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price),
      });

      if (response && response.ok) {
        const productData = await response.json();
        console.log("Product created:", productData);

        // Step 2: Extract id and documentId from product response
        const product = productData.data;
        const productId = product.id;
        const productDocumentId = product.documentId;

        if (!productId || !productDocumentId) {
          throw new Error("Product ID vagy documentId hiányzik a válaszból");
        }

        // Step 3: Get current user's vendor info
        const currentUser = getUser();
        let vendorDocumentId = null;

        if (currentUser?.vendor?.documentId) {
          vendorDocumentId = currentUser.vendor.documentId;
        } else {
          // Try to get vendor from API
          const vendorResponse = await strapiAPI.getUserVendor();
          if (vendorResponse && vendorResponse.ok) {
            const vendorData = await vendorResponse.json();
            if (vendorData.data && vendorData.data.length > 0) {
              vendorDocumentId = vendorData.data[0].documentId;
            }
          }
        }

        if (!vendorDocumentId) {
          throw new Error(
            "Vendor documentId nem található. Lehet, hogy nincs vendor fiókod?"
          );
        }

        // Step 4: Associate product with vendor
        const associationResponse = await strapiAPI.associateProductWithVendor(
          vendorDocumentId,
          productId,
          productDocumentId
        );

        if (associationResponse && associationResponse.ok) {
          console.log("Product associated with vendor successfully");
          setSuccess(
            "Termék sikeresen létrehozva és hozzárendelve a vendorhoz!"
          );
        } else {
          const errorData = await associationResponse.json();
          console.error("Association error:", errorData);
          setSuccess(
            "Termék létrehozva, de hozzárendelés sikertelen. Ellenőrizd a vendor státuszt!"
          );
        }

        // Reset form
        setFormData({
          name: "",
          quantity: "",
          price: "",
        });

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/products");
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error("Product creation error:", errorData);
        if (errorData.error && errorData.error.message) {
          setError(errorData.error.message);
        } else {
          setError("Hiba történt a termék létrehozása során. Próbáld újra!");
        }
      }
    } catch (error) {
      console.error("Product creation error:", error);
      setError("Hálózati hiba. Ellenőrizd az internetkapcsolatot!");
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
                Új termék hozzáadása
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Töltsd ki az alábbi adatokat az új termék létrehozásához.
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
                  Termék neve *
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
                    placeholder="Add meg a termék nevét"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mennyiség *
                </label>
                <div className="mt-1">
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="0"
                    required
                    value={formData.quantity}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    placeholder="Add meg a mennyiséget"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Pozitív egész szám (pl. 10, 100, 250)
                </p>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ár *
                </label>
                <div className="mt-1">
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    placeholder="Add meg az árat"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Pozitív szám (pl. 15.99, 100, 250.50)
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => navigate("/products")}
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Vissza a termékekhez
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Létrehozás..." : "Termék létrehozása"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;

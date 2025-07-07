import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isAuthenticated, strapiAPI } from "../utils/auth";

const EditProductPage = () => {
  const { id } = useParams(); // This could be either id or documentId
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const [productDocumentId, setProductDocumentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    fetchProduct();
  }, [navigate, id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await strapiAPI.getProducts();

      if (response && response.ok) {
        const productsData = await response.json();
        // Try to find by documentId first, then by id
        const product = productsData.data.find(
          (p) => p.documentId === id || p.id === parseInt(id)
        );

        if (product) {
          setFormData({
            name: product.attributes?.name || product.name || "",
            quantity: (
              product.attributes?.quantity ||
              product.quantity ||
              ""
            ).toString(),
            price: (
              product.attributes?.price ||
              product.price ||
              ""
            ).toString(),
          });
          // Store the documentId for updates
          setProductDocumentId(product.documentId || product.id);
        } else {
          setError("Termék nem található.");
        }
      } else {
        setError("Hiba történt a termék betöltése során.");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Hálózati hiba a termék betöltése során.");
    } finally {
      setLoading(false);
    }
  };

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

    if (!productDocumentId) {
      setError("Termék azonosító hiányzik. Próbáld újra betölteni az oldalt.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await strapiAPI.updateProduct(productDocumentId, {
        name: formData.name,
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price),
      });

      if (response && response.ok) {
        setSuccess("Termék sikeresen frissítve!");

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/products");
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error("Product update error:", errorData);
        if (errorData.error && errorData.error.message) {
          setError(errorData.error.message);
        } else {
          setError("Hiba történt a termék frissítése során. Próbáld újra!");
        }
      }
    } catch (error) {
      console.error("Product update error:", error);
      setError("Hálózati hiba. Ellenőrizd az internetkapcsolatot!");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Termék betöltése...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Termék szerkesztése
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Módosítsd a termék adatait az alábbi mezőkben.
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
                  disabled={saving}
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? "Mentés..." : "Termék frissítése"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductPage;

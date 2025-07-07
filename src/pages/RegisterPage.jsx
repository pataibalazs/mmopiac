import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password) {
      setError("Minden mező kitöltése kötelező!");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("A jelszavak nem egyeznek!");
      return false;
    }

    if (formData.password.length < 6) {
      setError("A jelszónak legalább 6 karakter hosszúnak kell lennie!");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Érvényes email címet adj meg!");
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
      const response = await fetch(
        "http://127.0.0.1:1337/api/auth/local/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Sikeres regisztráció! Átirányítás a bejelentkezéshez...");
        // Store the JWT token if needed
        if (data.jwt) {
          localStorage.setItem("token", data.jwt);
          localStorage.setItem("user", JSON.stringify(data.user));
          // Trigger storage event to update header
          window.dispatchEvent(new Event("storage"));
        }
        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        // Handle Strapi error response
        if (data.error && data.error.message) {
          setError(data.error.message);
        } else {
          setError("Hiba történt a regisztráció során. Próbáld újra!");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Hálózati hiba. Ellenőrizd az internetkapcsolatot!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img
            className="h-20 w-auto"
            src="/pictures/logo.png"
            alt="MMOPIAC Logo"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Regisztráció
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Vagy{" "}
          <Link
            to="/login"
            className="font-medium text-yellow-600 hover:text-yellow-500"
          >
            jelentkezz be, ha már van fiókod
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
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
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Felhasználónév
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  placeholder="Add meg a felhasználóneved"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email cím
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  placeholder="pelda@email.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Jelszó
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  placeholder="Legalább 6 karakter"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Jelszó megerősítése
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  placeholder="Írd be újra a jelszót"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Regisztráció..." : "Regisztráció"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Feltételek</span>
              </div>
            </div>

            <div className="mt-4 text-xs text-gray-500 text-center">
              A regisztrációval elfogadod a{" "}
              <Link
                to="/terms"
                className="text-yellow-600 hover:text-yellow-500"
              >
                Felhasználási Feltételeket
              </Link>{" "}
              és az{" "}
              <Link
                to="/privacy"
                className="text-yellow-600 hover:text-yellow-500"
              >
                Adatkezelési Tájékoztatót
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

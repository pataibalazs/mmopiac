import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated, getUser, logout, strapiAPI } from "../utils/auth";

function Header() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasVendor, setHasVendor] = useState(false);

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuth = async () => {
      if (isAuthenticated()) {
        setIsLoggedIn(true);
        const currentUser = getUser();
        setUser(currentUser);

        // Check if user has a vendor - first from localStorage, then API
        if (currentUser?.vendor) {
          setHasVendor(true);
        } else {
          try {
            const vendorResponse = await strapiAPI.getUserVendor();
            if (vendorResponse && vendorResponse.ok) {
              const vendorData = await vendorResponse.json();
              setHasVendor(vendorData.data && vendorData.data.length > 0);
            }
          } catch (error) {
            console.error("Error checking vendor status:", error);
          }
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
        setHasVendor(false);
      }
    };

    checkAuth();

    // Listen for storage changes (login/logout from other tabs)
    const handleStorageChange = () => {
      checkAuth();
    };

    // Listen for vendor status changes
    const handleVendorStatusChange = () => {
      checkAuth();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("vendorStatusChanged", handleVendorStatusChange);

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "vendorStatusChanged",
        handleVendorStatusChange
      );
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUser(null);
    setHasVendor(false);
  };
  return (
    <header className="bg-white sticky top-0 z-50 shadow-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Global"
      >
        <div className="flex items-center flex-none">
          <Link to="/" className="-m-1.5 p-1.5">
            <img
              className="h-14 mb-2 w-auto hover:scale-110 ease-in-out duration-75"
              src="/pictures/logo.png"
              alt="Logo"
            />
          </Link>
        </div>
        <div className="flex-grow flex justify-center">
          {!isLoggedIn ? (
            // Show main navigation when not logged in
            <div className="flex gap-x-12">
              <Link
                to="/"
                className="text-lg font-semibold leading-6 text-black hover:text-slate-500 ease-in-out duration-50"
              >
                Vásárolj
              </Link>
              <Link
                to="/selltous"
                className="text-lg font-semibold leading-6 text-black hover:text-slate-500 ease-in-out duration-50"
              >
                Adj el nekünk
              </Link>
              <Link
                to="/reviews"
                className="text-lg font-semibold leading-6 text-black hover:text-slate-500 ease-in-out duration-50"
              >
                Értékelések
              </Link>
              <Link
                to="/contact"
                className="text-lg font-semibold leading-6 text-black hover:text-slate-500 ease-in-out duration-50"
              >
                Kontakt
              </Link>
              <Link
                to="/about"
                className="text-lg font-semibold leading-6 text-black hover:text-slate-500 ease-in-out duration-50"
              >
                Rólunk
              </Link>
            </div>
          ) : (
            // Show vendor creation when logged in
            <div className="flex gap-x-12">
              {hasVendor ? (
                <>
                  <Link
                    to="/vendor-dashboard"
                    className="text-lg font-semibold leading-6 text-black hover:text-slate-500 ease-in-out duration-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/products"
                    className="text-lg font-semibold leading-6 text-black hover:text-slate-500 ease-in-out duration-50"
                  >
                    Termékeim
                  </Link>
                </>
              ) : (
                <Link
                  to="/create-vendor"
                  className="text-lg font-semibold leading-6 text-black hover:text-slate-500 ease-in-out duration-50"
                >
                  Vendor létrehozása
                </Link>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center flex-none gap-x-6">
          {isLoggedIn ? (
            // Show user menu when logged in
            <div className="flex items-center gap-x-4">
              <Link
                to="/profile"
                className="flex items-center text-lg font-semibold leading-6 text-black hover:text-slate-500 ease-in-out duration-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                {user?.username}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-lg font-semibold leading-6 text-black hover:text-slate-500 ease-in-out duration-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                Kijelentkezés
              </button>
            </div>
          ) : (
            // Show login/register when not logged in
            <>
              <Link
                to="/login"
                className="flex items-center text-lg font-semibold leading-6 text-black hover:text-slate-500 ease-in-out duration-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                Bejelentkezés
              </Link>
              <Link
                to="/register"
                className="flex items-center text-lg font-semibold leading-6 text-black hover:text-slate-500 ease-in-out duration-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                  />
                </svg>
                Regisztráció
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;

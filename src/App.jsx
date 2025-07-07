import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import SellToUs from "./pages/SellToUs";
import Reviews from "./pages/Reviews";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import CreateVendorPage from "./pages/CreateVendorPage";
import VendorDashboardPage from "./pages/VendorDashboardPage";
import ProductsPage from "./pages/ProductsPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import AllProductsPage from "./pages/AllProductsPage";
import TradeChatPage from "./pages/TradeChatPage";
import ErrorPage from "./pages/ErrorPage";
import OrderFulfilledPage from "./pages/OrderFulfilledPage";
import WebSocketListener from "./components/WebSocketListener";
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";
import { startTokenValidation } from "./utils/auth";

const App = () => {
  useEffect(() => {
    // Start token validation when app loads
    startTokenValidation();
  }, []);
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <WebSocketListener />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/selltous" element={<SellToUs />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-vendor" element={<CreateVendorPage />} />
        <Route path="/vendor-dashboard" element={<VendorDashboardPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/add-product" element={<AddProductPage />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
        <Route path="/all-products" element={<AllProductsPage />} />
        <Route path="/order-fulfilled" element={<OrderFulfilledPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/order-done" element={<TradeChatPage />} />
        <Route path="*" element={<Navigate to="/error" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

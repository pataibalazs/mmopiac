import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import SellToUs from "./pages/SellToUs";
import Reviews from "./pages/Reviews";
import ContactPage from "./pages/ContactPage";
import TradeChatPage from "./pages/TradeChatPage";
import ErrorPage from "./pages/ErrorPage";
import OrderFulfilledPage from "./pages/OrderFulfilledPage";
import WebSocketListener from "./components/WebSocketListener";
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";

const App = () => {
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
        <Route path="/order-fulfilled" element={<OrderFulfilledPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/order-done/:orderId" element={<TradeChatPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

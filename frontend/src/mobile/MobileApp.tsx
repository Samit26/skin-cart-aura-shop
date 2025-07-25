import { Routes, Route } from "react-router-dom";
import MobileHome from "./pages/MobileHome";

import MobileProducts from "./pages/MobileProducts";
import MobileProductDetail from "./pages/MobileProductDetail";
import MobileAccount from "./pages/MobileAccount";
import MobileFavorites from "./pages/MobileFavorites";
import MobileCart from "./pages/MobileCart";

const MobileApp = () => {
  return (
    <Routes>
      <Route path="/" element={<MobileHome />} />
      <Route path="/products" element={<MobileProducts />} />
      <Route path="/product/:id" element={<MobileProductDetail />} />
      <Route path="/account" element={<MobileAccount />} />
      <Route path="/favorites" element={<MobileFavorites />} />
      <Route path="/cart" element={<MobileCart />} />
    </Routes>
  );
};

export default MobileApp;

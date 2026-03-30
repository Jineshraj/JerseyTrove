// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import All from "../pages/All";
import Admin from "../pages/Admin";
import Latest from "../pages/Latest";
import Retro from "../pages/Retro";
import NationalTeams from "../pages/NationalTeams";
import Clubs from "../pages/Clubs";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Any route inside this block gets the Navbar automatically! */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<All />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/retro" element={<Retro />} />
        <Route path="/national" element={<NationalTeams />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* PROTECTED ROUTES : Only enter if logged in */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element />
          <Route path="/favourite" element />
          <Route path="/profile" element />
        </Route>
      </Route>

      {/* Put Auth routes outside the Layout if you don't want the Navbar on them */}
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default AppRoutes;

// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Any route inside this block gets the Navbar automatically! */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        {/* We will add /latest, /retro, etc. here later */}

        {/* PROTECTED ROUTES : Only enter if logged in */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/cart" element />
          <Route path="/orders" element />
          <Route path="/favourite" element />
          <Route path="/profile" element />
        </Route>
      </Route>

      {/* Put Auth routes outside the Layout if you don't want the Navbar on them */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;

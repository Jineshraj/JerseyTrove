// src/components/layout/Layout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* The Navbar floats at the very top */}
      <Navbar />

      {/* pt-16 pushes your page content down 64px so the Navbar doesn't cover it */}
      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

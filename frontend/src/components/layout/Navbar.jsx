import { useState, useEffect, useRef } from "react";
import { Search, User, ShoppingCart, Menu, X, UserRoundX } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavUserDropdown from "./NavUserDropdown";
import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth(); //check if login or logout
  const { cartItems } = useCart(); //collect cart items

  // Refs for scroll locking and accessibility focus
  const originalOverflow = useRef("");
  const menuRef = useRef(null);

  const navLinks = [
    { name: "Latest", path: "/latest" },
    { name: "All", path: "/all" },
    { name: "Retro", path: "/retro" },
    { name: "Clubs", path: "/clubs" },
    { name: "National Team", path: "/national" },
  ];

  const navigate = useNavigate();
  // The "Pro" UseEffect: Handles Resize, Esc Key, Scroll Lock, and Focus
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768 && isOpen) setIsOpen(false);
    };

    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      // Lock background scroll and shift focus to the menu for accessibility
      originalOverflow.current = window.getComputedStyle(
        document.body,
      ).overflow;
      document.body.style.overflow = "hidden";
      if (menuRef.current) menuRef.current.focus();
    } else {
      // Unfreeze background when menu closes
      document.body.style.overflow = originalOverflow.current || "unset";
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow.current || "unset";
    };
  }, [isOpen]);

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      {/* Safety Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex Director */}
        <div className="flex justify-between items-center h-16">
          {/* LEFT: Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-black tracking-tighter text-gray-900"
            >
              JERSEY<span className="text-gray-400">TROVE</span>
            </Link>
          </div>

          {/* CENTER: Desktop Menu (Hidden on mobile) */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm uppercase tracking-wider transition-colors ${
                    isActive
                      ? "font-black text-gray-900"
                      : "font-semibold text-gray-500 hover:text-gray-900"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* RIGHT: Action Icons & Mobile Toggle */}
          <div className="flex items-center gap-5 text-gray-700">
            <button className="hover:text-black transition">
              <Search size={20} />
            </button>
            <div className="nav-actions">
              {user ? (
                <NavUserDropdown />
              ) : (
                <Link to="/login" className="hover:text-black transition">
                  <UserRoundX size={20} />
                </Link>
              )}
            </div>
            <button
              className="relative hover:text-black transition flex items-center"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            </button>

            {/* Mobile Toggle Button */}
            <button
              className="md:hidden hover:text-black transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU: Conditional Rendering */}
      {isOpen && (
        <div
          ref={menuRef}
          tabIndex={-1} // Allows the div to receive focus programmatically
          className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-4 space-y-1 shadow-xl outline-none overscroll-contain h-[calc(100vh-64px)] overflow-y-auto"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-3 text-base uppercase tracking-wider rounded-lg ${
                  isActive
                    ? "font-black text-white bg-gray-900"
                    : "font-bold text-gray-900 hover:bg-gray-50"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../context/AuthContext";
import {
  CircleUserRound,
  Target,
  UserCircle,
  UserRoundCheck,
  UserRoundCog,
} from "lucide-react";

const NavUserDropdown = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropDownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="relative" ref={dropDownRef}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center text-gray-700 transition hover:text-black"
      >
        <UserRoundCog size={22} />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl border border-gray-100 bg-white/95 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)] backdrop-blur flex flex-col overflow-hidden z-50">
          <Link
            to="/orders"
            onClick={() => setIsMenuOpen(false)}
            className="px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
          >
            My Orders
          </Link>
          <Link
            to="/favourite"
            onClick={() => setIsMenuOpen(false)}
            className="px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
          >
            My Favourites
          </Link>
          <Link
            to="/profile"
            onClick={() => setIsMenuOpen(false)}
            className="px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
          >
            Profile Settings
          </Link>
          <div className="border-t border-gray-100"></div>
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default NavUserDropdown;

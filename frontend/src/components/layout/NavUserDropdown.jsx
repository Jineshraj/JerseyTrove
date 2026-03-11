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
        className="hover:text-black transition flex items-center"
      >
        <UserRoundCog size={22} />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col overflow-hidden z-50">
          <Link
            to="/orders"
            onClick={() => setIsMenuOpen(false)}
            className="px-4 py-3 hover:bg-gray-100 text-sm text-gray-700"
          >
            My Orders
          </Link>
          <Link
            to="/favourite"
            onClick={() => setIsMenuOpen(false)}
            className="px-4 py-3 hover:bg-gray-100 text-sm text-gray-700"
          >
            My Favourites
          </Link>
          <Link
            to="/profile"
            onClick={() => setIsMenuOpen(false)}
            className="px-4 py-3 hover:bg-gray-100 text-sm text-gray-700"
          >
            Profile Settings
          </Link>
          <div className="border-t border-gray-200"></div>
          <button
            onClick={handleLogout}
            className="px-4 py-3 hover:bg-red-50 text-sm text-red-600 text-left font-semibold"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default NavUserDropdown;

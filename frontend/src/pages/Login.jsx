// src/pages/Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import InputField from "../components/common/InputField";
// Make sure this path matches where you saved your InputField component!

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // We will wire this up to your MERN backend later
    console.log("Submitting login:", formData);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-3xl font-black text-gray-900 uppercase tracking-tight">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-gray-600 font-medium">
          Sign in to access your orders, wishlists, and exclusive drops.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-none sm:px-10 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Your Custom Input Field for Email */}
            <InputField
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />

            {/* Your Custom Input Field for Password */}
            <div>
              <InputField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />

              <div className="flex items-center justify-end mt-2">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-bold text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="relative overflow-hidden group w-full py-4 px-4 border-2 border-black bg-transparent text-sm font-black uppercase tracking-widest text-black"
              >
                {/* The hidden black background that slides in */}
                <span className="absolute inset-0 w-full h-full bg-black -translate-x-full transition-transform duration-300 ease-out group-hover:translate-x-0"></span>

                {/* The text and icon sitting on top */}
                <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-white">
                  Sign In{" "}
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <p className="text-center text-sm text-gray-600 font-medium">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-black text-blue-600 hover:text-blue-500 uppercase tracking-wide"
              >
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

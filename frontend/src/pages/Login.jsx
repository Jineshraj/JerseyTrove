import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import InputField from "../components/common/InputField";
import { toast } from "sonner";
import { fromJSONSchema, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/AuthContext";

// (Zod Rules)
const loginSchema = z.object({
  email: z.email("Invalid Email"),
  password: z.string().min(8, "Password must contain atleast 8 characters"),
});

const Login = () => {
  const { login, user } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  //Look for the "return ticket". If it doesn't exist, default to "/"
  const from = location.state?.from?.pathname || "/";

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  //If they are already logged in, kick them out!
  if (user) {
    // We replace the history so they can't get stuck in a back-button loop
    return <Navigate to="/" replace />;
  }

  //when clicked submit button
  const onLogin = async (data) => {
    try {
      //MONGO DB MAGIC HAPPENS HERE ######
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const authData = {
        isLoggedIn: true,
        email: data.email,
        token: "mock_token_########", //placeholder
      };

      //Save to localStorage, from useAuth() hook

      login(authData);

      toast.success("Welcome back to JerseyTrove!");

      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  //PASSWORD TOGGLE

  const PasswordToggle = (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="text-gray-400 hover:text-black transition-colors focus:outline-none"
      tabIndex="-1" // Pro tip: Prevents tab-key from getting stuck on the eye
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  );

  return (
    <div className="px-4 min-h-[calc(100vh-64px)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 relative">
      {/* 1. THE ESCAPE HATCH (Standalone Logo) */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
        <Link
          to="/"
          className="text-2xl font-black tracking-tighter text-gray-900 transition-opacity hover:opacity-70"
        >
          JERSEY<span className="text-gray-400">TROVE</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-6 text-3xl font-black text-gray-900 uppercase tracking-tight">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-gray-600 font-medium">
          Log in to access your orders, wishlists, and exclusive drops.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-none sm:px-10 border border-gray-100">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onLogin)}
            noValidate
          >
            {/* Your Custom Input Field for Email */}
            <InputField
              label="Email Address"
              type="email"
              name="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
              required
            />

            {/* Your Custom Input Field for Password */}
            <div>
              <InputField
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                error={errors.password?.message}
                {...register("password")}
                placeholder="••••••••"
                required
                autoCapitalize="none"
                autoCorrect="off"
                rightIcon={PasswordToggle}
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
                <span className="absolute inset-0 w-full h-full bg-black -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0"></span>

                {/* The text and icon sitting on top */}
                <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-white">
                  {isSubmitting ? (
                    "Authenticating..."
                  ) : (
                    <>
                      Sign In{" "}
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
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

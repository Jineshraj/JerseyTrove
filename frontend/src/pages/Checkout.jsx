import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import InputField from "../components/common/InputField";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cartItems } = useCart();
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [checkoutForm, setCheckoutForm] = useState({
    customerName: "",
    email: "",
    mobileNumber: "",
    shippingAddress: "",
  });
  const [checkoutErrors, setCheckoutErrors] = useState({});

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 1),
    0,
  );
  const shipping = subtotal > 8000 ? 0 : 299;
  const total = subtotal + shipping;

  const handleCheckoutFieldChange = (e) => {
    const { name, value } = e.target;
    setCheckoutForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCheckoutErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateCheckoutForm = () => {
    const errors = {};
    const emailRegex = /\S+@\S+\.\S+/;
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!checkoutForm.customerName.trim()) {
      errors.customerName = "Name is required";
    }
    if (!checkoutForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(checkoutForm.email.trim())) {
      errors.email = "Enter valid email";
    }
    if (!checkoutForm.mobileNumber.trim()) {
      errors.mobileNumber = "Mobile number is required";
    } else if (!mobileRegex.test(checkoutForm.mobileNumber.trim())) {
      errors.mobileNumber = "Enter valid 10-digit mobile";
    }
    if (!checkoutForm.shippingAddress.trim()) {
      errors.shippingAddress = "Address is required";
    }

    setCheckoutErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleContinue = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const isValid = validateCheckoutForm();
    if (!isValid) {
      toast.error("Please complete required checkout details");
      return;
    }

    toast.success("Checkout details saved. Next: place order.");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-[1200px] px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <div className="mb-8 border-b border-slate-200 pb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Cart / Checkout
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Checkout
          </h1>
          <div className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            <span>Contact</span>
            <span className="mx-2">/</span>
            <span>Shipping</span>
            <span className="mx-2">/</span>
            <span>Payment</span>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.5)] sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-xs font-semibold text-slate-700">
                1
              </span>
              <h2 className="text-lg font-semibold text-slate-900">
                Contact Information
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InputField
                label="Full Name"
                name="customerName"
                type="text"
                placeholder="Enter your full name"
                value={checkoutForm.customerName}
                onChange={handleCheckoutFieldChange}
                error={checkoutErrors.customerName}
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={checkoutForm.email}
                onChange={handleCheckoutFieldChange}
                error={checkoutErrors.email}
              />
            </div>

            <InputField
              label="Mobile Number"
              name="mobileNumber"
              type="tel"
              placeholder="10-digit number"
              value={checkoutForm.mobileNumber}
              onChange={handleCheckoutFieldChange}
              error={checkoutErrors.mobileNumber}
            />

            <div className="mb-2 mt-4">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-xs font-semibold text-slate-700">
                  2
                </span>
                <h2 className="text-lg font-semibold text-slate-900">
                  Shipping Address
                </h2>
              </div>

              <label
                htmlFor="shippingAddress"
                className="mb-1 block text-sm font-black uppercase tracking-wide text-gray-900"
              >
                Address
              </label>
              <textarea
                id="shippingAddress"
                name="shippingAddress"
                rows="4"
                placeholder="House no, street, city, state, pincode"
                value={checkoutForm.shippingAddress}
                onChange={handleCheckoutFieldChange}
                className={`w-full border px-4 py-3.5 font-medium text-gray-900 transition-all placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black ${
                  checkoutErrors.shippingAddress
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
              />
              {checkoutErrors.shippingAddress && (
                <span className="mt-1 block text-xs font-bold uppercase italic text-red-500">
                  {checkoutErrors.shippingAddress}
                </span>
              )}
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                Payment Method
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Payment collection will be wired in the next step.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleContinue}
                className="btn-secondary btn-primary-md"
              >
                <span>Continue</span>
              </button>
              <Link
                to="/cart"
                className="btn-secondary btn-primary-md"
              >
                <span>Back To Cart</span>
              </Link>
            </div>
          </section>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-45px_rgba(15,23,42,0.5)] sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">
              Order Summary
            </h2>

            {cartItems.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
                Your cart is empty.
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {cartItems.map((item) => {
                  const lineTotal = (item.price || 0) * (item.qty || 1);
                  const image =
                    item.images?.[0] || item.imageUrl || item.image || item.img;
                  return (
                    <div
                      key={item._id || item.id}
                      className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3"
                    >
                      <div className="h-16 w-14 overflow-hidden rounded-xl bg-slate-200">
                        <img
                          src={image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-500">Qty: {item.qty || 1}</p>
                      </div>
                      <p className="text-sm font-semibold text-slate-900">
                        Rs {lineTotal.toLocaleString("en-IN")}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-6 space-y-3 border-t border-slate-200 pt-5">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Subtotal</span>
                <span>Rs {subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Complimentary" : `Rs ${shipping}`}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
                <span>Total</span>
                <span>Rs {total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="mt-6 border-t border-slate-200 pt-5">
              <button
                onClick={() => setPromoOpen((prev) => !prev)}
                className="flex w-full items-center justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:text-slate-700"
              >
                <span>Add Promo Code</span>
                <span className={`text-xs transition ${promoOpen ? "rotate-180" : "rotate-0"}`}>
                  v
                </span>
              </button>
              {promoOpen && (
                <div className="mt-3 flex items-center gap-2 border-b border-slate-300 pb-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="ENTER CODE"
                    className="flex-1 bg-transparent text-xs font-semibold uppercase tracking-[0.15em] text-slate-900 outline-none placeholder:text-slate-300"
                  />
                  <button className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                    Apply
                  </button>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

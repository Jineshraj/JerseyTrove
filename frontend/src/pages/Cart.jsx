import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartItem({ item, onQty, onRemove }) {
  const primaryImage =
    item.images?.[0] || item.imageUrl || item.image || item.img;
  const lineTotal = (item.price || 0) * (item.qty || 1);
  return (
    <div className="flex flex-col gap-5 border-b border-slate-200 bg-white p-5 last:border-b-0 sm:flex-row sm:gap-6 sm:p-6">
      <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-100 sm:w-40 sm:shrink-0">
        <img
          src={primaryImage}
          alt={item.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            {item.category && (
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                {item.category}
              </p>
            )}
            <h3 className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">
              {item.name}
            </h3>
            {item.sub && (
              <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-slate-500">
                {item.sub}
              </p>
            )}
            <div className="mt-4 space-y-1 text-sm text-slate-700">
              {item.size && (
                <p>
                  <span className="text-slate-400">Size: </span>
                  {item.size}
                </p>
              )}
              {item.color && (
                <p>
                  <span className="text-slate-400">Color: </span>
                  {item.color}
                </p>
              )}
            </div>
          </div>

          <p className="whitespace-nowrap text-lg font-bold text-slate-900">
            Rs {lineTotal.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onQty(item.id, -1)}
              className="h-8 w-8 rounded-full border border-slate-300 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
            >
              -
            </button>
            <span className="w-6 text-center text-sm font-semibold text-slate-900">
              {String(item.qty || 1).padStart(2, "0")}
            </span>
            <button
              onClick={() => onQty(item.id, 1)}
              className="h-8 w-8 rounded-full border border-slate-300 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:text-slate-900"
            >
              +
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 transition hover:text-slate-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { cartItems, updateQty, removeItem } = useCart();
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const subtotal = cartItems.reduce(
    (acc, i) => acc + (i.price || 0) * (i.qty || 1),
    0,
  );
  const itemCount = cartItems.reduce((acc, i) => acc + (i.qty || 1), 0);
  const shipping = subtotal > 8000 ? 0 : 299;
  const total = subtotal + shipping;
  const freeShipGap = 8000 - subtotal;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-[1200px] px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <div className="mb-10 border-b border-slate-200 pb-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-400">
            JerseyTrove / Cart
          </p>
          <div className="mt-3 flex items-baseline justify-between">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Your Selection
            </h1>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              ({String(itemCount).padStart(2, "0")} items)
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          <div className="flex-1">
            {cartItems.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white py-20 text-center">
                <p className="text-2xl font-semibold text-slate-500">
                  Your cart is empty.
                </p>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                  Explore our drops to find your kit.
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
                {cartItems.map((item) => (
                  <CartItem
                    key={item._id || item.id}
                    item={item}
                    onQty={updateQty}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            )}

            <div className="mt-8 flex items-center gap-3 text-slate-500">
              <span className="h-px w-6 bg-slate-300" />
              <Link
                to="/all"
                className="text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:text-slate-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-[360px] lg:sticky lg:top-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_30px_80px_-60px_rgba(15,23,42,0.5)] sm:p-8">
              <h2 className="text-2xl font-semibold text-slate-900">Order Summary</h2>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  <span>Subtotal</span>
                  <span className="text-sm font-bold text-slate-900">
                    Rs {subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  <span>Shipping</span>
                  <span className="text-xs font-semibold text-slate-700">
                    {shipping === 0 ? "Complimentary" : `Rs ${shipping}`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                  <span>Estimated Tax</span>
                  <span className="text-xs font-semibold text-slate-700">
                    At checkout
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-5 text-sm font-semibold uppercase tracking-[0.15em] text-slate-900">
                  <span>Total</span>
                  <span className="text-lg font-bold">Rs {total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="mt-6 border-t border-slate-200 pt-6">
                <button
                  onClick={() => setPromoOpen((p) => !p)}
                  className="flex w-full items-center justify-between text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:text-slate-700"
                >
                  Add Promo Code
                  <span className={`text-xs transition ${promoOpen ? "rotate-180" : "rotate-0"}`}>
                    v
                  </span>
                </button>

                {promoOpen && (
                  <div className="mt-4 flex items-center gap-2 border-b border-slate-300 pb-2">
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

              <button className="mt-6 w-full rounded-full bg-slate-900 px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-slate-800">
                Proceed to Checkout
              </button>

              {shipping > 0 && (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Add Rs {freeShipGap.toLocaleString("en-IN")} more for complimentary shipping.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-3 overflow-hidden rounded-3xl border border-slate-200 bg-white">
              {[
                { icon: "R", label: "Easy Returns" },
                { icon: "C", label: "Authenticated" },
                { icon: "T", label: "Tracked Delivery" },
              ].map((b, i) => (
                <div
                  key={b.label}
                  className="px-2 py-4 text-center"
                  style={{ borderRight: i < 2 ? "1px solid #e2e8f0" : "none" }}
                >
                  <div className="text-sm font-semibold text-slate-700">{b.icon}</div>
                  <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                    {b.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

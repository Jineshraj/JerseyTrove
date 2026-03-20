import React, { useEffect, useRef, useState } from "react";
import {
  CheckCircle,
  Home,
  LayoutGrid,
  List,
  Package,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const initialForm = {
  name: "",
  team: "",
  price: "",
  sizes: [],
  quality: "",
  fitType: "",
  categories: [],
  imageUrl: "",
  lastVerifiedDate: "",
  description: "",
};

const Admin = () => {
  // State: values this page keeps in memory
  // True while jerseys are loading
  const [isLoading, setIsLoading] = useState(false);
  // Jerseys fetched from the server
  const [allJersey, setAllJersey] = useState([]);
  // Mobile layout: grid or list
  const [isListView, setIsListView] = useState(false);
  // Form data for add/edit modal
  const [formData, setFormData] = useState(initialForm);
  // Modal open/close
  const [isOpen, setIsOpen] = useState(false);
  // Id of the jersey to be edited
  const [editingId, setEditingId] = useState("");
  const nameInputRef = useRef(null);

  const navigate = useNavigate();

  // Data fetching
  const fetchJerseys = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) {
        throw new Error("JERSEYS CANT BE FETCHED AT THE MOMENT");
      }
      const { data } = await response.json();
      setAllJersey(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load jerseys once on mount
  useEffect(() => {
    fetchJerseys();
  }, []);

  // Lock background scroll and focus the first input when modal opens
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        nameInputRef.current?.focus();
      }, 0);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = prevOverflow;
      };
    }
    return undefined;
  }, [isOpen]);

  // Derived data
  // Sort by lastVerifiedDate (oldest first)
  const sortedJerseys = [...allJersey].sort((a, b) => {
    const aDate = new Date(a.lastVerifiedDate || a.createdAt || 0);
    const bDate = new Date(b.lastVerifiedDate || b.createdAt || 0);
    return aDate - bDate;
  });

  // Format date as "days ago"
  const daysAgo = (dateValue) => {
    if (!dateValue) return "unknown";
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "unknown";
    const diffMs = Date.now() - date.getTime();
    const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
  };

  const editJersey = (jersey) => {
    setEditingId(jersey._id);
    const formattedDate = jersey.lastVerifiedDate
      ? jersey.lastVerifiedDate.split("T")[0]
      : "";
    setFormData({ ...initialForm, ...jersey, lastVerifiedDate: formattedDate });
    setIsOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckBoxChange = (feild, value) => {
    setFormData((prev) => ({
      ...prev,
      [feild]: prev[feild].includes(value)
        ? prev[feild].filter((item) => item !== value)
        : [...prev[feild], value],
    }));
  };

  // UI
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fdebd3,_#f6f7fb_45%,_#eef7f1_80%)] text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-0 pb-10 pt-8 sm:gap-10 sm:px-6 sm:pb-16 sm:pt-12">
        {/* Top area: title and actions */}
        <header className="rounded-3xl border border-white/80 bg-white/70 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.6)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Title + summary */}
            <div className="max-w-2xl space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                Admin Jerseys
              </h1>
              <p className="text-base text-slate-600">
                Manage listings, verify stock, and keep inventory fresh.
              </p>
            </div>
            {/* Primary actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                type="button"
              >
                <span className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </span>
              </button>
              {/* Orders (wire later) */}
              <button
                className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                type="button"
              >
                <span className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Orders
                </span>
              </button>
              {/* New jersey (wire later) */}
              <button
                className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-600"
                type="button"
                onClick={() => setIsOpen(true)}
              >
                <span className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  New Jersey
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Jersey list */}
        <section className="grid gap-8">
          {/* List + mobile view switch */}
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.5)] backdrop-blur sm:p-8">
            {/* Section header + view switch */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold">All Jerseys</h2>
                {/* Toggle grid/list on mobile */}
                <button
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:hidden"
                  type="button"
                  onClick={() => setIsListView((prev) => !prev)}
                >
                  {isListView ? (
                    <>
                      <LayoutGrid className="h-4 w-4" />
                      Grid
                    </>
                  ) : (
                    <>
                      <List className="h-4 w-4" />
                      List
                    </>
                  )}
                </button>
              </div>
              <p className="text-sm text-slate-500">
                Sorted by last verified date (oldest to newest).
              </p>
            </div>

            {/* Cards switch layout with toggle */}
            <ul
              className={
                isListView
                  ? "grid grid-cols-1 gap-4"
                  : "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              }
            >
              {isLoading ? (
                // Show while loading
                <li>Loading ....</li>
              ) : (
                sortedJerseys.map((jersey) => (
                  <li
                    key={jersey._id}
                    className={
                      isListView
                        ? "group flex overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                        : "group overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                    }
                  >
                    {/* Jersey image */}
                    <div
                      className={
                        isListView
                          ? "relative aspect-square w-32 shrink-0 overflow-hidden bg-slate-100 sm:w-40"
                          : "relative aspect-square w-full overflow-hidden bg-slate-100"
                      }
                    >
                      <img
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                        src={jersey.imageUrl}
                        alt={jersey.name}
                      />
                      {/* Delete icon (grid only) */}
                      {!isListView && (
                        <button
                          className="absolute right-2 top-2 rounded-full border border-rose-200 bg-white/90 p-1.5 text-rose-600 shadow-sm transition hover:border-rose-300 hover:bg-rose-50"
                          aria-label="Delete jersey"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    {/* Info + actions */}
                    <div
                      className={
                        isListView
                          ? "flex flex-1 flex-col gap-3 p-4"
                          : "flex flex-col gap-2 p-3 sm:p-4"
                      }
                    >
                      {/* Name + price */}
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="line-clamp-2 text-sm font-semibold leading-tight text-slate-800 sm:text-base">
                          {jersey.name}
                        </h2>
                        <span className="whitespace-nowrap text-sm font-bold text-slate-900 sm:text-base">
                          {"₹"} {jersey.price}
                        </span>
                      </div>

                      {/* Team + quality */}
                      <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 sm:text-xs">
                        <span className="truncate">{jersey.team}</span>
                        <span className="truncate">{jersey.quality}</span>
                      </div>

                      {/* Verified time + verify button */}
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600 sm:text-xs">
                        <span className="font-medium">
                          Verified {daysAgo(jersey.lastVerifiedDate)}
                        </span>
                        <button
                          className="whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100 sm:text-xs"
                          onClick={() => {}}
                        >
                          <span className="flex items-center gap-1.5">
                            <CheckCircle className="h-3.5 w-3.5" />
                            Verify
                          </span>
                        </button>
                      </div>

                      {/* Edit/Delete layout changes in list view */}
                      {isListView ? (
                        <div className="mt-1 flex items-center gap-2">
                          <button className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition hover:bg-slate-800 sm:text-xs">
                            <span className="flex items-center justify-center gap-2">
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </span>
                          </button>
                          <button
                            className="flex-1 rounded-xl border border-rose-300 bg-rose-50 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-rose-700 shadow-sm transition hover:border-rose-400 hover:bg-rose-100 sm:text-xs"
                            onClick={() => editJersey(jersey)}
                          >
                            <span className="flex items-center justify-center">
                              <Trash2 className="h-4 w-4" />
                            </span>
                          </button>
                        </div>
                      ) : (
                        <button
                          className="mt-1 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition hover:bg-slate-800 sm:text-xs"
                          onClick={() => editJersey(jersey)}
                        >
                          <span className="flex items-center justify-center gap-2">
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </span>
                        </button>
                      )}
                    </div>
                  </li>
                ))
              )}
              {/* Jersey list items here */}
            </ul>
          </div>
        </section>
      </div>

      <div
        className={`fixed inset-0 z-50 ${isOpen ? "flex" : "hidden"} items-center justify-center bg-slate-900/40 px-3 py-6 sm:px-4 sm:py-10`}
      >
        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_35px_80px_-45px_rgba(15,23,42,0.65)] sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
                Jersey Editor
              </p>
              <h2 className="text-2xl font-semibold text-slate-900">
                Add or Edit Jersey
              </h2>
            </div>
            <button
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>

          <form className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Jersey Name
              </label>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-emerald-100"
                placeholder="Liverpool Home 23/24"
                value={formData.name}
                onChange={handleChange}
                name="name"
                type="text"
                ref={nameInputRef}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Team
              </label>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-emerald-100"
                placeholder="Liverpool"
                value={formData.team}
                name="team"
                onChange={handleChange}
                type="text"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Price
              </label>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-emerald-100"
                placeholder="2399"
                value={formData.price}
                name="price"
                onChange={handleChange}
                type="number"
              />
            </div>
            <div className="space-y-3 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Sizes
              </label>
              <div className="flex flex-wrap gap-3">
                {["All", "XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <label
                    key={size}
                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm"
                  >
                    <input
                      className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-200"
                      checked={formData.sizes.includes(size)}
                      name="sizes"
                      onChange={() => handleCheckBoxChange("sizes", size)}
                      type="checkbox"
                    />
                    {size}
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Quality
              </label>
              <select
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-emerald-100"
                name="quality"
                onChange={handleChange}
                value={formData.quality}
              >
                <option value="" disabled>
                  Select quality
                </option>
                <option value="Embroidery">Embroidery</option>
                <option value="Sublimation">Sublimation</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Fit Type
              </label>
              <select
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-emerald-100"
                name="fitType"
                onChange={handleChange}
                value={formData.fitType}
              >
                <option value="" disabled>
                  Select fit type
                </option>
                <option value="Normal">Normal</option>
                <option value="Oversize">Oversize</option>
                <option value="Full Sleeve">Full Sleeve</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-3 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Categories
              </label>
              <div className="flex flex-wrap gap-3">
                {["Retro", "Club", "National Team", "Current"].map(
                  (category) => (
                    <label
                      key={category}
                      className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm"
                    >
                      <input
                        className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-200"
                        type="checkbox"
                        name="categories"
                        value={formData.categories.includes(category)}
                        onChange={() =>
                          handleCheckBoxChange("categories", category)
                        }
                      />
                      {category}
                    </label>
                  ),
                )}
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Image URL
              </label>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-emerald-100"
                placeholder="https://image.host/jersey.jpg"
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Last Verified
              </label>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-emerald-100"
                type="date"
                name="lastVerifiedDate"
                value={formData.lastVerifiedDate}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Description
              </label>
              <textarea
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-emerald-100"
                placeholder="Short notes about size, fit, player name, etc."
                rows="3"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-2">
              <button
                className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-600"
                type="button"
              >
                Save Jersey
              </button>
              <button
                className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Admin;

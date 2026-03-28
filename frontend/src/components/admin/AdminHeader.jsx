import React from "react";
import { Home, Package, Plus } from "lucide-react";

// Props:
// - onHome: handler from parent (navigate home)
// - onNew: handler from parent (open new-jersey modal)
const AdminHeader = ({ onHome, onNew }) => {
  return (
    <header className="rounded-3xl border border-white/80 bg-white/70 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.6)] backdrop-blur sm:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Title + short description */}
        <div className="max-w-2xl space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Admin Jerseys
          </h1>
          <p className="text-base text-slate-600">
            Manage listings, verify stock, and keep inventory fresh.
          </p>
        </div>
        {/* Header actions (handlers come from parent) */}
        <div className="flex flex-wrap items-center gap-3 max-sm:gap-2">
          <button
            onClick={onHome}
            className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            type="button"
          >
            <span className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Home
            </span>
          </button>
          <button
            className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            type="button"
          >
            <span className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Orders
            </span>
          </button>
          <button
            className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-600 max-sm:hidden"
            type="button"
            onClick={onNew}
          >
            <span className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Jersey
            </span>
          </button>
          <button
            className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-600 sm:hidden"
            type="button"
            onClick={onNew}
          >
            <span className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

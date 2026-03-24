import React from "react";
import FiltersContent from "./FiltersContent";
import { X } from "lucide-react";

// Mobile bottom sheet for filters
// Props:
// - open: state from parent
// - onClose: handler from parent
// - onClear: handler from parent
// - onChange: optional handler for checkbox changes
const MobileFilterSheet = ({ open, onClose, onClear, onChange, filters }) => {
  return (
    <div
      className={`fixed inset-0 z-40 ${open ? "flex" : "hidden"} items-end md:hidden`}
    >
      <button
        className="absolute inset-0 bg-black/40"
        type="button"
        onClick={onClose}
        aria-label="Close filters"
      />
      <div className="relative w-full rounded-t-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <div className="flex items-center gap-3">
            <button
              className="text-xs font-semibold uppercase tracking-wide text-gray-400"
              type="button"
              onClick={onClear}
            >
              Clear
            </button>
            <button
              className="text-xs font-semibold uppercase tracking-wide text-gray-500"
              type="button"
              onClick={onClose}
            >
              <X color="black" size={20} />
            </button>
          </div>
        </div>

        <FiltersContent filters={filters} onChange={onChange} />
      </div>
    </div>
  );
};

export default MobileFilterSheet;

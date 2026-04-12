import React from "react";

const SORT_OPTIONS = [
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

// Mobile bottom sheet for sort options
// Props:
// - open: state from parent
// - onClose: handler from parent
// - onSelect: handler from parent (selected value)
const MobileSortSheet = ({ open, onClose, onSelect }) => {
  return (
    <div
      className={`fixed inset-0 z-40 ${open ? "flex" : "hidden"} items-end md:hidden`}
    >
      <button
        className="absolute inset-0 bg-black/40"
        type="button"
        onClick={onClose}
        aria-label="Close sort"
      />
      <div className="relative w-full rounded-t-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Sort</h2>
          <button
            className="text-xs font-semibold uppercase tracking-wide text-gray-500"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        <div className="mt-6 grid gap-3">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              className="btn-secondary btn-filter btn-primary-md rounded-2xl w-full justify-start text-left"
              type="button"
              onClick={() => {
                onSelect?.(option.value);
                onClose();
              }}
            >
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileSortSheet;

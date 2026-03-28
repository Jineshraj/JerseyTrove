import { ArrowDownUpIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const SORT_OPTIONS = [
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

// Desktop sort menu with outside-click close
// Props:
// - value: current sort value (from parent)
// - onSelect: handler from parent (selected value)
const SortMenu = ({ value, onSelect }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="relative overflow-hidden group flex items-center gap-2 rounded-full border border-black bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-700 shadow-sm transition hover:border-gray-300 hover:text-gray-900"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        {/* The hidden black background that slides in from the left */}
        <span className="absolute inset-0 w-full h-full bg-black -translate-x-full transition-transform duration-500 ease-out group-active:translate-x-0 group-hover:translate-x-0"></span>

        {/* The text and icon sitting on top */}
        <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-active:text-white group-hover:text-white">
          Sort
          <ArrowDownUpIcon size={14} />
        </span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg z-20">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              className={`w-full rounded-xl px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide transition hover:bg-gray-50 hover:text-gray-900 ${
                value === option.value ? "text-gray-900" : "text-gray-600"
              }`}
              type="button"
              onClick={() => {
                onSelect?.(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortMenu;

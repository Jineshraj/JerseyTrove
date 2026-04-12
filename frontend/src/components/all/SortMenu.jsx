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
        className="btn-secondary btn-filter btn-primary-sm rounded-full flex items-center gap-2"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>Sort</span>
        <ArrowDownUpIcon size={14} />
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

import React from "react";
import FiltersContent from "./FiltersContent";

// Desktop sidebar container for filters
// Props:
// - onClear: handler from parent
// - onChange: optional handler for checkbox changes
const FilterSidebar = ({ onClear, onChange }) => {
  return (
    <aside className="hidden rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 md:sticky md:top-24 md:block md:rounded-none md:border-none md:bg-transparent md:p-0 md:h-fit md:shadow-none md:pr-8 md:border-r md:border-gray-200">
      <div className="flex flex-col justify-between gap-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            className="relative overflow-hidden group rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-600 transition hover:border-gray-300 hover:text-gray-900"
            type="button"
            onClick={onClear}
          >
            {/* The hidden black background that slides in from the left */}
            <span className="absolute inset-0 w-full h-full bg-black -translate-x-full transition-transform duration-500 ease-out group-active:translate-x-0 group-hover:translate-x-0"></span>

            {/* The text and icon sitting on top */}
            <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-active:text-white group-hover:text-white">
              Clear
            </span>
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Narrow down by fit, collar, or quality.
        </p>
      </div>

      <FiltersContent onChange={onChange} />
    </aside>
  );
};

export default FilterSidebar;

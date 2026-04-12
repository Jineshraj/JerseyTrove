import React from "react";
import FiltersContent from "./FiltersContent";

// Desktop sidebar container for filters
// Props:
// - onClear: handler from parent
// - onChange: optional handler for checkbox changes
const FilterSidebar = ({ onClear, onChange, filters }) => {
  return (
    <aside className="hidden rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 md:sticky md:top-24 md:block md:rounded-none md:border-none md:bg-transparent md:p-0 md:h-fit md:shadow-none md:pr-8 md:border-r md:border-gray-200">
      <div className="flex flex-col justify-between gap-4">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            className="btn-secondary btn-filter btn-primary-sm rounded-full"
            type="button"
            onClick={onClear}
          >
            <span>Clear</span>
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Narrow down by fit, collar, or quality.
        </p>
      </div>

      <FiltersContent filters={filters} onChange={onChange} />
    </aside>
  );
};

export default FilterSidebar;

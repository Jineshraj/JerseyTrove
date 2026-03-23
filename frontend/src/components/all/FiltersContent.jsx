import React from "react";

// FiltersContent
// Reusable checkbox groups. No logic yet, just UI.
// Optional onChange lets the parent wire filter state later.
const FiltersContent = ({ onChange }) => {
  return (
    <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-1">
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Fit Type
        </legend>
        <div className="flex flex-col gap-3">
          {"Normal,Oversize,Full Sleeve".split(",").map((fit) => (
            <label
              key={fit}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-gray-600"
            >
              <input
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-gray-200"
                type="checkbox"
                name="fitType"
                value={fit}
                onChange={() => onChange?.("fitType", fit)}
              />
              {fit}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Collar Type
        </legend>
        <div className="flex flex-col gap-3">
          {"Collar,Round Neck".split(",").map((collar) => (
            <label
              key={collar}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-gray-600"
            >
              <input
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-gray-200"
                type="checkbox"
                name="collarType"
                value={collar}
                onChange={() => onChange?.("collarType", collar)}
              />
              {collar}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Quality
        </legend>
        <div className="flex flex-col gap-3">
          {"Embroidery,Sublimation".split(",").map((quality) => (
            <label
              key={quality}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-gray-600"
            >
              <input
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-gray-200"
                type="checkbox"
                name="quality"
                value={quality}
                onChange={() => onChange?.("quality", quality)}
              />
              {quality}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default FiltersContent;

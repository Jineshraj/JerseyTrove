// Props:
// - isOpen: state from parent
// - onClose/onSave: handlers from parent
// - formData: state object from parent
// - handleChange/handleCheckBoxChange: handlers from parent

// - nameInputRef: ref from parent for auto-focus
const JerseyFormModal = ({
  isOpen,
  onClose,
  onSave,
  formData,
  handleChange,
  handleCheckBoxChange,
  nameInputRef,
  setPrimaryImage,
  setExtraImage,
  isSaving,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "flex" : "hidden"} items-center justify-center bg-slate-900/40 px-3 py-6 sm:px-4 sm:py-10`}
    >
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_35px_80px_-45px_rgba(15,23,42,0.65)] sm:p-8">
        {/* Modal header */}
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
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {/* Form fields (controlled by formData) */}
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
              {["Standard", "XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                <label
                  key={size}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm"
                >
                  <input
                    className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-200"
                    checked={
                      size === "Standard"
                        ? ["S", "M", "L", "XL"].every((s) =>
                            formData.sizes.includes(s),
                          )
                        : formData.sizes.includes(size)
                    }
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
              required
            >
              <option value="" disabled>
                Select quality
              </option>
              <option value="Embroidery">Embroidery</option>
              <option value="Sublimation">Sublimation</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-3">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Collar Type
            </label>
            <div className="flex flex-wrap gap-3">
              {["Collar", "Round Neck"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm"
                >
                  <input
                    className="h-4 w-4 border-slate-300 text-emerald-500 focus:ring-emerald-200"
                    type="radio"
                    name="collarType"
                    value={type}
                    checked={formData.collarType === type}
                    onChange={handleChange}
                    required
                  />
                  {type}
                </label>
              ))}
            </div>
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
              required
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
              {["Retro", "Club", "National Team", "Current"].map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm"
                >
                  <input
                    className="h-4 w-4 rounded border-slate-300 text-emerald-500 focus:ring-emerald-200"
                    type="checkbox"
                    name="categories"
                    checked={formData.categories.includes(category)}
                    onChange={() =>
                      handleCheckBoxChange("categories", category)
                    }
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <div className="flex">
              <div className="flex-1">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 inline">
                  Thumbnail URL
                </label>
                <input
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-emerald-100"
                  placeholder="https://image.host/jersey.jpg"
                  type="text"
                  name="images"
                  value={formData.images?.[0] || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Upload
                  <input
                    className="w-full font-light rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-emerald-100"
                    placeholder="Click to upload"
                    type="file"
                    accept="image/*"
                    name="images"
                    onChange={(e) => setPrimaryImage(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Image Upload (Other)
              </label>
              <input
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-emerald-100"
                placeholder="https://image.host/jersey.jpg"
                type="file"
                accept="image/*"
                multiple
                name="images"
                onChange={(e) => setExtraImage([...e.target.files])}
              />
            </div>
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
              className={`rounded-full px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition ${
                isSaving
                  ? "cursor-not-allowed bg-emerald-300"
                  : "bg-emerald-500 hover:-translate-y-0.5 hover:bg-emerald-600"
              }`}
              type="button"
              onClick={onSave}
              disabled={isSaving}
            >
              <span className="inline-flex items-center gap-2">
                {isSaving && (
                  <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                )}
                {isSaving ? "Saving..." : "Save Jersey"}
              </span>
            </button>
            <button
              className="rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
              type="button"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JerseyFormModal;

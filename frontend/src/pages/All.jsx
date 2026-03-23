import { useEffect, useState } from "react";
import ProductCard from "../features/product/ProductCard";

const All = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    fitType: [],
    collarType: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const payload = await response.json();
        const items = payload.data || payload.products || payload;
        setProducts(Array.isArray(items) ? items : []);
      } catch (error) {
        console.error("Error fetching jerseys:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-20 sm:px-5 sm:pb-24 lg:px-6">
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-4xl font-black text-gray-900">The Collection</h1>
          <p className="mt-3 text-base text-gray-500">
            Premium authentic kits, sourced globally, delivered to your
            doorstep.
          </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[260px_1fr] md:gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 md:sticky md:top-24 md:rounded-none md:border-none md:bg-transparent md:p-0 md:h-fit md:shadow-none md:pr-8 md:border-r md:border-gray-200">
            <div className="flex flex-col justify-between gap-4">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <button
                  className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-600 transition hover:border-gray-300 hover:text-gray-900"
                  type="button"
                >
                  Clear
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Narrow down by fit, collar, or quality.
              </p>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-1">
              <fieldset className="space-y-3">
                <legend className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
                  Fit Type
                </legend>
                <div className="flex flex-col gap-3">
                  {["Normal", "Oversize", "Full Sleeve"].map((fit) => (
                    <label
                      key={fit}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-gray-600"
                    >
                      <input
                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-gray-200"
                        type="checkbox"
                        name="fitType"
                        value={fit}
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
                  {["Collar", "Round Neck"].map((collar) => (
                    <label
                      key={collar}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-gray-600"
                    >
                      <input
                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-gray-200"
                        type="checkbox"
                        name="collarType"
                        value={collar}
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
                  {["Embroidery", "Sublimation"].map((quality) => (
                    <label
                      key={quality}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm font-semibold text-gray-600"
                    >
                      <input
                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-gray-200"
                        type="checkbox"
                        name="quality"
                        value={quality}
                      />
                      {quality}
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </aside>

          <section>
            <div className="mb-6 flex items-center justify-between md:hidden">
              <button
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-700 shadow-sm"
                type="button"
              >
                Filters
              </button>
              <button
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-700 shadow-sm"
                type="button"
              >
                Sort
              </button>
            </div>

            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-gray-500">No jerseys found in the vault.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:gap-x-8">
                {products.map((jersey) => (
                  <ProductCard
                    key={jersey._id || jersey.id}
                    product={{
                      id: jersey._id || jersey.id,
                      name: jersey.name,
                      price: jersey.price,
                      image: jersey.imageUrl || jersey.image,
                      hoverImage: jersey.hoverImage,
                      collarType: jersey.collarType,
                      quality: jersey.quality,
                    }}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default All;

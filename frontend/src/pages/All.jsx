import { useEffect, useState } from "react";
import ProductCard from "../features/product/ProductCard";
import FilterSidebar from "../components/all/FilterSidebar";
import MobileFilterSheet from "../components/all/MobileFilterSheet";
import MobileSortSheet from "../components/all/MobileSortSheet";
import SortMenu from "../components/all/SortMenu";

const All = () => {
  // Data state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state (mobile sheets)
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Sort choice (used later when we wire logic)
  const [sortBy, setSortBy] = useState("");

  // Filter choices (used later when we wire logic)
  const [filters, setFilters] = useState({
    fitType: [],
    collarType: [],
    quality: [],
  });

  // Fetch products once on load
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

  // Lock background scroll when any mobile sheet is open
  useEffect(() => {
    if (isFilterOpen || isSortOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
    return undefined;
  }, [isFilterOpen, isSortOpen]);

  // Reusable filter toggle handler (works for all filter groups)
  const handleFilterChange = (group, value) => {
    setFilters((prev) => ({
      ...prev,
      [group]: prev[group].includes(value)
        ? prev[group].filter((item) => item !== value)
        : [...prev[group], value],
    }));
  };

  // Clear filters (UI only for now)
  const handleClearFilters = () => {
    setFilters({ fitType: [], collarType: [], quality: [] });
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-20 sm:px-5 sm:pb-24 lg:px-6">
        {/* Page header */}
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-5xl font-black text-gray-900">The Collection</h1>
          <p className="mt-3 text-base text-gray-500">
            Premium authentic kits, sourced globally, delivered to your
            doorstep.
          </p>
        </div>

        {/* Sidebar + product list */}
        <div className="mt-8 grid gap-8 md:grid-cols-[260px_1fr] md:gap-10 lg:grid-cols-[280px_1fr]">
          {/* Desktop filters (sidebar) */}
          <FilterSidebar
            onClear={handleClearFilters}
            onChange={handleFilterChange}
          />

          <section className="md:border-l md:border-double md:border-gray-300 md:pl-8">
            {/* Mobile top controls */}
            <div className="mb-6 flex items-center justify-between md:hidden">
              <button
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-700 shadow-sm"
                type="button"
                onClick={() => setIsFilterOpen(true)}
              >
                Filters
              </button>
              <button
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-gray-700 shadow-sm"
                type="button"
                onClick={() => setIsSortOpen(true)}
              >
                Sort
              </button>
            </div>

            {/* Desktop sort (dropdown menu) */}
            <div className="mb-6 hidden items-center justify-end md:flex">
              <SortMenu value={sortBy} onSelect={setSortBy} />
            </div>

            {/* Content states */}
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

      {/* Mobile filter sheet */}
      <MobileFilterSheet
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onClear={handleClearFilters}
        onChange={handleFilterChange}
      />

      {/* Mobile sort sheet */}
      <MobileSortSheet
        open={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        onSelect={setSortBy}
      />
    </div>
  );
};

export default All;

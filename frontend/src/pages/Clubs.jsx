import { useEffect, useState } from "react";
import ProductCard from "../features/product/ProductCard";
import FilterSidebar from "../components/all/FilterSidebar";
import MobileFilterSheet from "../components/all/MobileFilterSheet";
import MobileSortSheet from "../components/all/MobileSortSheet";
import SortMenu from "../components/all/SortMenu";
import useProductFilters from "../hooks/useProductFilters";

const Clubs = () => {
  // Data state
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // UI state (mobile sheets)
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Shared filter/sort logic (reusable hook)
  const {
    filters,
    sortBy,
    setSortBy,
    toggleFilter,
    clearFilters,
    applyFilters,
    setCategory,
  } = useProductFilters();

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

  // Category filter for this page
  useEffect(() => {
    setCategory("Club");
  }, [setCategory]);

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

  // Apply filters + sorting for display
  const visibleProducts = applyFilters(products);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-20 sm:px-5 sm:pb-24 lg:px-6">
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-5xl font-black text-gray-900">Clubs</h1>
          <p className="mt-3 text-base text-gray-500">
            Club colors, matchday to everyday.
          </p>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[260px_1fr] md:gap-10 lg:grid-cols-[280px_1fr]">
          <FilterSidebar
            onClear={clearFilters}
            onChange={toggleFilter}
            filters={filters}
          />

          <section className="md:border-l md:border-double md:border-gray-300 md:pl-8">
            <div className="sticky top-16 z-20 -mx-4 mb-6 flex items-center justify-between border-b border-gray-200 bg-white/75 px-4 py-3 backdrop-blur md:hidden">
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

            <div className="mb-6 hidden items-center justify-end md:flex">
              <SortMenu value={sortBy} onSelect={setSortBy} />
            </div>

            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
              </div>
            ) : visibleProducts.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-gray-500">No jerseys found in the vault.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:gap-x-8">
                {visibleProducts.map((jersey) => (
                  <ProductCard
                    key={jersey._id || jersey.id}
                    product={{
                      id: jersey._id || jersey.id,
                      name: jersey.name,
                      price: jersey.price,
                      image: jersey.images?.[0] || jersey.imageUrl || jersey.image,
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

      <MobileFilterSheet
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onClear={clearFilters}
        onChange={toggleFilter}
        filters={filters}
      />

      <MobileSortSheet
        open={isSortOpen}
        onClose={() => setIsSortOpen(false)}
        onSelect={setSortBy}
      />
    </div>
  );
};

export default Clubs;

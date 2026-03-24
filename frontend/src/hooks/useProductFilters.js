import { useMemo, useState } from "react";

// Shared filter + sort logic for product lists
const useProductFilters = () => {
  // User selections
  const [filters, setFilters] = useState({
    fitType: [],
    collarType: [],
    quality: [],
  });

  // Optional category filter (Retro, Club, National Team, Current, etc.)
  const [category, setCategory] = useState("");

  const [sortBy, setSortBy] = useState("");

  // Toggle a single filter value in a group
  const toggleFilter = (group, value) => {
    setFilters((prev) => ({
      ...prev,
      [group]: prev[group].includes(value)
        ? prev[group].filter((item) => item !== value)
        : [...prev[group], value],
    }));
  };

  // Reset all filter selections
  const clearFilters = () => {
    setFilters({ fitType: [], collarType: [], quality: [] });
    setCategory("");
  };

  // Apply filters + sort to any product list
  const applyFilters = (products) => {
    let result = [...products];

    if (category) {
      result = result.filter((item) =>
        Array.isArray(item.categories)
          ? item.categories.includes(category)
          : item.category === category,
      );
    }

    if (filters.fitType.length > 0) {
      result = result.filter((item) => filters.fitType.includes(item.fitType));
    }

    if (filters.collarType.length > 0) {
      result = result.filter((item) =>
        filters.collarType.includes(item.collarType),
      );
    }

    if (filters.quality.length > 0) {
      result = result.filter((item) => filters.quality.includes(item.quality));
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return result;
  };

  // For memoized lists if needed by caller
  const useFilteredProducts = (products) =>
    useMemo(() => applyFilters(products), [products, filters, sortBy]);

  return {
    filters,
    category,
    setCategory,
    sortBy,
    setSortBy,
    toggleFilter,
    clearFilters,
    applyFilters,
    useFilteredProducts,
  };
};

export default useProductFilters;

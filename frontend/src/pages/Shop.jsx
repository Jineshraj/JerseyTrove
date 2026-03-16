import React, { useState, useEffect } from "react";
import ProductCard from "../features/product/ProductCard";
import { formatPrice } from "../utils/formatPrice"; // Using the helper we discussed

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching from your local database
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching jerseys:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Page Header */}
        <div className="border-b border-gray-200 pb-10">
          <h1 className="text-4xl font-black tracking-tight text-gray-900 uppercase italic">
            The Collection
          </h1>
          <p className="mt-4 text-base text-gray-500">
            Premium authentic kits, sourced globally, delivered to your
            doorstep.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
          </div>
        ) : (
          /* The Responsive Grid */
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((jersey) => (
              <ProductCard key={jersey.id} product={jersey} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-500">No jerseys found in the vault.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;

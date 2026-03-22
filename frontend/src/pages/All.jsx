import { useEffect, useState } from "react";
import ProductCard from "../features/product/ProductCard";

const All = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-24 lg:px-8">
        <div className="border-b border-gray-200 pb-8">
          <h1 className="text-4xl font-black text-gray-900">The Collection</h1>
          <p className="mt-3 text-base text-gray-500">
            Premium authentic kits, sourced globally, delivered to your
            doorstep.
          </p>
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
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
      </div>
    </div>
  );
};

export default All;

import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice.js";

const ProductCard = ({
  product,
  theme = "light",
  imageHeightClassName = "h-[220px] sm:h-[350px] lg:h-[450px]",
}) => {
  const isDark = theme === "dark";

  return (
    // We use React Router's Link to wrap the whole card, pointing to the specific jersey ID
    <Link
      to={`/product/${product.id}`}
      className="group block overflow-hidden rounded-2xl"
    >
      {/* Image Container - Swapped to arbitrary values [350px] to ensure Tailwind catches it */}
      <div className={`relative ${imageHeightClassName}`}>
        {/* Main Image (Visible by default) */}
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-300 group-hover:opacity-0"
          loading="lazy"
          decoding="async"
        />

        {/* Hover Image (Fades in on hover) */}
        {/* Note: I added a fallback here just in case a product in db.json doesn't have a hoverImage yet! */}
        <img
          src={product.hoverImage || product.image}
          alt={`${product.name} alternate view`}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Product Info Container */}
      <div className={`relative pt-3 ${isDark ? "bg-transparent" : "bg-white"}`}>
        <h3
          className={`text-base font-bold group-hover:underline group-hover:underline-offset-4 ${
            isDark ? "text-white" : "text-gray-700"
          }`}
        >
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          {product.collarType && (
            <p
              className={`mt-1 text-xs font-medium tracking-wide ${
                isDark ? "text-white/70" : "text-gray-500"
              }`}
            >
              {product.collarType}
            </p>
          )}
          {product.quality && (
            <p
              className={`mt-1 text-xs font-medium tracking-wide ${
                isDark ? "text-white/70" : "text-gray-500"
              }`}
            >
              {product.quality}
            </p>
          )}
        </div>

        <p
          className={`mt-1.5 font-bold tracking-wide ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;

import React from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

const ProductCard = ({ product }) => {
  return (
    // We use React Router's Link to wrap the whole card, pointing to the specific jersey ID
    <Link to={`/product/${product.id}`} className="group block overflow-hidden">
      {/* Image Container - Swapped to arbitrary values [350px] to ensure Tailwind catches it */}
      <div className="relative h-[350px] sm:h-[450px]">
        {/* Main Image (Visible by default) */}
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-300 group-hover:opacity-0"
        />

        {/* Hover Image (Fades in on hover) */}
        {/* Note: I added a fallback here just in case a product in db.json doesn't have a hoverImage yet! */}
        <img
          src={product.hoverImage || product.image}
          alt={`${product.name} alternate view`}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      </div>

      {/* Product Info Container */}
      <div className="relative bg-white pt-3">
        <h3 className="text-sm font-semibold text-gray-700 group-hover:underline group-hover:underline-offset-4">
          {product.name}
        </h3>

        <p className="mt-1.5 font-bold tracking-wide text-gray-900">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;

import { ArrowLeftCircle, LucideShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const payload = await response.json();
        const data = payload.data || payload.product || payload;
        setProduct(data);
        const firstImage =
          data?.images?.[0] || data?.imageUrl || data?.image || "";
        setSelectedImage(firstImage);
      } catch (err) {
        console.error(err);
        setError("Could not load this jersey.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const { addToCart } = useCart();

  const handleCart = (product) => {
    addToCart(product);
    toast.success("Item Added to Cart");
  };

  return (
    <div className="bg-white">
      <div className="relative mx-auto max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <button
          className="flex gap-2 items-center absolute cursor-pointer bg-amber-50/50 rounded-2xl text-gray-500 font-bold text-sm uppercase hover:underline hover:underline-offset-4 hover:text-black transition"
          onClick={() => {
            if (window.history.length > 1) {
              navigate(-1);
            } else {
              navigate("/");
            }
          }}
        >
          <ArrowLeftCircle size={16} />
          <span>Back</span>
        </button>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
          </div>
        ) : error ? (
          <div className="py-20 text-center">
            <p className="text-slate-500">{error}</p>
          </div>
        ) : (
          product && (
            <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl bg-slate-100">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {product.images?.length > 1 && (
                  <div className="grid grid-cols-5 gap-3">
                    {product.images.map((img) => (
                      <button
                        key={img}
                        type="button"
                        onClick={() => setSelectedImage(img)}
                        className={`aspect-square overflow-hidden rounded-2xl border ${
                          selectedImage === img
                            ? "border-slate-900"
                            : "border-slate-200"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} thumbnail`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-3xl font-semibold text-slate-900">
                    {product.name}
                  </h1>
                  <p className="text-base text-slate-500">{product.team}</p>
                </div>

                <div className="text-2xl font-bold text-slate-900">
                  ₹ {product.price}
                </div>

                <div className="grid gap-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Quality</span>
                    <span>{product.quality}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Fit</span>
                    <span>{product.fitType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Collar</span>
                    <span>{product.collarType}</span>
                  </div>
                </div>

                {product.sizes?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Sizes Available
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <span
                          key={size}
                          className=" border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col flex-wrap gap-3">
                  <button
                    type="button"
                    className="btn-primary btn-primary-md w-full flex justify-center items-center gap-2.5"
                    onClick={() => handleCart(product)}
                  >
                    <LucideShoppingCart size={20} /> <span>Add to Cart</span>
                  </button>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="btn-secondary btn-primary-md w-full"
                    >
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
                {product.description && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-light text-slate-600">
                    {product.description}
                  </div>
                )}
                {product.categories?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.categories.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

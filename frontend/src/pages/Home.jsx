// src/pages/Home.jsx
import { ShoppingBag, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  // Dummy data for our Grid layout
  const featuredJerseys = [
    {
      id: 1,
      team: "FC Barcelona",
      edition: "23/24 Home Kit",
      price: "₹2,499",
      badge: "Best Seller",
      image:
        "https://images.unsplash.com/photo-1614632537190-23e4146777db?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      team: "Arsenal",
      edition: "03/04 Invincibles Retro",
      price: "₹2,999",
      badge: "Classic",
      image:
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      team: "Manchester City",
      edition: "23/24 Away Kit",
      price: "₹2,499",
      badge: "New",
      image:
        "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      team: "Argentina",
      edition: "2022 World Cup Winners",
      price: "₹3,199",
      badge: "Sold Out",
      image:
        "https://images.unsplash.com/photo-1518605368461-1ee7c5147814?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* 1. HERO SECTION (E-commerce Style) */}
      <section className="relative w-full h-[70vh] min-h-[500px] bg-gray-100 flex items-center overflow-hidden">
        {/* Background Image Layer */}
        <div className="absolute inset-0">
          <img
            src="https://www.istockphoto.com/photo/soccer-jerseys-gm182790712-13199178?utm_source=unsplash&utm_medium=affiliate&utm_campaign=srp_photos_bottom&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Ffootball-jersey&utm_term=football+jersey%3A%3Aaffiliate-signature-content%3Aexperiment%3A66a371d3-086c-49e3-ac95-480e1f9103b2"
            alt="Football Stadium"
            className="w-full h-full object-cover opacity-80"
          />
          {/* A gradient overlay so the text remains readable over the image */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
        </div>

        {/* Content Layer (Flexbox pushing content to the left) */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            <span className="flex items-center gap-2 px-3 py-1 mb-6 text-xs font-black tracking-widest text-white bg-blue-600 w-fit rounded-sm uppercase">
              <TrendingUp size={14} /> New Season Drop
            </span>

            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase leading-[0.9]">
              Wear Your <br /> <span className="text-blue-500">Colors.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-10 font-medium">
              Premium authentic and retro kits from the biggest clubs and
              national teams around the globe.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/all"
                className="relative overflow-hidden group flex items-center justify-center py-4 px-8 border-2 border-black bg-white text-sm font-black uppercase tracking-widest text-black"
              >
                {/* The hidden black background that slides in from the left */}
                <span className="absolute inset-0 w-full h-full bg-black -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0"></span>

                {/* The text and icon sitting on top */}
                <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-white">
                  <ShoppingBag
                    size={20}
                    // Gives the bag a tiny little "lift" when hovered!
                  />
                  Shop Now
                </span>
              </Link>
              <Link
                to="/retro"
                className="flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 rounded-none font-black uppercase tracking-wider backdrop-blur-sm transition-all"
              >
                Retro Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRENDING PRODUCTS GRID */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex justify-between items-end mb-12 border-b-2 border-gray-100 pb-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight uppercase">
                Trending Kits
              </h2>
            </div>
            <Link
              to="/latest"
              className="hidden md:flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition-colors uppercase text-sm tracking-widest"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {/* CSS GRID: E-commerce Product Wall */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {featuredJerseys.map((jersey) => (
              <div
                key={jersey.id}
                className="group flex flex-col cursor-pointer"
              >
                {/* Product Image Container */}
                <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden mb-4">
                  <img
                    src={jersey.image}
                    alt={jersey.team}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Dynamic Badge (Absolute positioning) */}
                  <div
                    className={`absolute top-3 left-3 px-3 py-1 text-xs font-black uppercase tracking-wider ${
                      jersey.badge === "Sold Out"
                        ? "bg-red-500 text-white"
                        : "bg-black text-white"
                    }`}
                  >
                    {jersey.badge}
                  </div>

                  {/* Quick Add overlay button (appears on hover) */}
                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest py-3 text-sm">
                      Quick Add
                    </button>
                  </div>
                </div>

                {/* Product Details */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">
                      {jersey.team}
                    </h3>
                    <span className="text-md font-bold text-gray-900">
                      {jersey.price}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-500">
                    {jersey.edition}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

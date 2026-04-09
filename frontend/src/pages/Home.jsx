import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "../features/product/ProductCard";
import BannerVideo from "../assets/jerseytrove_banner.mp4";
import collarJersey from "../assets/collarJersey.jpeg";
import fullSleeve from "../assets/fullSleeve.jpeg";
import oversizeJersey from "../assets/oversizeJersey.jpeg";
import normalJersey from "../assets/normalJersey.jpeg";

const Home = () => {
  const [retroJerseys, setRetroJerseys] = useState([]);
  const [isRetroLoading, setIsRetroLoading] = useState(true);

  useEffect(() => {
    const fetchRetroProducts = async () => {
      try {
        setIsRetroLoading(true);
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const payload = await response.json();
        const items = payload.data || payload.products || payload;
        const products = Array.isArray(items) ? items : [];

        const retroItems = products.filter((product) => {
          const category = String(product.category || "").toLowerCase();
          const collection = String(product.collection || "").toLowerCase();
          const type = String(product.type || "").toLowerCase();
          const name = String(product.name || "").toLowerCase();

          return (
            category.includes("retro") ||
            collection.includes("retro") ||
            type.includes("retro") ||
            name.includes("retro")
          );
        });

        setRetroJerseys(retroItems.slice(0, 10));
      } catch (error) {
        console.error("Error fetching retro jerseys:", error);
        setRetroJerseys([]);
      } finally {
        setIsRetroLoading(false);
      }
    };

    fetchRetroProducts();
  }, []);

  return (
    <div className="w-full bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover opacity-40"
            autoPlay
            muted
            playsInline
            loop
          >
            <source src={BannerVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
        </div>

        <div className="relative mx-auto flex max-w-[1200px] flex-col gap-12 px-4 pb-20 pt-24 sm:px-6 lg:flex-row lg:items-end lg:px-8">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">
              JerseyTrove Studio
            </p>
            <h1 className="mt-4 text-4xl font-black leading-[0.9] sm:text-6xl lg:text-7xl">
              THE ART <br /> OF THE KIT.
            </h1>
            <p className="mt-6 text-base text-white/70">
              Crafted kits, curated drops, and heritage pieces that feel as good
              as they look.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/all"
                className="rounded-full border border-white/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-white hover:text-black"
              >
                Shop All
              </Link>
              <Link
                to="/retro"
                className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-white/80"
              >
                Retro
              </Link>
            </div>
          </div>

          <div className="relative w-full max-w-sm self-end rounded-3xl border border-white/15 bg-white/5 p-4 backdrop-blur">
            <img
              src="https://images.unsplash.com/photo-1518605368461-1ee7c5147814?auto=format&fit=crop&w=900&q=80"
              alt="Featured kit"
              className="h-80 w-full rounded-2xl object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/70">
              <span>Featured</span>
              <span>Rs 2,799</span>
            </div>
          </div>
        </div>
      </section>

      {/* FIT & DETAILS GRID */}
      <section className="bg-white mt-12">
        <div className="mx-auto max-w-[1200px] px-4 pb-12 sm:px-6 lg:px-8">
          <p className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            Shop By Category
          </p>

          <div className="mt-6 grid gap-6 lg:h-[600px] lg:grid-cols-[1.05fr_0.95fr]">
            {/* LEFT COLUMN */}
            <div className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-3xl bg-slate-100 shadow-sm lg:aspect-auto lg:h-full lg:min-h-0">
              <img
                src={oversizeJersey}
                alt="Oversized fit"
                // Added 'absolute inset-0' here!
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 shadow-sm backdrop-blur transition-transform duration-500 group-hover:-translate-y-1">
                Oversized
              </div>
            </div>

            {/* RIGHT COLUMN */}
            {/* Added lg:min-h-0 here to force the flex column to respect the 600px height */}
            <div className="flex flex-col gap-6 lg:h-full lg:min-h-0">
              {/* TOP RIGHT */}
              {/* Added lg:min-h-0 here so the top half shrinks perfectly */}
              <div className="group relative aspect-[4/3] flex-1 cursor-pointer overflow-hidden rounded-3xl bg-slate-100 shadow-sm lg:aspect-auto lg:min-h-0">
                <img
                  src={collarJersey}
                  alt="Collar detail"
                  // Added 'absolute inset-0' here!
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 shadow-sm backdrop-blur transition-transform duration-500 group-hover:-translate-y-1">
                  Collar
                </div>
              </div>

              {/* BOTTOM RIGHT SPLIT */}
              {/* Added lg:min-h-0 here so the bottom half shrinks perfectly */}
              <div className="grid flex-1 gap-6 sm:grid-cols-2 lg:min-h-0">
                <div className="group relative aspect-square cursor-pointer overflow-hidden rounded-3xl bg-slate-100 shadow-sm lg:aspect-auto lg:h-full lg:min-h-0">
                  <img
                    src={normalJersey}
                    alt="Normal fit"
                    // Added 'absolute inset-0' here!
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 shadow-sm backdrop-blur transition-transform duration-500 group-hover:-translate-y-1">
                    Normal
                  </div>
                </div>

                <div className="group relative aspect-square cursor-pointer overflow-hidden rounded-3xl bg-slate-100 shadow-sm lg:aspect-auto lg:h-full lg:min-h-0">
                  <img
                    src={fullSleeve}
                    alt="Full sleeve"
                    // Added 'absolute inset-0' here!
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 shadow-sm backdrop-blur transition-transform duration-500 group-hover:-translate-y-1">
                    Full Sleeve
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="bg-slate-100">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <p className="text-base uppercase tracking-[0.25em] text-slate-400">
              A Symphony of Heritage
            </p>
            <h1 className="mt-4 text-4xl font-bold text-slate-900 sm:text-6xl">
              Heritage and performance,
              <br /> tailored for matchdays and the street.
            </h1>
          </div>
          <div className="flex flex-col justify-center space-y-4 text-base text-slate-600">
            <p>
              We collect limited drops, retro reissues, and everyday icons so
              your wardrobe feels like a highlight reel.
            </p>
            <p>
              Built for comfort, finished with detail, and verified regularly so
              you can shop with confidence.
            </p>
            <Link
              to="/latest"
              className="inline-flex items-center gap-2 text-lg underline underline-offset-2 font-semibold uppercase tracking-[0.2em] text-slate-900"
            >
              See latest drops <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* RETRO SECTION */}
      <section className="bg-black py-16 text-white">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between border-b border-white/15 pb-4">
            <h2 className="text-2xl font-black uppercase tracking-[0.2em]">
              The Retro
            </h2>
            <Link
              to="/retro"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 transition hover:text-white"
            >
              Explore Retro
            </Link>
          </div>

          <div className="no-scrollbar mt-10 -mx-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {isRetroLoading ? (
              <div className="flex h-44 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
              </div>
            ) : retroJerseys.length === 0 ? (
              <div className="py-8 text-sm text-white/70">
                No retro jerseys available right now.
              </div>
            ) : (
              <div className="flex gap-5">
                {retroJerseys.map((jersey) => (
                  <div
                    key={jersey._id || jersey.id}
                    className="w-[76vw] min-w-[260px] max-w-[320px] shrink-0 sm:w-[320px]"
                  >
                    <ProductCard
                      theme="dark"
                      imageHeightClassName="h-[300px] sm:h-[350px] lg:h-[450px]"
                      product={{
                        id: jersey._id || jersey.id,
                        name: jersey.name,
                        price: jersey.price,
                        image:
                          jersey.images?.[0] ||
                          jersey.imageUrl ||
                          jersey.image,
                        hoverImage: jersey.images?.[1] || jersey.hoverImage,
                        collarType: jersey.collarType,
                        quality: jersey.quality,
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CLUB COLLECTIONS */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-semibold uppercase tracking-[0.2em] text-slate-900">
              Club Collections
            </h2>
            <Link
              to="/clubs"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:text-slate-900"
            >
              View Clubs
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {[
              "FC Barcelona",
              "AC Milan",
              "Real Madrid",
              "Manchester United",
              "Arsenal",
              "Liverpool",
            ].map((club) => (
              <div
                key={club}
                className="rounded-full border border-slate-200 px-4 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-500"
              >
                {club}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

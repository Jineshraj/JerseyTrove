import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import BannerVideo from "../assets/jerseytrove_banner.mp4";

const Home = () => {
  const featuredJerseys = [
    {
      id: 1,
      team: "FC Barcelona",
      edition: "23/24 Home Kit",
      price: "Rs 2,499",
      image:
        "https://images.unsplash.com/photo-1614632537190-23e4146777db?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      team: "Arsenal",
      edition: "03/04 Invincibles Retro",
      price: "Rs 2,999",
      image:
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      team: "Manchester City",
      edition: "23/24 Away Kit",
      price: "Rs 2,499",
      image:
        "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const retroJerseys = [
    {
      id: 1,
      name: "Barcelona 2010 Away",
      price: "Rs 2,199",
      image:
        "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      name: "Milan 2004 Classic",
      price: "Rs 2,399",
      image:
        "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      name: "United 1999",
      price: "Rs 2,299",
      image:
        "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80",
    },
  ];

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
              Crafted kits, curated drops, and heritage pieces that feel as
              good as they look.
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

      {/* STATEMENT */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              A Symphony of Heritage
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Heritage and performance, tailored for matchdays and the street.
            </h2>
          </div>
          <div className="space-y-4 text-sm text-slate-600">
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
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900"
            >
              See latest drops <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* FIT & DETAILS GRID */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-4 pb-12 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
            Categorical Geometry
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-slate-100 sm:aspect-[3/4] lg:aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80"
                alt="Oversized fit"
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700">
                Oversized
              </div>
            </div>

            <div className="grid gap-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-slate-100 sm:aspect-[16/9]">
                <img
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80"
                  alt="Collar detail"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700">
                  Collar
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80"
                    alt="Normal fit"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700">
                    Normal
                  </div>
                </div>
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=900&q=80"
                    alt="Full sleeve"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-700">
                    Full Sleeve
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED GRID */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-semibold uppercase tracking-[0.2em] text-slate-900">
              Featured Kits
            </h2>
            <Link
              to="/all"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:text-slate-900"
            >
              View All
            </Link>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredJerseys.map((jersey) => (
              <div key={jersey.id} className="group">
                <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-white shadow-sm">
                  <img
                    src={jersey.image}
                    alt={jersey.team}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                      {jersey.team}
                    </h3>
                    <p className="text-xs text-slate-500">{jersey.edition}</p>
                  </div>
                  <span className="text-xs font-semibold text-slate-900">
                    {jersey.price}
                  </span>
                </div>
              </div>
            ))}
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

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {retroJerseys.map((jersey) => (
              <div key={jersey.id} className="group">
                <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-white/10">
                  <img
                    src={jersey.image}
                    alt={jersey.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between text-white/80">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {jersey.name}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-white">
                    {jersey.price}
                  </span>
                </div>
              </div>
            ))}
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

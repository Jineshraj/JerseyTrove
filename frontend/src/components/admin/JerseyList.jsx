import { CheckCircle, LayoutGrid, List, Pencil, Trash2 } from "lucide-react";

// Props:
// - isLoading, jerseys, isListView: state from parent
// - onToggleView/onEdit/onDelete/onVerify: handlers from parent
// - daysAgo: helper function from parent
const JerseyList = ({
  isLoading,
  jerseys,
  isListView,
  onToggleView,
  onEdit,
  onDelete,
  onVerify,
  daysAgo,
}) => {
  return (
    <section className="grid gap-8">
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.5)] backdrop-blur sm:p-8">
        {/* Section header + mobile view toggle */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-semibold">All Jerseys</h2>
            <button
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:hidden"
              type="button"
              onClick={onToggleView}
            >
              {isListView ? (
                <>
                  <LayoutGrid className="h-4 w-4" />
                  Grid
                </>
              ) : (
                <>
                  <List className="h-4 w-4" />
                  List
                </>
              )}
            </button>
          </div>
          <p className="text-sm text-slate-500">
            Sorted by last verified date (oldest to newest).
          </p>
        </div>

        {/* Cards list (grid or list view based on isListView) */}
        <ul
          className={
            isListView
              ? "grid grid-cols-1 gap-4"
              : "grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          }
        >
          {isLoading ? (
            <li>Loading ....</li>
          ) : (
            jerseys.map((jersey) => (
              <li
                key={jersey._id}
                className={
                  isListView
                    ? "group flex overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                    : "group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                }
              >
                <div
                  className={
                    isListView
                      ? "relative aspect-square w-28 shrink-0 overflow-hidden bg-slate-100 sm:w-40"
                      : "relative aspect-[4/5] w-full overflow-hidden bg-slate-100"
                  }
                >
                  <img
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    src={jersey.images?.[0] || jersey.imageUrl}
                    alt={jersey.name}
                  />
                  {!isListView && (
                    <button
                      className="absolute right-2 top-2 rounded-full border border-rose-200 bg-white/90 p-1.5 text-rose-600 shadow-sm transition hover:border-rose-300 hover:bg-rose-50"
                      aria-label="Delete jersey"
                      type="button"
                      onClick={() => onDelete(jersey)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div
                  className={
                    isListView
                      ? "flex min-w-0 flex-1 flex-col gap-2 p-3 sm:p-4"
                      : "flex flex-1 flex-col gap-2 p-3 sm:p-4"
                  }
                >
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="line-clamp-2 text-sm font-semibold leading-tight text-slate-800 sm:text-base">
                      {jersey.name}
                    </h2>
                    <span className="whitespace-nowrap text-sm font-bold text-slate-900 sm:text-base">
                      {"₹"} {jersey.price}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 sm:text-xs">
                    <span className="truncate">{jersey.team}</span>
                    <span className="truncate">{jersey.quality}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 sm:text-xs">
                    <span className="truncate">{jersey.fitType}</span>
                    <span className="truncate">{jersey.collarType}</span>
                  </div>

                  <div className="flex min-w-0 items-center justify-between gap-2 text-[11px] text-slate-600 sm:text-xs">
                    <span className="min-w-0 truncate font-medium">
                      Verified {daysAgo(jersey.lastVerifiedDate)}
                    </span>
                    <button
                      className="whitespace-nowrap rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100 sm:text-xs"
                      type="button"
                      onClick={() => onVerify(jersey)}
                    >
                      <span className="flex items-center gap-1.5">
                        <CheckCircle className="h-3.5 w-3.5" />
                        Verify
                      </span>
                    </button>
                  </div>

                  {isListView ? (
                    <div className="mt-1 flex items-center gap-2">
                      <button
                        className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition hover:bg-slate-800 sm:text-xs"
                        type="button"
                        onClick={() => onEdit(jersey)}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </span>
                      </button>
                      <button
                        className="flex-1 rounded-xl border border-rose-300 bg-rose-50 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-rose-700 shadow-sm transition hover:border-rose-400 hover:bg-rose-100 sm:text-xs"
                        type="button"
                        onClick={() => onDelete(jersey)}
                      >
                        <span className="flex items-center justify-center">
                          <Trash2 className="h-4 w-4" />
                        </span>
                      </button>
                    </div>
                  ) : (
                    <button
                      className="mt-auto w-full rounded-xl bg-slate-900 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-sm transition hover:bg-slate-800 sm:text-xs"
                      type="button"
                      onClick={() => onEdit(jersey)}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </span>
                    </button>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
};

export default JerseyList;

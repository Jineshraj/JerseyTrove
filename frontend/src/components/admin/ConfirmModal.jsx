import React from "react";

// Props:
// - open: state from parent
// - title/message/confirmLabel: text from parent
// - onCancel/onConfirm: handlers from parent
// - confirmClassName: optional styling from parent
const ConfirmModal = ({
  open,
  title,
  message,
  confirmLabel,
  onCancel,
  onConfirm,
  confirmClassName,
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "flex" : "hidden"} items-center justify-center bg-slate-900/40 px-4 py-8`}
    >
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.6)]">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm text-slate-600">{message}</p>
        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className={
              confirmClassName ||
              "rounded-full border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
            }
            type="button"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AdminHeader from "../components/admin/AdminHeader.jsx";
import JerseyList from "../components/admin/JerseyList.jsx";
import JerseyFormModal from "../components/admin/JerseyFormModal.jsx";
import ConfirmModal from "../components/admin/ConfirmModal.jsx";

// Shape of the jersey form (used for reset + default values)
const initialForm = {
  name: "",
  team: "",
  price: "",
  sizes: [],
  quality: "",
  fitType: "",
  categories: [],
  imageUrl: "",
  lastVerifiedDate: "",
  description: "",
};

const Admin = () => {
  // Local state (page memory)
  const [isLoading, setIsLoading] = useState(false);
  const [allJersey, setAllJersey] = useState([]);
  const [isListView, setIsListView] = useState(false);
  const [formData, setFormData] = useState(initialForm);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [confirmVerifyOpen, setConfirmVerifyOpen] = useState(false);
  const [verifyTarget, setVerifyTarget] = useState(null);
  const nameInputRef = useRef(null);

  // Router helper (navigation)
  const navigate = useNavigate();

  // API: load all jerseys into state
  const fetchJerseys = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) {
        throw new Error("JERSEYS CANT BE FETCHED AT THE MOMENT");
      }
      const { data } = await response.json();
      setAllJersey(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Run once on mount (initial data load)
  useEffect(() => {
    fetchJerseys();
  }, []);

  // UI sync: reset list view when moving to desktop (sm and up)
  useEffect(() => {
    const media = window.matchMedia("(min-width: 640px)");
    const handleChange = (e) => {
      if (e.matches) {
        setIsListView(false);
      }
    };

    if (media.matches) {
      setIsListView(false);
    }

    if (media.addEventListener) {
      media.addEventListener("change", handleChange);
    } else {
      media.addListener(handleChange);
    }

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", handleChange);
      } else {
        media.removeListener(handleChange);
      }
    };
  }, []);

  // Modal UX: lock background scroll + focus first input
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        nameInputRef.current?.focus();
      }, 0);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = prevOverflow;
      };
    }
    return undefined;
  }, [isOpen]);

  // Derived list (sorted by verified date)
  const sortedJerseys = [...allJersey].sort((a, b) => {
    const aDate = new Date(a.lastVerifiedDate || a.createdAt || 0);
    const bDate = new Date(b.lastVerifiedDate || b.createdAt || 0);
    return aDate - bDate;
  });

  // Small helper for display text
  const daysAgo = (dateValue) => {
    if (!dateValue) return "unknown";
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "unknown";
    const diffMs = Date.now() - date.getTime();
    const diffDays = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
  };

  // Open edit modal + preload form with jersey data
  const editJersey = (jersey) => {
    setEditingId(jersey._id);
    const formattedDate = jersey.lastVerifiedDate
      ? jersey.lastVerifiedDate.split("T")[0]
      : "";
    setFormData({ ...initialForm, ...jersey, lastVerifiedDate: formattedDate });
    setIsOpen(true);
  };

  // Open blank modal for a new jersey
  const openNewJersey = () => {
    setEditingId("");
    setFormData(initialForm);
    setIsOpen(true);
  };

  // Close modal and reset edit state
  const closeModal = () => {
    setIsOpen(false);
    setEditingId("");
    setFormData(initialForm);
  };

  // Generic input handler for text/select/textarea
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Multi-select handler (sizes + categories)
  const handleCheckBoxChange = (field, value) => {
    const standardSizes = ["S", "M", "L", "XL"];
    setFormData((prev) => ({
      ...prev,
      [field]:
        field === "sizes" && value === "Standard"
          ? standardSizes.every((size) => prev.sizes.includes(size))
            ? prev.sizes.filter((item) => !standardSizes.includes(item))
            : Array.from(new Set([...prev.sizes, ...standardSizes]))
          : prev[field].includes(value)
            ? prev[field].filter((item) => item !== value)
            : [...prev[field], value],
    }));
  };

  // Save action (POST for new, PUT for edit)
  const handleSave = async () => {
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `http://localhost:5000/api/products/${editingId}`
        : "http://localhost:5000/api/products";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        toast.error("Couldnt save at the moment");
        throw new Error("Failed to save");
      }

      const saved = await response.json();
      const savedJersey = saved.product || saved.data || saved;
      setAllJersey((prev) => {
        if (editingId) {
          return prev.map((item) =>
            item._id === editingId ? savedJersey : item,
          );
        }
        return [savedJersey, ...prev];
      });

      toast.success(editingId ? "Jersey updated" : "Jersey added");
      closeModal();
    } catch (err) {
      console.error("couldnt save jersey data to the db", err);
    }
  };

  // Confirm delete flow
  const openDeleteConfirm = (jersey) => {
    setDeleteTarget(jersey);
    setConfirmDeleteOpen(true);
  };

  const closeDeleteConfirm = () => {
    setConfirmDeleteOpen(false);
    setDeleteTarget(null);
  };

  const handleDeleteConfirmed = async () => {
    if (!deleteTarget?._id) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${deleteTarget._id}`,
        { method: "DELETE" },
      );
      if (!response.ok) {
        toast.error("Couldnt delete at the moment");
        throw new Error("Failed to delete");
      }
      setAllJersey((prev) =>
        prev.filter((item) => item._id !== deleteTarget._id),
      );
      toast.success("Jersey deleted");
      closeDeleteConfirm();
    } catch (err) {
      console.error("couldnt delete jersey data from the db", err);
    }
  };

  // Confirm verify flow
  const openVerifyConfirm = (jersey) => {
    setVerifyTarget(jersey);
    setConfirmVerifyOpen(true);
  };

  const closeVerifyConfirm = () => {
    setConfirmVerifyOpen(false);
    setVerifyTarget(null);
  };

  const handleVerifyConfirmed = async () => {
    if (!verifyTarget?._id) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${verifyTarget._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lastVerifiedDate: new Date().toISOString() }),
        },
      );
      if (!response.ok) {
        toast.error("Couldnt verify at the moment");
        throw new Error("Failed to verify");
      }
      const verified = await response.json();
      const verifiedJersey = verified.product || verified.data || verified;
      setAllJersey((prev) =>
        prev.map((item) =>
          item._id === verifyTarget._id ? verifiedJersey : item,
        ),
      );
      toast.success("Jersey verified");
      closeVerifyConfirm();
    } catch (err) {
      console.error("couldnt verify jersey data in the db", err);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fdebd3,_#f6f7fb_45%,_#eef7f1_80%)] text-slate-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-0 pb-10 pt-8 sm:gap-10 sm:px-6 sm:pb-16 sm:pt-12">
        {/* Header actions are handlers (navigation + open modal) */}
        <AdminHeader onHome={() => navigate("/")} onNew={openNewJersey} />

        {/* List view gets state + handlers + helper text */}
        <JerseyList
          isLoading={isLoading}
          jerseys={sortedJerseys}
          isListView={isListView}
          onToggleView={() => setIsListView((prev) => !prev)}
          onEdit={editJersey}
          onDelete={openDeleteConfirm}
          onVerify={openVerifyConfirm}
          daysAgo={daysAgo}
        />
      </div>

      {/* Jersey form modal (state + handlers + ref) */}
      <JerseyFormModal
        isOpen={isOpen}
        onClose={closeModal}
        onSave={handleSave}
        formData={formData}
        handleChange={handleChange}
        handleCheckBoxChange={handleCheckBoxChange}
        nameInputRef={nameInputRef}
      />

      {/* Confirm delete modal (state + handlers) */}
      <ConfirmModal
        open={confirmDeleteOpen}
        title="Delete this jersey?"
        message="This action can?t be undone."
        confirmLabel="Delete"
        onCancel={closeDeleteConfirm}
        onConfirm={handleDeleteConfirmed}
        confirmClassName="rounded-full border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:border-rose-400 hover:bg-rose-100"
      />

      {/* Confirm verify modal (state + handlers) */}
      <ConfirmModal
        open={confirmVerifyOpen}
        title="Verify this jersey?"
        message="This will refresh the availability date."
        confirmLabel="Verify"
        onCancel={closeVerifyConfirm}
        onConfirm={handleVerifyConfirmed}
        confirmClassName="rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-400 hover:bg-emerald-100"
      />
    </main>
  );
};

export default Admin;

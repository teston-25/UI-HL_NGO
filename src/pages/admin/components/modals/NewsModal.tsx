import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { Modal } from "../Modal";
import { FormInput } from "../FormInput";
import type { NewsForm, News } from "../../types/admin";
import { useNews } from "../../../../context/NewsContext";
import { useToast } from "../../../../components/Toast";

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingNews?: News | null;
}

export function NewsModal({ isOpen, onClose, editingNews }: NewsModalProps) {
  const { createNews, updateNews } = useNews();
  const { showToast } = useToast();

  const [form, setForm] = useState<NewsForm>({
    title: "",
    content: "",
    image_url: "",
    excerpt: "",
    category: "",
    published_at: "",
  });
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingNews) {
      setForm({
        title: editingNews.title,
        content: editingNews.content,
        image_url: editingNews.image_url || "",
        excerpt: editingNews.excerpt || "",
        category: editingNews.category || "",
        published_at: editingNews.published_at || "",
      });
    } else {
      setForm({
        title: "",
        content: "",
        image_url: "",
        excerpt: "",
        category: "",
        published_at: "",
      });
    }
  }, [editingNews, isOpen]);

  const handleSave = async () => {
    setLoading(true);
    try {
      // 1. Clear previous errors at the start of a new attempt
      setFieldErrors({});

      if (editingNews) {
        await updateNews(editingNews.id, form);
        showToast("success", "News updated successfully");
      } else {
        await createNews(form);
        showToast("success", "News created successfully");
      }
      onClose();
    } catch (error: any) {
      console.error("Save Error:", error);

      // 2. Handle 400 Bad Request / Validation errors
      if (error.response && error.response.status === 400) {
        const serverErrors = error.response.data.errors;

        if (serverErrors) {
          setFieldErrors(serverErrors);

          // Handle case where serverErrors might be an array or an object
          const firstMessage = Array.isArray(serverErrors)
            ? serverErrors[0]?.message
            : Object.values(serverErrors)[0];

          showToast(
            "error",
            firstMessage || "Please fix the highlighted errors",
          );
        } else {
          showToast("error", error.response.data.message || "Invalid request");
        }
      } else {
        // 3. Handle generic errors (Network, 500, etc.)
        showToast("error", error.message || "An error occurred while saving");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm({
      title: "",
      content: "",
      image_url: "",
      excerpt: "",
      category: "",
      published_at: "",
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={editingNews ? "Edit News" : "Add News"}
    >
      <div className="space-y-4">
        <FormInput
          label="Title"
          value={form.title}
          onChange={(v) => setForm({ ...form, title: v })}
          placeholder="Enter news title"
          required
        />
        <FormInput
          label="Content"
          value={form.content}
          onChange={(v) => setForm({ ...form, content: v })}
          placeholder="Enter news content"
          textarea
          required
        />
        <FormInput
          label="Image URL (optional)"
          value={form.image_url}
          onChange={(v) => setForm({ ...form, image_url: v })}
          placeholder="Enter image URL"
        />
        <FormInput
          label="Excerpt"
          value={form.excerpt}
          onChange={(v) => setForm({ ...form, excerpt: v })}
          placeholder="Short summary of the news"
          textarea
        />
        <FormInput
          label="Category"
          value={form.category}
          onChange={(v) => setForm({ ...form, category: v })}
          placeholder="e.g. FEATURED STORY"
        />
        <FormInput
          label="Published Date"
          value={form.published_at}
          onChange={(v) => setForm({ ...form, published_at: v })}
          type="date"
        />
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#B91C1C] text-white rounded-xl font-medium hover:bg-[#991B1B] transition-colors disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {editingNews ? "Update News" : "Create News"}
        </button>
      </div>
    </Modal>
  );
}

import { useEffect, useState, useMemo } from "react";
import {
  FileText,
  Bell,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useNews } from "../../../context/NewsContext";
import { useEmergency } from "../../../context/EmergencyContext";
import { useToast } from "../../../components/Toast";
import { NewsModal } from "../components/modals/NewsModal";
import { EmergencyModal } from "../components/modals/EmergencyModal";
import type { News } from "../../../services/api/newsApi";
import type { Emergency } from "../../../services/api/emergencyApi";
import { TabError } from "../../../components/admin/TabError";

interface NewsTabProps {
  searchQuery?: string;
  error: string | null;
  onRetry: () => void;
}

export function NewsTab({ searchQuery = "", error, onRetry }: NewsTabProps) {
  const {
    news,
    loading: newsLoading,
    fetchNews,
    createNews,
    updateNews,
    deleteNews,
  } = useNews();

  const {
    emergencies,
    loading: emergencyLoading,
    fetchAll: fetchEmergencies,
    createEmergency,
    updateEmergency,
    deleteEmergency,
  } = useEmergency();

  const { showToast } = useToast();

  // Fetch on mount
  useEffect(() => {
    fetchNews();
    fetchEmergencies();
  }, [fetchNews, fetchEmergencies]);

  // Modal state
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [editingEmergency, setEditingEmergency] = useState<Emergency | null>(
    null,
  );

  // Filtered lists
  const filteredNews = useMemo(
    () =>
      news.filter((n) =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [news, searchQuery],
  );

  const filteredEmergencies = useMemo(
    () =>
      emergencies.filter((e) =>
        e.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [emergencies, searchQuery],
  );

  const loadingData = newsLoading || emergencyLoading;

  // Handlers
  const handleNewsSave = async (
    form: { title: string; content: string; image_url: string },
    editingId?: number,
  ) => {
    try {
      if (editingId) {
        await updateNews(editingId, form);
        showToast("success", "News updated successfully!");
      } else {
        await createNews(form);
        showToast("success", "News created successfully!");
      }
    } catch (e: any) {
      showToast("error", e.response?.data?.message || "Failed to save news");
      throw e;
    }
  };

  const handleNewsDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this news?")) return;
    try {
      await deleteNews(id);
      showToast("success", "News deleted successfully!");
    } catch (e: any) {
      showToast("error", e.response?.data?.message || "Failed to delete news");
    }
  };

  const handleEmergencySave = async (
    form: {
      title: string;
      description: string;
      location: string;
      target_amount?: number;
      deadline?: string;
      status?: string;
      affected_count?: number;
      image_url?: string;
    },
    editingId?: number,
  ) => {
    try {
      if (editingId) {
        await updateEmergency(editingId, form);
        showToast("success", "Emergency updated successfully!");
      } else {
        const payload: EmergencyPayload = {
          title: form.title,
          description: form.description,
          location: form.location,
          status: form.status as "ACTIVE" | "INACTIVE" | "RESOLVED",
        };
        if (form.affected_count !== undefined) {
          payload.affected_count = form.affected_count;
        }
        if (form.image_url) {
          payload.image_url = form.image_url;
        }
        await createEmergency(payload);
        showToast("success", "Emergency created successfully!");
      }
    } catch (e: any) {
      showToast(
        "error",
        e.response?.data?.message || "Failed to save emergency",
      );
      throw e;
    }
  };

  const handleEmergencyDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this emergency?")) return;
    try {
      await deleteEmergency(id);
      showToast("success", "Emergency deleted successfully!");
    } catch (e: any) {
      showToast(
        "error",
        e.response?.data?.message || "Failed to delete emergency",
      );
    }
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
              News & Emergencies
            </h1>
            <p className="text-gray-500 mt-1">
              Manage news articles and emergency updates
            </p>
          </div>
        </div>
        <TabError message={error} onRetry={onRetry} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
            News & Emergencies
          </h1>
          <p className="text-gray-500 mt-1">
            Manage news articles and emergency updates
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setEditingNews(null);
              setShowNewsModal(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-[#B91C1C] text-white rounded-xl font-medium hover:bg-[#991B1B] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add News
          </button>
          <button
            onClick={() => {
              setEditingEmergency(null);
              setShowEmergencyModal(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-[#f59e0b] text-white rounded-xl font-medium hover:bg-[#d97706] transition-colors"
          >
            <Bell className="w-5 h-5" />
            Add Emergency
          </button>
        </div>
      </div>

      {/* News Articles */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <FileText className="w-5 h-5" /> News Articles
        </h2>
        {loadingData ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#B91C1C]" />
          </div>
        ) : filteredNews.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No news articles found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-40 bg-gradient-to-br from-[#B91C1C]/20 to-[#15803d]/20"></div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-[#B91C1C]/10 text-[#B91C1C] text-xs font-medium rounded-full">
                      News
                    </span>
                    <span className="text-gray-400 text-xs">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {item.content}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingNews(item);
                        setShowNewsModal(true);
                      }}
                      className="text-[#B91C1C] font-medium text-sm hover:underline flex items-center gap-1"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleNewsDelete(item.id)}
                      className="text-red-500 font-medium text-sm hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Emergencies */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-[#f59e0b]" /> Emergencies
        </h2>
        {loadingData ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#f59e0b]" />
          </div>
        ) : filteredEmergencies.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No emergencies found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmergencies.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div
                  className={`h-2 ${
                    item.is_active ? "bg-[#f59e0b]" : "bg-gray-400"
                  }`}
                ></div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        item.is_active
                          ? "bg-[#f59e0b]/10 text-[#f59e0b]"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.is_active ? "Active" : "Inactive"}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>
                  {item.target_amount && (
                    <p className="text-sm text-[#15803d] font-medium mb-2">
                      Target: ${item.target_amount.toLocaleString()}
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingEmergency(item);
                        setShowEmergencyModal(true);
                      }}
                      className="text-[#f59e0b] font-medium text-sm hover:underline flex items-center gap-1"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleEmergencyDelete(item.id)}
                      className="text-red-500 font-medium text-sm hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals — now owned by this tab */}
      <NewsModal
        isOpen={showNewsModal}
        onClose={() => {
          setShowNewsModal(false);
          setEditingNews(null);
        }}
        onSave={handleNewsSave}
        editingNews={editingNews}
      />

      <EmergencyModal
        isOpen={showEmergencyModal}
        onClose={() => {
          setShowEmergencyModal(false);
          setEditingEmergency(null);
        }}
        onSave={handleEmergencySave}
        editingEmergency={editingEmergency}
      />
    </div>
  );
}

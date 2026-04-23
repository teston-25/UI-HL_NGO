import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Loader2 } from "lucide-react";
import type { Admin } from "../../../services/api/adminApi";

interface AdminFormData {
  email: string;
  password: string;
  role: "ADMIN" | "SUPER_ADMIN";
}

interface AdminManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  admin?: Admin | null;
  onSave: (data: AdminFormData) => Promise<void>;
  onDelete?: (id: number) => Promise<void>;
  loading?: boolean;
  mode: "create" | "edit" | "delete";
}

export function AdminManagementModal({
  isOpen,
  onClose,
  admin,
  onSave,
  onDelete,
  loading = false,
  mode,
}: AdminManagementModalProps) {
  const [formData, setFormData] = useState<AdminFormData>({
    email: "",
    password: "",
    role: "ADMIN",
  });

  useEffect(() => {
    if (admin && mode === "edit") {
      setFormData({
        email: admin.email,
        password: "",
        role: admin.role as "ADMIN" | "SUPER_ADMIN",
      });
    } else {
      setFormData({ email: "", password: "", role: "ADMIN" });
    }
  }, [admin, mode, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "delete" && admin && onDelete) {
      await onDelete(admin.id);
    } else {
      await onSave(formData);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case "create":
        return "Add Admin";
      case "edit":
        return "Edit Admin";
      case "delete":
        return "Delete Admin";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white dark:bg-[#1a1a1a] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {getTitle()}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              {mode === "delete" ? (
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    Are you sure you want to delete this admin account? This
                    action cannot be undone.
                  </p>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {admin?.email}
                    </p>
                    <p className="text-sm text-gray-500">{admin?.role}</p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={onClose}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email <span className="text-[#B91C1C]">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Enter admin email"
                      required
                      disabled={mode === "edit"}
                      className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-[#B91C1C]/20 text-gray-900 dark:text-white disabled:opacity-50"
                    />
                  </div>
                  {mode === "create" && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password <span className="text-[#B91C1C]">*</span>
                      </label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        placeholder="Enter password"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-[#B91C1C]/20 text-gray-900 dark:text-white"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Role <span className="text-[#B91C1C]">*</span>
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          role: e.target.value as "ADMIN" | "SUPER_ADMIN",
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-[#B91C1C]/20 text-gray-900 dark:text-white"
                    >
                      <option value="ADMIN">Admin</option>
                      <option value="SUPER_ADMIN">Super Admin</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#B91C1C] text-white rounded-xl font-medium hover:bg-[#991B1B] transition-colors disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                    {mode === "create" ? "Create Admin" : "Update Admin"}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

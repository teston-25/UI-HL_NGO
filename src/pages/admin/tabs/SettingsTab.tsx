import { useState } from "react";
import { Save, Loader2, Eye, EyeOff } from "lucide-react"; // Added Eye icons
import { FormInput } from "../components/FormInput";
import { useToast } from "../../../components/Toast";
import { useAdminAuth } from "../../../context/AdminAuthContext";

interface SettingsTabProps {
  admin: { email: string; role: string } | null;
}

export function SettingsTab({ admin }: SettingsTabProps) {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 1. Individual visibility states
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const { updatePassword } = useAdminAuth();

  const handlePasswordSave = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast("error", "Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await updatePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword,
      );
      showToast("success", "Password updated successfully!");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      showToast(
        "error",
        err.response?.data?.message || "Failed to update password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-500 mt-1">Manage your account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-6">
            Profile Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#B91C1C] to-[#15803d] flex items-center justify-center text-white text-2xl font-bold">
                {admin?.email?.charAt(0).toUpperCase() || "A"}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {admin?.email || "Admin User"}
                </p>
                <p className="text-sm text-gray-500 capitalize">
                  {admin?.role}
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {admin?.email || "Not available"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-medium text-gray-900 dark:text-white capitalize">
                {admin?.role || "Not available"}
              </p>
            </div>
          </div>
        </div>

        {/* Password Card */}
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-6">
            Change Password
          </h2>
          <div className="space-y-4">
            {/* Current Password */}
            <div className="relative">
              <FormInput
                label="Current Password"
                type={showCurrent ? "text" : "password"}
                value={passwordForm.currentPassword}
                onChange={(v) =>
                  setPasswordForm({ ...passwordForm, currentPassword: v })
                }
                placeholder="Enter current password"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showCurrent ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* New Password */}
            <div className="relative">
              <FormInput
                label="New Password"
                type={showNew ? "text" : "password"}
                value={passwordForm.newPassword}
                onChange={(v) =>
                  setPasswordForm({ ...passwordForm, newPassword: v })
                }
                placeholder="Enter new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FormInput
                label="Confirm Password"
                type={showConfirm ? "text" : "password"}
                value={passwordForm.confirmPassword}
                onChange={(v) =>
                  setPasswordForm({ ...passwordForm, confirmPassword: v })
                }
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              onClick={handlePasswordSave}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#B91C1C] text-white rounded-xl font-medium hover:bg-[#991B1B] transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

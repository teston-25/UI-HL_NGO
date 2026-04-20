import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
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
                <p className="text-sm text-gray-500">{admin?.role}</p>
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
              <p className="font-medium text-gray-900 dark:text-white">
                {admin?.role || "Not available"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-6">
            Change Password
          </h2>
          <div className="space-y-4">
            <FormInput
              label="Current Password"
              type="password"
              value={passwordForm.currentPassword}
              onChange={(v) =>
                setPasswordForm({ ...passwordForm, currentPassword: v })
              }
              placeholder="Enter current password"
              required
            />
            <FormInput
              label="New Password"
              type="password"
              value={passwordForm.newPassword}
              onChange={(v) =>
                setPasswordForm({ ...passwordForm, newPassword: v })
              }
              placeholder="Enter new password"
              required
            />
            <FormInput
              label="Confirm Password"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(v) =>
                setPasswordForm({ ...passwordForm, confirmPassword: v })
              }
              placeholder="Confirm new password"
              required
            />
            <button
              onClick={handlePasswordSave}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#B91C1C] text-white rounded-xl font-medium hover:bg-[#991B1B] transition-colors disabled:opacity-50"
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

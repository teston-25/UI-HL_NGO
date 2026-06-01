import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { Modal } from "../Modal";
import { FormInput } from "../FormInput";
import type { Emergency } from "../../../../services/api/emergencyApi";
import { useEmergency } from "../../../../context/EmergencyContext";
import { useToast } from "../../../../components/Toast";

interface EmergencyFormState {
  title: string;
  description: string;
  location: string;
  status: "ACTIVE" | "INACTIVE" | "RESOLVED";
  affected_count: string;
  image_url: string;
  goal_amount: string;
  raised_amount: string;
  aid_deployed: string;
  aid_unit: string;
}

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingEmergency?: Emergency | null;
}

const INITIAL_STATE: EmergencyFormState = {
  title: "",
  description: "",
  location: "",
  status: "ACTIVE",
  affected_count: "",
  image_url: "",
  goal_amount: "",
  raised_amount: "",
  aid_deployed: "",
  aid_unit: "",
};

export function EmergencyModal({
  isOpen,
  onClose,
  editingEmergency,
}: EmergencyModalProps) {
  const { createEmergency, updateEmergency, loading } = useEmergency();
  const { showToast } = useToast();
  const [form, setForm] = useState<EmergencyFormState>(INITIAL_STATE);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      if (editingEmergency) {
        setForm({
          title: editingEmergency.title || "",
          description: editingEmergency.description || "",
          location: editingEmergency.location || "",
          status:
            (editingEmergency.status as EmergencyFormState["status"]) ||
            "ACTIVE",
          affected_count: editingEmergency.affected_count?.toString() || "",
          image_url: editingEmergency.image_url || "",
          goal_amount: editingEmergency.goal_amount?.toString() || "",
          raised_amount: editingEmergency.raised_amount?.toString() || "",
          aid_deployed: editingEmergency.aid_deployed?.toString() || "",
          aid_unit: editingEmergency.aid_unit || "",
        });
      } else {
        setForm(INITIAL_STATE);
      }
    }
  }, [editingEmergency, isOpen]);

  const handleSave = async () => {
    const payload = {
      ...form,
      affected_count: form.affected_count ? parseInt(form.affected_count) : 0,
      goal_amount: form.goal_amount ? parseFloat(form.goal_amount) : 0,
      raised_amount: form.raised_amount ? parseFloat(form.raised_amount) : 0,
      aid_deployed: form.aid_deployed ? parseFloat(form.aid_deployed) : 0,
    };

    try {
      setFieldErrors({}); // Clear old errors before trying again

      if (editingEmergency?.id) {
        await updateEmergency(editingEmergency.id, payload);
        showToast("success", "Emergency updated successfully");
      } else {
        await createEmergency(payload);
        showToast("success", "Emergency created successfully");
      }
      handleClose();
    } catch (error: any) {
      console.error("Save Error:", error);

      if (error.response && error.response.status === 400) {
        const serverErrors = error.response.data.errors;

        if (serverErrors) {
          setFieldErrors(serverErrors);
          showToast(
            "error",
            serverErrors[0].message || "Please fix the highlighted errors",
          );
        } else {
          showToast("error", error.response.data.message || "Invalid request");
        }
      } else {
        showToast("error", error.message || "An unexpected error occurred");
      }
    }
  };

  const handleClose = () => {
    setForm(INITIAL_STATE);
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={editingEmergency ? "Edit Emergency" : "Add Emergency"}
    >
      <div className="space-y-4 max-h-[70vh] overflow-y-auto px-1">
        <FormInput
          label="Title"
          value={form.title}
          onChange={(v) => setForm({ ...form, title: v })}
          placeholder="Enter emergency title"
          required
        />
        <FormInput
          label="Description"
          value={form.description}
          onChange={(v) => setForm({ ...form, description: v })}
          placeholder="Describe the emergency"
          textarea
          required
        />
        <FormInput
          label="Location"
          value={form.location}
          onChange={(v) => setForm({ ...form, location: v })}
          placeholder="e.g. Oromia Region, Ethiopia"
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value as any })
              }
              className="w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>
          <FormInput
            label="Affected Count"
            value={form.affected_count}
            onChange={(v) => setForm({ ...form, affected_count: v })}
            type="number"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Goal Amount"
            value={form.goal_amount}
            onChange={(v) => setForm({ ...form, goal_amount: v })}
            type="number"
          />
          <FormInput
            label="Raised Amount"
            value={form.raised_amount}
            onChange={(v) => setForm({ ...form, raised_amount: v })}
            type="number"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Aid Deployed"
            value={form.aid_deployed}
            onChange={(v) => setForm({ ...form, aid_deployed: v })}
            type="number"
          />
          <FormInput
            label="Aid Unit"
            value={form.aid_unit}
            onChange={(v) => setForm({ ...form, aid_unit: v })}
            placeholder="e.g. Kits"
          />
        </div>

        <FormInput
          label="Image URL"
          value={form.image_url}
          onChange={(v) => setForm({ ...form, image_url: v })}
        />

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 mt-4 px-6 py-3 bg-[#B91C1C] text-white rounded-xl font-medium hover:bg-[#991B1B] transition-colors disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          {editingEmergency ? "Update Emergency" : "Create Emergency"}
        </button>
      </div>
    </Modal>
  );
}

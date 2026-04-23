import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { Modal } from "../Modal";
import { FormInput } from "../FormInput";
import type { BeneficiaryForm } from "../../types/admin";
import { useBeneficiaryStats } from "../../../../context/BeneficiaryStatsContext";
import { useToast } from "../../../../components/Toast";

interface BeneficiaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BeneficiaryModal({ isOpen, onClose }: BeneficiaryModalProps) {
  const { stats, updateStats, loading } = useBeneficiaryStats();
  const { showToast } = useToast();

  // 1. Error state to track which field is negative
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<BeneficiaryForm>({
    total_beneficiaries: 0,
    countries_count: 0,
    water_projects: 0,
  });

  useEffect(() => {
    if (stats && isOpen) {
      setForm({
        total_beneficiaries: stats.total_beneficiaries,
        countries_count: stats.countries_count,
        water_projects: stats.water_projects,
      });
      setFieldErrors({});
    }
  }, [stats, isOpen]);

  const handleSave = async () => {
    const newErrors: Record<string, string> = {};

    if (form.total_beneficiaries < 0)
      newErrors.total_beneficiaries = "Value cannot be negative";
    if (form.countries_count < 0)
      newErrors.countries_count = "Value cannot be negative";
    if (form.water_projects < 0)
      newErrors.water_projects = "Value cannot be negative";

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      showToast("error", "Please ensure all values are 0 or positive.");
      return;
    }

    try {
      setFieldErrors({});
      await updateStats(form);
      showToast("success", "Beneficiary stats updated successfully!");
      onClose();
    } catch (err: any) {
      console.error("Error updating stats:", err);

      if (err.response?.status === 400) {
        setFieldErrors(err.response.data.errors || {});
        showToast("error", err.response.data.message || "Invalid input data");
      } else {
        showToast("error", "Failed to update statistics");
      }
    }
  };

  const handleNumberChange = (field: keyof BeneficiaryForm, value: string) => {
    const num = Number(value);
    setForm({ ...form, [field]: num });

    if (num >= 0 && fieldErrors[field]) {
      const updatedErrors = { ...fieldErrors };
      delete updatedErrors[field];
      setFieldErrors(updatedErrors);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Beneficiary Stats">
      <div className="space-y-4">
        <FormInput
          label="Total Beneficiaries"
          type="number"
          value={form.total_beneficiaries}
          onChange={(v) => handleNumberChange("total_beneficiaries", v)}
          placeholder="Enter total beneficiaries"
          required
        />
        <FormInput
          label="Countries Count"
          type="number"
          value={form.countries_count}
          onChange={(v) => handleNumberChange("countries_count", v)}
          placeholder="Enter countries count"
          required
        />
        <FormInput
          label="Water Projects"
          type="number"
          value={form.water_projects}
          onChange={(v) => handleNumberChange("water_projects", v)}
          placeholder="Enter water projects count"
          required
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
          Save Changes
        </button>
      </div>
    </Modal>
  );
}

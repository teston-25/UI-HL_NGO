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
    }
  }, [stats, isOpen]);

  const handleSave = async () => {
    try {
      await updateStats(form);
      showToast("success", "Beneficiary stats updated successfully!");
      onClose();
    } catch (err) {
      console.error("Error updating stats:", err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Beneficiary Stats">
      <div className="space-y-4">
        <FormInput
          label="Total Beneficiaries"
          type="number"
          value={form.total_beneficiaries}
          onChange={(v) => setForm({ ...form, total_beneficiaries: Number(v) })}
          placeholder="Enter total beneficiaries"
          required
        />
        <FormInput
          label="Countries Count"
          type="number"
          value={form.countries_count}
          onChange={(v) => setForm({ ...form, countries_count: Number(v) })}
          placeholder="Enter countries count"
          required
        />
        <FormInput
          label="Water Projects"
          type="number"
          value={form.water_projects}
          onChange={(v) => setForm({ ...form, water_projects: Number(v) })}
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

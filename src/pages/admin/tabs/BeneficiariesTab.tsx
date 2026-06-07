import { useEffect } from "react";
import { Edit, Loader2 } from "lucide-react";
import { useBeneficiaryStats } from "../../../context/BeneficiaryStatsContext";
import { TabError } from "../../../components/admin/TabError";

interface BeneficiariesTabProps {
  onEdit: () => void;
  onRetry: () => void;
}

export function BeneficiariesTab({ onEdit, onRetry }: BeneficiariesTabProps) {
  const { stats, loading, error, fetchStats } = useBeneficiaryStats();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
            Beneficiaries Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and track all beneficiaries
          </p>
        </div>
        <TabError message={error} onRetry={onRetry} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
            Beneficiaries Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage and track all beneficiaries
          </p>
        </div>
        <button
          onClick={onEdit}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#B91C1C] text-white rounded-xl font-medium hover:bg-[#991B1B] transition-colors shadow-lg shadow-[#B91C1C]/25"
        >
          <Edit className="w-5 h-5" />
          Update Stats
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#B91C1C]" />
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#B91C1C]/10 to-[#B91C1C]/5 border border-[#B91C1C]/20">
              <h3 className="text-4xl font-bold text-[#B91C1C]">
                {stats?.total_beneficiaries?.toLocaleString() || "0"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Total Beneficiaries
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#15803d]/10 to-[#15803d]/5 border border-[#15803d]/20">
              <h3 className="text-4xl font-bold text-[#15803d]">
                {stats?.international_referrals || 0}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                International Referrals
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#7c3aed]/10 to-[#7c3aed]/5 border border-[#7c3aed]/20">
              <h3 className="text-4xl font-bold text-[#7c3aed]">
                {stats?.annual_target?.toLocaleString() || "0"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Annual Target
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

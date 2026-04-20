import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import beneficiaryStatsAPI, {
  BeneficiaryStats,
} from "../services/api/beneficiaryStatsApi";

interface BeneficiaryStatsContextType {
  stats: BeneficiaryStats | null;
  loading: boolean;
  error: string | null;
  fetchStats: () => Promise<void>;
  updateStats: (data: Partial<BeneficiaryStats>) => Promise<void>;
}

const BeneficiaryStatsContext = createContext<
  BeneficiaryStatsContextType | undefined
>(undefined);

export function BeneficiaryStatsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [stats, setStats] = useState<BeneficiaryStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await beneficiaryStatsAPI.getStats();
      const statsData = res?.data.stats ?? res;

      setStats(statsData);
    } catch (err: any) {
      console.error("Failed to fetch beneficiary stats:", err);
      setError(err.response?.data?.message || "Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStats = async (data: Partial<BeneficiaryStats>) => {
    try {
      setLoading(true);

      await beneficiaryStatsAPI.updateStats(data);
      await fetchStats();
    } catch (err: any) {
      setError(err.response?.data?.message || "Update failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch on mount
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <BeneficiaryStatsContext.Provider
      value={{
        stats,
        loading,
        error,
        fetchStats,
        updateStats,
      }}
    >
      {children}
    </BeneficiaryStatsContext.Provider>
  );
}

// Custom hook
export function useBeneficiaryStats() {
  const ctx = useContext(BeneficiaryStatsContext);
  if (!ctx) {
    throw new Error(
      "useBeneficiaryStats must be used within BeneficiaryStatsProvider",
    );
  }
  return ctx;
}

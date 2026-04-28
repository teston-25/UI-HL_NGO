import { createContext, useContext, useState, useCallback } from "react";
import donationAPI, {
  type Donation,
  type DonationStats,
} from "../services/api/donationApi";

interface DonationContextType {
  donations: Donation[];
  stats: DonationStats | null;
  loading: boolean;
  error: string | null;
  // Public
  initializePayment: (data: {
    amount: string;
    email: string;
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    title?: string;
    description?: string;
  }) => Promise<{ checkout_url: string; tx_ref: string }>;
  verifyPayment: (txRef: string) => Promise<any>;
  getTransactionStatus: (txRef: string) => Promise<any>;
  // Admin
  fetchDonations: (
    page?: number,
    limit?: number,
    status?: string,
  ) => Promise<void>;
  fetchDonationStats: () => Promise<void>;
}

const DonationContext = createContext<DonationContextType | undefined>(
  undefined,
);

export function DonationProvider({ children }: { children: React.ReactNode }) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState<DonationStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializePayment = useCallback(
    async (data: {
      amount: string;
      email: string;
      first_name?: string;
      last_name?: string;
      phone_number?: string;
      title?: string;
      description?: string;
    }) => {
      setLoading(true);
      setError(null);
      try {
        const res = await donationAPI.initializePayment(data);
        if (!res || !res.checkout_url) {
          throw new Error("Invalid response from payment API");
        }
        return res;
      } catch (e: any) {
        setError(e.response?.data?.message || "Payment initialization failed");
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const verifyPayment = useCallback(async (txRef: string) => {
    const res = await donationAPI.verifyPayment(txRef);
    return res.data;
  }, []);

  const getTransactionStatus = useCallback(async (txRef: string) => {
    const res = await donationAPI.getTransactionStatus(txRef);
    return res.data;
  }, []);

  const fetchDonations = useCallback(
    async (page = 1, limit = 10, status?: string) => {
      setLoading(true);
      setError(null);
      try {
        const res = await donationAPI.getAllDonations(page, limit, status);
        setDonations(res.data.donations || res.data.data || []);
      } catch (e: any) {
        setError(e.response?.data?.message || "Failed to fetch donations");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const fetchDonationStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await donationAPI.getDonationStats();
      setStats(res.data.data || res.data);
    } catch (e: any) {
      setError(e.response?.data?.message || "Failed to fetch donation stats");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <DonationContext.Provider
      value={{
        donations,
        stats,
        loading,
        error,
        initializePayment,
        verifyPayment,
        getTransactionStatus,
        fetchDonations,
        fetchDonationStats,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
}

export function useDonation() {
  const ctx = useContext(DonationContext);
  if (!ctx) throw new Error("useDonation must be used within DonationProvider");
  return ctx;
}

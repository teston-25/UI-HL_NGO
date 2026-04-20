import api from "../axios";

// --- Types ---
export interface Donation {
  id: number;
  tx_ref: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  title?: string;
  description?: string;
  donor_name?: string;
  donor_email?: string;
  created_at: string;
  updated_at?: string;
}

export interface DonationStats {
  overview: {
    total_donations: number;
    total_amount: number;
    average_donation: number;
  };
  totalAmount?: number;
  totalDonors?: number;
  averageDonation?: number;
  byStatus: Record<string, { count: number; amount: number }>;
  recent_donations: Donation[];
}

interface InitPaymentData {
  amount: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  title?: string;
  description?: string;
}

const donationAPI = {
  // POST /api/v1/donation/initialize-payment — public
  // Returns { checkout_url, tx_ref }
  initializePayment: async (data: InitPaymentData) => {
    const response = await api.post("/v1/donation/initialize-payment", data);
    return response.data;
  },

  // GET /api/v1/donation/verify-payment/:tx_ref — public
  // Verifies payment status with Chapa and updates DB
  verifyPayment: async (txRef: string) => {
    const response = await api.get(`/v1/donation/verify-payment/${txRef}`);
    return response.data;
  },

  // GET /api/v1/donation/transaction-status/:tx_ref — public
  // Returns donation record from DB
  getTransactionStatus: async (txRef: string) => {
    const response = await api.get(`/v1/donation/transaction-status/${txRef}`);
    return response.data;
  },

  // GET /api/v1/admin/donations?page=1&limit=10&status=completed — protected
  // Returns paginated donations + summary
  getAllDonations: async (page: number, limit: number, status?: string) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (status) params.append("status", status);

    const response = await api.get(`/v1/admin/donations?${params}`);
    return response.data;
  },

  // GET /api/v1/admin/donations/stats — protected
  // Returns overview, byStatus breakdown, recent 5 donations
  getDonationStats: async () => {
    const response = await api.get("/v1/admin/donations/stats");
    return response.data;
  },
};

export const {
  initializePayment,
  verifyPayment,
  getTransactionStatus,
  getAllDonations,
  getDonationStats,
} = donationAPI;
export default donationAPI;

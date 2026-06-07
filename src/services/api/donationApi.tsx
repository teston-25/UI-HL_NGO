import api from "../axios";

export interface Donation {
  id: number;
  tx_ref: string;
  amount: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  title?: string;
  description?: string;
  status: "pending" | "completed" | "failed" | "refunded";
  ref_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface DonationPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DonationSummary {
  totalAmount: number;
  totalDonations: number;
}

export interface DonationsResponse {
  status: string;
  data: {
    donations: Donation[];
    pagination: DonationPagination;
    summary: DonationSummary;
  };
}

interface InitPaymentData {
  amount: number;
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  title?: string;
  description?: string;
}

const donationAPI = {
  initializePayment: async (data: InitPaymentData) => {
    const response = await api.post("/v1/donation/initialize-payment", data);
    return response.data?.data || response.data;
  },

  verifyPayment: async (txRef: string) => {
    const response = await api.get(`/v1/donation/verify-payment/${txRef}`);
    return response.data;
  },

  getTransactionStatus: async (txRef: string) => {
    const response = await api.get(`/v1/donation/transaction-status/${txRef}`);
    return response.data;
  },

  getAllDonations: async (
    page: number,
    limit: number,
    status?: string,
  ): Promise<DonationsResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (status) params.append("status", status);
    const response = await api.get(`/v1/admin/donations?${params}`);
    return response.data;
  },
};

export default donationAPI;

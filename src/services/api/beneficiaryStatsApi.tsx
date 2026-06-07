import api from "../axios";

export interface BeneficiaryStats {
  id: number;
  total_beneficiaries: number;
  international_referrals: number;
  annual_target: number;
  updated_at: string;
}

interface UpdatePayload {
  total_beneficiaries?: number;
  international_referrals?: number;
  annual_target?: number;
}

const beneficiaryStatsAPI = {
  // GET /api/v1/beneficiary-stats — public
  // Auto-creates a record with zeros if none exists
  getStats: async () => {
    const response = await api.get("/v1/beneficiary-stats");
    // Return the full response so caller can handle extraction
    return response;
  },

  // PUT /api/v1/admin/beneficiary-stats — protected (ADMIN + SUPER_ADMIN)
  updateStats: async (data: UpdatePayload) => {
    const response = await api.put("/v1/admin/beneficiary-stats", data);
    return response.data;
  },
};

export const { getStats, updateStats } = beneficiaryStatsAPI;
export default beneficiaryStatsAPI;

import api from "../axios";

export type AuditAction = "LOGIN" | "CREATE" | "UPDATE" | "DELETE";

export type AuditEntity =
  | "AUTH"
  | "ADMIN"
  | "NEWS"
  | "EMERGENCY"
  | "CONTACT"
  | "TRANSPARENCY"
  | "BENEFICIARY_STATS"
  | "DONATION";

export interface AuditLog {
  id: number;
  action: AuditAction;
  entity: AuditEntity;
  entity_id?: number | null;
  admin_id: number;
  admin_email?: string;
  details?: string;
  ip_address?: string;
  created_at: string;
}

export interface AuditLogPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AuditLogFilters {
  page?: number;
  limit?: number;
  action?: AuditAction;
  entity?: AuditEntity;
  adminId?: number;
}

const auditLogAPI = {
  getAll: async (filters: AuditLogFilters = {}) => {
    const response = await api.get("/v1/admin/audit-logs", {
      params: filters,
    });
    return response.data;
  },
};

export default auditLogAPI;

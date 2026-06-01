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
  admin_role?: string;
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

    // The API returns { status, data: { logs, pagination } }
    const logsArray = response.data?.data?.logs || response.data?.logs || [];

    // Ensure it's an array before mapping
    const logsToTransform = Array.isArray(logsArray) ? logsArray : [];

    // Transform camelCase API response to snake_case format
    const transformedLogs = logsToTransform.map((log: any) => ({
      id: log.id,
      action: log.action,
      entity: log.entity,
      entity_id: log.entityId,
      admin_id: log.adminId,
      admin_email: log.admin?.email,
      admin_role: log.admin?.role,
      details: log.details,
      ip_address: log.ip_address,
      created_at: log.createdAt,
    }));

    return {
      status: response.data?.status,
      data: {
        logs: transformedLogs,
        pagination: response.data?.data?.pagination,
      },
    };
  },
};

export default auditLogAPI;

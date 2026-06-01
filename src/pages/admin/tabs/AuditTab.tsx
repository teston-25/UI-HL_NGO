import { useState, useEffect } from "react";
import {
  Clock,
  Database,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import auditLogAPI from "../../../services/api/auditLogApi";
import { TabError } from "../../../components/admin/TabError";

interface AuditLogEntry {
  id: number;
  adminId: number;
  action: "LOGIN" | "CREATE" | "UPDATE" | "DELETE";
  entity: string;
  entityId: number;
  details: string;
  createdAt: string;
  admin: {
    id: number;
    email: string;
    role: string;
  };
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function AuditTab() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchLogs = async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await auditLogAPI.getAll({ page, limit: 10 });
      if (response.status === "success") {
        setLogs(response.data.logs);
        setPagination(response.data.pagination);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load audit logs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(currentPage);
  }, [currentPage]);

  const handleRetry = () => {
    fetchLogs(currentPage);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 1. Loading State (Full page for initial fetch)
  if (isLoading && logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#B91C1C]" />
        <p>Fetching system logs...</p>
      </div>
    );
  }

  // 2. Error State (Wrapped with Header as requested)
  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
            Audit Log
          </h1>
          <p className="text-gray-500 mt-1">
            Review system activities and transaction history
          </p>
        </div>
        <TabError message={error} onRetry={handleRetry} />
      </div>
    );
  }

  // 3. Success State
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-white">
          Audit Log
        </h1>
        <p className="text-gray-500 mt-1">
          Review system activities and transaction history
        </p>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Admin
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Entity
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 opacity-70" />
                      {new Date(log.createdAt).toLocaleString()}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {log.admin.email}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-gray-500">
                        {log.admin.role}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-bold ${
                        log.action === "DELETE"
                          ? "bg-red-100 text-red-700"
                          : log.action === "CREATE"
                          ? "bg-green-100 text-green-700"
                          : log.action === "UPDATE"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Database className="w-4 h-4 opacity-60" />
                      <span className="font-mono text-xs">{log.entity}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111] p-4 shadow-sm"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                    {log.admin.email}
                  </p>

                  <p className="text-[11px] uppercase text-gray-500">
                    {log.admin.role}
                  </p>
                </div>

                <span
                  className={`px-2 py-1 text-[10px] rounded-full font-medium whitespace-nowrap ${
                    log.action === "DELETE"
                      ? "bg-red-100 text-red-700"
                      : log.action === "CREATE"
                      ? "bg-green-100 text-green-700"
                      : log.action === "UPDATE"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {log.action}
                </span>
              </div>

              {/* Details */}
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Entity</span>
                  <span className="font-mono text-gray-900 dark:text-white">
                    {log.entity}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Date</span>
                  <span className="text-gray-900 dark:text-white text-right">
                    {new Date(log.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Details</p>
                  <p className="text-gray-700 dark:text-gray-300 text-xs break-words">
                    {log.details}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pagination && (
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/20">
            <p className="text-sm text-gray-500">
              Showing page{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                {pagination.page}
              </span>{" "}
              of {pagination.totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={!pagination.hasPrevPage || isLoading}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-30 hover:bg-white dark:hover:bg-gray-800 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={!pagination.hasNextPage || isLoading}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-30 hover:bg-white dark:hover:bg-gray-800 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

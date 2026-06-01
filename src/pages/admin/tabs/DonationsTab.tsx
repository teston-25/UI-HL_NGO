import { useEffect, useState } from "react";
import {
  DollarSign,
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AdminTable } from "../../../components/admin/AdminTable";
import { useDonation } from "../../../context/DonationContext";
import { TabError } from "../../../components/admin/TabError";

interface DonationsTabProps {
  onRetry: () => void;
}

export function DonationsTab({ onRetry }: DonationsTabProps) {
  const { donations, pagination, summary, loading, error, fetchDonations } =
    useDonation();

  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    fetchDonations(currentPage, 10, statusFilter);
  }, [fetchDonations, currentPage, statusFilter]);

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#15803d] dark:text-white">
            Donations Management
          </h1>
          <p className="text-gray-500 mt-1">
            Track and manage all donation records
          </p>
        </div>
        <TabError message={error} onRetry={onRetry} />
      </div>
    );
  }

  const totalAmount = summary?.totalAmount ?? 0;
  const totalDonations = summary?.totalDonations ?? 0;
  const averageDonation = totalDonations > 0 ? totalAmount / totalDonations : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#15803d] dark:text-white">
            Donations Management
          </h1>
          <p className="text-gray-500 mt-1">
            Track and manage all donation records
          </p>
        </div>
        {/* Status filter */}
        <select
          value={statusFilter || ""}
          onChange={(e) => {
            setStatusFilter(e.target.value || undefined);
            setCurrentPage(1);
          }}
          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] text-gray-900 dark:text-white text-sm"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>

      {/* Stat Cards — powered by summary from the same API call */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-[#15803d]" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {totalAmount.toLocaleString()} Birr
          </h3>
          <p className="text-gray-500 text-sm">Total Amount</p>
        </div>
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-[#7c3aed]" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {totalDonations}
          </h3>
          <p className="text-gray-500 text-sm">Total Donations</p>
        </div>
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8 text-[#B91C1C]" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {averageDonation.toFixed(2)} Birr
          </h3>
          <p className="text-gray-500 text-sm">Average Donation</p>
        </div>
      </div>

      {/* Donations Table */}
      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col h-[75vh]">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-[#1a1a1a] z-10">
          <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white">
            Donations
          </h2>
          {pagination && (
            <span className="text-sm text-gray-500">
              {pagination.total} total records
            </span>
          )}
        </div>
        {/* Desktop Table */}
        <div className="flex-1 overflow-y-auto">
          <div className="hidden md:block">
            <AdminTable
              data={donations}
              loading={loading}
              emptyMessage="No donations found"
              columns={[
                {
                  key: "donor",
                  header: "Donor",
                  render: (item) => (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B91C1C] to-[#991B1B] flex items-center justify-center text-white font-medium">
                        {item.first_name?.charAt(0)?.toUpperCase() || "D"}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.first_name || "Anonymous"}{" "}
                          {item.last_name || ""}
                        </p>
                        <p className="text-sm text-gray-500">{item.email}</p>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "amount",
                  header: "Amount",
                  render: (item) => (
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {item.amount.toLocaleString()} Birr
                    </p>
                  ),
                },
                {
                  key: "date",
                  header: "Date",
                  render: (item) => (
                    <p className="text-gray-500 dark:text-gray-400">
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  ),
                },
                {
                  key: "status",
                  header: "Status",
                  render: (item) => (
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        item.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : item.status === "failed"
                          ? "bg-red-100 text-red-700"
                          : item.status === "refunded"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  ),
                },
                {
                  key: "tx_ref",
                  header: "Transaction Ref",
                  render: (item) => (
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-mono truncate max-w-[180px]">
                      {item.tx_ref}
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden p-4 space-y-3 overflow-y-auto max-h-[540px] scroll-smooth">
          {loading ? (
            <p className="text-center text-gray-500">Loading donations...</p>
          ) : donations.length === 0 ? (
            <p className="text-center text-gray-500">No donations found</p>
          ) : (
            donations.map((donation) => (
              <div
                key={donation.id}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111] p-4 shadow-sm"
              >
                {/* Top row: donor + amount + status */}
                <div className="flex items-center justify-between gap-3">
                  {/* Donor */}
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#B91C1C] to-[#991B1B] flex items-center justify-center text-white text-sm font-medium">
                      {donation.first_name?.charAt(0)?.toUpperCase() || "D"}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {donation.first_name || "Anonymous"}
                      </p>
                      <p className="text-[11px] text-gray-500 truncate">
                        {donation.email}
                      </p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {donation.amount.toLocaleString()} Birr
                    </p>

                    <span
                      className={`inline-block mt-1 px-2 py-0.5 text-[10px] rounded-full font-medium ${
                        donation.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : donation.status === "failed"
                          ? "bg-red-100 text-red-700"
                          : donation.status === "refunded"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {donation.status}
                    </span>
                  </div>
                </div>

                {/* Bottom row: date + tx ref (compact inline) */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500">
                  <span>
                    {new Date(donation.created_at).toLocaleDateString()}
                  </span>

                  <span className="font-mono truncate max-w-[140px]">
                    {donation.tx_ref}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {pagination && pagination.totalPages > 1 && (
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Page {pagination.page} of {pagination.totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))
                }
                disabled={currentPage >= pagination.totalPages}
                className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 disabled:opacity-40 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

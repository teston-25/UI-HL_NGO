import { useEffect } from "react";
import { DollarSign, Users, BarChart3 } from "lucide-react";
import { AdminTable } from "../../../components/admin/AdminTable";
import { useDonation } from "../../../context/DonationContext";
import { TabError } from "../../../components/admin/TabError";

type InitPaymentData = {
  amount: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  title?: string;
  description?: string;
};

interface DonationsTabProps {
  onRetry: () => void;
}

export function DonationsTab({ onRetry }: DonationsTabProps) {
  const {
    donations,
    stats,
    loading,
    error,
    fetchDonations,
    fetchDonationStats,
  } = useDonation();

  useEffect(() => {
    fetchDonationStats();
    fetchDonations();
  }, [fetchDonationStats, fetchDonations]);

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#15803d] dark:text-white">
            Donations Management
          </h1>
          <p className="text-gray-500 mt-1">
            Track and manage all donation records
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-[#15803d]" />
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              +12%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            ${stats?.totalAmount?.toLocaleString() || "0"}
          </h3>
          <p className="text-gray-500 text-sm">Total Donations</p>
        </div>
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 text-[#7c3aed]" />
            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              {stats?.totalDonors || 0} Donors
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {stats?.totalDonors || 0}
          </h3>
          <p className="text-gray-500 text-sm">Total Donors</p>
        </div>
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <BarChart3 className="w-8 h-8 text-[#B91C1C]" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            ${stats?.averageDonation?.toFixed(2) || "0.00"}
          </h3>
          <p className="text-gray-500 text-sm">Average Donation</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white">
            Recent Donations
          </h2>
        </div>
        <AdminTable
          data={donations.slice(0, 10)}
          loading={loading}
          emptyMessage="No donations found"
          columns={[
            {
              key: "donor",
              header: "Donor",
              render: (item) => (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#B91C1C] to-[#991B1B] flex items-center justify-center text-white font-medium">
                    {item.donor_name?.charAt(0) || "D"}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {item.donor_name || "Anonymous"}
                    </p>
                    <p className="text-sm text-gray-500">{item.donor_email}</p>
                  </div>
                </div>
              ),
            },
            {
              key: "amount",
              header: "Amount",
              render: (item) => (
                <p className="font-semibold text-gray-900 dark:text-white">
                  {item.amount.toFixed(2)} Birr
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
                <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                  {item.tx_ref}
                </p>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

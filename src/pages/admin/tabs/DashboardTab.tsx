import {
  Users,
  FileText,
  Bell,
  DollarSign,
  Plus,
  Upload,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { StatCard } from "../../../components/admin/StatCard";
import type { AdminTab, DonationStats } from "../types/admin";
import { TabError } from "../../../components/admin/TabError";
import { useBeneficiaryStats } from "../../../context/BeneficiaryStatsContext";
import { useNews } from "../../../context/NewsContext";
import { useEmergency } from "../../../context/EmergencyContext";

interface DashboardTabProps {
  admin: { email: string; role: string } | null;
  donationStats: DonationStats | null;
  onNavigate: (tab: AdminTab) => void;
  error: string | null;
  onRetry: () => void;
}

export function DashboardTab({
  admin,
  donationStats,
  onNavigate,
  error,
  onRetry,
}: DashboardTabProps) {
  const { stats, fetchStats } = useBeneficiaryStats();
  const { news, fetchNews } = useNews();
  const { activeEmergencies, fetchActive } = useEmergency();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Fetch all data on mount
  useEffect(() => {
    const fetchAllData = async () => {
      setIsRefreshing(true);
      try {
        await Promise.all([fetchStats(), fetchNews(), fetchActive()]);
        setDataLoaded(true);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsRefreshing(false);
      }
    };

    fetchAllData();
  }, [fetchStats, fetchNews, fetchActive]);

  if (error) {
    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-[#B91C1C] to-[#991B1B] rounded-3xl p-8 text-white">
          <h1 className="font-serif text-3xl font-bold mb-2">
            Welcome back, {admin?.email?.split("@")[0] || "Admin"}!
          </h1>
          <p className="text-white/80">
            Here's what's happening with your organization today.
          </p>
        </div>
        <TabError message={error} onRetry={onRetry} />
      </div>
    );
  }

  const status = [
    {
      label: "Total Beneficiaries",
      value: stats?.total_beneficiaries?.toLocaleString() || "0",
      change: "+12%",
      icon: Users,
      color: "bg-[#B91C1C]",
    },
    {
      label: "News Articles",
      value: news.length.toString(),
      change: "+5%",
      icon: FileText,
      color: "bg-[#15803d]",
    },
    {
      label: "Active Emergencies",
      value: activeEmergencies.length.toString(),
      change: "-2",
      icon: Bell,
      color: "bg-[#f59e0b]",
    },
    {
      label: "Total Donations",
      value: `$${donationStats?.totalAmount?.toLocaleString() || "0"}`,
      change: "+23%",
      icon: DollarSign,
      color: "bg-[#7c3aed]",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New beneficiary registered",
      time: "2 minutes ago",
      type: "success" as const,
    },
    {
      id: 2,
      action: "News article published",
      time: "1 hour ago",
      type: "info" as const,
    },
    {
      id: 3,
      action: "Emergency update added",
      time: "3 hours ago",
      type: "warning" as const,
    },
    {
      id: 4,
      action: "New volunteer application",
      time: "5 hours ago",
      type: "success" as const,
    },
    {
      id: 5,
      action: "Transparency report uploaded",
      time: "1 day ago",
      type: "info" as const,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-[#B91C1C] to-[#991B1B] rounded-3xl p-8 text-white">
        <h1 className="font-serif text-3xl font-bold mb-2">
          Welcome back, {admin?.email?.split("@")[0] || "Admin"}!
        </h1>
        <p className="text-white/80">
          Here's what's happening with your organization today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {status.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <button className="text-[#B91C1C] text-sm font-medium hover:underline">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "success"
                      ? "bg-green-500"
                      : activity.type === "warning"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-6">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate("beneficiaries")}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-[#B91C1C]/10 hover:bg-[#B91C1C] text-[#B91C1C] hover:text-white transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add New Beneficiary
            </button>
            <button
              onClick={() => onNavigate("news")}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-[#15803d]/10 hover:bg-[#15803d] text-[#15803d] hover:text-white transition-colors"
            >
              <FileText className="w-5 h-5" />
              Create News Post
            </button>
            <button
              onClick={() => onNavigate("transparency")}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-[#7c3aed]/10 hover:bg-[#7c3aed] text-[#7c3aed] hover:text-white transition-colors"
            >
              <Upload className="w-5 h-5" />
              Upload Report
            </button>
            <button
              onClick={() => onNavigate("contacts")}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              View Messages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

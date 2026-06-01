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
import type { AuditLog } from "../../../services/api/auditLogApi";
import { TabError } from "../../../components/admin/TabError";
import { useBeneficiaryStats } from "../../../context/BeneficiaryStatsContext";
import { useNews } from "../../../context/NewsContext";
import { useEmergency } from "../../../context/EmergencyContext";

interface DashboardTabProps {
  admin: { email: string; role: string } | null;
  donationStats: DonationStats | null;
  auditLogs: AuditLog[];
  onNavigate: (tab: AdminTab) => void;
  error: string | null;
  onRetry: () => void;
}

export function DashboardTab({
  admin,
  donationStats,
  auditLogs,
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

  const formatRelativeTime = (timestamp: string) => {
    if (!timestamp) return "unknown time";

    const date = new Date(timestamp);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "unknown time";
    }

    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    if (days === 0) return "today";
    if (days === 1) return "yesterday";
    return `${days} days ago`;
  };

  const getEntityLabel = (entity: string) => {
    return (
      {
        AUTH: "authentication",
        ADMIN: "admin account",
        NEWS: "news item",
        EMERGENCY: "emergency",
        CONTACT: "contact message",
        TRANSPARENCY: "transparency document",
        BENEFICIARY_STATS: "beneficiary stats",
        DONATION: "donation",
      }[entity] || entity.toLowerCase()
    );
  };

  const getActivityLabel = (log: AuditLog) => {
    if (log.action === "LOGIN") {
      return log.details || `${log.admin_email || "Admin"} logged in`;
    }

    const actionLabels: Record<string, string> = {
      CREATE: "Created",
      UPDATE: "Updated",
      DELETE: "Deleted",
    };

    const entityLabel = getEntityLabel(log.entity);
    const actionText = actionLabels[log.action] || log.action;
    return log.details || `${actionText} ${entityLabel}`;
  };

  const recentActivities = auditLogs
    .slice()
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 5)
    .map((log) => ({
      id: log.id,
      action: getActivityLabel(log),
      time: formatRelativeTime(log.created_at),
      type:
        log.action === "DELETE"
          ? "warning"
          : log.action === "LOGIN"
          ? "info"
          : "success",
    }));

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
              Update Beneficiary
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

import { LogOut, ChevronRight } from "lucide-react";
import type { Tab, AdminTab } from "../types/admin";

interface AdminSidebarProps {
  tabs: Tab[];
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  sidebarOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export function AdminSidebar({
  tabs,
  activeTab,
  onTabChange,
  sidebarOpen,
  onClose,
  onLogout,
}: AdminSidebarProps) {
  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-800 p-4 overflow-y-auto z-40 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  onTabChange(tab.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#B91C1C] to-[#991B1B] text-white shadow-lg shadow-[#B91C1C]/25"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="truncate">{tab.label}</span>
                {activeTab === tab.id && (
                  <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-[#B91C1C] transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="truncate">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

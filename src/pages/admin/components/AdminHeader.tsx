import { useState } from "react";
import { Search, Bell, Shield, Menu, X } from "lucide-react";

interface AdminHeaderProps {
  admin: { email: string; role: string } | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleSidebar: () => void;
}

export function AdminHeader({
  admin,
  searchQuery,
  onSearchChange,
  onToggleSidebar,
}: AdminHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 z-50">
      <div className="h-16 px-4 md:px-6 flex items-center justify-between gap-3">
        {/* Left Side: Logo & Menu toggles */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-[#B91C1C] to-[#991B1B] flex items-center justify-center">
              <Shield className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <span className="font-serif text-lg md:text-xl font-bold text-[#B91C1C] hidden sm:inline">
              Hibret Lebego
            </span>
          </div>
          <span className="px-2 md:px-3 py-1 bg-[#B91C1C]/10 text-[#B91C1C] text-xs font-semibold rounded-full">
            {admin?.role || "Admin"}
          </span>
        </div>

        {/* Center: Desktop Search Bar (Added for completeness) */}
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-[#B91C1C]/20 text-sm text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-2 md:gap-4 pl-2 md:pl-4 border-l border-gray-200 dark:border-gray-700">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setSearchOpen((current) => !current)}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Search"
          >
            {searchOpen ? (
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#B91C1C] rounded-full"></span>
          </button>

          {/* User Profile Block */}
          <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l border-gray-200 dark:border-gray-700">
            <div className="w-8 md:w-9 h-8 md:h-9 rounded-full bg-gradient-to-br from-[#B91C1C] to-[#15803d] flex items-center justify-center text-white font-bold text-sm">
              {admin?.email?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {admin?.email || "Admin User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {admin?.role || "Admin"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Mobile Search Tray */}
      {searchOpen && (
        <div className="px-4 pb-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-xl bg-gray-100 dark:bg-gray-800 border-0 focus:ring-2 focus:ring-[#B91C1C]/20 text-sm text-gray-900 dark:text-white"
            />
          </div>
        </div>
      )}
    </header>
  );
}

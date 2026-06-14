import { useAdminAuth } from "../../context/AdminAuthContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AdminLoginPage() {
  const { login, loading } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigate("/admin");
    } catch (error) {
      console.error("Login failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-[#F9F9F9] dark:bg-[#0f0f0f] flex items-center justify-center px-4 sm:px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm sm:max-w-md"
      >
        <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl border border-[#B91C1C]/10 dark:border-[#B91C1C]/20 p-6 sm:p-8">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#B91C1C]/10 rounded-full mb-4">
              <Lock className="h-7 w-7 sm:h-8 sm:w-8 text-[#B91C1C]" />
            </div>
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#111111] dark:text-white">
              Admin Login
            </h1>
            <p className="text-[#1a1a1a]/70 dark:text-white/70 mt-2 text-xs sm:text-sm">
              Enter your credentials to access the admin panel.
            </p>
          </div>

          <form
            className="space-y-5 sm:space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-[#1a1a1a] dark:text-white focus:border-[#B91C1C] focus:ring-2 focus:ring-[#B91C1C]/20 outline-none text-sm sm:text-base"
                placeholder="admin@example.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-[#1a1a1a] dark:text-white focus:border-[#B91C1C] focus:ring-2 focus:ring-[#B91C1C]/20 outline-none text-sm sm:text-base"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#B91C1C] text-white font-bold py-3 rounded-lg hover:bg-[#991B1B] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-sm sm:text-base"
            >
              <LogIn className="h-5 w-5" />
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

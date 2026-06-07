import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useEmergency } from "../context/EmergencyContext";

const formatCompactCurrency = (value: number) => {
  if (value >= 1000) {
    const compact = value / 1000;
    const rounded = Number.isInteger(compact)
      ? compact.toString()
      : compact.toFixed(1).replace(/\.0$/, "");
    return `$${rounded}k`;
  }

  return `$${value.toLocaleString()}`;
};

export function EmergenciesPage() {
  const { t } = useLanguage();
  const { activeEmergencies, loading, error, fetchActive } = useEmergency();

  useEffect(() => {
    const loadActiveEmergencies = async () => {
      await fetchActive();
    };

    void loadActiveEmergencies();
  }, [fetchActive]);

  return (
    <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#0f0f0f] pt-12 pb-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Urgent Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-600 text-white px-6 py-3 rounded-xl mb-12 flex items-center justify-center font-bold tracking-wide shadow-lg animate-pulse"
        >
          <AlertTriangle className="mr-2 h-5 w-5" />
          {t.emergency_banner}
        </motion.div>

        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl font-bold text-[#B91C1C] mb-6"
          >
            {t.emergency_title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#1a1a1a]/70 dark:text-white/70 max-w-3xl mx-auto"
          >
            {t.emergency_subtitle}
          </motion.p>
        </div>

        {/* Loading / Error states */}
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-[#B91C1C]" />
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-red-500 font-medium">
            {error}
          </div>
        )}

        {!loading && !error && activeEmergencies.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No active emergencies at this time.
          </div>
        )}

        {/* Render each active emergency as a crisis card */}
        {!loading &&
          activeEmergencies.map((emergency, idx) => (
            <div
              key={emergency.id}
              className="bg-white dark:bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-xl border border-[#B91C1C]/10 dark:border-[#B91C1C]/20 mb-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="h-96 lg:h-auto relative">
                  <img
                    src={
                      emergency.image_url ||
                      "https://images.unsplash.com/photo-1541976844346-718b7d2831af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
                    }
                    alt={emergency.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <span className="bg-[#B91C1C] text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                      {t.emergency_urgent}
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#111111] dark:text-white mb-4">
                    {emergency.title}
                  </h2>
                  {emergency.location && (
                    <p className="text-sm text-gray-500 mb-4">
                      Location: {emergency.location}
                    </p>
                  )}
                  <p className="text-lg text-[#1a1a1a]/80 dark:text-white/80 mb-8 leading-relaxed">
                    {emergency.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center p-4 bg-[#F9F9F9] dark:bg-[#2a2a2a] rounded-xl">
                      <div className="text-2xl font-bold text-[#B91C1C] dark:text-[#F87171] mb-1">
                        {emergency.affected_count?.toLocaleString() ?? "—"}
                      </div>
                      <div className="text-xs text-gray-500 uppercase font-semibold">
                        {t.emergency_affected}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-[#F9F9F9] dark:bg-[#2a2a2a] rounded-xl">
                      <div className="text-2xl font-bold text-[#B91C1C] dark:text-[#F87171] mb-1">
                        {emergency.aid_deployed != null
                          ? `${emergency.aid_deployed}${
                              emergency.aid_unit ? ` ${emergency.aid_unit}` : ""
                            }`
                          : "—"}
                      </div>
                      <div className="text-xs text-gray-500 uppercase font-semibold">
                        {t.emergency_deployed}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-[#F9F9F9] dark:bg-[#2a2a2a] rounded-xl">
                      <div className="text-2xl font-bold text-[#B91C1C] dark:text-[#F87171] mb-1">
                        {emergency.raised_amount != null
                          ? formatCompactCurrency(emergency.raised_amount)
                          : "—"}
                      </div>
                      <div className="text-xs text-gray-500 uppercase font-semibold">
                        {t.emergency_raised}
                      </div>
                    </div>
                  </div>

                  {emergency.goal_amount && (
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-500 mb-1">
                        <span>Raised</span>
                        <span>
                          Goal: {formatCompactCurrency(emergency.goal_amount)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-[#B91C1C] h-2 rounded-full transition-all"
                          style={{
                            width: `${Math.min(
                              100,
                              ((emergency.raised_amount || 0) /
                                emergency.goal_amount) *
                                100,
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <Link
                    to="/donate"
                    className="w-full text-center bg-[#B91C1C] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#991B1B] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {t.emergency_donate_btn}
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  FileText,
  PieChart,
  ShieldCheck,
  Loader2,
  Eye, // 1. Imported Eye icon for "View/Read" context
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useTransparency } from "../context/TransparencyContext";

export function TransparencyPage() {
  const { t } = useLanguage();
  const {
    docs,
    loading: docsLoading,
    error,
    fetchTransparencyDocs,
  } = useTransparency();

  useEffect(() => {
    fetchTransparencyDocs();
  }, [fetchTransparencyDocs]);

  if (docsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9] dark:bg-[#0f0f0f]">
        <Loader2 className="animate-spin h-10 w-10 text-[#B91C1C]" />
      </div>
    );
  }

  const hasDocs = Array.isArray(docs) && docs.length > 0;

  return (
    <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#0f0f0f] pt-12 pb-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl font-bold text-[#B91C1C] mb-6"
          >
            {t.transparency_title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#1a1a1a]/70 dark:text-white/70 max-w-3xl mx-auto"
          >
            {t.transparency_subtitle}
          </motion.p>
        </div>

        {/* Financial Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl shadow-sm border border-[#B91C1C]/10 dark:border-[#B91C1C]/20"
          >
            <h2 className="font-serif text-2xl font-bold text-[#B91C1C] dark:text-white mb-8 flex items-center">
              <PieChart className="mr-3 h-6 w-6 text-[#B91C1C]" />
              {t.transparency_breakdown_title}
            </h2>

            <div className="space-y-6">
              {/* Program Services */}
              <div>
                <div className="flex justify-between mb-2 font-medium text-[#1a1a1a] dark:text-white">
                  <span>{t.transparency_program_services}</span>
                  <span className="text-[#0eca53]">85%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="bg-[#86efac] h-full rounded-full"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t.transparency_program_desc}
                </p>
              </div>

              {/* Fundraising */}
              <div>
                <div className="flex justify-between mb-2 font-medium text-[#1a1a1a] dark:text-white">
                  <span>{t.transparency_fundraising}</span>
                  <span className="text-[#B91C1C]">10%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "10%" }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="bg-[#B91C1C] h-full rounded-full"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t.transparency_fundraising_desc}
                </p>
              </div>

              {/* Management */}
              <div>
                <div className="flex justify-between mb-2 font-medium text-[#1a1a1a] dark:text-white">
                  <span>{t.transparency_management}</span>
                  <span className="text-gray-400">5%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "5%" }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="bg-gray-400 h-full rounded-full"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t.transparency_management_desc}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Accountability Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl font-bold text-[#B91C1C] dark:text-[#0eca53] mb-6">
              {t.transparency_accountability_title}
            </h2>
            <p className="text-lg text-[#1a1a1a]/80 dark:text-white/80 mb-6 leading-relaxed">
              {t.transparency_accountability_text_1}
            </p>
            <p className="text-lg text-[#1a1a1a]/80 dark:text-white/80 mb-8 leading-relaxed">
              {t.transparency_accountability_text_2}
            </p>
          </motion.div>
        </div>

        {/* Documents Section */}
        <section className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl font-bold text-[#B91C1C] dark:text-white mb-4">
              {t.financial_title}
            </h2>
            <p className="text-xl text-[#1a1a1a]/70 dark:text-white/70 max-w-3xl mx-auto">
              {t.financial_subtitle}
            </p>
          </motion.div>

          {error ? (
            <p className="text-center py-12 text-red-700 dark:text-red-400">
              {error}
            </p>
          ) : hasDocs ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {docs.map((doc, index) => (
                <motion.div
                  key={doc.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl shadow-sm border border-[#B91C1C]/10 dark:border-[#B91C1C]/20 flex flex-col group"
                >
                  <div className="bg-[#B91C1C]/10 dark:bg-[#B91C1C]/20 w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors group-hover:bg-[#B91C1C] group-hover:text-white">
                    <FileText className="h-7 w-7 text-[#B91C1C] dark:text-[#F87171] group-hover:text-white" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#111111] dark:text-white mb-2">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-[#B91C1C] font-bold mb-4">
                    {doc.year}
                  </p>
                  <p className="text-[#1a1a1a]/70 dark:text-white/70 mb-8 flex-1">
                    {doc.file_type?.toUpperCase()} Format
                  </p>

                  {/* Modified Link Action to View Document instead of Download */}
                  <a
                    href={doc.file_url + "#toolbar=0"}
                    className="w-full border-2 border-[#B91C1C] text-[#B91C1C] dark:text-[#F87171] dark:border-[#F87171] py-3 rounded-xl font-bold hover:bg-[#B91C1C] hover:text-white transition-all flex items-center justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Eye className="mr-2 h-5 w-5" />
                    {t.financial_download}
                  </a>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center py-12 opacity-50 italic">
              No financial documents available at this time.
            </p>
          )}

          {/* Certifications Card */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-12 text-center shadow-sm border border-[#B91C1C]/10 dark:border-[#B91C1C]/20">
            <h2 className="font-serif text-3xl font-bold text-[#111111] dark:text-white mb-10">
              {t.financial_certifications}
            </h2>
            <div className="flex flex-wrap justify-center gap-12 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              {[
                "Platinum Transparency",
                "4-Star Charity",
                "Accredited Charity",
              ].map((cert, i) => (
                <div key={i} className="flex flex-col items-center">
                  <ShieldCheck className="h-16 w-16 text-[#B91C1C] mb-2" />
                  <span className="font-bold">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

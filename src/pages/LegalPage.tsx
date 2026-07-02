import { motion } from "framer-motion";
import { FileCheck, Shield, BookOpen, FileText } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useState } from "react";

export function LegalPage() {
  const { t } = useLanguage();
  const [openCertificate, setOpenCertificate] = useState(false);
  const [openFinancial, setOpenFinancial] = useState(false);
  const [openPolicies, setOpenPolicies] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#0f0f0f] pt-12 pb-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl font-bold text-[#15803d] mb-6"
          >
            {t.nav_legal_governance}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#B91C1C]/70 dark:text-white/70 max-w-3xl mx-auto"
          >
            Legal information, Financial Manual, and organizational policies.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl shadow-sm border border-[#B91C1C]/10 dark:border-[#B91C1C]/20"
          >
            <FileCheck className="h-12 w-12 text-[#86efac] mb-6" />
            <h3 className="font-serif text-xl font-bold text-[#111111] dark:text-white mb-3">
              NGO Certificate
            </h3>
            <p className="text-[#1a1a1a]/70 dark:text-white/70 mb-4">
              Hibret Lebego is a legally registered NGO. Our registration
              certificate and legal status are available for verification.
            </p>
            <button
              onClick={() => setOpenCertificate(true)}
              className="text-[#B91C1C] dark:text-[#F87171] font-semibold flex items-center hover:underline"
            >
              <FileText className="h-4 w-4 mr-2" /> View Certificate
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl shadow-sm border border-[#B91C1C]/10 dark:border-[#B91C1C]/20 flex flex-col items-center justify-center text-center"
          >
            <Shield className="h-12 w-12 text-gray-300 dark:text-zinc-600 mb-6" />
            <h3 className="font-serif text-xl font-bold text-[#111111] dark:text-white mb-3">
              Financial Accountability & Controls
            </h3>
            <p className="text-[#1a1a1a]/70 dark:text-white/70 mb-4 text-sm">
              Internal financial structure, audit systems, and transparency
              framework.
            </p>
            <button
              onClick={() => setOpenFinancial(true)}
              className="text-[#B91C1C] font-semibold hover:underline flex items-center"
            >
              <FileText className="h-4 w-4 mr-2" />
              View Financial Manual
            </button>{" "}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl shadow-sm border border-[#B91C1C]/10 dark:border-[#B91C1C]/20 flex flex-col items-center justify-center text-center"
          >
            <BookOpen className="h-12 w-12 text-gray-300 dark:text-zinc-600 mb-6" />
            <h3 className="font-serif text-xl font-bold text-[#111111] dark:text-white mb-3">
              Policies
            </h3>
            <button
              onClick={() => setOpenPolicies(true)}
              className="text-[#B91C1C] dark:text-[#F87171] font-semibold hover:underline"
            >
              <FileText className="h-4 w-4 inline mr-2" />
              View Policies
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-[#1a1a1a] p-10 rounded-2xl border border-[#B91C1C]/10 dark:border-[#B91C1C]/20"
        >
          <h2 className="font-serif text-2xl font-bold text-[#B91C1C] dark:text-white mb-6">
            Legal Registration Info
          </h2>
          <div className="space-y-4 text-[#1a1a1a]/80 dark:text-white/80">
            <p>
              Hibret Lebego is registered as a non-governmental organization in
              accordance with applicable laws. For verification of our legal
              status or to request official documentation, please contact us.
            </p>
          </div>
        </motion.div>
      </div>
      {openCertificate && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-xl overflow-hidden relative">
            {/* Close button */}
            <button
              onClick={() => setOpenCertificate(false)}
              className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded"
            >
              Close
            </button>

            {/* PDF Viewer */}
            <iframe src="/NGO-Certificate.pdf" className="w-full h-full" />
          </div>
        </div>
      )}
      {openFinancial && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-xl overflow-hidden relative">
            <button
              onClick={() => setOpenFinancial(false)}
              className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded"
            >
              Close
            </button>

            <iframe src="/hlb-financial-manual.pdf" className="w-full h-full" />
          </div>
        </div>
      )}
      {openPolicies && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-5xl h-[90vh] rounded-xl overflow-hidden relative">
            <button
              onClick={() => setOpenPolicies(false)}
              className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded"
            >
              Close
            </button>

            <iframe src="/Policies.pdf" className="w-full h-full" />
          </div>
        </div>
      )}
    </div>
  );
}

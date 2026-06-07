import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  MapPin,
  Heart,
  Globe,
  Calendar,
  ArrowRight,
} from "lucide-react";

// Define strict typing for our selectable topics
type TopicKey = "capacity" | "geographic" | "cohorts" | "referrals";

export function TargetAreasPage() {
  const [activeTab, setActiveTab] = useState<TopicKey>("capacity");

  const topics = {
    capacity: {
      id: "capacity" as TopicKey,
      title: "Annual Target Capacity",
      icon: Calendar,
      emoji: "🏥",
      summary:
        "Sponsoring and providing direct medical treatments to 5,000+ patients annually.",
      details: (
        <div className="space-y-4">
          <p className="text-[#1a1a1a]/80 dark:text-white/80 leading-relaxed">
            Our optimized medical supply chains and strategic partnerships
            enable us to scale delivery rapidly. We focus heavily on minimizing
            overhead costs to ensure that the vast majority of resources
            directly fund clinical execution.
          </p>
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-[#B91C1C] shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 dark:text-zinc-300">
              <strong>Core Target:</strong> 5,000+ disadvantaged and vulnerable
              patients every single year through highly accessible, verified
              clinical programs.
            </p>
          </div>
        </div>
      ),
    },
    geographic: {
      id: "geographic" as TopicKey,
      title: "Regional Geographic Focus",
      icon: MapPin,
      emoji: "📍",
      summary:
        "Primary operations centered across three target regions in Ethiopia.",
      details: (
        <div className="space-y-4">
          <p className="text-[#1a1a1a]/80 dark:text-white/80 leading-relaxed">
            By embedding our core operational medical units right at the
            municipal level, we eliminate transport barriers that frequently
            prevent local families from seeking early diagnostics or life-saving
            care.
          </p>
          <div className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-xl border border-gray-200 dark:border-zinc-800">
            <span className="text-xs font-bold text-gray-400 block mb-1">
              PRIMARY ANCHOR HUB
            </span>
            <p className="text-sm font-semibold text-[#111111] dark:text-white">
              Oromia Region (Sheger City, Lege Tafo Sub-City)
            </p>
          </div>
        </div>
      ),
    },
    cohorts: {
      id: "cohorts" as TopicKey,
      title: "Specialized Clinical Cohorts",
      icon: Heart,
      emoji: "❤️",
      summary:
        "Targeted support streams optimized for specialized diagnostic conditions.",
      details: (
        <ul className="space-y-3">
          {[
            {
              bold: "Chronic Kidney Disease (CKD):",
              text: "Patients requiring consistent, long-term access to specialized hemodialysis treatments and transplant routing.",
            },
            {
              bold: "Maternal & Child Welfare:",
              text: "Low-income mothers, infants, and vulnerable young children requiring reliable preventative care pipelines.",
            },
            {
              bold: "Emergency Crisis Response:",
              text: "Trauma or acute critical case victims requiring immediate, round-the-clock medical intervention workflows.",
            },
          ].map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-zinc-900"
            >
              <span className="text-[#B91C1C] text-lg select-none">•</span>
              <p className="text-sm text-gray-700 dark:text-zinc-300">
                <strong>{item.bold}</strong> {item.text}
              </p>
            </li>
          ))}
        </ul>
      ),
    },
    referrals: {
      id: "referrals" as TopicKey,
      title: "Advanced & Critical Referrals",
      icon: Globe,
      emoji: "🌍",
      summary:
        "Sponsoring international transfers for treatments unavailable domestically.",
      details: (
        <div className="space-y-4">
          <p className="text-[#1a1a1a]/80 dark:text-white/80 leading-relaxed">
            When domestic public infrastructure exhausts local diagnostic
            capacity, our specialized referral pipeline bridges the gap to
            advanced medical institutions globally.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-[#B91C1C]/5 rounded-xl border border-[#B91C1C]/10 text-center">
              <span className="text-2xl font-bold text-[#B91C1C] block">
                125+
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Placements Managed
              </span>
            </div>
            <div className="p-4 bg-[#B91C1C]/5 rounded-xl border border-[#B91C1C]/10 text-center">
              <span className="text-2xl font-bold text-[#B91C1C] block">
                23
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Global Referrals
              </span>
            </div>
          </div>
        </div>
      ),
    },
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#0f0f0f] pt-12 pb-24 transition-colors duration-300">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-4xl md:text-5xl font-bold text-[#B91C1C] mb-6"
        >
          Target Areas & Beneficiaries
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-[#1a1a1a]/70 dark:text-white/70 max-w-4xl mx-auto"
        >
          Our healthcare initiatives are designed to reach vulnerable
          populations with life-saving medical services, sustainable
          infrastructure, and specialized treatment programs across Ethiopia.
        </motion.p>
      </div>

      {/* Main Interactive Interactive Area Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Navigation Sidebar */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block px-2">
              Select a Core Topic
            </span>
            {Object.values(topics).map((topic) => {
              const IconComponent = topic.icon;
              const isSelected = activeTab === topic.id;

              return (
                <button
                  key={topic.id}
                  onClick={() => setActiveTab(topic.id)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 relative flex items-center justify-between group ${
                    isSelected
                      ? "bg-white dark:bg-[#1a1a1a] border-[#B91C1C] shadow-md"
                      : "bg-gray-50 dark:bg-zinc-900/50 border-gray-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-[#1a1a1a]"
                  }`}
                >
                  {/* Selection Indicator bar */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-4 bottom-4 w-1 bg-[#B91C1C] rounded-r-md"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-3 rounded-xl transition-colors ${
                        isSelected
                          ? "bg-red-50 dark:bg-red-950/40 text-[#B91C1C]"
                          : "bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 group-hover:text-[#B91C1C]"
                      }`}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3
                        className={`font-bold transition-colors ${
                          isSelected
                            ? "text-[#B91C1C]"
                            : "text-gray-800 dark:text-zinc-200"
                        }`}
                      >
                        {topic.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                        {topic.summary}
                      </p>
                    </div>
                  </div>

                  <ArrowRight
                    className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                      isSelected
                        ? "translate-x-1 text-[#B91C1C]"
                        : "opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Interactive Dynamic Canvas Box */}
          <div className="lg:col-span-7 h-full">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-zinc-800/80 min-h-[380px] flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800/60 pb-5">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-[#B91C1C] uppercase tracking-widest">
                        Topic Insight
                      </span>
                      <h2 className="text-2xl font-serif font-bold text-[#111111] dark:text-white">
                        {topics[activeTab].title}
                      </h2>
                    </div>
                    <span
                      className="text-4xl filter drop-shadow-sm select-none"
                      role="img"
                      aria-hidden="true"
                    >
                      {topics[activeTab].emoji}
                    </span>
                  </div>

                  {/* Dynamic Rendered Content Blocks */}
                  <div className="py-2">{topics[activeTab].details}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Bottom Static Impact Banner Frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-emerald-800 to-green-700 dark:from-emerald-950 dark:to-emerald-900 rounded-3xl p-8 md:p-12 text-center shadow-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
            Delivering Healthcare Where It Is Needed Most
          </h3>
          <p className="text-white/80 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Through sustainable healthcare infrastructure, specialized medical
            treatment, emergency response systems, and international referral
            networks, we are creating long-term pathways to quality healthcare
            for vulnerable communities.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

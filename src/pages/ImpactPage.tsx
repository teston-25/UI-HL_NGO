import { useState, useEffect } from "react"; // 1. Added useEffect here
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  BarChart3,
  Loader2,
  X,
  Landmark,
  Quote,
  FileText,
  CheckCircle,
  Globe2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useBeneficiaryStats } from "../context/BeneficiaryStatsContext";
import sucSto from "../../public/sucSto.jpg";
import hospPro from "../../public/medicalH-1.png";
import { title } from "framer-motion/client";
import pic1 from "../../public/gal-0.jpg";
import { galleryImages } from "../assets/galleryImages";

export function ImpactPage() {
  const { t } = useLanguage();
  const { stats, loading } = useBeneficiaryStats();

  // Modal / Pop-out UI Control States
  const [activeModal, setActiveModal] = useState<
    "stories" | "case-studies" | null
  >(null);
  const [showAllMedia, setShowAllMedia] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<null | any>(null);

  // 2. Lock background body scroll when a modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up style if component unmounts while modal is still open
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  const status = [
    {
      value: stats?.total_beneficiaries?.toLocaleString() || "125",
      label: t.home_stats_lives || "Patients Assisted & Treated",
      icon: Users,
    },
    {
      value: stats?.international_referrals?.toLocaleString() || "23",
      label: t.home_stats_referrals || "Advanced Global Referrals",
      icon: Globe2,
    },
    {
      value: stats?.annual_target?.toLocaleString() || "5,000",
      label: t.home_stats_capacity || "Projected Annual Patient Capacity",
      icon: BarChart3,
    },
  ];
  const mediaItems = [
    {
      type: "video",
      src: "https://www.youtube.com/embed/EOBzJ2XfpaU?si=0pkuPQyedXa4vgip",
      title: "Hibret lebego program",
    },
    {
      type: "image",
      src: pic1,
      alt: "Lege Tafo Site Allocation Location",
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/5jocea5BFAA?si=SXCOEFTT2ELBAZd3",
      title: "Hibret Lebego Project Briefing",
    },
    {
      type: "image",
      src: galleryImages[1],
      alt: "hibret 1",
    },
    {
      type: "image",
      src: galleryImages[3],
      alt: "hibret 3",
    },
    {
      type: "image",
      src: galleryImages[4],
      alt: "hibret 4",
    },
    {
      type: "image",
      src: galleryImages[5],
      alt: "hibret 5",
    },
    {
      type: "image",
      src: galleryImages[6],
      alt: "hibret 8",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#0f0f0f] pt-12 pb-24 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-5xl font-bold text-[#B91C1C] mb-6"
          >
            {t.nav_impact_results || "Impact & Operational Results"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#1a1a1a]/70 dark:text-white/70 max-w-3xl mx-auto"
          >
            See the real-world impact of your support. Track our verified
            beneficiary data, historical patient testimonies, and healthcare
            pipeline progression.
          </motion.p>
        </div>

        {/* Statistics section */}
        {loading ? (
          <div className="flex justify-center my-12">
            <Loader2 className="animate-spin text-[#B91C1C] h-8 w-8" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            {status.map((s, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#1a1a1a] p-10 rounded-2xl text-center shadow-sm border border-gray-200 dark:border-zinc-800"
              >
                <s.icon className="h-12 w-12 text-[#B91C1C] dark:text-[#F87171] mx-auto mb-4" />
                <h3 className="text-4xl font-bold text-[#111111] dark:text-white mb-2">
                  {s.value}+
                </h3>
                <p className="text-[#1a1a1a]/70 dark:text-white/70 font-medium">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Success Stories & Case Studies Dynamic Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
        >
          {/* Card 1: Success Stories Pop-out Trigger */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg border border-[#B91C1C]/10 dark:border-[#B91C1C]/20 flex flex-col justify-between">
            <div>
              <div className="h-64 overflow-hidden">
                <img
                  src={sucSto}
                  alt="Success story"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl font-bold text-[#111111] dark:text-white mb-4">
                  Success Stories & Testimonies
                </h3>
                <p className="text-[#1a1a1a]/70 dark:text-white/70 mb-6">
                  Read live tracking reports of our 4-hectare infrastructure
                  allocation from the Oromia Regional State and historical case
                  data from over 125 treated patients.
                </p>
              </div>
            </div>
            <div className="p-8 pt-0">
              <button
                onClick={() => setActiveModal("stories")}
                className="text-[#B91C1C] dark:text-[#F87171] font-bold hover:underline inline-flex items-center"
              >
                Read Stories & Testimonies →
              </button>
            </div>
          </div>

          {/* Card 2: Case Studies Pop-out Trigger */}
          <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-lg border border-[#B91C1C]/10 dark:border-[#B91C1C]/20 flex flex-col justify-between">
            <div>
              <div className="h-64 overflow-hidden">
                <img
                  src={hospPro}
                  alt="Case study"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="font-serif text-2xl font-bold text-[#111111] dark:text-white mb-4">
                  Project Case Studies & Readiness
                </h3>
                <p className="text-[#1a1a1a]/70 dark:text-white/70 mb-6">
                  Review the implementation framework for the 3-story community
                  hospital layout, procurement workflows, and architectural
                  validation parameters.
                </p>
              </div>
            </div>
            <div className="p-8 pt-0">
              <button
                onClick={() => setActiveModal("case-studies")}
                className="text-[#B91C1C] dark:text-[#F87171] font-bold hover:underline inline-flex items-center"
              >
                View Project Readiness Data →
              </button>
            </div>
          </div>
        </motion.div>

        {/* Media Attachments Frame */}
        {/* Media Attachments Frame */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="font-serif text-3xl font-bold text-[#111111] dark:text-white mb-8 text-center">
            Operational Documentation & Field Visuals
          </h2>

          {/* GRID */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(showAllMedia ? mediaItems : mediaItems.slice(0, 6)).map(
                (item, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden shadow-md aspect-video cursor-pointer"
                    onClick={() => setSelectedMedia(item)}
                  >
                    {item.type === "image" ? (
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    ) : (
                      <iframe
                        className="w-full h-full pointer-events-none"
                        src={item.src}
                        title={item.title}
                      />
                    )}
                  </div>
                ),
              )}
            </div>

            {/* Blur overlay when collapsed */}
            {!showAllMedia && (
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F9F9F9] dark:from-[#0f0f0f] to-transparent pointer-events-none" />
            )}
          </div>

          {/* BUTTON */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAllMedia(!showAllMedia)}
              className="bg-[#B91C1C] hover:bg-[#991B1B] text-white px-6 py-3 rounded-full font-semibold transition"
            >
              {showAllMedia ? "Show Less" : "See More"}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/transparency"
            className="inline-block bg-[#B91C1C] text-white px-10 py-4 rounded-full font-bold hover:bg-[#991B1B] transition-colors"
          >
            See Financial Transparency & Audits
          </Link>
        </motion.div>
      </div>

      {/* Pop-out Modals Layer */}
      <AnimatePresence>
        {activeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setActiveModal(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white dark:bg-[#1a1a1a] rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Control Header */}
              <div className="border-b border-gray-100 dark:border-zinc-800 p-6 flex justify-between items-center bg-[#F9F9F9] dark:bg-[#222]">
                <div className="flex items-center space-x-3">
                  {activeModal === "stories" ? (
                    <Landmark className="h-6 w-6 text-[#B91C1C]" />
                  ) : (
                    <FileText className="h-6 w-6 text-[#B91C1C]" />
                  )}
                  <h2 className="font-serif text-2xl font-bold text-[#111111] dark:text-white">
                    {activeModal === "stories"
                      ? "Success Stories & Key Milestones"
                      : "Project Case Study Data"}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Dynamic Scrollable Inner Content Modal Container */}
              <div className="p-8 max-h-[70vh] overflow-y-auto space-y-8">
                {activeModal === "stories" ? (
                  <>
                    {/* Land Success Track Block */}
                    <div className="space-y-4">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                        Institutional Milestone Secure
                      </div>
                      <h3 className="text-xl font-bold text-[#111111] dark:text-white">
                        4-Hectare Strategic Land Acquisition Victory
                      </h3>
                      <p className="text-gray-600 dark:text-zinc-300 leading-relaxed">
                        Recognizing that a lasting impact demands permanent
                        infrastructure, Hibret Lebego engaged in a prolonged
                        advocacy campaign with regional government officials.
                        Following continuous validation, regulatory compliance
                        audits, and sustained institutional effort over several
                        years, the organization successfully secured **4
                        hectares of public land** directly designated for the
                        community hospital. This location is fully integrated
                        with local zoning laws in Lege Tafo Sub City, Sheger
                        City Administration.
                      </p>
                    </div>

                    <hr className="border-gray-100 dark:border-zinc-800" />

                    {/* Testimony Track Block */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-[#111111] dark:text-white flex items-center gap-2">
                        <Quote className="h-5 w-5 text-[#B91C1C]" /> Patient
                        Assistance Testimonies
                      </h3>
                      <p className="text-gray-600 dark:text-zinc-300 text-sm">
                        To date, Hibret Lebego has fully managed and financed
                        the specialized treatment workflows of **over 125
                        chronic kidney and cardiac disease patients** internally
                        and globally. Below are verified operational profiles:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="p-5 rounded-xl bg-gray-50 dark:bg-zinc-900 border-l-4 border-red-500">
                          <p className="text-sm italic text-gray-700 dark:text-zinc-300 mb-3">
                            "When my medical parameters required regular
                            specialized procedures that public lines couldn't
                            handle, the financial burden felt insurmountable.
                            Hibret Lebego completely stepped in, managing all
                            processing fees."
                          </p>
                          <span className="text-xs font-bold text-gray-500 block">
                            — Verified Domestic Patient Profile (Addis Ababa)
                          </span>
                        </div>

                        <div className="p-5 rounded-xl bg-gray-50 dark:bg-zinc-900 border-l-4 border-[#B91C1C]">
                          <p className="text-sm italic text-gray-700 dark:text-zinc-300 mb-3">
                            "Thanks to the international patient referral track,
                            I was one of the 23 severe case patients completely
                            processed and flown out for critical medical support
                            within a highly specialized framework."
                          </p>
                          <span className="text-xs font-bold text-gray-500 block">
                            — Referral Patient (Transferred to India Branch
                            Partner)
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Case Study Content Block */}
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30">
                        <h4 className="font-bold text-[#B91C1C] dark:text-red-400 mb-1 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Comprehensive
                          Implementation Readiness
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-zinc-400">
                          All baseline engineering milestones have been fully
                          cleared for immediate Phase 1 groundbreaking.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-bold text-[#111111] dark:text-white">
                          Architectural & Structural Baseline Parameter
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
                          Unlike standard speculative proposals, Hibret Lebego
                          has cleared all preparatory tasks. Full structural
                          blueprinted designs, complex mechanical, electrical,
                          and plumbing engineering parameters, and site-specific
                          soil density tests have been completed and approved by
                          regulatory city branches.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-bold text-[#111111] dark:text-white">
                          Long-term Public Sustainability Parameters
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-zinc-300 leading-relaxed">
                          To assure long-term sustainability after the funding
                          phase is deployed, a binding operational agreement has
                          been structured with municipal healthcare boards.
                          Local government health offices will directly take
                          over clinical recruitment, payroll management, and
                          permanent physician assignment, entirely removing
                          recurrent salary burdens from charitable donation
                          pools.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Modal Bottom Footer Section */}
              <div className="border-t border-gray-100 dark:border-zinc-800 p-6 bg-[#F9F9F9] dark:bg-[#222] flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-2 rounded-xl text-sm font-semibold bg-[#B91C1C] hover:bg-[#991B1B] text-white transition-colors"
                >
                  Close Panel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {selectedMedia && (
        <div
          className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedMedia.type === "image" ? (
              <img
                src={selectedMedia.src}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
            ) : (
              <iframe
                className="w-full h-[70vh] rounded-xl"
                src={selectedMedia.src}
                allowFullScreen
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

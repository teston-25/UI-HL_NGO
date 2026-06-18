import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TestimonialsSection } from "../components/home/TestimonialsSection";
import { testimonials } from "../components/home/data/testimonials";
import { ArrowRight, Users, Globe, Droplets, Loader2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useBeneficiaryStats } from "../context/BeneficiaryStatsContext";
import { useEmergency } from "../context/EmergencyContext";
import { useNews } from "../context/NewsContext";
import ourProImage from "../svg/Our_Pro.png";
import heroImage from "../assets/HomePage-Pic.png";

export function HomePage() {
  const { t } = useLanguage();
  const { stats, loading: statsLoading } = useBeneficiaryStats();
  const { fetchAll } = useEmergency();
  const { fetchNews } = useNews();

  // Core Programs completely localized dynamically using Language Context
  const CorePrograms = [
    {
      title:
        t.home_program_healthcare_title || "Comprehensive Healthcare Services",
      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
      desc:
        t.home_program_healthcare_desc ||
        "Integrating specialized medical treatments under one roof, including a 10-machine kidney dialysis unit for chronic kidney disease patients, maternal and child healthcare, full diagnostic laboratories, and 24/7 outpatient emergency services.",
    },
    {
      title: t.home_program_hospital_title || "The Community Hospital Project",
      image:
        ourProImage ||
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      desc:
        t.home_program_hospital_desc ||
        "The phase-one construction of a modern three-story medical facility on 4 hectares of land in Lege Tafo, Sheger City. Built entirely to establish sustainable, implementation-ready infrastructure designed to serve over 5,000 disadvantaged people annually across three regions.",
    },
  ];

  const missionData = [
    {
      title: "Who We Are",
      text:
        t.home_who_we_are ||
        "A dedicated charitable association focusing on scaling permanent public infrastructure and complex healthcare networks to establish sustainable, implementation-ready solutions.",
      color:
        "border-[#B91C1C]/20 hover:border-[#B91C1C]/50 bg-white dark:bg-[#1a1a1a]",
    },
    {
      title: "What Problems We Solve",
      text:
        t.home_what_we_solve ||
        "Bridging structural healthcare gaps by clearing critical engineering milestones, securing municipal healthcare payroll agreements, and completely managing financial processing burdens for patients.",
      color:
        "border-[#15803d]/20 hover:border-[#15803d]/50 bg-white dark:bg-[#1a1a1a]",
    },
    {
      title: "Who We Help",
      text:
        t.home_who_we_help ||
        "Disadvantaged and severe-case chronic kidney and cardiac disease patients requiring specialized domestic medical treatments or complex international referral track management.",
      color:
        "border-[#B91C1C]/20 hover:border-[#B91C1C]/50 bg-white dark:bg-[#1a1a1a]",
    },
    {
      title: "Our Long-Term Vision",
      text:
        t.home_our_vision ||
        "Completing modern 3-story healthcare infrastructure designs, establishing 10-machine clinical dialysis suites, and serving over 5,000 vulnerable individuals annually across multiple regions.",
      color:
        "border-[#15803d]/20 hover:border-[#15803d]/50 bg-white dark:bg-[#1a1a1a]",
    },
  ];

  useEffect(() => {
    fetchAll();
    fetchNews();
  }, [fetchAll, fetchNews]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const getVisibleCount = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / visibleCount);
  const maxIndex = totalSlides - 1;

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, maxIndex, isAnimating]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="HomePage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#B91C1C]/30 to-[#15803d]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            {t.home_hero_title_1}
            <br />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 font-light text-white/90"
          >
            {t.home_hero_subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              to="/donate"
              className="bg-[#B91C1C] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#15803d] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t.nav_donate}
            </Link>
            <Link
              to="/programs"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#111111] transition-all"
            >
              {t.home_hero_programs_btn}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-[#F9F9F9] dark:bg-[#0f0f0f] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {statsLoading ? (
              <div className="flex justify-center items-center h-48 mx-auto">
                <Loader2 className="w-8 h-8 animate-spin text-[#B91C1C]" />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-8 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-[#B91C1C]/10 dark:border-[#B91C1C]/20 transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#B91C1C]/10 dark:bg-[#B91C1C]/20 rounded-full mb-6">
                  <Users className="h-8 w-8 text-[#B91C1C] dark:text-[#F87171]" />
                </div>
                <h3 className="text-4xl font-bold text-[#111111] dark:text-white mb-2 font-serif">
                  {stats?.total_beneficiaries?.toLocaleString() || "125"}+
                </h3>
                <p className="text-[#1a1a1a]/70 dark:text-white/70 text-lg font-medium">
                  {t.home_stats_lives || "Patients Assisted & Treated"}
                </p>
              </motion.div>
            )}

            {statsLoading ? (
              <div className="flex justify-center items-center h-48 mx-auto">
                <Loader2 className="w-8 h-8 animate-spin text-[#B91C1C]" />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-8 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-[#B91C1C]/10 dark:border-[#B91C1C]/20 transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#111111]/10 dark:bg-white/10 rounded-full mb-6">
                  <Globe className="h-8 w-8 text-[#111111] dark:text-white" />
                </div>
                <h3 className="text-4xl font-bold text-[#111111] dark:text-white mb-2 font-serif">
                  {stats?.international_referrals?.toLocaleString() || "23"}+
                </h3>
                <p className="text-[#1a1a1a]/70 dark:text-white/70 text-lg font-medium">
                  {t.home_stats_referrals || "Advanced Global Referrals"}
                </p>
              </motion.div>
            )}

            {statsLoading ? (
              <div className="flex justify-center items-center h-48 mx-auto">
                <Loader2 className="w-8 h-8 animate-spin text-[#B91C1C]" />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-8 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-[#B91C1C]/10 dark:border-[#B91C1C]/20 transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#B91C1C]/10 dark:bg-[#B91C1C]/20 rounded-full mb-6">
                  <Droplets className="h-8 w-8 text-[#B91C1C] dark:text-[#F87171]" />
                </div>
                <h3 className="text-4xl font-bold text-[#111111] dark:text-white mb-2 font-serif">
                  {stats?.annual_target?.toLocaleString() || "5,000"}+
                </h3>
                <p className="text-[#1a1a1a]/70 dark:text-white/70 text-lg font-medium">
                  {t.home_stats_capacity || "Projected Annual Patient Capacity"}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Mission & Vision - Light Brand Identity Styling */}
      <section className="py-24 bg-[#FAF9F6] dark:bg-[#0d0d0d] text-[#111111] dark:text-white relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B91C1C]/5 dark:bg-[#B91C1C]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#15803d]/5 dark:bg-[#15803d]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
              Our <span className="text-[#B91C1C]">Mission</span> &{" "}
              <span className="text-[#15803d]">Vision</span>
            </h2>

            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-2xl font-medium italic border-l-4 border-[#B91C1C] pl-6 py-2 text-gray-800 dark:text-zinc-200">
                "
                {t.home_mission_quote ||
                  "Bridging institutional backing with permanent, life-saving infrastructure to serve marginalized communities."}
                "
              </p>
              <p className="text-lg text-gray-600 dark:text-zinc-400 leading-relaxed">
                {t.home_mission_text ||
                  "Hibret Lebego operates at the intersection of regulatory compliance, government advocacy, and strategic development to systematically transition severe health and infrastructure crises into manageable public assets."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {missionData.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group p-8 rounded-2xl border ${item.color} shadow-sm hover:shadow-md transition-all duration-300`}
              >
                <h3
                  className={`font-serif text-xl font-bold mb-4 ${
                    i % 2 === 0 ? "text-[#B91C1C]" : "text-[#15803d]"
                  }`}
                >
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-zinc-300 leading-relaxed transition-colors">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-3 rounded-full border border-[#B91C1C] text-[#B91C1C] font-bold text-lg hover:bg-[#B91C1C] hover:text-white transition-all duration-300 group"
            >
              {t.home_read_story || "Read Our Full Story"}
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Programs Preview */}
      <section className="py-24 bg-[#F9F9F9] dark:bg-[#0f0f0f] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold text-[#111111] dark:text-white mb-4">
              {t.home_programs_title}
            </h2>
            <p className="text-xl text-[#1a1a1a]/70 dark:text-white/70 max-w-2xl mx-auto">
              {t.home_programs_subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CorePrograms.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-2xl font-bold text-[#B91C1C] dark:text-white mb-3">
                    {program.title}
                  </h3>
                  <p className="text-[#1a1a1a]/70 dark:text-white/70 mb-6">
                    {program.desc}
                  </p>
                  <Link
                    to="/programs"
                    className="text-[#B91C1C] dark:text-[#F87171] font-semibold hover:text-[#991B1B] dark:hover:text-white transition-colors inline-flex items-center"
                  >
                    {t.home_learn_more || "Learn More"}{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-24 bg-[#d9fae5] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-dots" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#111111] mb-6">
            {t.home_cta_title}
          </h2>
          <p className="text-xl text-[#111111] mb-10 max-w-2xl mx-auto">
            {t.home_cta_text}
          </p>
          <Link
            to="/donate"
            className="inline-block bg-white text-[#B91C1C] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#B91C1C] hover:text-white transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t.home_give_today}
          </Link>
        </div>
      </section>
    </div>
  );
}

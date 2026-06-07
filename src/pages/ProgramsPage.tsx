import { motion } from "framer-motion";
import {
  Building2,
  HeartHandshake,
  Stethoscope,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import ourProImage from "../svg/Our_Pro.png";
export function ProgramsPage() {
  const { t } = useLanguage();
  const programs = [
    {
      id: "healthcare-services",
      title: "Comprehensive Healthcare Services",
      icon: Stethoscope,
      image:
        "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=2070&q=80",
      description:
        "Integrating specialized medical treatments to address critical public health concerns. This includes a primary 10-machine hemodialysis unit for chronic kidney disease patients, dedicated maternal and child health wings, full diagnostic laboratories (CT scan, X-Ray, Ultrasound), and outpatient emergency service structures.",
      impact:
        "Providing life-saving medical procedures and diagnostics for more than 5,000 disadvantaged patients every single year who cannot afford private care.",
      supportMessage:
        "Your support directly funds medical equipment, dialysis consumables, and subsidized clinical care for vulnerable families.",
    },
    {
      id: "hospital-project",
      title: "Community Hospital Construction",
      icon: Building2,
      image: ourProImage,
      description:
        "The phase-one infrastructure deployment of a three-story community hospital built on 4 hectares of land secured from the Oromia Regional State in Sheger City, Lege Tafo Sub City. The project is completely implementation-ready with architectural and engineering designs finalized.",
      impact:
        "Establishing a permanent, sustainable 24-month construction infrastructure that bridges major medical accessibility gaps for three regional states.",
      supportMessage:
        "Every contribution safeguards human dignity by funding structural work, utility installation, and long-term healthcare infrastructure development.",
    },
    {
      id: "medical-assistance-track",
      title: "Patient Medical Assistance Track",
      icon: HeartHandshake,
      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2070&q=80",
      description:
        "Continuing the founding legacy of our organization by covering medical treatment costs for vulnerable individuals suffering from chronic conditions. This track handles patient identification, verification with local social affairs departments, and referral networks for advanced care.",
      impact:
        "Building upon our proven track record of covering life-saving medical costs for over 125 vulnerable patients, including enabling 23 patients to successfully access specialized treatment abroad.",
      supportMessage:
        "Transforming donations directly into direct medical interventions, overseas referrals, and immediate patient aid.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#0f0f0f] pt-12 pb-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="font-serif text-5xl font-bold text-[#B91C1C] mb-6"
          >
            {t.programs_title}
          </motion.h1>
          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
            className="text-xl text-[#1a1a1a]/70 dark:text-white/70 max-w-3xl mx-auto"
          >
            {t.programs_subtitle}
          </motion.p>
        </div>

        <div className="space-y-24">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
              className={`flex flex-col ${
                index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              } gap-12 items-center`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                  <div className="absolute inset-0 bg-[#B91C1C]/20 group-hover:bg-transparent transition-colors duration-500" />
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-[#B91C1C]/10 dark:bg-[#B91C1C]/20 rounded-full">
                    <program.icon className="h-8 w-8 text-[#05ea59] dark:text-[#86efac]" />
                  </div>
                  <h2 className="font-serif text-3xl font-bold text-[#B91C1C] dark:text-white">
                    {program.title}
                  </h2>
                </div>

                <p className="text-lg text-[#1a1a1a]/80 dark:text-white/80 mb-8 leading-relaxed">
                  {program.description}
                </p>

                <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl border-l-4 border-[#B91C1C] shadow-sm mb-8 transition-colors duration-300">
                  <h3 className="font-bold text-[#B91C1C] dark:text-[#F87171] mb-2 uppercase tracking-wide text-sm">
                    {t.programs_impact_label}
                  </h3>
                  <ul className="space-y-2">
                    {program.impact.split("\n").map((item, idx) => (
                      <li
                        key={idx}
                        className="text-[#1a1a1a]/80 dark:text-white/80 italic list-disc list-inside"
                      >
                        {item.replace(/^[•\s]/, "")}
                      </li>
                    ))}
                  </ul>
                </div>

                {program.supportMessage && (
                  <p className="text-sm text-[#1a1a1a]/60 dark:text-white/60 italic mb-4">
                    {program.supportMessage}
                  </p>
                )}
                <Link
                  to="/donate"
                  className="inline-flex items-center text-[#B91C1C] dark:text-[#F87171] font-bold hover:text-[#991B1B] dark:hover:text-white transition-colors"
                >
                  {t.programs_support_btn}{" "}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Target Areas (Beneficiaries) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="bg-white dark:bg-[#1a1a1a] p-8 md:p-12 rounded-2xl border border-[#86efac]/30 dark:border-[#86efac]/20 text-center">
            <h3 className="font-serif text-3xl font-bold text-[#111111] dark:text-white mb-4">
              Target Areas & Beneficiaries
            </h3>

            <p className="text-[#1a1a1a]/70 dark:text-white/70 max-w-2xl mx-auto mb-8">
              Learn more about the communities we serve, including rural
              communities, children and youth, women and mothers, and families
              affected by crisis and displacement.
            </p>

            <Link
              to="/target-areas"
              className="inline-flex items-center bg-[#B91C1C] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#15803d] transition-colors"
            >
              Explore Target Areas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

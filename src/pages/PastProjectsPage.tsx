import { motion } from "framer-motion";
import { BookOpen, Droplets, Heart, GraduationCap } from "lucide-react";

const pastProjects = [
  {
    region: "Lege Tafo (Sheger City)",
    projects: "Community Hospital Infrastructure • Sustainable Construction",
    description:
      "A long-term healthcare foundation is taking shape through the construction of a modern three-story hospital on 4 hectares of land. This project is designed to permanently strengthen local healthcare access and reduce dependency on distant facilities for critical care.",
    icon: BookOpen,
    bgImage:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    region: "Specialized Medical Units",
    projects: "Dialysis Center • Chronic Care Support Systems",
    description:
      "Advanced medical units have been introduced to address life-threatening chronic conditions, including a high-capacity 10-machine dialysis center. These facilities are built to ensure continuous, life-sustaining treatment for vulnerable patients with kidney disease and related complications.",
    icon: Droplets,
    bgImage:
      "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    region: "Maternal & Outpatient Care",
    projects: "24/7 Emergency Response • Maternal Health Programs",
    description:
      "Continuous care systems now operate around the clock to support mothers, children, and emergency patients. Integrated maternal health pathways and outpatient services ensure that urgent medical needs are addressed without delay across surrounding communities.",
    icon: Heart,
    bgImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    region: "International Network Placements",
    projects: "Global Referrals • Medical Partnerships",
    description:
      "For critical cases requiring advanced intervention, structured referral pathways connect patients to international medical networks. This system ensures access to specialized treatment beyond local capacity, while maintaining coordinated care and patient support throughout the process.",
    icon: GraduationCap,
    bgImage:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];
export function PastProjectsPage() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#0f0f0f] pt-12 pb-24 transition-colors duration-300">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-5xl font-bold text-[#B91C1C] dark:text-[#F87171] mb-6"
        >
          Past Projects
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-[#1a1a1a]/70 dark:text-white/70 max-w-3xl mx-auto"
        >
          A look at our completed projects across Ethiopia, making lasting
          impact in communities in need.
        </motion.p>
      </div>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pastProjects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800"
              >
                {/* Image Background Header with Dark Overlay */}
                <div
                  className="relative bg-cover bg-center p-6 flex items-center gap-4 min-h-[120px]"
                  style={{ backgroundImage: `url(${project.bgImage})` }}
                >
                  {/* Overlay layer to protect text contrast */}
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />

                  {/* Header Content Wrapper (relative z-10 puts it over the overlay) */}
                  <div className="relative z-10 flex items-center gap-4 w-full">
                    <div className="p-3 bg-white/20 backdrop-blur-xs rounded-xl">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {project.region}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#86efac]/20 text-[#15803d] dark:text-[#86efac] text-sm font-medium">
                      {project.projects}
                    </span>
                  </div>
                  <p className="text-[#1a1a1a]/80 dark:text-white/80 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Synchronized Metrics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#F9F9F9] to-[#F4F4F2] dark:from-[#050505] dark:to-[#111111] rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-[#86efac]">
                4+
              </div>
              <div className="text-white/70 text-lg">Regions Covered</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-[#86efac]">
                23+
              </div>
              <div className="text-white/70 text-lg">
                International Placements
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-[#86efac]">
                10
              </div>
              <div className="text-white/70 text-lg">
                Dialysis Machine Stations
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

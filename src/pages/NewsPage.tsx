import { motion } from "framer-motion";
import { useEffect } from "react";
import { Calendar, ArrowRight, Loader2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useNews } from "../context/NewsContext";

export function NewsPage() {
  const { t } = useLanguage();
  const { news, loading: newsLoading, fetchNews } = useNews();

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (newsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9] dark:bg-[#0f0f0f]">
        <Loader2 className="animate-spin h-10 w-10 text-[#B91C1C]" />
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9] dark:bg-[#0f0f0f]">
        <p className="text-xl opacity-50">No news available at the moment.</p>
      </div>
    );
  }

  // Variables for cleaner access
  const featuredStory = news[0];
  const remainingStories = news.slice(1);

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
            {t.news_title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#1a1a1a]/70 dark:text-white/70 max-w-3xl mx-auto"
          >
            {t.news_subtitle}
          </motion.p>
        </div>

        {/* Featured Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-xl border border-[#B91C1C]/10 dark:border-[#B91C1C]/20 mb-16 grid grid-cols-1 lg:grid-cols-2"
        >
          <div className="h-96 lg:h-auto relative">
            <img
              src={
                // featuredStory.image_url ||
                "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              }
              alt="Featured story"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center space-x-4 text-sm text-[#B91C1C] font-bold uppercase tracking-wide mb-4">
              <span>{featuredStory.category || "General"}</span>
              <span>•</span>
              <span>
                {featuredStory.published_at?.split("T")[0] || "Recent"}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#111111] dark:text-white mb-6">
              {featuredStory.title}
            </h2>
            <p className="text-lg text-[#1a1a1a]/80 dark:text-white/80 mb-8 leading-relaxed">
              {featuredStory.excerpt}
            </p>
            <button className="text-[#B91C1C] dark:text-[#F87171] font-bold text-lg flex items-center hover:underline group">
              {t.news_read_more}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Latest Stories Grid */}
        {remainingStories.length > 0 && (
          <>
            <h2 className="font-serif text-3xl font-bold text-[#111111] dark:text-white mb-8">
              {t.news_latest}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {remainingStories.map((story, index) => (
                <motion.div
                  key={story.id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-[#B91C1C]/10 dark:border-[#B91C1C]/20 flex flex-col group"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={
                        story.image_url ||
                        "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                      }
                      alt={story.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {story.published_at?.split("T")[0] || "Recent"}
                      </span>
                      <span className="text-[#B91C1C] dark:text-[#F87171] font-semibold">
                        {story.category}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#111111] dark:text-white mb-3 line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-[#1a1a1a]/70 dark:text-white/70 text-sm mb-4 flex-1 line-clamp-3">
                      {story.excerpt}
                    </p>
                    <button className="text-[#B91C1C] dark:text-[#F87171] font-semibold text-sm flex items-center hover:underline mt-auto group">
                      {t.news_read_more}
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

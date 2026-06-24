import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, X } from "lucide-react";
import { testimonials } from "./data/testimonials";
export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [direction, setDirection] = useState(1);
  const [isTouch, setIsTouch] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const getVisible = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  };

  const [visible, setVisible] = useState(getVisible());

  useEffect(() => {
    const handleResize = () => setVisible(getVisible());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    setIsTouch(touch);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / visible);

  // AUTO SLIDE
  useEffect(() => {
    if (paused || selected) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  }, [paused, selected, totalSlides]);

  // LOCK BODY SCROLL WHEN MODAL OPEN
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selected]);

  const next = () => {
    setDirection(1);
    setIndex((p) => (p + 1) % totalSlides);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((p) => (p - 1 + totalSlides) % totalSlides);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;

    const endX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - endX;

    if (diff > 50) next(); // swipe left
    if (diff < -50) prev(); // swipe right

    touchStartX.current = null;
  };
  const start = index * visible;
  const visibleItems = testimonials.slice(start, start + visible);

  return (
    <section className="py-24 bg-white overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-8">
        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-[#B91C1C]">
            Testimonials
          </h2>
        </div>

        {/* SLIDER AREA */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={isTouch ? handleTouchStart : undefined}
          onTouchEnd={isTouch ? handleTouchEnd : undefined}
          className="relative w-full overflow-hidden touch-pan-y"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: direction === 1 ? "10%" : "-10%",
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: direction === 1 ? -80 : 80,
              }}
              transition={{ duration: 0.6 }}
              className="flex w-full gap-6"
            >
              {visibleItems.map((t, i) => (
                <div
                  key={i}
                  /* FIXED MIN-WIDTHS USING CALC TO ACCOUNT FOR THE GAP-6 */
                  className="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] cursor-pointer bg-white p-6 rounded-2xl shadow border hover:shadow-xl transition"
                  onClick={() => setSelected(t)}
                >
                  <Quote className="text-[#B91C1C]/30 mb-4" />

                  <div className="mb-4">
                    <p className="italic text-gray-700">"{t.quote}"</p>

                    <div className="flex justify-end">
                      <p className="text-sm text-[#B91C1C] font-semibold cursor-pointer hover:underline">
                        Read more
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={t.image}
                      className="w-10 h-10 rounded-full object-cover"
                      alt={t.author}
                    />
                    <div>
                      <h4 className="font-bold">{t.author}</h4>
                      <p className="text-sm text-[#B91C1C]">{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* CONTROLS */}
          <div className="flex flex-col items-center mt-10 gap-4">
            <div className="flex items-center gap-6">
              <button
                onClick={prev}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={next}
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <ChevronRight />
              </button>
            </div>

            <div className="text-sm text-gray-600">
              <span className="font-bold text-[#B91C1C]">{index + 1}</span>
              {" / "}
              <span>{totalSlides}</span>
            </div>
          </div>
        </div>

        {/* MODAL */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white max-w-lg w-full max-h-[80vh] overflow-hidden rounded-2xl relative flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* CLOSE BUTTON */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 z-20 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition"
                >
                  <X size={18} />
                </button>

                {/* STICKY HEADER */}
                <div className="flex items-center gap-3 p-4 border-b bg-white sticky top-0 z-10">
                  <img
                    src={selected.image}
                    className="w-14 h-14 md:w-16 md:h-16 object-cover border border-gray-100 flex-shrink-0 shadow-sm"
                    alt={selected.author}
                  />
                  <div>
                    <h4 className="font-bold">{selected.author}</h4>
                    <p className="text-sm text-[#B91C1C]">
                      {selected.location}
                    </p>
                  </div>
                </div>

                {/* SCROLLABLE STORY */}
                <div className="p-4 overflow-y-auto">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {selected.story}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

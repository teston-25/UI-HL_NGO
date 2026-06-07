import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import donateImage from "../svg/QR_code.jpg";
import { useDonation } from "../context/DonationContext";
import { Loader2 } from "lucide-react";
import { useToast } from "../components/Toast";

export function DonatePage() {
  const { t } = useLanguage();
  const { initializePayment, loading, error } = useDonation();
  const { showToast } = useToast();

  type ApiError = {
    response?: { data?: { message?: string } };
    message?: string;
  };

  const getErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    if (typeof error === "object" && error !== null) {
      const errObj = error as ApiError;
      return (
        errObj.response?.data?.message ||
        errObj.message ||
        "Payment initialization failed."
      );
    }
    return String(error || "Payment initialization failed.");
  };

  const [form, setForm] = useState({
    amount: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    title: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.amount ||
      !form.first_name ||
      !form.last_name ||
      !form.email ||
      Number(form.amount) <= 0
    ) {
      showToast("error", "Please fill in all required fields.");
      return;
    }

    try {
      const res = await initializePayment({
        amount: Number(form.amount),
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
        phone_number: form.phone_number,
      });
      window.location.href = res.checkout_url;
    } catch (error) {
      const message = getErrorMessage(error);
      console.log("Payment initialization error:", message);
      showToast("error", message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#0f0f0f] py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Link
            to="/transparency"
            className="text-sm text-[#15803d] dark:text-[#86efac] font-bold hover:underline mb-4 block"
          >
            See how we use your donations →
          </Link>
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="font-serif text-4xl md:text-5xl font-bold text-[#B91C1C] mb-4"
          >
            {t.donate_title}
          </motion.h1>
          <p className="text-xl text-[#1a1a1a]/70 dark:text-white/70">
            {t.donate_subtitle}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.2,
            }}
            className="flex-1 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl overflow-hidden border border-[#B91C1C]/10 dark:border-[#B91C1C]/20 transition-colors duration-300 w-full"
          >
            <div className="p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#111111] dark:text-white mb-4">
                    {t.donate_info_title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">
                        Br
                      </span>
                      <input
                        name="amount"
                        type="number"
                        min="1"
                        step="0.01"
                        placeholder="0.00"
                        value={form.amount}
                        onChange={(e) =>
                          setForm({ ...form, amount: e.target.value })
                        }
                        className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-[#1a1a1a] dark:text-white focus:border-[#B91C1C] focus:ring-2 focus:ring-[#B91C1C]/20 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t.donate_first_name}
                      </label>
                      <input
                        name="first_name"
                        type="text"
                        value={form.first_name}
                        onChange={(e) =>
                          setForm({ ...form, first_name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-[#1a1a1a] dark:text-white focus:border-[#B91C1C] focus:ring-2 focus:ring-[#B91C1C]/20 outline-none transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t.donate_last_name}
                      </label>
                      <input
                        name="last_name"
                        type="text"
                        value={form.last_name}
                        onChange={(e) =>
                          setForm({ ...form, last_name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-[#1a1a1a] dark:text-white focus:border-[#B91C1C] focus:ring-2 focus:ring-[#B91C1C]/20 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t.donate_email}
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-[#1a1a1a] dark:text-white focus:border-[#B91C1C] focus:ring-2 focus:ring-[#B91C1C]/20 outline-none transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Phone Number
                      </label>
                      <input
                        name="phone_number"
                        value={form.phone_number}
                        onChange={(e) =>
                          setForm({ ...form, phone_number: e.target.value })
                        }
                        type="tel"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-[#1a1a1a] dark:text-white focus:border-[#B91C1C] focus:ring-2 focus:ring-[#B91C1C]/20 outline-none transition-all"
                        placeholder="+251 9XX XXX XXX"
                      />
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Title
                    </label>
                    <input
                      name="title"
                      type="text"
                      value={form.title}
                      onChange={(e) =>
                        setForm({ ...form, title: e.target.value })
                      }
                      placeholder="e.g. Donation for Education Program"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-[#1a1a1a] dark:text-white focus:border-[#B91C1C] focus:ring-2 focus:ring-[#B91C1C]/20 outline-none transition-all"
                    />
                  </div>
                  <div className="mt-4 space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <textarea
                      name="description"
                      rows={3}
                      value={form.description}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      placeholder="Optional message or purpose of donation"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2a2a2a] text-[#1a1a1a] dark:text-white focus:border-[#B91C1C] focus:ring-2 focus:ring-[#B91C1C]/20 outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#B91C1C] text-white font-bold text-lg py-4 rounded-xl hover:bg-[#15803d] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="animate-spin mx-auto" />
                  ) : (
                    t.donate_submit_btn
                  )}
                </button>
                {error && (
                  <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-600 dark:text-red-400 text-sm">
                      {error}
                    </p>
                  </div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Right side with vertical line */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.4,
            }}
            className="flex-1 flex flex-col items-center justify-center w-full lg:pt-0 pt-8 border-l-2 border-[#B91C1C]/30 dark:border-[#86efac]/30 lg:pl-8"
          >
            <div className="relative">
              <h2 className="text-[#15803d]">Or Scan me to make a payment</h2>{" "}
              <br />
              <img
                src={donateImage}
                alt="Donation impact"
                className="max-w-md w-full h-auto rounded-2xl shadow-xl object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15803d]/20 to-transparent rounded-2xl"></div>
            </div>
            <p className="mt-6 text-center text-gray-600 dark:text-gray-400 max-w-md">
              Your generosity makes a difference. Together, we can create
              lasting change in our community.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

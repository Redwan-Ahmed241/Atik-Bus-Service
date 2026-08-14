"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  CalendarDays,
  Users,
  ArrowRight,
  Bus,
  GraduationCap,
  Shield,
  Clock,
  Star,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { destinations, upcomingExams } from "@/data/mockData";
import { formatDate } from "@/lib/utils";
import LiveStatusBanner from "@/components/LiveStatusBanner";

export default function HomePage() {
  const router = useRouter();
  const { searchParams, setSearchParams } = useBookingStore();
  const [mode, setMode] = useState<"exam" | "rental">(searchParams.mode);

  const handleSearch = () => {
    setSearchParams({ mode });
    if (mode === "rental") {
      router.push("/rental");
    } else {
      router.push("/buses");
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 bg-navy-500/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-semibold mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                Trusted by 5,000+ Students from Kushtia
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Your Ride to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-300">
                  University
                </span>{" "}
                Starts Here
              </h1>

              <p className="text-lg text-navy-300 max-w-xl mb-8 leading-relaxed">
                Book comfortable, reliable transport from Kushtia to every major
                university admission exam center. AC coaches, student-friendly
                fares, and guaranteed seats.
              </p>

              <div className="flex flex-wrap gap-6 text-sm text-navy-300">
                {[
                  { icon: Shield, text: "Safe & Verified" },
                  { icon: Clock, text: "On-time Guaranteed" },
                  { icon: Star, text: "4.8★ Rated" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-green-400" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Search Widget */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="bg-white/[0.07] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
                <h2 className="text-white font-bold text-xl mb-6">
                  Book Your Journey
                </h2>

                {/* Mode Toggle */}
                <div className="flex bg-navy-800/80 rounded-2xl p-1.5 mb-6">
                  {[
                    {
                      value: "exam" as const,
                      label: "Exam Routes",
                      icon: GraduationCap,
                    },
                    {
                      value: "rental" as const,
                      label: "Private Rental",
                      icon: Bus,
                    },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setMode(option.value);
                        setSearchParams({ mode: option.value });
                      }}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        mode === option.value
                          ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25"
                          : "text-navy-300 hover:text-white"
                      }`}
                    >
                      <option.icon className="w-4 h-4" />
                      {option.label}
                    </button>
                  ))}
                </div>

                {mode === "exam" ? (
                  <div className="space-y-4">
                    {/* From */}
                    <div>
                      <label className="text-navy-300 text-xs font-medium uppercase tracking-wider mb-1.5 block">
                        From
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                        <input
                          type="text"
                          value="Kushtia (Mojampur Gate)"
                          readOnly
                          className="w-full pl-10 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-medium cursor-not-allowed opacity-70"
                        />
                      </div>
                    </div>

                    {/* To */}
                    <div>
                      <label className="text-navy-300 text-xs font-medium uppercase tracking-wider mb-1.5 block">
                        Destination (Exam Center)
                      </label>
                      <div className="relative">
                        <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                        <select
                          value={searchParams.to}
                          onChange={(e) =>
                            setSearchParams({ to: e.target.value })
                          }
                          className="w-full pl-10 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-medium appearance-none cursor-pointer hover:border-green-500/30 transition-colors focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20"
                        >
                          <option value="" className="bg-navy-800">
                            Select exam destination...
                          </option>
                          {destinations.map((dest) => (
                            <option
                              key={dest.examId}
                              value={dest.value}
                              className="bg-navy-800"
                            >
                              {dest.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Date & Passengers */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-navy-300 text-xs font-medium uppercase tracking-wider mb-1.5 block">
                          Travel Date
                        </label>
                        <div className="relative">
                          <CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                          <input
                            type="date"
                            value={searchParams.date}
                            onChange={(e) =>
                              setSearchParams({ date: e.target.value })
                            }
                            className="w-full pl-10 pr-3 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-medium hover:border-green-500/30 transition-colors focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20 [color-scheme:dark]"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-navy-300 text-xs font-medium uppercase tracking-wider mb-1.5 block">
                          Passengers
                        </label>
                        <div className="relative">
                          <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                          <select
                            value={searchParams.passengers}
                            onChange={(e) =>
                              setSearchParams({
                                passengers: parseInt(e.target.value),
                              })
                            }
                            className="w-full pl-10 pr-3 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm font-medium appearance-none cursor-pointer hover:border-green-500/30 transition-colors focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/20"
                          >
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                              <option key={n} value={n} className="bg-navy-800">
                                {n} {n === 1 ? "Passenger" : "Passengers"}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Search Button */}
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleSearch}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-shadow text-base mt-2"
                    >
                      <Search className="w-5 h-5" />
                      Search Available Buses
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </motion.button>
                  </div>
                ) : (
                  /* Rental Quick Link */
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Bus className="w-8 h-8 text-green-400" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      Need a Private Bus?
                    </h3>
                    <p className="text-navy-300 text-sm mb-6 max-w-xs mx-auto">
                      Rent a full bus for your group — picnics, events, custom
                      routes. 29 to 52 seater available.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleSearch}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-shadow"
                    >
                      Request a Rental Quote
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Status Banner */}
      <LiveStatusBanner />

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                value: "5,000+",
                label: "Students Served",
                color: "text-navy-800",
              },
              {
                value: "150+",
                label: "Exam Trips Completed",
                color: "text-green-600",
              },
              {
                value: "8+",
                label: "University Routes",
                color: "text-navy-800",
              },
              {
                value: "4.8★",
                label: "Average Rating",
                color: "text-gold-500",
              },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center py-6"
              >
                <div
                  className={`text-3xl sm:text-4xl font-bold ${stat.color} mb-1`}
                >
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Exams Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-800 mb-3">
              Upcoming University Admissions
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              We&apos;re preparing dedicated bus routes for every major
              admission exam. Book early to secure your seat.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcomingExams.map((exam, idx) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl p-5 border border-slate-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-500/5 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-navy-50 group-hover:bg-green-50 rounded-xl flex items-center justify-center transition-colors">
                    <GraduationCap className="w-5 h-5 text-navy-600 group-hover:text-green-600 transition-colors" />
                  </div>
                  <span
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                      exam.status === "open"
                        ? "bg-green-50 text-green-600"
                        : exam.status === "closing_soon"
                          ? "bg-yellow-50 text-yellow-600"
                          : exam.status === "sold_out"
                            ? "bg-red-50 text-red-600"
                            : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {exam.status === "open"
                      ? "Open"
                      : exam.status === "closing_soon"
                        ? "Closing Soon"
                        : exam.status === "sold_out"
                          ? "Sold Out"
                          : "Coming Soon"}
                  </span>
                </div>

                <h3 className="font-bold text-navy-800 text-sm mb-1">
                  {exam.university}
                </h3>
                <p className="text-xs text-slate-500 mb-3">{exam.examCenter}</p>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <CalendarDays className="w-3.5 h-3.5" />
                    {formatDate(exam.examDate)}
                  </div>
                  {exam.bookingOpen && (
                    <button
                      onClick={() => {
                        setSearchParams({ to: exam.destination, mode: "exam" });
                        router.push("/buses");
                      }}
                      className="text-xs font-semibold text-green-600 hover:text-green-700 flex items-center gap-1"
                    >
                      Book <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-800 mb-3">
              Why Students Trust Atik Bus
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              We understand the pressure of exam day. That&apos;s why every
              detail is designed around your comfort and peace of mind.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Student Safety First",
                desc: "Gender-aware seating, verified passengers, and experienced drivers on every route.",
                color: "from-navy-500 to-navy-600",
              },
              {
                icon: Clock,
                title: "On-Time Guarantee",
                desc: "We depart on schedule and arrive with time to spare. Your exam waits for no one.",
                color: "from-green-500 to-green-600",
              },
              {
                icon: Star,
                title: "Comfortable Coaches",
                desc: "AC & Non-AC options with charging ports, water, and blankets for overnight journeys.",
                color: "from-gold-400 to-gold-500",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-navy-800 text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-navy-800 to-navy-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Need a Bus for Your Group?
            </h2>
            <p className="text-navy-300 mb-8 max-w-xl mx-auto">
              Whether it&apos;s a club picnic, corporate retreat, or a custom
              route — we&apos;ve got you covered with 29 to 52-seater coaches.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/rental")}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-shadow inline-flex items-center gap-2"
            >
              <Bus className="w-5 h-5" />
              Request Private Rental
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

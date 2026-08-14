"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bus,
  Clock,
  Filter,
  MapPin,
  Snowflake,
  Fan,
  Users,
  Wifi,
  BatteryCharging,
  GraduationCap,
  ChevronLeft,
  Armchair,
  Star,
} from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { buses, routes, generateSeats } from "@/data/mockData";
import { formatBDT, formatTime } from "@/lib/utils";

export default function BusSelectionPage() {
  const router = useRouter();
  const { searchParams, selectBus, setSeats } = useBookingStore();
  const [filterType, setFilterType] = useState<"all" | "AC" | "Non-AC">("all");
  const [priceSort, setPriceSort] = useState<"default" | "low" | "high">("default");

  // Find matching routes
  const matchingRoutes = routes.filter((r) => {
    if (!searchParams.to) return true;
    return r.to.toLowerCase().includes(searchParams.to.toLowerCase());
  });

  // Get buses for matching routes
  const availableBuses = useMemo(() => {
    let filtered = buses.filter((bus) =>
      matchingRoutes.some((r) => r.id === bus.routeId)
    );

    if (filterType !== "all") {
      filtered = filtered.filter((bus) => bus.type === filterType);
    }

    if (priceSort === "low") {
      filtered.sort((a, b) => a.fare - b.fare);
    } else if (priceSort === "high") {
      filtered.sort((a, b) => b.fare - a.fare);
    }

    return filtered;
  }, [matchingRoutes, filterType, priceSort]);

  const handleSelectBus = (bus: typeof buses[0]) => {
    selectBus(bus);
    const seats = generateSeats(bus.totalSeats, bus.fare);
    setSeats(seats);
    router.push("/booking");
  };

  const getRoute = (routeId: string) => routes.find((r) => r.id === routeId);

  const amenityIcons: Record<string, React.ReactNode> = {
    AC: <Snowflake className="w-3 h-3" />,
    WiFi: <Wifi className="w-3 h-3" />,
    "Charging Port": <BatteryCharging className="w-3 h-3" />,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 text-navy-300 hover:text-white text-sm mb-4 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Search
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">Available Buses</h1>
              <div className="flex items-center gap-2 text-navy-300 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Kushtia</span>
                <ArrowRight className="w-3 h-3" />
                <span>{searchParams.to || "All Destinations"}</span>
                {searchParams.date && (
                  <>
                    <span className="mx-1">•</span>
                    <span>{searchParams.date}</span>
                  </>
                )}
                <span className="mx-1">•</span>
                <Users className="w-3.5 h-3.5" />
                <span>{searchParams.passengers}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-navy-400 font-medium">{availableBuses.length} buses found</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 mb-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <Filter className="w-4 h-4" />
            Filters:
          </div>

          <div className="flex bg-slate-100 rounded-xl p-1">
            {(["all", "AC", "Non-AC"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterType === type
                    ? "bg-navy-800 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {type === "all" ? "All Types" : type}
              </button>
            ))}
          </div>

          <div className="flex bg-slate-100 rounded-xl p-1">
            {([
              { value: "default" as const, label: "Default" },
              { value: "low" as const, label: "Price: Low" },
              { value: "high" as const, label: "Price: High" },
            ]).map((sort) => (
              <button
                key={sort.value}
                onClick={() => setPriceSort(sort.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  priceSort === sort.value
                    ? "bg-navy-800 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {sort.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bus Cards */}
        {availableBuses.length === 0 ? (
          <div className="text-center py-20">
            <Bus className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700 mb-2">No Buses Found</h3>
            <p className="text-slate-500">
              Try changing your destination or filters.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {availableBuses.map((bus, idx) => {
              const route = getRoute(bus.routeId);
              const bookedCount = Math.floor(bus.totalSeats * 0.3);
              const available = bus.totalSeats - bookedCount;

              return (
                <motion.div
                  key={bus.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="bg-white rounded-2xl border border-slate-100 hover:border-green-200 hover:shadow-lg hover:shadow-green-500/5 transition-all duration-300 overflow-hidden"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                      {/* Left: Bus info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                            bus.type === "AC"
                              ? "bg-gradient-to-br from-navy-500 to-navy-600"
                              : "bg-gradient-to-br from-slate-500 to-slate-600"
                          }`}>
                            {bus.type === "AC" ? (
                              <Snowflake className="w-5 h-5 text-white" />
                            ) : (
                              <Fan className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-bold text-navy-800 text-base truncate">{bus.name}</h3>
                            <p className="text-xs text-slate-500">{bus.model}</p>
                          </div>
                          <div className="flex gap-2 ml-auto shrink-0">
                            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                              bus.type === "AC"
                                ? "bg-navy-50 text-navy-700 border border-navy-100"
                                : "bg-slate-100 text-slate-600"
                            }`}>
                              {bus.type}
                            </span>
                            {bus.fare >= 1000 && (
                              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20 flex items-center gap-1">
                                <Star className="w-2.5 h-2.5" /> Premium
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Route & Time */}
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-4">
                          <div className="flex items-center gap-3">
                            <div className="text-center">
                              <div className="text-lg font-bold text-navy-800">{formatTime(bus.departureTime)}</div>
                              <div className="text-[10px] text-slate-500 uppercase">Kushtia</div>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                              <div className="text-[10px] text-slate-400 font-medium">{route?.duration}</div>
                              <div className="w-20 h-[2px] bg-slate-200 relative">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-navy-800 rounded-full" />
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full" />
                              </div>
                              <div className="text-[10px] text-slate-400 font-medium">{route?.distance}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-600">{formatTime(bus.arrivalTime)}</div>
                              <div className="text-[10px] text-slate-500 uppercase truncate max-w-[80px]">{route?.to.split(",")[0]}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg">
                            <GraduationCap className="w-3.5 h-3.5 text-navy-600" />
                            {bus.examCenter}
                          </div>
                        </div>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-2">
                          {bus.amenities.map((a) => (
                            <span
                              key={a}
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 text-slate-500 rounded-lg text-[11px] font-medium"
                            >
                              {amenityIcons[a] || null}
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right: Price & CTA */}
                      <div className="lg:text-right lg:pl-6 lg:border-l border-slate-100 lg:min-w-[180px] flex lg:flex-col items-center lg:items-end justify-between gap-3">
                        <div>
                          <div className="text-2xl font-bold text-navy-800">
                            {formatBDT(bus.fare)}
                          </div>
                          <div className="text-xs text-slate-500">per seat</div>
                        </div>

                        <div className="flex items-center gap-2 mb-2">
                          <Armchair className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-green-600">
                            {available} seats left
                          </span>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSelectBus(bus)}
                          className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-shadow text-sm flex items-center gap-2"
                        >
                          Select Seats
                          <ArrowRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

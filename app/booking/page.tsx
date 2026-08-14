"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  User,
  Phone,
  GraduationCap,
  CircleDot,
  Armchair,
} from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { formatBDT, formatTime } from "@/lib/utils";
import type { Seat } from "@/data/mockData";

function SeatIcon({ seat, onClick }: { seat: Seat; onClick: () => void }) {
  const base =
    "w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xs font-bold cursor-pointer transition-all duration-200 border-2 relative";

  const styles = {
    available:
      "bg-white border-green-300 text-green-700 hover:bg-green-50 hover:border-green-500 hover:shadow-md hover:shadow-green-500/10 seat-available",
    selected:
      "bg-gradient-to-br from-green-500 to-green-600 border-green-600 text-white shadow-lg shadow-green-500/30 scale-105",
    booked:
      "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60",
  };

  return (
    <motion.button
      whileTap={seat.status !== "booked" ? { scale: 0.9 } : undefined}
      onClick={onClick}
      disabled={seat.status === "booked"}
      className={`${base} ${styles[seat.status]}`}
      title={
        seat.status === "booked"
          ? "Already booked"
          : seat.status === "selected"
            ? "Click to deselect"
            : "Click to select"
      }
    >
      {seat.id}
    </motion.button>
  );
}

export default function BookingPage() {
  const router = useRouter();
  const {
    selectedBus,
    seats,
    selectedSeats,
    toggleSeat,
    passengerInfo,
    setPassengerInfo,
    searchParams,
  } = useBookingStore();

  if (!selectedBus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Armchair className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-700 mb-2">
            No Bus Selected
          </h2>
          <p className="text-slate-500 mb-4">Please select a bus first.</p>
          <button
            onClick={() => router.push("/buses")}
            className="px-6 py-3 bg-navy-800 text-white rounded-xl font-semibold"
          >
            Browse Buses
          </button>
        </div>
      </div>
    );
  }

  const totalPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const rows = Math.ceil(selectedBus.totalSeats / 4);

  const canProceed =
    selectedSeats.length > 0 &&
    passengerInfo.name.trim() !== "" &&
    passengerInfo.mobile.trim() !== "" &&
    passengerInfo.gender !== "";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => router.push("/buses")}
            className="flex items-center gap-1.5 text-navy-300 hover:text-white text-sm mb-3 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Buses
          </button>
          <h1 className="text-2xl font-bold mb-1">Select Your Seats</h1>
          <p className="text-navy-300 text-sm">
            {selectedBus.name} • Departs {formatTime(selectedBus.departureTime)}{" "}
            • {formatBDT(selectedBus.fare)}/seat
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Seat Map - Left */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
              {/* Legend */}
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                <span className="text-sm font-semibold text-navy-800">
                  Seat Legend:
                </span>
                {[
                  { color: "bg-white border-green-300", label: "Available" },
                  {
                    color:
                      "bg-gradient-to-br from-green-500 to-green-600 border-green-600",
                    label: "Selected",
                    textColor: "text-white",
                  },
                  { color: "bg-slate-100 border-slate-200", label: "Booked" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-lg border-2 ${item.color} flex items-center justify-center`}
                    >
                      <span
                        className={`text-[8px] font-bold ${item.textColor || "text-slate-500"}`}
                      >
                        A1
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Info bar */}
              <div className="bg-navy-50 rounded-xl p-3 mb-6 flex items-center justify-between text-sm">
                <span className="text-navy-700 font-medium">
                  Select up to {searchParams.passengers} seat
                  {searchParams.passengers > 1 ? "s" : ""}
                </span>
                <span className="text-green-600 font-semibold">
                  {selectedSeats.length}/{searchParams.passengers} selected
                </span>
              </div>

              {/* Bus Layout */}
              <div className="max-w-sm mx-auto">
                {/* Driver */}
                <div className="flex items-center justify-between mb-6 px-2">
                  <div className="flex items-center gap-2 text-slate-400 text-xs">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
                      <CircleDot className="w-5 h-5" />
                    </div>
                    <span className="font-medium">Driver</span>
                  </div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    Door →
                  </div>
                </div>

                {/* Column labels */}
                <div className="grid grid-cols-[1fr_1fr_2rem_1fr_1fr] gap-2 mb-3 px-2">
                  {["A", "B", "", "C", "D"].map((col, i) => (
                    <div
                      key={i}
                      className="text-center text-xs font-semibold text-slate-400"
                    >
                      {col}
                    </div>
                  ))}
                </div>

                {/* Rows */}
                <div className="space-y-2 px-2">
                  {Array.from({ length: rows }, (_, rowIdx) => {
                    const rowNum = rowIdx + 1;
                    const rowSeats = seats.filter((s) => s.row === rowNum);
                    const seatA = rowSeats.find((s) => s.col === "A");
                    const seatB = rowSeats.find((s) => s.col === "B");
                    const seatC = rowSeats.find((s) => s.col === "C");
                    const seatD = rowSeats.find((s) => s.col === "D");

                    return (
                      <div
                        key={rowNum}
                        className="grid grid-cols-[1fr_1fr_2rem_1fr_1fr] gap-2 items-center"
                      >
                        {seatA ? (
                          <SeatIcon
                            seat={seatA}
                            onClick={() => toggleSeat(seatA.id)}
                          />
                        ) : (
                          <div />
                        )}
                        {seatB ? (
                          <SeatIcon
                            seat={seatB}
                            onClick={() => toggleSeat(seatB.id)}
                          />
                        ) : (
                          <div />
                        )}
                        {/* Aisle */}
                        <div className="text-center text-[10px] text-slate-300 font-medium">
                          {rowNum}
                        </div>
                        {seatC ? (
                          <SeatIcon
                            seat={seatC}
                            onClick={() => toggleSeat(seatC.id)}
                          />
                        ) : (
                          <div />
                        )}
                        {seatD ? (
                          <SeatIcon
                            seat={seatD}
                            onClick={() => toggleSeat(seatD.id)}
                          />
                        ) : (
                          <div />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Back of bus */}
                <div className="mt-6 text-center text-xs text-slate-400 border-t border-slate-100 pt-3">
                  ← Rear of Bus →
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Summary + Form */}
          <div className="space-y-5">
            {/* Price Summary */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-bold text-navy-800 text-lg mb-4">
                Booking Summary
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Bus</span>
                  <span className="font-medium text-navy-800 text-right truncate max-w-[160px]">
                    {selectedBus.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Type</span>
                  <span className="font-medium text-navy-800">
                    {selectedBus.type}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Departure</span>
                  <span className="font-medium text-navy-800">
                    {formatTime(selectedBus.departureTime)}
                  </span>
                </div>

                {selectedSeats.length > 0 && (
                  <>
                    <div className="border-t border-slate-100 pt-3">
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-500">Selected Seats</span>
                        <span className="font-semibold text-green-600">
                          {selectedSeats.map((s) => s.id).join(", ")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">
                          {selectedSeats.length} × {formatBDT(selectedBus.fare)}
                        </span>
                        <span className="font-medium text-navy-800">
                          {formatBDT(totalPrice)}
                        </span>
                      </div>
                    </div>
                  </>
                )}

                <div className="border-t border-slate-100 pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-navy-800">Total</span>
                    <span className="text-xl font-bold text-green-600">
                      {formatBDT(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Form */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="font-bold text-navy-800 text-lg mb-4">
                Passenger Details
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5 block">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={passengerInfo.name}
                      onChange={(e) =>
                        setPassengerInfo({ name: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-500/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5 block">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="+880 1724-516450"
                      value={passengerInfo.mobile}
                      onChange={(e) =>
                        setPassengerInfo({ mobile: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-500/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5 block">
                    Gender *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["male", "female"] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => setPassengerInfo({ gender: g })}
                        className={`py-3 rounded-xl text-sm font-medium border-2 transition-all ${
                          passengerInfo.gender === g
                            ? "border-navy-600 bg-navy-50 text-navy-800"
                            : "border-slate-200 text-slate-500 hover:border-slate-300"
                        }`}
                      >
                        {g === "male" ? "Male" : "Female"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5 block">
                    University / Exam Roll (Optional)
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. JU-2026-12345"
                      value={passengerInfo.universityRoll}
                      onChange={(e) =>
                        setPassengerInfo({ universityRoll: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-500/10 transition-all"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={canProceed ? { scale: 1.01 } : undefined}
                  whileTap={canProceed ? { scale: 0.99 } : undefined}
                  disabled={!canProceed}
                  onClick={() => router.push("/checkout")}
                  className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all mt-2 ${
                    canProceed
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

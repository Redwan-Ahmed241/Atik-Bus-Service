"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bus,
  MapPin,
  CalendarDays,
  Users,
  FileText,
  User,
  Phone,
  Building2,
  ArrowLeftRight,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
  PartyPopper,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useBookingStore } from "@/store/bookingStore";
import { busCapacityOptions } from "@/data/mockData";

export default function RentalPage() {
  const router = useRouter();
  const { rentalRequest, setRentalRequest, rentalSubmitted, submitRental, resetRental } =
    useBookingStore();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const canSubmit =
    rentalRequest.destination.trim() !== "" &&
    rentalRequest.contactName.trim() !== "" &&
    rentalRequest.contactMobile.trim() !== "";

  const handleSubmit = () => {
    submitRental();
    setShowConfirmation(true);
  };

  const handleReset = () => {
    resetRental();
    setShowConfirmation(false);
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
            Back to Home
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Private Bus Rental</h1>
          <p className="text-navy-300 text-sm max-w-xl">
            Need a bus for your group? Whether it&apos;s a picnic, corporate event, or custom
            travel route — fill out the form below and we&apos;ll get back to you within 2 hours.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {showConfirmation ? (
            /* Success Confirmation */
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-slate-100 p-8 sm:p-12 text-center shadow-xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <PartyPopper className="w-10 h-10 text-green-500" />
              </motion.div>

              <h2 className="text-2xl font-bold text-navy-800 mb-3">
                Request Submitted Successfully!
              </h2>
              <p className="text-slate-500 mb-2 max-w-md mx-auto">
                Thank you, <strong>{rentalRequest.contactName}</strong>! Your private bus rental
                request has been received.
              </p>
              <p className="text-sm text-slate-400 mb-8">
                Our team will contact you at{" "}
                <strong className="text-navy-700">{rentalRequest.contactMobile}</strong> within
                2 hours to confirm availability and pricing.
              </p>

              <div className="bg-slate-50 rounded-2xl p-5 mb-8 text-left max-w-sm mx-auto">
                <h4 className="font-semibold text-navy-800 text-sm mb-3">Request Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Destination</span>
                    <span className="font-medium text-navy-800">{rentalRequest.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Trip Type</span>
                    <span className="font-medium text-navy-800 capitalize">
                      {rentalRequest.tripType.replace("-", " ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Duration</span>
                    <span className="font-medium text-navy-800">
                      {rentalRequest.estimatedDays} day{rentalRequest.estimatedDays > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Bus Size</span>
                    <span className="font-medium text-navy-800 capitalize">
                      {rentalRequest.busCapacity}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-navy-800 text-white rounded-xl font-semibold hover:bg-navy-700 transition-colors"
                >
                  Submit Another Request
                </button>
                <button
                  onClick={() => router.push("/")}
                  className="px-6 py-3 border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                >
                  Go to Homepage
                </button>
              </div>
            </motion.div>
          ) : (
            /* Rental Form */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm"
            >
              {/* Trip Type Toggle */}
              <div className="mb-6">
                <label className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-2 block">
                  Trip Type
                </label>
                <div className="flex bg-slate-100 rounded-2xl p-1.5">
                  {([
                    { value: "one-way" as const, label: "One Way", icon: ArrowRight },
                    { value: "round-trip" as const, label: "Round Trip", icon: ArrowLeftRight },
                  ]).map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setRentalRequest({ tripType: option.value })}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        rentalRequest.tripType === option.value
                          ? "bg-navy-800 text-white shadow-md"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      <option.icon className="w-4 h-4" />
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mb-6">
                {/* Destination */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5 block">
                    Destination *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Cox's Bazar, Sylhet, Sundarbans..."
                      value={rentalRequest.destination}
                      onChange={(e) => setRentalRequest({ destination: e.target.value })}
                      className="w-full pl-10 pr-4 py-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-500/10 transition-all"
                    />
                  </div>
                </div>

                {/* Estimated Days */}
                <div>
                  <label className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5 block">
                    Estimated Days
                  </label>
                  <div className="relative">
                    <CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      value={rentalRequest.estimatedDays}
                      onChange={(e) =>
                        setRentalRequest({ estimatedDays: parseInt(e.target.value) })
                      }
                      className="w-full pl-10 pr-4 py-3.5 border border-slate-200 rounded-xl text-sm appearance-none cursor-pointer focus:outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-500/10 transition-all"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                        <option key={d} value={d}>
                          {d} day{d > 1 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Bus Capacity */}
                <div>
                  <label className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5 block">
                    Bus Capacity
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      value={rentalRequest.busCapacity}
                      onChange={(e) =>
                        setRentalRequest({ busCapacity: e.target.value as typeof rentalRequest.busCapacity })
                      }
                      className="w-full pl-10 pr-4 py-3.5 border border-slate-200 rounded-xl text-sm appearance-none cursor-pointer focus:outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-500/10 transition-all"
                    >
                      {busCapacityOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label} — {opt.price}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Capacity Cards */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {busCapacityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setRentalRequest({ busCapacity: opt.value })}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      rentalRequest.busCapacity === opt.value
                        ? "border-navy-600 bg-navy-50"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <Bus
                      className={`w-6 h-6 mx-auto mb-2 ${
                        rentalRequest.busCapacity === opt.value
                          ? "text-navy-600"
                          : "text-slate-400"
                      }`}
                    />
                    <div
                      className={`text-xs font-bold ${
                        rentalRequest.busCapacity === opt.value
                          ? "text-navy-800"
                          : "text-slate-600"
                      }`}
                    >
                      {opt.value}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{opt.price}</div>
                  </button>
                ))}
              </div>

              {/* Special Notes */}
              <div className="mb-6">
                <label className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5 block">
                  Special Notes / Requirements
                </label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <textarea
                    placeholder="e.g. Need AC bus, food stops, specific pickup point..."
                    value={rentalRequest.specialNotes}
                    onChange={(e) => setRentalRequest({ specialNotes: e.target.value })}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-500/10 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 my-6" />

              {/* Contact Details */}
              <h3 className="font-bold text-navy-800 text-base mb-4">Contact Information</h3>

              <div className="grid sm:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5 block">
                    Contact Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={rentalRequest.contactName}
                      onChange={(e) => setRentalRequest({ contactName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-500/10 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5 block">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="+880 1XXX-XXXXXX"
                      value={rentalRequest.contactMobile}
                      onChange={(e) => setRentalRequest({ contactMobile: e.target.value })}
                      className="w-full pl-10 pr-4 py-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-500/10 transition-all"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-medium text-slate-600 uppercase tracking-wider mb-1.5 block">
                    Organization / Club Name (Optional)
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. Kushtia Rotaract Club"
                      value={rentalRequest.organizationName}
                      onChange={(e) => setRentalRequest({ organizationName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-navy-500 focus:ring-2 focus:ring-navy-500/10 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <motion.button
                whileHover={canSubmit ? { scale: 1.01 } : undefined}
                whileTap={canSubmit ? { scale: 0.99 } : undefined}
                disabled={!canSubmit}
                onClick={handleSubmit}
                className={`w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  canSubmit
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                Submit Rental Request
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import {
  ChevronLeft,
  CreditCard,
  Smartphone,
  ArrowRight,
  Loader2,
  CheckCircle2,
  Download,
  Bus,
  MapPin,
  Clock,
  User,
  Phone,
  Armchair,
  AlertCircle,
  Printer,
  RotateCcw,
  GraduationCap,
  Shield,
  Info,
} from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { routes } from "@/data/mockData";
import { formatBDT, formatTime, formatDate } from "@/lib/utils";
import type { PaymentMethod } from "@/data/mockData";

const paymentMethods: {
  id: PaymentMethod;
  name: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "bkash",
    name: "bKash",
    color: "#E2136E",
    bgColor: "bg-pink-50",
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    id: "nagad",
    name: "Nagad",
    color: "#F6921E",
    bgColor: "bg-orange-50",
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    id: "rocket",
    name: "Rocket",
    color: "#8B2F8B",
    bgColor: "bg-purple-50",
    icon: <Smartphone className="w-5 h-5" />,
  },
  {
    id: "card",
    name: "Card Payment",
    color: "#1E3A8A",
    bgColor: "bg-navy-50",
    icon: <CreditCard className="w-5 h-5" />,
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const ticketRef = useRef<HTMLDivElement>(null);
  const {
    selectedBus,
    selectedSeats,
    passengerInfo,
    paymentMethod,
    setPaymentMethod,
    bookingConfirmed,
    ticketId,
    confirmBooking,
    searchParams,
    resetBooking,
  } = useBookingStore();

  const [processing, setProcessing] = useState(false);

  if (!selectedBus || selectedSeats.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-700 mb-2">
            No Booking Data
          </h2>
          <p className="text-slate-500 mb-4">Please start a new booking.</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-navy-800 text-white rounded-xl font-semibold"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const route = routes.find((r) => r.id === selectedBus.routeId);
  const totalPrice = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      confirmBooking();
    }, 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleNewBooking = () => {
    resetBooking();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-800 to-navy-900 text-white no-print">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {!bookingConfirmed && (
            <button
              onClick={() => router.push("/booking")}
              className="flex items-center gap-1.5 text-navy-300 hover:text-white text-sm mb-3 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Seat Selection
            </button>
          )}
          <h1 className="text-2xl font-bold">
            {bookingConfirmed ? "🎉 Booking Confirmed!" : "Checkout"}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {/* ─── Processing Overlay ─── */}
          {processing && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl p-10 text-center shadow-2xl max-w-sm mx-4"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-navy-100 border-t-green-500 rounded-full mx-auto mb-6"
                />
                <h3 className="text-xl font-bold text-navy-800 mb-2">
                  Processing Payment
                </h3>
                <p className="text-sm text-slate-500">
                  Confirming your{" "}
                  {paymentMethods.find((m) => m.id === paymentMethod)?.name}{" "}
                  payment...
                </p>
              </motion.div>
            </motion.div>
          )}

          {!bookingConfirmed ? (
            /* ─── Payment Phase ─── */
            <motion.div
              key="payment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="grid lg:grid-cols-5 gap-6">
                {/* Left: Payment Methods */}
                <div className="lg:col-span-3 space-y-5">
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
                    <h3 className="font-bold text-navy-800 text-lg mb-5">
                      Payment Method
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      {paymentMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`payment-card p-4 rounded-xl border-2 text-left transition-all ${
                            paymentMethod === method.id
                              ? "selected"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 ${method.bgColor} rounded-lg flex items-center justify-center mb-3`}
                            style={{ color: method.color }}
                          >
                            {method.icon}
                          </div>
                          <div className="font-semibold text-sm text-navy-800">
                            {method.name}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            {method.id === "card"
                              ? "Visa / Mastercard"
                              : "Mobile Financial Service"}
                          </div>
                          {paymentMethod === method.id && (
                            <CheckCircle2
                              className="w-4 h-4 absolute top-3 right-3"
                              style={{ color: method.color }}
                            />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* MFS Instructions */}
                    {paymentMethod !== "card" && (
                      <div className="mt-5 bg-slate-50 rounded-xl p-4">
                        <div className="flex items-start gap-2 text-sm">
                          <Info className="w-4 h-4 text-navy-500 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-slate-600 font-medium mb-1">
                              How to pay via{" "}
                              {
                                paymentMethods.find(
                                  (m) => m.id === paymentMethod,
                                )?.name
                              }
                              :
                            </p>
                            <ol className="text-xs text-slate-500 space-y-1 list-decimal pl-3">
                              <li>
                                Open your{" "}
                                {
                                  paymentMethods.find(
                                    (m) => m.id === paymentMethod,
                                  )?.name
                                }{" "}
                                app
                              </li>
                              <li>
                                Select &quot;Payment&quot; and enter merchant
                                number
                              </li>
                              <li>Enter amount: {formatBDT(totalPrice)}</li>
                              <li>Confirm with your PIN</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Summary */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 sticky top-24">
                    <h3 className="font-bold text-navy-800 text-lg mb-4">
                      Order Summary
                    </h3>

                    <div className="space-y-3 text-sm mb-5">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Route</span>
                        <span className="font-medium text-navy-800 text-right">
                          Kushtia → {route?.to.split(",")[0]}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Bus</span>
                        <span className="font-medium text-navy-800 text-right text-xs">
                          {selectedBus.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Departure</span>
                        <span className="font-medium text-navy-800">
                          {formatTime(selectedBus.departureTime)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Seats</span>
                        <span className="font-semibold text-green-600">
                          {selectedSeats.map((s) => s.id).join(", ")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Passenger</span>
                        <span className="font-medium text-navy-800">
                          {passengerInfo.name}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Mobile</span>
                        <span className="font-medium text-navy-800">
                          {passengerInfo.mobile}
                        </span>
                      </div>

                      <div className="border-t border-slate-100 pt-3">
                        <div className="flex justify-between">
                          <span className="text-slate-500">
                            {selectedSeats.length} ×{" "}
                            {formatBDT(selectedBus.fare)}
                          </span>
                          <span className="font-medium text-navy-800">
                            {formatBDT(totalPrice)}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-slate-100 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-navy-800 text-base">
                            Total
                          </span>
                          <span className="text-2xl font-bold text-green-600">
                            {formatBDT(totalPrice)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handlePayment}
                      className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-shadow text-sm flex items-center justify-center gap-2"
                    >
                      Pay {formatBDT(totalPrice)}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>

                    <div className="flex items-center gap-2 justify-center mt-3 text-xs text-slate-400">
                      <Shield className="w-3 h-3" />
                      Secure & encrypted payment
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ─── E-Ticket Phase ─── */
            <motion.div
              key="ticket"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center mb-6 no-print">
                <button
                  onClick={handlePrint}
                  className="px-5 py-2.5 bg-navy-800 text-white rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-navy-700 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print Ticket
                </button>
                <button
                  onClick={handleNewBooking}
                  className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-slate-50 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  New Booking
                </button>
              </div>

              {/* E-Ticket Card */}
              <div ref={ticketRef} className="e-ticket max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl">
                  {/* Ticket Header */}
                  <div className="bg-gradient-to-r from-navy-800 to-navy-900 text-white p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                          <Bus className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">
                            Atik Bus Service
                          </h3>
                          <p className="text-navy-300 text-xs">
                            E-Ticket / Digital Boarding Pass
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-navy-300">Ticket ID</div>
                        <div className="font-mono font-bold text-green-400 text-sm">
                          {ticketId}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Route Info */}
                  <div className="p-6 border-b border-dashed border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-navy-800">
                          {formatTime(selectedBus.departureTime)}
                        </div>
                        <div className="text-sm font-medium text-slate-600">
                          Kushtia
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Mojampur Gate
                        </div>
                      </div>

                      <div className="flex-1 mx-4 flex flex-col items-center gap-1">
                        <div className="text-xs text-slate-400 font-medium">
                          {route?.duration}
                        </div>
                        <div className="w-full h-[2px] bg-slate-200 relative">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-navy-800 rounded-full border-2 border-white" />
                          <Bus className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-green-500 bg-white" />
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                        </div>
                        <div className="text-xs text-slate-400 font-medium">
                          {route?.distance}
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {formatTime(selectedBus.arrivalTime)}
                        </div>
                        <div className="text-sm font-medium text-slate-600">
                          {route?.to.split(",")[0]}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {selectedBus.examCenter}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details Grid + QR */}
                  <div className="p-6 grid grid-cols-3 gap-4">
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">
                          Passenger
                        </div>
                        <div className="text-sm font-semibold text-navy-800 flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {passengerInfo.name}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">
                          Mobile
                        </div>
                        <div className="text-sm font-semibold text-navy-800 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          {passengerInfo.mobile}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">
                          Seat(s)
                        </div>
                        <div className="text-sm font-bold text-green-600 flex items-center gap-1.5">
                          <Armchair className="w-3.5 h-3.5" />
                          {selectedSeats.map((s) => s.id).join(", ")}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">
                          Bus
                        </div>
                        <div className="text-sm font-semibold text-navy-800">
                          {selectedBus.type} • {selectedBus.model}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">
                          Date
                        </div>
                        <div className="text-sm font-semibold text-navy-800">
                          {searchParams.date
                            ? formatDate(searchParams.date)
                            : "Flexible"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">
                          Amount Paid
                        </div>
                        <div className="text-sm font-bold text-navy-800">
                          {formatBDT(totalPrice)}
                        </div>
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-white p-2 rounded-xl border border-slate-100">
                        <QRCodeSVG
                          value={`Atik-BUS|${ticketId}|${passengerInfo.name}|${selectedSeats.map((s) => s.id).join(",")}|${selectedBus.name}`}
                          size={100}
                          level="M"
                          bgColor="#ffffff"
                          fgColor="#1e3a8a"
                        />
                      </div>
                      <p className="text-[9px] text-slate-400 mt-1.5 text-center">
                        Scan at boarding
                      </p>
                    </div>
                  </div>

                  {/* Boarding Point */}
                  <div className="mx-6 mb-4 bg-green-50 border border-green-100 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-green-800 mb-1">
                          Boarding Point
                        </div>
                        <div className="text-sm text-green-700">
                          Mojampur Gate, Kushtia Sadar — Near Mojampur Petrol
                          Pump
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                          <Clock className="w-3 h-3 inline mr-1" />
                          Report 30 minutes before departure (
                          {formatTime(selectedBus.departureTime)})
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Journey Guidelines */}
                  <div className="mx-6 mb-6 bg-navy-50 border border-navy-100 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-navy-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-bold text-navy-800 mb-2">
                          Journey Guidelines for Students
                        </div>
                        <ul className="text-xs text-navy-600 space-y-1.5">
                          <li>
                            • Carry your Admit Card and National ID / Birth
                            Certificate
                          </li>
                          <li>
                            • Arrive at the boarding point 30 minutes early
                          </li>
                          <li>
                            • Keep this E-Ticket (digital or printed) for
                            boarding verification
                          </li>
                          <li>
                            • Contact our helpline at +880 1XXX-XXXXXX for any
                            issues
                          </li>
                          <li>
                            • Luggage limited to 1 bag per passenger (max 10 kg)
                          </li>
                          <li>
                            • Follow all safety instructions from the bus
                            supervisor
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="bg-slate-50 px-6 py-3 text-center">
                    <p className="text-[10px] text-slate-400">
                      Atik Bus Service • Kushtia, Bangladesh • www.Atikbus.com •
                      +880 1XXX-XXXXXX
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

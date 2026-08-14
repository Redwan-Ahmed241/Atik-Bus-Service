"use client";

import Link from "next/link";
import { useState } from "react";
import { Bus, Menu, X, Phone, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-navy-800/95 backdrop-blur-md border-b border-navy-700/50">
      {/* Top info bar */}
      <div className="hidden md:block bg-navy-950 text-navy-200 text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" /> +880 1XXX-XXXXXX
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> Mojampur Gate, Kushtia
            </span>
          </div>
          <span className="text-green-400 font-medium">
            ✦ JU Admission Bus — Now Open for Booking!
          </span>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20 group-hover:shadow-green-500/40 transition-shadow">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight tracking-tight">
                Attik Bus
              </h1>
              <p className="text-navy-300 text-[10px] font-medium -mt-0.5 tracking-wider uppercase">
                Service
              </p>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: "/", label: "Home" },
              { href: "/buses", label: "Find Bus" },
              { href: "/rental", label: "Private Rental" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-navy-200 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/rental"
              className="ml-3 px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold rounded-xl hover:from-green-400 hover:to-green-500 transition-all duration-200 shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navy-900 border-t border-navy-700/50 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {[
                { href: "/", label: "Home" },
                { href: "/buses", label: "Find Bus" },
                { href: "/rental", label: "Private Rental" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-navy-200 hover:text-white hover:bg-white/10 rounded-lg transition"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="block mt-3 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold rounded-xl text-center"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

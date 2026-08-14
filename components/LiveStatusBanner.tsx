"use client";

import { GraduationCap, CalendarDays, Sparkles } from "lucide-react";
import { upcomingExams } from "@/data/mockData";
import { formatDate } from "@/lib/utils";

export default function LiveStatusBanner() {
  const openExams = upcomingExams.filter((e) => e.bookingOpen);

  return (
    <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 border-y border-navy-700/30 overflow-hidden">
      <div className="flex items-center">
        {/* Label */}
        <div className="shrink-0 bg-green-500 text-white px-4 py-3 flex items-center gap-2 font-semibold text-xs uppercase tracking-wider z-10 shadow-lg shadow-green-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Live Updates</span>
          <span className="sm:hidden">Live</span>
        </div>

        {/* Scrolling content */}
        <div className="overflow-hidden flex-1">
          <div className="animate-marquee flex items-center whitespace-nowrap py-3">
            {[...openExams, ...openExams].map((exam, idx) => (
              <div key={`${exam.id}-${idx}`} className="flex items-center mx-6">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-green-400" />
                  <span className="text-white font-semibold text-sm">
                    {exam.shortName} Admission
                  </span>
                  <span className="text-navy-300 text-sm">—</span>
                  <CalendarDays className="w-3.5 h-3.5 text-navy-400" />
                  <span className="text-navy-300 text-sm">{formatDate(exam.examDate)}</span>
                  <span
                    className={`ml-2 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                      exam.status === "open"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : exam.status === "closing_soon"
                        ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                        : "bg-navy-700 text-navy-400 border border-navy-600"
                    }`}
                  >
                    {exam.status === "open"
                      ? "Booking Open"
                      : exam.status === "closing_soon"
                      ? "Closing Soon"
                      : "Sold Out"}
                  </span>
                </div>
                <span className="mx-6 text-navy-600">|</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

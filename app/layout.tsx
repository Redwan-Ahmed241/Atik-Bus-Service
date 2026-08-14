import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Attik Bus Service — University Exam Transit & Private Rentals | Kushtia",
  description:
    "Book your university admission exam transport from Kushtia to JU, DU, RU, BUET & more. Attik Bus Service offers comfortable AC/Non-AC coaches and private group rentals.",
  keywords: [
    "Attik Bus",
    "Kushtia bus service",
    "university admission bus",
    "JU admission transport",
    "DU admission bus",
    "private bus rental Kushtia",
    "exam bus booking",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

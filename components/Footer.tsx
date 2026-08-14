import { Bus, Phone, MapPin, Mail, ExternalLink, Clock } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                <Bus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">Attik Bus</h3>
                <p className="text-navy-400 text-[10px] font-medium tracking-wider uppercase">Service</p>
              </div>
            </div>
            <p className="text-sm text-navy-300 leading-relaxed">
              Your trusted transit partner from Kushtia. Specializing in university exam transport and private group rentals since 2020.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/buses", label: "Find Bus" },
                { href: "/rental", label: "Private Rental" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-navy-300 hover:text-green-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Routes */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Popular Routes</h4>
            <ul className="space-y-2.5">
              {[
                "Kushtia → Dhaka (JU/DU)",
                "Kushtia → Rajshahi (RU)",
                "Kushtia → Khulna (KUET)",
                "Kushtia → Chittagong (CU)",
              ].map((route) => (
                <li key={route} className="text-sm text-navy-300">{route}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                <span className="text-sm">Mojampur Gate, Kushtia Sadar, Kushtia</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-green-400 shrink-0" />
                <span className="text-sm">+880 1XXX-XXXXXX</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-green-400 shrink-0" />
                <span className="text-sm">info@attikbus.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-green-400 shrink-0" />
                <span className="text-sm">Office: 9 AM - 10 PM</span>
              </li>
            </ul>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="w-9 h-9 bg-navy-800 hover:bg-navy-700 rounded-lg flex items-center justify-center transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-navy-400">
            © {new Date().getFullYear()} Attik Bus Service. All rights reserved.
          </p>
          <p className="text-xs text-navy-500">
            Developed with ❤️ by FazeSoft
          </p>
        </div>
      </div>
    </footer>
  );
}

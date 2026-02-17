import Link from "next/link";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

const footerLinks = {
  explore: [
    { label: "Universities", href: "/client/university" },
    { label: "Scholarships", href: "/client/scholarship" },
    { label: "Programs", href: "/client/university" },
    { label: "Regions", href: "/client/university" },
  ],
  resources: [
    { label: "Study Guide", href: "#" },
    { label: "Application Tips", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Blog", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1f3b5f] text-white">
      <div className="mx-auto max-w-7xl px-2 py-5 md:py-5">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-14">
          {/* Brand */}
          <div>
            <Link href="/client" className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <GraduationCap className="h-7 w-7" />
              </div>
              <span className="text-2xl font-extrabold">NextStepEdu</span>
            </Link>

            <p className="mt-2 max-w-sm text-base leading-relaxed text-white/75">
              Empowering students to discover their path to higher education
              through comprehensive university and scholarship information.
            </p>

            <div className="mt-5 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition"
                >
                  <social.icon className="h-5 w-5 text-white/85" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xl font-extrabold">Explore</h4>
            <ul className="mt-5 space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base text-white/75 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xl font-extrabold">Resources</h4>
            <ul className="mt-5 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-base text-white/75 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-extrabold">Contact Us</h4>
            <ul className="mt-5 space-y-3">
              <li className="flex items-center gap-4 text-base text-white/75">
                <MapPin className="h-5 w-5 shrink-0 text-white/70" />
                <span>Phnom Penh, Cambodia</span>
              </li>
              <li className="flex items-center gap-4 text-base text-white/75">
                <Mail className="h-5 w-5 shrink-0 text-white/70" />
                <a
                  href="mailto:info@nextstepedu.kh"
                  className="hover:text-white transition"
                >
                  info@nextstepedu.kh
                </a>
              </li>
              <li className="flex items-center gap-4 text-base text-white/75">
                <Phone className="h-5 w-5 shrink-0 text-white/70" />
                <a
                  href="tel:+85523123456"
                  className="hover:text-white transition"
                >
                  +855 23 123 456
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-3 border-t border-white/10 pt-3" />

        {/* Bottom Bar */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-base text-white/70">
            © 2026 NextStepEdu. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-10 gap-y-3 md:justify-end">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-base text-white/70 hover:text-white transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

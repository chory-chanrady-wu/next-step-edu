"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Settings,
  ChevronRight,
  List,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SubItem {
  href: string;
  label: string;
  icon?: React.ElementType;
}

interface NavItemProps {
  href?: string;
  icon: React.ElementType;
  label: string;
  subItems?: SubItem[];
}


const items = [
  {
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/admin/universities",
    icon: Building2,
    label: "Universities",
    subItems: [
      { href: "/admin/universities", label: "List Universities", icon: List },
      { href: "/admin/universities/create", label: "Create University", icon: PlusCircle },
    ],
  },
  {
    href: "/admin/scorlarships",
    icon: Building2,
    label: "Scholarships",
    subItems: [
      { href: "/admin/scholarships", label: "List Scholarships", icon: List },
      { href: "/admin/scholarships/create", label: "Create Scholarships", icon: PlusCircle },
    ],
  },
  {
    href: "/admin/programs",
    icon: Building2,
    label: "Programs",
    subItems: [
      { href: "/admin/programs", label: "List Programs", icon: List },
      { href: "/admin/programs/create", label: "Create Programs", icon: PlusCircle },
    ],
  },
  {
    href: "/admin/faculties",
    icon: Award,
    label: "Faculties",
  },
  {
    href: "/admin/users",
    icon: Users,
    label: "Users",
  },
  {
    href: "/admin/settings",
    icon: Settings,
    label: "Settings",
  },
];

const NavItem = ({ href, icon: Icon, label, subItems }: NavItemProps) => {
  const pathname = usePathname();
  const isChildActive = subItems?.some((child) => pathname === child.href);
  const [isOpen, setIsOpen] = useState(isChildActive);
  const isActive = href
    ? (href === "/dashboard" ? pathname === href : pathname.startsWith(href))
    : isChildActive;

  const handleClick = (e: React.MouseEvent) => {
    if (subItems) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="mb-1">
      <Link
        href={href || "#"}
        onClick={handleClick}
        className={cn(
          "group flex items-center justify-between px-4 py-3 text-sm font-medium transition-all duration-300 rounded-xl relative select-none cursor-pointer",
          isActive
            ? "bg-[#1f2937] text-teal-400"
            : "text-slate-400 hover:text-white hover:bg-white/5"
        )}
      >
        <div className="flex items-center gap-3">
          <Icon
            className={cn(
              "w-5 h-5 transition-colors duration-300",
              isActive ? "text-teal-400" : "text-slate-400 group-hover:text-white"
            )}
          />
          <span className="tracking-wide">{label}</span>
        </div>

        {subItems && (
          <div className={cn("transition-transform duration-200", isOpen && "rotate-90")}>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>
        )}


        {!subItems && isActive && (
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 absolute right-4 shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
        )}
      </Link>

      {/* Sub Items */}
      {subItems && (
        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out pl-4 overflow-hidden",
            isOpen ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="min-h-0 border-l border-slate-700/50 ml-4 space-y-1">
            {subItems.map((child) => {
              const isSubActive = pathname === child.href;
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  className={cn(
                    "flex items-center gap-2 pl-4 pr-3 py-2 text-sm rounded-r-lg transition-all duration-200 relative",
                    isSubActive
                      ? "text-teal-400 bg-white/5 font-medium"
                      : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                  )}
                >

                  {isSubActive && (
                    <span className="absolute left-0 w-0.5 h-full bg-teal-400/80 rounded-r-full" />
                  )}

                  {child.icon ? <child.icon className="w-4 h-4" /> : <span className="w-4" />}
                  <span>{child.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};



export function SideBar() {


  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0B1120] border-r border-slate-800/50 flex flex-col z-50">
      {/* Brand Header */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-wide">
            EduAdmin
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-2 py-6 overflow-y-auto custom-scrollbar">
        {
          items.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              subItems={item.subItems}
            />
          ))
        }
      </nav>
    </aside>
  );
}

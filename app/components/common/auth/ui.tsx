import * as React from "react";
import { cn } from "@/lib/utils";

export function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block text-sm font-medium text-slate-700", className)}>
      {children}
    </label>
  );
}

export function TextInput({
  icon,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mt-2 flex h-12 w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 shadow-sm transition",
        "focus-within:border-teal-300 focus-within:ring-4 focus-within:ring-teal-100",
        className
      )}
    >
      <span className="text-slate-400">{icon}</span>
      <input
        {...props}
        className="h-full w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
      />
    </div>
  );
}

export function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="mt-4 h-12 w-full rounded-xl bg-teal-600 text-sm font-semibold text-white shadow-md transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200"
    >
      {children}
    </button>
  );
}


export function OutlineButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
    >
      {children}
    </button>
  );
}

export function Divider() {
  return (
    <div className="my-5 flex items-center gap-3">
      <div className="h-px flex-1 bg-slate-200" />
      <span className="text-sm text-slate-400">or</span>
      <div className="h-px flex-1 bg-slate-200" />
    </div>
  );
}

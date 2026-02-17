import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | "primary"
    | "outline"
    | "ghost"
    | "success"
    | "warning"
    | "heroOutline";
  size?: "sm" | "md" | "lg" | "xl";
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center font-semibold transition " +
    "focus:outline-none focus:ring-2 focus:ring-black/20 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-black text-white hover:opacity-90",
    outline:
      "border border-slate-200 bg-white hover:bg-slate-50 text-slate-900",
    ghost: "bg-transparent hover:bg-slate-50 text-slate-900",
    success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm",
    warning: "bg-amber-500 text-slate-900 hover:bg-amber-600 shadow-md",
    heroOutline:
      "border border-white/30 bg-white/10 text-white hover:bg-white/15",
  };

  const sizes = {
    sm: "h-10 px-4 rounded-xl text-sm",
    md: "h-11 px-5 rounded-xl text-sm",
    lg: "h-12 px-6 rounded-2xl text-base",
    xl: "h-14 px-8 rounded-2xl text-lg",
  };

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

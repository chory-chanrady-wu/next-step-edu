import { X } from "lucide-react";

type Props = {
  title: string;
  subtitle: React.ReactNode;
  onClose: () => void;
};

export default function AuthHeader({ title, subtitle, onClose }: Props) {
  return (
    <div className="relative px-8 pt-8">
      <button
        onClick={onClose}
        className="absolute right-5 top-5 rounded-full p-2 text-slate-500 hover:bg-slate-100"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      <h2 className="text-2xl font-extrabold text-teal-600">{title}</h2>
      <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}

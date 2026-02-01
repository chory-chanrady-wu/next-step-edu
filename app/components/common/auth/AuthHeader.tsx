import { X } from "lucide-react";

type Props = {
  onClose: () => void;
};

export default function AuthHeader({ onClose }: Props) {
  return (
    <div className="relative px-8 pt-8">
      <button
        onClick={onClose}
        className="absolute right-5 top-5 rounded-full p-2 text-slate-500 hover:bg-slate-100"
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </button>

      <h2 className="text-center text-4xl font-extrabold text-slate-900">
        Welcome Back
      </h2>
      <p className="mt-2 text-center text-slate-500">
        Sign in to your account or create a new one
      </p>
    </div>
  );
}

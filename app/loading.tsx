import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <Spinner className="size-5 text-teal-700" />
          <span className="text-sm font-semibold text-slate-700">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
}

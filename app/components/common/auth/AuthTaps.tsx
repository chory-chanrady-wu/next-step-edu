type Tab = "login" | "register";

type Props = {
  tab: Tab;
  onChange: (tab: Tab) => void;
};

export default function AuthTabs({ tab, onChange }: Props) {
  return (
    <div className="px-8 pt-6">
      <div className="rounded-2xl bg-slate-200 p-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onChange("login")}
            className={[
              "h-11 rounded-2xl text-sm font-semibold transition",
              tab === "login"
                ? "bg-white text-slate-900 shadow"
                : "text-slate-600 hover:bg-white/60",
            ].join(" ")}
          >
            Login
          </button>

          <button
            type="button"
            onClick={() => onChange("register")}
            className={[
              "h-11 rounded-2xl text-sm font-semibold transition",
              tab === "register"
                ? "bg-white text-slate-900 shadow"
                : "text-slate-600 hover:bg-white/60",
            ].join(" ")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

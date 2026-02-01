type Tab = "login" | "register";

type Props = {
  tab: Tab;
  onChange: (tab: Tab) => void;
};

export default function AuthTabs({ tab, onChange }: Props) {
  const isLogin = tab === "login";

  return (
    <div className="px-8 pt-6">
      <div className="rounded-xl bg-slate-100 p-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onChange("login")}
            className={[
              "h-12 rounded-xl text-sm font-semibold transition",
              isLogin ? "bg-white text-slate-900 shadow" : "text-slate-600 hover:bg-white/60",
            ].join(" ")}
          >
            Login
          </button>

          <button
            onClick={() => onChange("register")}
            className={[
              "h-12 rounded-xl text-sm font-semibold transition",
              !isLogin ? "bg-white text-slate-900 shadow" : "text-slate-600 hover:bg-white/60",
            ].join(" ")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

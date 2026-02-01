type Props = {
  onSubmit: () => void;
};

export default function AuthLoginForm({ onSubmit }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-6"
    >
      <Field label="Email">
        <Input type="email" placeholder="you@example.com" required />
      </Field>

      <Field label="Password">
        <Input type="password" placeholder="••••••••" required />
      </Field>

      <SubmitButton text="Sign In" />
    </form>
  );
}

/** small reusable UI */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-lg font-semibold text-slate-800">{label}</label>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="h-14 w-full rounded-xl border border-slate-200 px-4 text-base outline-none focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
    />
  );
}

function SubmitButton({ text }: { text: string }) {
  return (
    <button
      type="submit"
      className="mt-2 h-14 w-full rounded-xl bg-emerald-500 text-lg font-bold text-white shadow-md hover:bg-emerald-600 transition"
    >
      {text}
    </button>
  );
}

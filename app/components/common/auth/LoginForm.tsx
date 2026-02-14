import { Lock, Mail } from "lucide-react";
import { Divider, Label, OutlineButton, PrimaryButton, TextInput } from "./ui";
import { FcGoogle } from "react-icons/fc";

type Props = {
  onSubmit: () => void;
  onSwitch: () => void;
};

export default function LoginForm({ onSubmit, onSwitch }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-5"
    >
      <div>
        <Label>Email</Label>
        <TextInput
          type="email"
          placeholder="Email"
          required
          icon={<Mail className="h-4 w-4" />}
        />
      </div>

      <div>
        <Label>Password</Label>
        <TextInput
          type="password"
          placeholder="Password"
          required
          icon={<Lock className="h-4 w-4" />}
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-200"
          />
          Remember me
        </label>

        <button
          type="button"
          className="text-sm font-semibold text-red-500 hover:underline"
          onClick={() => alert("Forgot password")}
        >
          Forgot password?
        </button>
      </div>

      <PrimaryButton>Login</PrimaryButton>

      <p className="pt-2 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="font-semibold text-blue-600 hover:underline"
        >
          Register
        </button>
      </p>

      <Divider />

      <OutlineButton onClick={() => alert("Google login")}>
        <FcGoogle className="h-4 w-4" />
        Login with Google
      </OutlineButton>
    </form>
  );
}

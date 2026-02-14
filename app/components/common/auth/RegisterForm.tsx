import { Lock, Mail, User } from "lucide-react";
import { Label, PrimaryButton, TextInput } from "./ui";

type Props = {
  onSubmit: () => void;
  onSwitch: () => void;
};

export default function RegisterForm({ onSubmit, onSwitch }: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-3.5"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label>First name</Label>
          <TextInput
            type="text"
            placeholder="First name"
            required
            icon={<User className="h-4 w-4" />}
          />
        </div>

        <div>
          <Label>Last name</Label>
          <TextInput
            type="text"
            placeholder="Last name"
            required
            icon={<User className="h-4 w-4" />}
          />
        </div>
      </div>

      <div>
        <Label>Email</Label>
        <TextInput
          type="email"
          placeholder="Email address"
          required
          icon={<Mail className="h-4 w-4" />}
        />
      </div>

      <div>
        <Label>Password</Label>
        <TextInput
          type="password"
          placeholder="Input password"
          required
          icon={<Lock className="h-4 w-4" />}
        />
      </div>

      <div>
        <Label>Confirm Password</Label>
        <TextInput
          type="password"
          placeholder="Input password"
          required
          icon={<Lock className="h-4 w-4" />}
        />
      </div>

      <PrimaryButton>Register</PrimaryButton>

      <p className="pt-2 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="font-semibold text-blue-600 hover:underline"
        >
          Log in
        </button>
      </p>
    </form>
  );
}

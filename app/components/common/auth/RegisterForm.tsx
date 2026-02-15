import { Lock, Mail, User, Phone, Upload, Image } from "lucide-react";
import { Label, PrimaryButton, TextInput } from "./ui";
import { useState } from "react";

type Props = {
  onSubmit: () => void;
  onSwitch: () => void;
};

export default function RegisterForm({ onSubmit, onSwitch }: Props) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
        <Label>Phone</Label>
        <TextInput
          type="tel"
          placeholder="Phone number"
          required
          icon={<Phone className="h-4 w-4" />}
        />
      </div>

      <div>
        <Label>Profile Picture</Label>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="profile-picture"
          />
          <label
            htmlFor="profile-picture"
            className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
          >
            <Upload className="h-4 w-4" />
            <span className="flex-1">
              {selectedImage ? selectedImage.name : "Choose a profile picture"}
            </span>
            {imagePreview && (
              <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-teal-500">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </label>
        </div>
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

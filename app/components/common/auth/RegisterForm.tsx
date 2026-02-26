import { Lock, Mail, User, Phone, Upload, X, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { Label, PrimaryButton, TextInput } from "./ui";
import { useState } from "react";
import { registerUser } from "@/lib/api";
import { toast } from "sonner";

type Props = {
  onSwitch: () => void;
};

export default function RegisterForm({}: Props) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Validate password length
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      await registerUser({
        email,
        password,
        firstname,
        lastname,
        phone,
        image: selectedImage,
      });

      toast.success("Registration successful! Please login.");

      // Route to login page after successful registration
      setTimeout(() => {
        window.location.href = "/client/login";
      }, 500);
    } catch (error: any) {
      console.error("Registration error:", error);
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <Label className="text-center">Profile Picture</Label>
        <div className="relative flex justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="profile-picture"
          />
          <label
            htmlFor="profile-picture"
            className="cursor-pointer h-20 w-20 rounded-full border-2 border-dashed border-gray-300 hover:border-teal-500 transition-colors flex items-center justify-center overflow-hidden relative"
          >
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <Upload className="h-8 w-8 text-gray-400" />
            )}
          </label>
          {imagePreview && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-0 right-[calc(50%-2.5rem)] bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label>First name</Label>
          <TextInput
            type="text"
            placeholder="First name"
            required
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            icon={<User className="h-4 w-4" />}
          />
        </div>

        <div>
          <Label>Last name</Label>
          <TextInput
            type="text"
            placeholder="Last name"
            required
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="h-4 w-4" />}
        />
      </div>

      <div>
        <Label>Phone</Label>
        <TextInput
          type="tel"
          placeholder="Phone number"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          icon={<Phone className="h-4 w-4" />}
        />
      </div>
      <div>
        <Label>Password</Label>
        <div className="relative">
          <TextInput
            type={showPassword ? "text" : "password"}
            placeholder="Input password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="h-4 w-4" />}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div>
        <Label>Confirm Password</Label>
        <div className="relative">
          <TextInput
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Input password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={<Lock className="h-4 w-4" />}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <PrimaryButton>{isLoading ? "Registering..." : "Register"}</PrimaryButton>

      <p className="pt-2 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => (window.location.href = "/client/login")}
          className="font-semibold text-blue-600 hover:underline"
        >
          Log in
        </button>
      </p>
    </form>
  );
}

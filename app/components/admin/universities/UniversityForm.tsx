"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Building2,
  Globe,
  MapPin,
  Link as LinkIcon,
  Image as ImageIcon,
  CheckCircle2,
  ChevronLeft,
  Loader2,
  X,
  CloudUpload,
  Info,
  AlertCircle,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  useCreateUniversity,
  useUpdateUniversity,
} from "@/hooks/use-queries-hook";
import { UniversityResponse } from "@/types/nextstepedu";

// --- Sub-components ---

interface FormLabelProps {
  children: React.ReactNode;
  required?: boolean;
  info?: string;
}

const FormLabel = ({ children, required, info }: FormLabelProps) => (
  <div className="flex items-center justify-between mb-1.5">
    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
      {children}
      {required && <span className="text-red-500">*</span>}
    </label>
    {info && (
      <div className="group relative">
        <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
        <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
          {info}
        </div>
      </div>
    )}
  </div>
);

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  icon?: React.ElementType;
}

const TextInput = ({
  error,
  icon: Icon,
  className,
  ...props
}: TextInputProps) => (
  <div className="space-y-1.5">
    <div className="relative group">
      {Icon && (
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
      )}
      <input
        {...props}
        className={cn(
          "w-full px-4 py-2.5 rounded-xl border transition-all outline-none bg-white font-outfit text-sm placeholder:text-gray-400",
          Icon && "pl-11",
          error
            ? "border-red-200 focus:border-red-500 focus:ring-4 focus:ring-red-500/5 bg-red-50/10"
            : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5",
          className,
        )}
      />
    </div>
    {error && (
      <p className="text-[11px] font-medium text-red-500 flex items-center gap-1 pl-1">
        <AlertCircle className="w-3 h-3" /> {error}
      </p>
    )}
  </div>
);

interface ImageUploadProps {
  label: string;
  previewUrl: string;
  onFileSelect: (file: File | null) => void;
  required?: boolean;
  aspectRatio?: "square" | "video";
}

const ImageUpload = ({
  label,
  previewUrl,
  onFileSelect,
  required,
  aspectRatio = "square",
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFileSelect(file);
  };

  return (
    <div className="space-y-2">
      <FormLabel required={required}>{label}</FormLabel>
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-2xl transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden group",
          aspectRatio === "square" ? "aspect-square" : "aspect-[16/7]",
          previewUrl
            ? "border-blue-500 bg-blue-50/5 shadow-inner"
            : "border-gray-200 hover:border-blue-400 hover:bg-gray-50",
          isDragging &&
            "border-blue-500 bg-blue-50/50 ring-4 ring-blue-500/5 scale-[0.98]",
        )}
      >
        {previewUrl ? (
          <>
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover transition-transform group-hover:scale-105 duration-500"
              unoptimized
            />
            <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2 backdrop-blur-[2px]">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="rounded-full shadow-lg h-8"
              >
                Change
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="rounded-full h-8 w-8 shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  onFileSelect(null);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center p-6 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <CloudUpload className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-xs font-bold text-gray-900">Drop image here</p>
            <p className="text-[10px] text-gray-400 mt-1">
              or click to browse library
            </p>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

interface UniversityFormProps {
  initialData?: UniversityResponse;
  mode?: "create" | "edit";
}

const UniversityForm = ({
  initialData,
  mode = "create",
}: UniversityFormProps) => {
  const router = useRouter();
  const { mutate: createUniversity, isPending: isCreating } =
    useCreateUniversity();
  const { mutate: updateUniversity, isPending: isUpdating } =
    useUpdateUniversity();

  const isLoading = isCreating || isUpdating;
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form State
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    country: initialData?.country || "",
    city: initialData?.city || "",
    officialWebsite: initialData?.officialWebsite || "",
    status: initialData?.status || "active",
  });

  // Contact State (from university data directly)
  const [contactData, setContactData] = useState({
    label: initialData?.label || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
  });

  // File State
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  // Preview URLs (initialize with existing URLs if editing)
  const [logoPreview, setLogoPreview] = useState<string>(
    initialData?.logoUrl || initialData?.logo || "",
  );
  const [coverPreview, setCoverPreview] = useState<string>(
    initialData?.coverImageUrl || initialData?.coverImage || "",
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFileSelect = (type: "logo" | "cover", file: File | null) => {
    if (type === "logo") {
      setLogoFile(file);
      if (file) {
        setLogoPreview(URL.createObjectURL(file));
      } else {
        setLogoPreview(initialData?.logoUrl || initialData?.logo || "");
      }
    } else {
      setCoverFile(file);
      if (file) {
        setCoverPreview(URL.createObjectURL(file));
      } else {
        setCoverPreview(
          initialData?.coverImageUrl || initialData?.coverImage || "",
        );
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = "University name is required";
    if (!formData.slug) newErrors.slug = "URL identifier is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city) newErrors.city = "City is required";
    if (
      formData.officialWebsite &&
      !formData.officialWebsite.startsWith("http")
    ) {
      newErrors.officialWebsite =
        "Must be a valid URL starting with http:// or https://";
    }
    if (
      contactData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    // For Create mode, validation of files might be strict if required by backend,
    // but User didn't specify distinct requirement, Assuming optional in backend as typically seen ("required=false").

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      data: {
        name: formData.name,
        slug: formData.slug,
        description: formData.description,
        country: formData.country,
        city: formData.city,
        officialWebsite: formData.officialWebsite,
        label: contactData.label,
        email: contactData.email,
        phone: contactData.phone,
        status: formData.status,
      },
      files: {
        logo: logoFile,
        coverImage: coverFile,
      },
    };

    const onSuccess = () => {
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/admin/universities");
      }, 2000);
    };

    if (mode === "create") {
      createUniversity(payload, { onSuccess });
    } else {
      if (initialData?.id) {
        updateUniversity({ id: initialData.id, payload }, { onSuccess });
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in slide-in-from-bottom-8 duration-700">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 shadow-xl shadow-green-500/10">
          <CheckCircle2 className="w-10 h-10 text-green-600 animate-in zoom-in duration-500 delay-200" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 font-outfit mb-2">
          University {mode === "create" ? "Created" : "Updated"}!
        </h2>
        <p className="text-gray-500 text-center max-w-sm">
          Successfully {mode === "create" ? "added" : "updated"}{" "}
          <span className="font-bold text-blue-600">
            &quot;{formData.name}&quot;
          </span>
          . Redirecting you back to the list...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-8">
        <div className="flex items-center gap-5">
          <Link href="/admin/universities" className="group">
            <div className="h-12 w-12 rounded-2xl border border-gray-200 flex items-center justify-center bg-white group-hover:border-blue-500 group-hover:bg-blue-50 transition-all shadow-sm">
              <ChevronLeft className="w-6 h-6 text-gray-500 group-hover:text-blue-600" />
            </div>
          </Link>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 font-outfit">
              {mode === "create" ? "Add New University" : "Edit University"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            className="h-11 rounded-xl px-6 font-medium text-gray-500"
            onClick={() => router.push("/admin/universities")}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="h-11 rounded-xl px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20 font-bold tracking-wide"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : mode === "create" ? (
              "Publish Record"
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">
        <div className="lg:col-span-8 space-y-8">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center gap-3 bg-gray-50/30">
              <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-900 font-outfit leading-none">
                  University Identity
                </h2>
                <p className="text-xs text-gray-400 mt-1.5 font-medium uppercase tracking-wider">
                  Primary descriptive information
                </p>
              </div>
            </div>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <FormLabel
                    required
                    info="The full legal name of the institution."
                  >
                    Institution Name
                  </FormLabel>
                  <TextInput
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Stanford University"
                    error={errors.name}
                  />
                </div>
                <div className="space-y-1">
                  <FormLabel required info="SEO friendly URL segment.">
                    Slug / URL Identifier
                  </FormLabel>
                  <TextInput
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="e.g. stanford-university"
                    error={errors.slug}
                    icon={LinkIcon}
                    className="font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <FormLabel info="Comprehensive overview including history and achievements.">
                  Description
                </FormLabel>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={8}
                  placeholder="Describe the university in detail..."
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none bg-white font-outfit text-sm placeholder:text-gray-400 resize-none h-[220px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center gap-3 bg-gray-50/30">
              <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-900 font-outfit leading-none">
                  Localization & Web
                </h2>
                <p className="text-xs text-gray-400 mt-1.5 font-medium uppercase tracking-wider">
                  Geographic and contact details
                </p>
              </div>
            </div>
            <CardContent className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <FormLabel required>Country</FormLabel>
                  <TextInput
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="e.g. United States"
                    error={errors.country}
                    icon={Globe}
                  />
                </div>
                <div className="space-y-1">
                  <FormLabel required>City / Region</FormLabel>
                  <TextInput
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Palo Alto"
                    error={errors.city}
                    icon={MapPin}
                  />
                </div>
              </div>

              <div className="space-y-1 pt-4">
                <FormLabel info="Complete website address.">
                  Official University Website
                </FormLabel>
                <TextInput
                  name="officialWebsite"
                  value={formData.officialWebsite}
                  onChange={handleChange}
                  placeholder="https://www.stanford.edu"
                  error={errors.officialWebsite}
                  icon={LinkIcon}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center gap-3 bg-gray-50/30">
              <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-900 font-outfit leading-none">
                  Contact Information
                </h2>
                <p className="text-xs text-gray-400 mt-1.5 font-medium uppercase tracking-wider">
                  Office details and contact information
                </p>
              </div>
            </div>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-1">
                <FormLabel info="Name of the administration office or department.">
                  Office Label
                </FormLabel>
                <TextInput
                  name="label"
                  value={contactData.label}
                  onChange={handleContactChange}
                  placeholder="e.g. Administration Office"
                  error={errors.label}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <FormLabel info="Contact email address.">
                    Email
                  </FormLabel>
                  <TextInput
                    type="email"
                    name="email"
                    value={contactData.email}
                    onChange={handleContactChange}
                    placeholder="info@university.edu"
                    error={errors.email}
                    icon={Mail}
                  />
                </div>
                <div className="space-y-1">
                  <FormLabel info="Contact phone number.">Phone</FormLabel>
                  <TextInput
                    type="tel"
                    name="phone"
                    value={contactData.phone}
                    onChange={handleContactChange}
                    placeholder="(+855) 12345678"
                    error={errors.phone}
                    icon={Phone}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center gap-3 bg-gray-50/30">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-white" />
              </div>
              <h2 className="font-bold text-lg text-gray-900 font-outfit">
                Visual Branding
              </h2>
            </div>
            <CardContent className="p-6 space-y-8 pb-8">
              <ImageUpload
                label="Official Logo"
                previewUrl={logoPreview}
                onFileSelect={(file) => handleFileSelect("logo", file)}
                required={mode === "create"}
              />
              <ImageUpload
                label="Background Cover"
                previewUrl={coverPreview}
                onFileSelect={(file) => handleFileSelect("cover", file)}
                aspectRatio="video"
              />
            </CardContent>
          </Card>

          <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center gap-3 bg-gray-50/30">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-white" />
              </div>
              <h2 className="font-bold text-lg text-gray-900 font-outfit">
                Status
              </h2>
            </div>
            <CardContent className="p-6 space-y-10 py-8">
              <div className="space-y-4">
                <FormLabel>Publication Status</FormLabel>
                <div className="flex p-1.5 bg-gray-100/80 rounded-2xl gap-2">
                  {["active", "inactive"].map((status) => (
                    <label key={status} className="flex-1 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={formData.status === status}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={cn(
                          "text-center py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                          formData.status === status
                            ? "bg-white text-blue-600 shadow-sm shadow-gray-200"
                            : "text-gray-400 hover:text-gray-600",
                        )}
                        onClick={() => setFormData((p) => ({ ...p, status }))}
                      >
                        {status}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UniversityForm;

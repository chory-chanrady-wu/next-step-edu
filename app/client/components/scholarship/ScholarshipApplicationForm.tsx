"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Award,
  CalendarDays,
  GraduationCap,
  Loader2,
  MapPin,
  Sparkles,
} from "lucide-react";

import { type Scholarship } from "@/app/client/scholarship/data";
import { createApplicant } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type ApplicationFormState = {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  address: string;
  nationality: string;
  highSchoolName: string;
  gpa: string;
  intendedMajor: string;
  scholarshipType: string;
  familyIncome: string;
  motivationLetter: string;
};

type ScholarshipApplicationFormProps = {
  scholarship: Scholarship;
};

const initialState = (scholarship: Scholarship): ApplicationFormState => ({
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  email: "",
  phoneNumber: "",
  address: "",
  nationality: "",
  highSchoolName: "",
  gpa: "",
  intendedMajor: scholarship.field ?? "",
  scholarshipType: scholarship.title,
  familyIncome: "",
  motivationLetter: "",
});

export default function ScholarshipApplicationForm({
  scholarship,
}: ScholarshipApplicationFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ApplicationFormState>(
    initialState(scholarship),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onChange = (key: keyof ApplicationFormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    if (!form.gender) {
      setErrorMessage("Please select your gender.");
      setIsSubmitting(false);
      return;
    }

    const parsedGpa = Number(form.gpa);
    const parsedFamilyIncome = Number(form.familyIncome);

    if (Number.isNaN(parsedGpa) || parsedGpa < 0 || parsedGpa > 4) {
      setErrorMessage("GPA must be a number between 0 and 4.");
      setIsSubmitting(false);
      return;
    }

    if (Number.isNaN(parsedFamilyIncome) || parsedFamilyIncome < 0) {
      setErrorMessage("Family income must be a positive number.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Get userId from localStorage (would be set during authentication)
      const userStr = localStorage.getItem("user");
      const parsedUserId = userStr ? JSON.parse(userStr).id : null;
      const userId = parsedUserId ? Number(parsedUserId) : null;

      if (!userId) {
        setErrorMessage("User not authenticated. Please log in first.");
        setIsSubmitting(false);
        return;
      }

      const applicantData = {
        userId,
        scholarshipId: Number(scholarship.id) || 0,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        gender: form.gender,
        dateOfBirth: form.dateOfBirth,
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim(),
        address: form.address.trim(),
        nationality: form.nationality.trim(),
        highSchoolName: form.highSchoolName.trim(),
        gpa: parsedGpa,
        intendedMajor: form.intendedMajor.trim(),
        scholarshipType: form.scholarshipType.trim(),
        familyIncome: parsedFamilyIncome,
        motivationLetter: form.motivationLetter.trim(),
      };

      await createApplicant(applicantData);

      setSuccessMessage("Application submitted successfully! Redirecting...");

      // Redirect to scholarship detail page after 2 seconds
      setTimeout(() => {
        router.push(`/client/scholarship/${scholarship.id}`);
      }, 2000);
    } catch (error) {
      console.error("[Form] Application submission failed:", error);
      let message = "Failed to submit application.";

      if (error instanceof Error) {
        message = error.message;
      } else if (error && typeof error === "object") {
        // Handle axios error response
        const axiosError = error as any;
        if (axiosError.response?.data?.message) {
          message = axiosError.response.data.message;
        } else if (axiosError.response?.statusText) {
          message = `Error: ${axiosError.response.statusText}`;
        }
      }

      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-100 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 left-[-8rem] h-80 w-80 rounded-full bg-cyan-300/45 blur-3xl" />
        <div className="absolute right-[-6rem] top-24 h-72 w-72 rounded-full bg-emerald-300/35 blur-3xl" />
        <div className="absolute bottom-[-7rem] left-1/3 h-72 w-72 rounded-full bg-amber-200/55 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(2,132,199,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(2,132,199,0.08)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4">
        <Link
          href={`/client/scholarship/${scholarship.id}`}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm backdrop-blur"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Scholarship Detail
        </Link>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-900 via-cyan-900 to-emerald-800 p-6 text-white shadow-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide">
              <Sparkles className="h-3.5 w-3.5" />
              Scholarship Application
            </span>
            <h1 className="mt-4 text-2xl font-bold leading-tight">
              {scholarship.title}
            </h1>
            <p className="mt-3 text-sm text-cyan-100/90">
              Complete the form carefully. Your details will be saved to the
              applicant table for review.
            </p>

            <div className="mt-6 space-y-3 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm">
              <div className="flex items-center gap-2 text-cyan-50">
                <Award className="h-4 w-4" />
                <span className="font-medium">{scholarship.level}</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-50">
                <CalendarDays className="h-4 w-4" />
                <span>Deadline: {scholarship.deadline}</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-50">
                <GraduationCap className="h-4 w-4" />
                <span>{scholarship.university}</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-50">
                <MapPin className="h-4 w-4" />
                <span>{scholarship.location}</span>
              </div>
            </div>
          </aside>

          <div className="rounded-3xl border border-slate-200/90 bg-white/85 p-6 shadow-xl backdrop-blur-xl sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">
              Application Form
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Fill in all required information below.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-6">
              <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600">
                  Personal Information
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      value={form.firstName}
                      onChange={(e) => onChange("firstName", e.target.value)}
                      className="bg-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      value={form.lastName}
                      onChange={(e) => onChange("lastName", e.target.value)}
                      className="bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select
                      value={form.gender}
                      onValueChange={(value) => onChange("gender", value)}
                    >
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                    <Input
                      id="date_of_birth"
                      type="date"
                      value={form.dateOfBirth}
                      onChange={(e) => onChange("dateOfBirth", e.target.value)}
                      className="bg-white"
                      required
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600">
                  Contact and Background
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => onChange("email", e.target.value)}
                      className="bg-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone_number">Phone Number</Label>
                    <Input
                      id="phone_number"
                      value={form.phoneNumber}
                      onChange={(e) => onChange("phoneNumber", e.target.value)}
                      className="bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={form.address}
                    onChange={(e) => onChange("address", e.target.value)}
                    className="bg-white"
                    required
                  />
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      value={form.nationality}
                      onChange={(e) => onChange("nationality", e.target.value)}
                      className="bg-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="high_school_name">High School Name</Label>
                    <Input
                      id="high_school_name"
                      value={form.highSchoolName}
                      onChange={(e) =>
                        onChange("highSchoolName", e.target.value)
                      }
                      className="bg-white"
                      required
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600">
                  Academic and Financial
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="gpa">GPA</Label>
                    <Input
                      id="gpa"
                      type="number"
                      min="0"
                      max="4"
                      step="0.01"
                      value={form.gpa}
                      onChange={(e) => onChange("gpa", e.target.value)}
                      className="bg-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="family_income">
                      Family Income (USD / year)
                    </Label>
                    <Input
                      id="family_income"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.familyIncome}
                      onChange={(e) => onChange("familyIncome", e.target.value)}
                      className="bg-white"
                      required
                    />
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="intended_major">Intended Major</Label>
                    <Input
                      id="intended_major"
                      value={form.intendedMajor}
                      onChange={(e) =>
                        onChange("intendedMajor", e.target.value)
                      }
                      className="bg-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="scholarship_type">Scholarship Type</Label>
                    <Input
                      id="scholarship_type"
                      value={form.scholarshipType}
                      onChange={(e) =>
                        onChange("scholarshipType", e.target.value)
                      }
                      className="bg-white"
                      required
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-600">
                  Motivation
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="motivation_letter">Motivation Letter</Label>
                  <Textarea
                    id="motivation_letter"
                    value={form.motivationLetter}
                    onChange={(e) =>
                      onChange("motivationLetter", e.target.value)
                    }
                    className="min-h-40 bg-white"
                    required
                  />
                </div>
              </section>

              {errorMessage ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                  {errorMessage}
                </p>
              ) : null}
              {successMessage ? (
                <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                  {successMessage}
                </p>
              ) : null}

              <Button
                type="submit"
                className="h-11 rounded-xl bg-gradient-to-r from-cyan-700 via-teal-700 to-emerald-600 text-white hover:opacity-95"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

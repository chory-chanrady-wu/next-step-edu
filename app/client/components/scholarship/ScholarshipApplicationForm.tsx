"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

import { type Scholarship } from "@/app/client/scholarship/data";
import { createApplicant } from "@/app/lib/api";
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
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  email: string;
  phone_number: string;
  address: string;
  nationality: string;
  high_school_name: string;
  gpa: string;
  intended_major: string;
  scholarship_type: string;
  family_income: string;
  motivation_letter: string;
};

type ScholarshipApplicationFormProps = {
  scholarship: Scholarship;
};

const initialState = (scholarship: Scholarship): ApplicationFormState => ({
  first_name: "",
  last_name: "",
  gender: "",
  date_of_birth: "",
  email: "",
  phone_number: "",
  address: "",
  nationality: "",
  high_school_name: "",
  gpa: "",
  intended_major: scholarship.field ?? "",
  scholarship_type: scholarship.title,
  family_income: "",
  motivation_letter: "",
});

export default function ScholarshipApplicationForm({
  scholarship,
}: ScholarshipApplicationFormProps) {
  const [form, setForm] = useState<ApplicationFormState>(initialState(scholarship));
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
    const parsedFamilyIncome = Number(form.family_income);

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
      await createApplicant({
        first_name: form.first_name.trim(),
        last_name: form.last_name.trim(),
        gender: form.gender,
        date_of_birth: form.date_of_birth,
        email: form.email.trim(),
        phone_number: form.phone_number.trim(),
        address: form.address.trim(),
        nationality: form.nationality.trim(),
        high_school_name: form.high_school_name.trim(),
        gpa: parsedGpa,
        intended_major: form.intended_major.trim(),
        scholarship_type: form.scholarship_type.trim(),
        family_income: parsedFamilyIncome,
        motivation_letter: form.motivation_letter.trim(),
        status: "pending",
      });

      setSuccessMessage("Application submitted successfully.");
      setForm(initialState(scholarship));
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to submit application.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="mx-auto w-full max-w-4xl px-4">
        <Link
          href={`/client/scholarship/${scholarship.id}`}
          className="mb-4 inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Scholarship Detail
        </Link>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-slate-900">Scholarship Application</h1>
          <p className="mt-1 text-sm text-slate-600">
            Apply for <span className="font-semibold">{scholarship.title}</span>
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  value={form.first_name}
                  onChange={(e) => onChange("first_name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  value={form.last_name}
                  onChange={(e) => onChange("last_name", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select
                  value={form.gender}
                  onValueChange={(value) => onChange("gender", value)}
                >
                  <SelectTrigger className="w-full">
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
                  value={form.date_of_birth}
                  onChange={(e) => onChange("date_of_birth", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  value={form.phone_number}
                  onChange={(e) => onChange("phone_number", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={form.address}
                onChange={(e) => onChange("address", e.target.value)}
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  value={form.nationality}
                  onChange={(e) => onChange("nationality", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="high_school_name">High School Name</Label>
                <Input
                  id="high_school_name"
                  value={form.high_school_name}
                  onChange={(e) => onChange("high_school_name", e.target.value)}
                  required
                />
              </div>
            </div>

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
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="family_income">Family Income (USD / year)</Label>
                <Input
                  id="family_income"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.family_income}
                  onChange={(e) => onChange("family_income", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="intended_major">Intended Major</Label>
                <Input
                  id="intended_major"
                  value={form.intended_major}
                  onChange={(e) => onChange("intended_major", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="scholarship_type">Scholarship Type</Label>
                <Input
                  id="scholarship_type"
                  value={form.scholarship_type}
                  onChange={(e) => onChange("scholarship_type", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation_letter">Motivation Letter</Label>
              <Textarea
                id="motivation_letter"
                value={form.motivation_letter}
                onChange={(e) => onChange("motivation_letter", e.target.value)}
                className="min-h-40"
                required
              />
            </div>

            {errorMessage ? (
              <p className="text-sm font-medium text-red-600">{errorMessage}</p>
            ) : null}
            {successMessage ? (
              <p className="text-sm font-medium text-emerald-600">{successMessage}</p>
            ) : null}

            <Button type="submit" className="h-11 rounded-xl" disabled={isSubmitting}>
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
  );
}

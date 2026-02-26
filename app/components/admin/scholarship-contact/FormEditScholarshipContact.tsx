"use client";

import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Loader2,
  ArrowLeft,
  Save,
  RotateCcw,
  Building2,
  Mail,
  Phone,
  Globe,
  MapPin,
  MoveRight,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import {
  useScholarshipContactsByScholarshipId, // <-- corrected: fetch single contact by ID
  useUpdateScholarshipContact,
  useAllScholarships,
} from "@/hooks/use-queries-hook";
import {
  ScholarshipContactCreateInput,
  scholarshipContactCreateSchema,
} from "@/lib/schema/scholarship-contact";
import SingleSelectControlComponent from "./SingleSelectControlComponent";

interface FormEditScholarshipContactProps {
  id: string | number; // should be the contact ID
}

export function FormEditScholarshipContact({ id }: FormEditScholarshipContactProps) {
  // Use the correct hook to fetch a single contact by its ID
  const { data: contact, isLoading, error } = useScholarshipContactsByScholarshipId(id);
  const { data: scholarships, isLoading: loadingScholarships } = useAllScholarships();
  const { mutate: updateContact, isPending: isUpdating } = useUpdateScholarshipContact();

  const scholarshipOptions =
    scholarships?.content?.map((scholarship: any) => ({
      value: scholarship.id.toString(),
      label: scholarship.name,
    })) ?? [];

  const form = useForm<ScholarshipContactCreateInput>({
    resolver: zodResolver(scholarshipContactCreateSchema),
    defaultValues: {
      scholarshipId: undefined,
      label: "",
      email: "",
      phone: "",
      websiteUrl: "",
    },
  });

  // Populate form when contact data is loaded
  useEffect(() => {
    if (contact) {
      form.reset({
        scholarshipId: contact.scholarship_id,
        label: contact.label ?? "",          // corrected: use 'name', not 'label'
        email: contact.email ?? "",
        phone: contact.phone ?? "",
        websiteUrl: contact.websiteUrl ?? "",     // corrected: use 'website', not 'websiteUrl'
        // address: contact. ?? "",     // added address
      });
    }
  }, [contact, form]);

  function onSubmit(data: ScholarshipContactCreateInput) {
    updateContact(
      { id, body: data },   // id is the contact ID for update
      {
        onSuccess: () => {
          toast.success("Contact updated!", {
            description: "Changes have been saved successfully.",
          });
        },
        onError: (err: any) => {
          toast.error("Update failed", {
            description: err?.response?.data?.message || err.message,
          });
        },
      }
    );
  }

  // Reset to original contact data (not empty defaults)
  const handleReset = () => {
    if (contact) {
      form.reset({
        scholarshipId: contact.scholarship_id,
        label: contact.label ?? "",
        email: contact.email ?? "",
        phone: contact.phone ?? "",
        websiteUrl: contact.websiteUrl ?? "",
        // address: contact.address ?? "",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[85vh] gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-xl" />
          <Loader2 className="w-10 h-10 animate-spin text-primary relative" />
        </div>
        <p className="text-muted-foreground animate-pulse">
          Loading contact data...
        </p>
      </div>
    );
  }

  if (error || !contact) {
    return (
      <Card className="border-destructive/50 bg-destructive/5 max-w-md mx-auto mt-10">
        <CardContent className="py-10 text-center">
          <p className="text-destructive font-medium mb-4">
            Failed to load contact.
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {isUpdating && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <div className="text-center">
              <p className="font-bold text-gray-900">Updating Contact</p>
              <p className="text-sm text-gray-500">Saving changes...</p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header with back navigation */}
        <div className="flex items-center gap-4">
          <Link href="/admin/scholarships-contact">
            <Button variant="outline" size="icon" className="shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Edit Scholarship Contact
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary" className="rounded-full px-3 py-0.5">
                ID: {id}
              </Badge>
              <MoveRight className="w-3 h-3" />
              <span className="font-medium text-foreground/80">
                {contact.label || "Unnamed"}
              </span>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <Card className="border-none overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />
          <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-6">
            <CardTitle className="text-xl font-semibold">
              Contact Information
            </CardTitle>
            <CardDescription>
              Edit the details and scholarship association for this contact.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-5">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
              {/* Core Information Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
                  Core Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Scholarship Selection (required) */}
                  <FieldGroup className="md:col-span-2">
                    <SingleSelectControlComponent
                      control={form.control}
                      name="scholarshipId"
                      label="Scholarship"
                      options={scholarshipOptions}
                      placeholder="Select a scholarship"
                      size="middle"
                    />
                  </FieldGroup>

                  {/* Contact Name (required) */}
                  <FieldGroup className="md:col-span-1">
                    <Controller
                      name="label"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            Contact Name <span className="text-red-500">*</span>
                          </FieldLabel>
                          <Input
                            {...field}
                            placeholder="e.g. Admissions Office"
                            className="focus-visible:ring-blue-500 h-8 rounded"
                          />
                          {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  {/* Email */}
                  <FieldGroup className="md:col-span-1">
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            Email
                          </FieldLabel>
                          <Input
                            {...field}
                            type="email"
                            placeholder="contact@example.com"
                            className="focus-visible:ring-blue-500 h-8 rounded"
                          />
                          {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  {/* Phone */}
                  <FieldGroup className="md:col-span-1">
                    <Controller
                      name="phone"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            Phone
                          </FieldLabel>
                          <Input
                            {...field}
                            placeholder="+1234567890"
                            className="focus-visible:ring-blue-500 h-8 rounded"
                          />
                          {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  {/* Website */}
                  <FieldGroup className="md:col-span-1">
                    <Controller
                      name="websiteUrl"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-muted-foreground" />
                            Website
                          </FieldLabel>
                          <Input
                            {...field}
                            placeholder="https://example.com"
                            className="focus-visible:ring-blue-500 h-8 rounded"
                          />
                          {fieldState.error && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </div>
              </div>

              <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />


              {/* Form Actions */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleReset}        // corrected: reset to original contact
                  disabled={isUpdating}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Fields
                </Button>
                <Button
                  type="submit"
                  disabled={isUpdating || loadingScholarships}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25 min-w-[160px]"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Update Contact
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

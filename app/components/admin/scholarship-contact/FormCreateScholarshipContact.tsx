"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, Save, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";

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

import { useAllScholarships, useCreateScholarshipContact } from "@/hooks/use-queries-hook";
import SingleSelectControlComponent from "./SingleSelectControlComponent";
import { ScholarshipContactCreateInput, scholarshipContactCreateSchema } from "@/lib/schema/scholarship-contact";

// Define the schema to match ScholarshipContactRequest

export default function CreateScholarshipContactPage() {
  const router = useRouter();
  const { mutate: createContact, isPending: isCreating } = useCreateScholarshipContact();
  const { data: scholarships, isLoading: loadingScholarships } = useAllScholarships();



  const scholarshipOptions =
    scholarships?.content?.map((scholarship: any) => ({
      value: scholarship.id.toString(),
      label: scholarship.name,
    })) ?? [];

  const form = useForm<ScholarshipContactCreateInput>({
    resolver: zodResolver(scholarshipContactCreateSchema),
    defaultValues: {
      scholarshipId: scholarshipOptions[0]?.value
        ? parseInt(scholarshipOptions[0].value)
        : undefined,
      label: "",
      email: "",
      phone: "",
      websiteUrl: "",
    },
  });

  function onSubmit(data: ScholarshipContactCreateInput) {
    createContact(data, {
      onSuccess: () => {
        toast.success("Contact created successfully!", {
          description: `${data.label} has been added.`,
        });
        form.reset();
        // router.push("/admin/scholarship-contacts");
      },
      onError: (error: any) => {
        toast.error("Failed to create contact", {
          description:
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong",
        });
      },
    });
  }

  return (
    <div className="relative">
      {/* Global loading overlay */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <div className="text-center">
              <p className="font-bold text-gray-900">Creating Contact</p>
              <p className="text-sm text-gray-500">Saving to database...</p>
            </div>
          </div>
        </div>
      )}

      <Card className="w-full px-5 shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create New Scholarship Contact
          </CardTitle>
          <CardDescription>
            Add a contact person or office for scholarship inquiries.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Scholarship Selection (required) */}
              <FieldGroup className="md:col-span-1">
                <SingleSelectControlComponent
                  control={form.control}
                  name="scholarshipId"
                  label="Scholarship"
                  options={scholarshipOptions}
                  placeholder="Select a scholarship"
                  size="middle"
                />
              </FieldGroup>

              {/* Name (required) */}
              <FieldGroup className="md:col-span-1">
                <Controller
                  name="label"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel>Contact Label *</FieldLabel>
                      <Input
                        {...field}
                        placeholder="e.g. Admissions Office"
                        className="rounded h-8"
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
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel>Email</FieldLabel>
                      <Input
                        {...field}
                        type="email"
                        placeholder="contact@example.com"
                        className="rounded h-8"
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
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel>Phone</FieldLabel>
                      <Input
                        {...field}
                        placeholder="+1234567890"
                        className="rounded h-8"
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
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel>Website</FieldLabel>
                      <Input
                        {...field}
                        placeholder="https://example.com"
                        className="rounded h-8"
                      />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              <Separator className="md:col-span-2" />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                disabled={isCreating}
                onClick={() => form.reset()}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button
                type="submit"
                disabled={isCreating || loadingScholarships}
                className="px-8"
              >
                {isCreating ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Contact
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

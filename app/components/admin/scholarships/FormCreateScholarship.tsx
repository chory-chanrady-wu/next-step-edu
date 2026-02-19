"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import UploadImageControl from "./UploadImage";
import { DatePickerScholarship } from "./DatePicker";

import {
  scholarshipSchemaValidate,
  ScholarshipType,
} from "@/lib/schema/scholarship";
import { UploadFile } from "antd";
import { useCreateScholarship } from "@/hooks/use-queries-hook";
import { ScholarshipMultipartPayload } from "@/types/nextstepedu";

// Education level options with numeric values as strings
const educationLevel = [
  { label: "Undergraduate", value: "1" },
  { label: "Graduate", value: "2" },
  { label: "PhD", value: "3" },
  { label: "Diploma", value: "4" },
] as const;

export function FormCreateScholarship() {
  const { mutate: createScholarship, isPending: isCreating } =
    useCreateScholarship();
  const resolver = zodResolver(scholarshipSchemaValidate) as Resolver<ScholarshipType>;

  const form = useForm<ScholarshipType>({
    resolver,
    defaultValues: {
      name: "",
      description: "",
      level: 1, // default to Undergraduate
      benefits: "",
      requirements: "",
      howToApply: "",
      applyLink: "",
      deadline: "",
      programId: 0,
      universityId: 0,
      status: "ACTIVE",
      logo: [] as UploadFile[],
      coverImage: [] as UploadFile[],
    },
  });

  function onSubmit(formData: ScholarshipType) {
    const { logo, coverImage, ...rest } = formData;

    const payload: ScholarshipMultipartPayload = {
      logo: logo?.[0]?.originFileObj || null,
      coverImage: coverImage?.[0]?.originFileObj || null,
      data: {
        name: rest.name,
        description: rest.description,
        level: rest.level, // already a number
        benefits: rest.benefits,
        requirements: rest.requirements,
        howToApply: rest.howToApply,
        applyLink: rest.applyLink,
        deadline: rest.deadline,
        programId: rest.programId,
        universityId: rest.universityId,
        status: rest.status,
      },
    };

    createScholarship(payload, {
      onSuccess: () => {
        toast("Scholarship created successfully!", {
          description: "The scholarship has been saved to the database.",
          position: "bottom-right",
        });
      },
      onError: (error: any) => {
        console.log("Mutation error:", error);
        toast("Failed to create scholarship", {
          description: error?.response?.data?.message || error?.message || "Something went wrong",
          position: "bottom-right",
        });
      },
    });
  }

  return (
    <>
      {/* Loading Popup */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-gray-700">Creating scholarship...</p>
          </div>
        </div>
      )}

      <Card className="w-full px-5 shadow-none border-none">
        <CardHeader>
          <CardTitle>Create Scholarship</CardTitle>
          <CardDescription>
            Fill in the scholarship information below.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              {/* Name */}
              <FieldGroup>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Name *</FieldLabel>
                      <Input {...field} placeholder="Scholarship Name" />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Level - replaced number input with select */}
              <FieldGroup>
                <Controller
                  name="level"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="w-full">
                      <FieldLabel htmlFor="level-select">Level *</FieldLabel>
                      <Select
                        value={field.value.toString() ?? "1"}
                        onValueChange={(val) => field.onChange(parseInt(val, 10))}
                      >
                        <SelectTrigger id="level-select" className="w-full rounded">
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          {educationLevel.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Program ID */}
              <FieldGroup>
                <Controller
                  name="programId"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Program ID *</FieldLabel>
                      <Input type="number"  {...field} />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* University ID */}
              <FieldGroup>
                <Controller
                  name="universityId"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>University ID *</FieldLabel>
                      <Input type="number" {...field} />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Status */}
              <FieldGroup>
                <Controller
                  name="status"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Status *</FieldLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                          <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Apply Link */}
              <FieldGroup>
                <Controller
                  name="applyLink"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Apply Link *</FieldLabel>
                      <Input {...field} placeholder="https://example.com/apply" />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Deadline */}
              <FieldGroup>
                <DatePickerScholarship
                  name="deadline"
                  control={form.control}
                  id="deadline"
                  placeholder="Select deadline"
                />
              </FieldGroup>

              {/* Logo Upload */}
              <FieldGroup>
                <UploadImageControl
                  name="logo"
                  id="logo"
                  control={form.control}
                  label="Logo"
                  multiple={false}
                />
              </FieldGroup>

              {/* Cover Image Upload */}
              <FieldGroup>
                <UploadImageControl
                  name="coverImage"
                  id="coverImage"
                  control={form.control}
                  label="Cover Image"
                  multiple={false}
                />
              </FieldGroup>

              {/* Benefits */}
              <FieldGroup className="col-span-2">
                <Controller
                  name="benefits"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Benefits *</FieldLabel>
                      <Textarea {...field} />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Requirements */}
              <FieldGroup className="col-span-2">
                <Controller
                  name="requirements"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Requirements *</FieldLabel>
                      <Textarea {...field} />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* How To Apply */}
              <FieldGroup className="col-span-2">
                <Controller
                  name="howToApply"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>How To Apply *</FieldLabel>
                      <Textarea {...field} />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Description */}
              <FieldGroup className="col-span-2">
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Description *</FieldLabel>
                      <Textarea {...field} />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Buttons */}
              <Field orientation="horizontal" className="col-span-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isCreating}
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button type="submit" disabled={isCreating}>
                  Save
                </Button>
              </Field>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

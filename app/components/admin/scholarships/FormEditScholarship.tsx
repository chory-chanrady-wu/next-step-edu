"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Loader2,
  ArrowLeft,
  Save,
  RotateCcw,
  GraduationCap,
  Link as LinkIcon,
  FileText,
  ListChecks,
  Gift,
  MoveRight,
  Form,
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import UploadImageControl from "./UploadImage";
import { DatePickerScholarship } from "./DatePicker";
import {
  scholarshipSchemaValidate,
  ScholarshipType,
} from "@/lib/schema/scholarship";
import { useUpdateScholarship, useScholarship } from "@/hooks/use-queries-hook";
import { useAllUniversities, useAllPrograms } from "@/hooks/use-queries-hook";
import { ScholarshipMultipartPayload } from "@/types/nextstepedu";
import SingleSelectControlComponent from "../scholarships/SingleSelectControlComponent";

interface FormEditScholarshipProps {
  id: string;
}

export function FormEditScholarship({ id }: FormEditScholarshipProps) {
  const { mutate: updateScholarship, isPending: isUpdating } =
    useUpdateScholarship();
  const { data: scholarship, isLoading, error } = useScholarship(id);
  const { data: universities, isLoading: loadingUniversities } =
    useAllUniversities();
  const { data: programs, isLoading: loadingPrograms } = useAllPrograms();

  // Prepare options for dropdowns
  const universityOptions =
    universities?.map((uni: any) => ({
      value: uni.id.toString(),
      label: uni.name,
    })) ?? [];

  const programOptions =
    programs?.map((prog: any) => ({
      value: prog.id.toString(),
      label: prog.name,
    })) ?? [];

  const levelOptions = [
    { value: "1", label: "Undergraduate" },
    { value: "2", label: "Graduate" },
    { value: "3", label: "PhD" },
    { value: "4", label: "Diploma" },
  ];

  const form = useForm<ScholarshipType>({
    resolver: zodResolver(
      scholarshipSchemaValidate,
    ) as Resolver<ScholarshipType>,
    defaultValues: {
      name: "",
      description: "",
      level: 1,
      benefits: "",
      requirements: "",
      howToApply: "",
      applyLink: "",
      deadline: "",
      amount: 0,
      programId: 0,
      universityId: 0,
      status: "ACTIVE",
      logo: [],
      coverImage: [],
    },
  });

  useEffect(() => {
    if (scholarship) {
      form.reset({
        name: scholarship.name,
        description: scholarship.description || "",
        level: scholarship.level || 1,
        benefits: scholarship.benefits || "",
        requirements: scholarship.requirements || "",
        howToApply: scholarship.howToApply || "",
        applyLink: scholarship.applyLink || "",
        deadline: scholarship.deadline?.split("T")[0] || "",
        amount: scholarship.amount || 0,
        programId: scholarship.programId || scholarship.program?.id || 0,
        universityId:
          scholarship.universityId || scholarship.university?.id || 0,
        status: (scholarship.status as "ACTIVE" | "INACTIVE") || "ACTIVE",
        logo: scholarship.logoUrl
          ? [
            {
              uid: "-1",
              name: "logo.png",
              status: "done",
              url: scholarship.logoUrl,
            },
          ]
          : [],
        coverImage: scholarship.coverImageUrl
          ? [
            {
              uid: "-2",
              name: "cover_image.png",
              status: "done",
              url: scholarship.coverImageUrl,
            },
          ]
          : [],
      });
    }
  }, [scholarship, form]);

  function onSubmit(formData: ScholarshipType) {
    const { logo, coverImage, ...restOfData } = formData;

    const logoFile = logo?.[0]?.originFileObj || null;
    const coverFile = coverImage?.[0]?.originFileObj || null;

    const rawDate = restOfData.deadline || "";
    const dateOnly = rawDate.includes("T") ? rawDate.split("T")[0] : rawDate;
    const formattedDeadline = dateOnly ? `${dateOnly}T00:00:00` : null;

    const payload: ScholarshipMultipartPayload = {
      logo: logoFile,
      coverImage: coverFile,
      data: {
        ...restOfData,
        level: Number(restOfData.level),
        amount: Number(restOfData.amount),
        programId: Number(restOfData.programId),
        universityId: Number(restOfData.universityId),
        deadline: formattedDeadline,
      },
    };

    updateScholarship(
      { id, payload },
      {
        onSuccess: () => {
          toast.success("Scholarship updated!", {
            description: "Changes are now live on production.",
          });
        },
        onError: (err: any) => {
          toast.error("Update failed", {
            description: err?.response?.data?.message || err.message,
          });
        },
      },
    );
  }

  if (isLoading || loadingPrograms || loadingUniversities) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-xl" />
          <Loader2 className="w-10 h-10 animate-spin text-primary relative" />
        </div>
        <p className="text-muted-foreground animate-pulse">
          Synchronizing with production data...
        </p>
      </div>
    );
  }

  if (error || !scholarship) {
    return (
      <Card className="border-destructive/50 bg-destructive/5 max-w-md mx-auto mt-10">
        <CardContent className="py-10 text-center">
          <p className="text-destructive font-medium mb-4">
            Failed to reach production server.
          </p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry Connection
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header with navigation */}
      <div className="flex items-center gap-4">
        <Link href="/admin/scholarships">
          <Button variant="outline" size="icon" className="shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Edit Scholarship
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="secondary" className="rounded-full px-3 py-0.5">
              ID: {scholarship.id}
            </Badge>
            <MoveRight className="w-3 h-3" />
            <span className="font-medium text-foreground/80">
              {scholarship.university?.name || "University"}
            </span>
          </div>
        </div>
      </div>

      {/* Main form card */}
      <Card className="border-none overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-6">
          <CardTitle className="text-xl font-semibold">
            Core Information
          </CardTitle>
          <CardDescription>
            Main details and institutional mapping.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-5">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            {/* Row 1: Title, Status, IDs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Scholarship Name */}
              <FieldGroup className="lg:col-span-2">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-muted-foreground" />
                        Scholarship Title{" "}
                        <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        placeholder="e.g. Full Tuition Merit Scholarship"
                        className="focus-visible:ring-blue-500"
                      />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Status */}
              <FieldGroup>
                <Controller
                  name="status"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        Visibility Status
                      </FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ACTIVE">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-emerald-500" />
                              ACTIVE
                            </div>
                          </SelectItem>
                          <SelectItem value="INACTIVE">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-gray-400" />
                              INACTIVE
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* University Select */}
              {!loadingUniversities && universityOptions.length > 0 ? (
                <FieldGroup>
                  <SingleSelectControlComponent
                    control={form.control}
                    name="universityId"
                    label="University"
                    options={universityOptions}
                    placeholder="Select a university"
                    size="middle"
                  />
                  {scholarship.university?.name && (
                    <p className="text-xs flex gap-1 items-center text-muted-foreground mt-1.5">
                      <span>Current:</span>
                      <span className="text-blue-500 font-bold p-1 bg-gray-300/20 rounded">
                        @{scholarship.university.name}
                      </span>
                    </p>
                  )}
                </FieldGroup>
              ) : (
                <div
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    backgroundColor: "#f9f9f9",
                    border: "1px dashed #ccc",
                    borderRadius: "8px",
                    color: "#666",
                    fontSize: "14px",
                    minHeight: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {loadingUniversities ? (
                    <>
                      <span style={{ marginRight: "8px" }}>
                        Loading universities
                      </span>
                      <span className="spinner" /> {/* optional spinner */}
                    </>
                  ) : (
                    "No universities available"
                  )}
                </div>
              )}

              {/* Program Select */}
              {!loadingPrograms && programOptions.length > 0 ? (
                <FieldGroup>
                  <SingleSelectControlComponent
                    control={form.control}
                    name="programId"
                    label="Program"
                    options={programOptions}
                    placeholder="Select a program"
                    size="middle"
                  />
                  {scholarship.program?.name && (
                    <p className="text-xs flex gap-1 items-center text-muted-foreground mt-1.5">
                      <span>Current:</span>
                      <span className="text-blue-500 font-bold p-1 bg-gray-300/20 rounded">
                        @{scholarship.program.name}
                      </span>
                    </p>
                  )}
                </FieldGroup>
              ) : (
                <div
                  style={{
                    padding: "16px",
                    textAlign: "center",
                    backgroundColor: "#f9f9f9",
                    border: "1px dashed #ccc",
                    borderRadius: "8px",
                    color: "#666",
                    fontSize: "14px",
                    minHeight: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {loadingPrograms ? (
                    <>
                      <span style={{ marginRight: "8px" }}>
                        Loading programs
                      </span>
                      <span className="spinner" /> {/* optional spinner */}
                    </>
                  ) : (
                    "No Program available"
                  )}
                </div>
              )}

              {/* Level Select */}
              <SingleSelectControlComponent
                control={form.control}
                name="level"
                label="Education Level"
                options={levelOptions}
                placeholder="Select level"
                size="middle"
              />

              {/* Apply Link */}
              <FieldGroup className="lg:col-span-3">
                <Controller
                  name="applyLink"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel className="flex items-center gap-2">
                        <LinkIcon className="w-4 h-4 text-muted-foreground" />
                        Official Application Link
                      </FieldLabel>
                      <Input
                        {...field}
                        placeholder="https://university.edu/apply"
                        className="focus-visible:ring-blue-500"
                      />
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Deadline */}
              <FieldGroup className="lg:col-span-1/2">
                <DatePickerScholarship
                  name="deadline"
                  control={form.control}
                  id="deadline"
                />
              </FieldGroup>

              {/* Amount */}
              <FieldGroup className="lg:col-span-1/2">
                <Controller
                  name="amount"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel>Amount *</FieldLabel>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)} // 👈 convert to number
                        placeholder="Scholarship Amount"
                      />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>

            <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Visuals Section */}
            <div>
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
                Visual Assets
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <UploadImageControl
                  name="logo"
                  id="logo"
                  control={form.control}
                  label="Provider Logo"
                />
                <UploadImageControl
                  name="coverImage"
                  id="coverImage"
                  control={form.control}
                  label="Cover Hero Image"
                />
              </div>
            </div>

            <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Detailed Content */}
            <div className="space-y-8">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
                Scholarship Details
              </h3>

              {/* Description */}
              <FieldGroup>
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        Scholarship Overview
                      </FieldLabel>
                      <Textarea
                        {...field}
                        rows={5}
                        placeholder="Describe the scholarship, its mission, and target audience..."
                        className="resize-none focus-visible:ring-blue-500"
                      />
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Requirements & Benefits grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FieldGroup>
                  <Controller
                    name="requirements"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel className="flex items-center gap-2">
                          <ListChecks className="w-4 h-4 text-muted-foreground" />
                          Requirements
                        </FieldLabel>
                        <Textarea
                          {...field}
                          rows={6}
                          placeholder="List eligibility criteria, GPA, language tests, etc."
                          className="resize-none focus-visible:ring-blue-500"
                        />
                      </Field>
                    )}
                  />
                </FieldGroup>

                <FieldGroup>
                  <Controller
                    name="benefits"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel className="flex items-center gap-2">
                          <Gift className="w-4 h-4 text-muted-foreground" />
                          Benefits & Coverage
                        </FieldLabel>
                        <Textarea
                          {...field}
                          rows={6}
                          placeholder="What does the scholarship cover? Tuition, stipend, travel?"
                          className="resize-none focus-visible:ring-blue-500"
                        />
                      </Field>
                    )}
                  />
                </FieldGroup>
              </div>

              {/* How To Apply */}
              <FieldGroup>
                <Controller
                  name="howToApply"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel className="flex items-center gap-2">
                        <Form className="w-4 h-4 text-muted-foreground" />
                        Application Instructions
                      </FieldLabel>
                      <Textarea
                        {...field}
                        rows={4}
                        placeholder="Step-by-step guide on how to apply..."
                        className="resize-none focus-visible:ring-blue-500"
                      />
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
              <Button
                type="button"
                variant="ghost"
                onClick={() => form.reset()}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Fields
              </Button>
              <Button
                type="submit"
                disabled={isUpdating}
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
                    Update Scholarship
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

<<<<<<< HEAD
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
=======
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Loader2,
  ArrowLeft,
  Save,
  RotateCcw,
  Building2,
  GraduationCap,
  BookOpen,
  Calendar,
  DollarSign,
  CheckCircle2,
  XCircle,
  FileText,
  MoveRight,
} from "lucide-react";
import Link from "next/link";
>>>>>>> kimsan

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
<<<<<<< HEAD
=======
import { Textarea } from "@/components/ui/textarea";
>>>>>>> kimsan
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
<<<<<<< HEAD
import MultipleSelectControlComponent from "./MultipleSelectControlComponent";
import {
  useFaculties,
  usePrograms,
  useUniversities,
} from "@/hooks/admin-custom-hook";
import {
  facultiesToOptions,
  universitiesToOptions,
} from "@/app/lib/formatters";
import IncrementNumbers from "./IncredementNumbers";
import { ProgramSchema, ProgramSchemaType } from "@/app/lib/schema/program";
import CheckboxProgram from "./CheckboxProgram";

const currencyOpts = [
  { label: "USD($)", value: "usd" },
  { label: "RIEL(៛) ", value: "riel" },
] as const;

export const eligibilityOptions = [
  { value: "high-school-graduate", label: "High School Graduate" },
  { value: "undergraduate-student", label: "Undergraduate Student" },
  { value: "bachelor-degree", label: "Bachelor Degree" },
  { value: "master-degree", label: "Master Degree" },
  { value: "doctoral-degree", label: "Doctoral/PhD Degree" },
  { value: "working-professional", label: "Working Professional" },
  { value: "researcher", label: "Researcher" },
  { value: "international-student", label: "International Student" },
  { value: "domestic-student", label: "Domestic Student" },
  { value: "low-income", label: "Low Income" },
  { value: "merit-based", label: "Merit Based" },
  { value: "athlete", label: "Athlete" },
  { value: "minority", label: "Minority Group" },
  { value: "disability", label: "Person with Disability" },
  { value: "entrepreneur", label: "Entrepreneur" },
  { value: "veteran", label: "Veteran" },
  { value: "teacher", label: "Teacher/Educator" },
  { value: "student-leader", label: "Student Leader" },
];

export function FormEditProgram() {
  const { isLoading, error } = usePrograms();
  const { data: universities } = useUniversities();
  const { data: faculties } = useFaculties();
=======
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { useProgram, useUpdateProgram } from "@/hooks/use-queries-hook";
import { useAllUniversities, useAllFaculties } from "@/hooks/use-queries-hook";
import { ProgramCreateRequest, programCreateSchema } from "@/lib/schema/program";
import SingleSelectControlComponent from "./SingleSelectControlComponent";

const currencyOpts = [
  { label: "USD ($)", value: "USD" },
  { label: "EUR (€)", value: "EUR" },
  { label: "GBP (£)", value: "GBP" },
  { label: "RIEL (៛)", value: "KHR" },
];
const educationLevel = [
  { label: "Undergraduate", value: "1" },
  { label: "Graduate", value: "2" },
  { label: "PhD", value: "3" },
  { label: "Diploma", value: "4" },
];

interface FormEditProgramProps {
  id: string | number;
}

export function FormEditProgram({ id }: FormEditProgramProps) {
  const { data: program, isLoading, error } = useProgram(id);
  const { data: universities, isLoading: loadingUniversities } = useAllUniversities();
  const { data: faculties, isLoading: loadingFaculties } = useAllFaculties();
  const { mutate: updateProgram, isPending: isUpdating } = useUpdateProgram();
>>>>>>> kimsan

  const facultyOptions = faculties?.map((fac: any) => ({
    value: fac.id.toString(),
    label: fac.name,
  })) ?? [];
  const universityOptions = universities?.map((uni: any) => ({
    value: uni.id.toString(),
    label: uni.name,
  })) ?? [];

  const resolver = zodResolver(programCreateSchema) as Resolver<ProgramCreateRequest>;
  const form = useForm<ProgramCreateRequest>({
    resolver,
    defaultValues: {
      name: "",
      description: "",
<<<<<<< HEAD
      eligibility: [], // Empty array, validation will require at least one
      exam_required: false,
      tuition_fee_amount: 0,
      currency: "USD", // Default to USD
      study_period_months: 48, // Typical 4-year program (48 months)
    },
  });

  function onSubmit(data: ProgramSchemaType) {
    toast("You submitted the following values:", {
      description: (
        <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <Card className="w-full flex px-5 shadow-none border-none">
      <CardHeader>
        <CardTitle>Create Program</CardTitle>
        <CardDescription>Create Program information below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-3">
            {/*
             ** @Field Title
             */}
            <FieldGroup className="col-span-1">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel
                      htmlFor="form-rhf-input-username"
                      className="flex items-center"
                    >
                      Program name<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="Program name"
                      autoComplete="title"
                      className="rounded"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>

            {/*
             ** @Select Field University
             */}
            <FieldGroup className="col-span-1">
              <Controller
                name="university_id"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <div className="w-full flex flex-col gap-1">
                      <FieldLabel htmlFor="form-rhf-select-category">
                        University
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="form-rhf-select-category"
                          aria-invalid={fieldState.invalid}
                          className="w-[34.1rem] rounded"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>

                        <SelectContent position="item-aligned">
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectSeparator />
                          {universitiesToOptions(universities).map(
                            (category) => (
                              <SelectItem
                                key={category.value}
                                value={category.value}
                              >
                                {category.label}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>
            {/*
             ** @Select Field Faculty
             */}
            <FieldGroup className="col-span-1">
              <Controller
                name="faculty_id"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <div className="w-full flex flex-col gap-1">
                      <FieldLabel htmlFor="form-rhf-select-faculty">
                        Faculty
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="form-rhf-select-faculty"
                          aria-invalid={fieldState.invalid}
                          className="w-[34.1rem] rounded"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>

                        <SelectContent position="item-aligned">
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectSeparator />
                          {facultiesToOptions(faculties).map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>

            {/*
             ** @Selects control component Eligibility field
             */}
            <FieldGroup className="col-span-1">
              <MultipleSelectControlComponent
                id="form-rhf-select-eligibility"
                control={form.control}
                label="Eligibility"
                placeholder="Select Eligibilities"
                name="eligibility"
                size="large"
                options={eligibilityOptions}
              />
            </FieldGroup>

            {/*
             ** @Checkbox Exam Required control component Scholarship
             */}
            <FieldGroup className="col-span-1">
              <CheckboxProgram
                id="form-rhf-checkbox-renewable"
                title="Exam Required"
                name="exam_required"
                control={form.control}
              />
            </FieldGroup>

            {/*
             ** @Select Field Currency
             */}
            <FieldGroup className="col-span-1">
              <Controller
                name="currency"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <div className="w-full flex flex-col gap-1">
                      <FieldLabel
                        htmlFor="form-rhf-select-currency"
                        className="flex items-center"
                      >
                        Currency<span className="text-red-500">*</span>
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="form-rhf-select-currency"
                          aria-invalid={fieldState.invalid}
                          className="w-[34.1rem] rounded"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>

                        <SelectContent position="item-aligned">
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectSeparator />
                          {currencyOpts.map((language) => (
                            <SelectItem
                              key={language.value}
                              value={language.value}
                            >
                              {language.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>

            {/*
             ** @Field Fee
             */}
            <FieldGroup className="col-span-1">
              <IncrementNumbers
                control={form.control}
                placeholder="Set Tuition Fee Amount"
                max={500}
                label="Set Tuition Fee Amount"
                name="tuition_fee_amount"
              />
            </FieldGroup>
            {/*
             ** @Field study_period_months
             */}
            <FieldGroup className="col-span-1">
              <IncrementNumbers
                control={form.control}
                placeholder="Set Study Period Months"
                max={500}
                label="Set Tuition Fee Amount"
                name="study_period_months"
              />
            </FieldGroup>
            {/*
             ** @Action Save and Reset
             */}
            <Field orientation="horizontal" className="col-end-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button type="submit" form="form-rhf-input">
                Save
              </Button>
            </Field>
          </div>
        </form>
      </CardContent>
    </Card>
=======
      degreeLevel: 1,
      examRequired: false,
      tuitionFeeAmount: 0,
      currency: "USD",
      studyPeriodMonths: 12,
      universityId: 0,
      facultyId: 0,
    },
  });

  useEffect(() => {
    if (program) {
      form.reset({
        name: program.name ?? "",
        description: program.description ?? "",
        degreeLevel: program.degreeLevel ?? 1,
        examRequired: !!program.examRequired,
        tuitionFeeAmount: program.tuitionFeeAmount ?? 0,
        currency: program.currency as "USD" | "EUR" | "GBP" | "KHR",
        studyPeriodMonths: program.studyPeriodMonths ?? 12,
        universityId: program.university?.id ?? 0,
        facultyId: program.faculty?.id ?? 0,
      });
    }
  }, [program, form]);

  function onSubmit(data: ProgramCreateRequest) {
    updateProgram(
      { id, body: data },
      {
        onSuccess: () => {
          toast.success("Program updated!", {
            description: "Changes are now live on the production server.",
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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[85vh] gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-xl" />
          <Loader2 className="w-10 h-10 animate-spin text-primary relative" />
        </div>
        <p className="text-muted-foreground animate-pulse">Loading program data...</p>
      </div>
    );
  }

  if (error || !program) {
    return (
      <Card className="border-destructive/50 bg-destructive/5 max-w-md mx-auto mt-10">
        <CardContent className="py-10 text-center">
          <p className="text-destructive font-medium mb-4">Failed to load program.</p>
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
              <p className="font-bold text-gray-900">Updating Program</p>
              <p className="text-sm text-gray-500">Syncing with database...</p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header with back navigation */}
        <div className="flex items-center gap-4">
          <Link href="/admin/programs">
            <Button variant="outline" size="icon" className="shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Edit Program
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary" className="rounded-full px-3 py-0.5">
                ID: {id}
              </Badge>
              <MoveRight className="w-3 h-3" />
              <span className="font-medium text-foreground/80">{program.university.name}</span>
              <MoveRight className="w-3 h-3" />
              <span className="font-medium text-foreground/80">{program.faculty.name}</span>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <Card className="border-none overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />
          <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-6">
            <CardTitle className="text-xl font-semibold">Program Information</CardTitle>
            <CardDescription>
              Edit the core details and institutional mapping for this academic program.
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
                  {/* Program Name */}
                  <FieldGroup className="md:col-span-2">
                    <Controller
                      name="name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-muted-foreground" />
                            Program Title <span className="text-red-500">*</span>
                          </FieldLabel>
                          <Input
                            {...field}
                            placeholder="e.g. Master of Computer Science"
                            className="focus-visible:ring-blue-500 h-8 rounded"
                          />
                          {fieldState.error && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  {/* University Select */}
                  <FieldGroup>

                    <SingleSelectControlComponent
                      control={form.control}
                      name="universityId"
                      label="University"
                      options={universityOptions}
                      placeholder="Select a university"
                      size="middle"
                    />
                  </FieldGroup>

                  {/* Faculty Select */}
                  <SingleSelectControlComponent
                    control={form.control}
                    name="facultyId"
                    label="Faculty"
                    options={facultyOptions}
                    placeholder="Select a faculty"
                    size="middle"
                  />
                </div>
              </div>

              <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

              {/* Academic & Financial Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
                  Academic & Financial Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Degree Level */}
                  <SingleSelectControlComponent
                    control={form.control}
                    name="degreeLevel"
                    label="Degree Level"
                    options={educationLevel}
                    placeholder="Select a faculty"
                    size="middle"
                  />

                  {/* Study Period */}
                  <FieldGroup>
                    <Controller
                      name="studyPeriodMonths"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            Duration (Months) <span className="text-red-500">*</span>
                          </FieldLabel>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                            className="focus-visible:ring-blue-500 h-8 rounded"
                          />
                          {fieldState.error && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  {/* Tuition Fee */}
                  <FieldGroup>
                    <Controller
                      name="tuitionFeeAmount"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            Tuition Fee Amount <span className="text-red-500">*</span>
                          </FieldLabel>
                          <Input
                            type="number"
                            step="0.01"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            className="focus-visible:ring-blue-500 h-8 rounded"
                          />
                          {fieldState.error && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  {/* Currency */}
                  <FieldGroup>
                    <Controller
                      name="currency"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                            Currency <span className="text-red-500">*</span>
                          </FieldLabel>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="h-8 rounded">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                            <SelectContent>
                              {currencyOpts.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {fieldState.error && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  {/* Exam Required Checkbox */}
                  <FieldGroup className="md:col-span-2 py-2">
                    <Controller
                      name="examRequired"
                      control={form.control}
                      render={({ field }) => (
                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                          <Checkbox
                            id="examRequired"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <label
                            htmlFor="examRequired"
                            className="text-sm font-semibold text-gray-700 cursor-pointer flex items-center gap-2"
                          >
                            {field.value ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-gray-400" />
                            )}
                            Entrance examination is mandatory for this program
                          </label>
                        </div>
                      )}
                    />
                  </FieldGroup>
                </div>
              </div>

              <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

              {/* Description Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
                  Program Description
                </h3>
                <FieldGroup>
                  <Controller
                    name="description"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          Description
                        </FieldLabel>
                        <Textarea
                          {...field}
                          value={field.value ?? ""}
                          rows={4}
                          placeholder="Provide an overview of the program, its objectives, and curriculum highlights..."
                          className="resize-none focus-visible:ring-blue-500 rounded"
                        />
                        {fieldState.error && <FieldError errors={[fieldState.error]} />}
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
                  disabled={isUpdating}
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
                      Update Program
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
>>>>>>> kimsan
  );
}

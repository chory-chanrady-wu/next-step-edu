"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, Resolver } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, Save, RotateCcw } from "lucide-react";
import { useEffect, useMemo } from "react";

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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

import {
  useAllUniversities,
  useCreateProgram,
  useUniversityById,
} from "@/hooks/use-queries-hook";
import {
  ProgramCreateRequest,
  programCreateSchema,
} from "@/lib/schema/program";
import SingleSelectControlComponent from "./SingleSelectControlComponent";

// Options for static selects
const educationLevel = [
  { label: "Associate Degree", value: "1" },
  { label: "Bachelor's Degree", value: "2" },
  { label: "Master's Degree", value: "3" },
  { label: "Doctoral Degree", value: "4" },
  { label: "Certificate", value: "5" },
  { label: "N/A", value: "6" },
];

const currencyOpts = [
  { label: "USD ($)", value: "USD" },
  { label: "EUR (€)", value: "EUR" },
  { label: "GBP (£)", value: "GBP" },
  { label: "RIEL (៛)", value: "KHR" },
];

export function FormCreateProgram() {
  const { mutate: createProgram, isPending: isCreating } = useCreateProgram();
  const { data: universities, isLoading: isLoadingUniversities } = useAllUniversities();

  // Prepare university options once data is available
  const universityOptions = useMemo(
    () =>
      universities?.map((uni: any) => ({
        value: uni.id.toString(),
        label: uni.name,
      })) ?? [],
    [universities]
  );

  const resolver = zodResolver(
    programCreateSchema,
  ) as Resolver<ProgramCreateRequest>;
  // Form setup with zod resolver
  const form = useForm<ProgramCreateRequest>({
    resolver,
    defaultValues: {
      name: "",
      description: "",
      degreeLevel: 1,
      examRequired: false,
      tuitionFeeAmount: 0,
      currency: "USD",
      studyPeriodMonths: 12,
      universityId: undefined,
      facultyId: undefined,
    },
  });

  // Watch selected university to fetch its faculties
  const selectedUniversityId = form.watch("universityId");

  // Fetch university details (including faculties) – hook already has enabled: !!id
  const {
    data: selectedUniversity,
    isLoading: isLoadingFaculties,
    isError: isFacultiesError,
  } = useUniversityById(selectedUniversityId);

  // Build faculty options from the fetched university
  const facultyOptions = useMemo(
    () =>
      selectedUniversity?.faculties?.map((fac: any) => ({
        value: fac.id.toString(),
        label: fac.name,
      })) ?? [],
    [selectedUniversity]
  );

  // Once universities are loaded, set the first as default if not already set
  useEffect(() => {
    if (universityOptions.length > 0 && !form.getValues("universityId")) {
      form.setValue("universityId", universityOptions[0].value);
    }
  }, [universityOptions, form]);

  // When university changes or faculties load, reset faculty selection appropriately
  useEffect(() => {
    // If there are faculties, default to the first one; otherwise clear the field
    if (facultyOptions.length > 0) {
      const currentFacultyId = form.getValues("facultyId");
      // Only update if current facultyId is not already valid to avoid unnecessary re-renders
      if (!currentFacultyId || !facultyOptions.some(opt => opt.value === currentFacultyId)) {
        form.setValue("facultyId", facultyOptions[0].value);
      }
    } else {
      form.setValue("facultyId", 0);
    }
  }, [facultyOptions, form]);

  // Submit handler
  function onSubmit(data: ProgramCreateRequest) {
    createProgram(data, {
      onSuccess: () => {
        toast.success("Program created successfully!", {
          description: `${data.name} has been added.`,
        });
        form.reset();
      },
      onError: (error: any) => {
        toast.error("Failed to create program", {
          description:
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong",
        });
      },
    });
  }

  // Determine faculty dropdown state
  const isFacultyDisabled = !selectedUniversityId || isLoadingFaculties || isFacultiesError || facultyOptions.length === 0;

  const facultyPlaceholder = !selectedUniversityId
    ? "Choose a university first"
    : isLoadingFaculties
      ? "Loading faculties..."
      : isFacultiesError
        ? "Error loading faculties"
        : facultyOptions.length === 0
          ? "No faculties available"
          : "Select a faculty";

  return (
    <div className="relative">
      {/* Global loading overlay for submission */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <div className="text-center">
              <p className="font-bold text-gray-900">Creating Program</p>
              <p className="text-sm text-gray-500">Saving to database...</p>
            </div>
          </div>
        </div>
      )}

      <Card className="w-full px-5 shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            New Academic Program
          </CardTitle>
          <CardDescription>
            Register a new program to allow scholarship mapping.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Program Name */}
              <FieldGroup className="md:col-span-2">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel>Program Title *</FieldLabel>
                      <Input
                        {...field}
                        placeholder="e.g. Master of Computer Science"
                        className="rounded h-8"
                      />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* University Select */}
              <SingleSelectControlComponent
                control={form.control}
                name="universityId"
                label="University"
                options={universityOptions}
                placeholder={isLoadingUniversities ? "Loading universities..." : "Select a university"}
                size="middle"
                disabled={isLoadingUniversities}
              />

              {/* Faculty Select (dependent) */}
              <SingleSelectControlComponent
                control={form.control}
                name="facultyId"
                label="Faculty"
                options={facultyOptions}
                placeholder={facultyPlaceholder}
                size="middle"
                disabled={isFacultyDisabled}
              />

              <Separator className="md:col-span-2" />

              {/* Degree Level */}
              <SingleSelectControlComponent
                control={form.control}
                name="degreeLevel"
                label="Degree Level"
                options={educationLevel}
                placeholder="Select degree level"
                size="middle"
              />

              {/* Duration */}
              <FieldGroup>
                <Controller
                  name="studyPeriodMonths"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel>Duration (Months) *</FieldLabel>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10) || 0)
                        }
                        className="rounded h-8"
                      />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
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
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel>Tuition Fee Amount *</FieldLabel>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                        className="rounded h-8"
                      />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
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
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel>Currency *</FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="!h-8 rounded">
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
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Exam Required */}
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
                        className="text-sm font-semibold text-gray-700 cursor-pointer"
                      >
                        Entrance examination is mandatory for this program
                      </label>
                    </div>
                  )}
                />
              </FieldGroup>

              {/* Description */}
              <FieldGroup className="md:col-span-2">
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel>Program Description</FieldLabel>
                      <Textarea
                        {...field}
                        rows={4}
                        className="rounded"
                        placeholder="Optional details..."
                      />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>

            {/* Form Actions */}
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
              <Button type="submit" disabled={isCreating} className="px-8">
                {isCreating ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Program
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

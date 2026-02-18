"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, Save, RotateCcw } from "lucide-react";

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

import { useCreateProgram } from "@/hooks/use-queries-hook";
import {
  ProgramCreateRequest,
  programCreateSchema
} from "@/lib/schema/program";

export function FormCreateProgram() {
  const { mutate: createProgram, isPending: isCreating } = useCreateProgram();

  const resolver = zodResolver(programCreateSchema) as Resolver<ProgramCreateRequest>;
  // FIX: Ensure the generic matches the Request schema (Flat IDs)
  const form = useForm<ProgramCreateRequest>({
    resolver,
    defaultValues: {
      name: "",
      description: "", // Matches z.string().default("")
      degreeLevel: 1,
      examRequired: false,
      tuitionFeeAmount: 0,
      currency: "USD",
      studyPeriodMonths: 12,
      universityId: 0,
      facultyId: 0,
    },
  });

  function onSubmit(data: ProgramCreateRequest) {
    createProgram(data, {
      onSuccess: () => {
        toast.success("Program created successfully!", {
          description: `${data.name} has been added to production.`,
        });
        form.reset();
      },
      onError: (error: any) => {
        toast.error("Failed to create program", {
          description: error?.response?.data?.message || error?.message || "Something went wrong",
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
              <p className="font-bold text-gray-900">Creating Program</p>
              <p className="text-sm text-gray-500">Syncing with Railway database...</p>
            </div>
          </div>
        </div>
      )}

      <Card className="w-full px-5 shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">New Academic Program</CardTitle>
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
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Program Title *</FieldLabel>
                      <Input {...field} placeholder="e.g. Master of Computer Science" />
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
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        placeholder="Enter ID"
                      />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Faculty ID */}
              <FieldGroup>
                <Controller
                  name="facultyId"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Faculty ID *</FieldLabel>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        placeholder="Enter ID"
                      />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              <Separator className="md:col-span-2" />

              {/* Degree Level */}
              <FieldGroup>
                <Controller
                  name="degreeLevel"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Degree Level (1-4) *</FieldLabel>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* Study Period */}
              <FieldGroup>
                <Controller
                  name="studyPeriodMonths"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Duration (Months) *</FieldLabel>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
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
                      <FieldLabel>Tuition Fee Amount *</FieldLabel>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
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
                      <FieldLabel>Currency *</FieldLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
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
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Program Description</FieldLabel>
                      <Textarea {...field} rows={4} placeholder="Optional details..." />
                      {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
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

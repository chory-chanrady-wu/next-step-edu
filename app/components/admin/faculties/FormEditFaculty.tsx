"use client";

import { useEffect, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Loader2,
  ArrowLeft,
  Save,
  RotateCcw,
  Building2,
  FileText,
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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { useAllFaculties, useFaculty, useUpdateFaculty } from "@/hooks/use-queries-hook";
import { useAllUniversities } from "@/hooks/use-queries-hook";
import { FacultyCreateRequest, facultyCreateSchema } from "@/lib/schema/faculty";
import SingleSelectControlComponent from "./SingleSelectControlComponent";

interface FormEditFacultyProps {
  id: string | number;
}

export function FormEditFaculty({ id }: FormEditFacultyProps) {
  const { data: facultyData, isLoading, error } = useFaculty(id);
  const { data: allFaculties } = useAllFaculties();
  const { data: universities, isLoading: loadingUniversities } = useAllUniversities();
  const { mutate: updateFaculty, isPending: isUpdating } = useUpdateFaculty();

  const universityOptions = universities?.map((uni: any) => ({
    value: uni.id.toString(),
    label: uni.name,
  })) ?? [];

  console.log(' Faculty: ', facultyData);


  // Memoize faculty to avoid recreating on every render
  const faculty = useMemo(() => {
    if (Array.isArray(facultyData)) {
      // If the hook returns an array, reconstruct a faculty object
      return {
        id: Number(id),
        name: `Faculty #${id}`, // Placeholder – replace when you have real data
        description: "",
        data: facultyData,
      };
    }
    return facultyData; // Normal object
  }, [facultyData, id]);

  const resolver = zodResolver(facultyCreateSchema) as Resolver<FacultyCreateRequest>;
  const form = useForm<FacultyCreateRequest>({
    resolver,
    defaultValues: {
      name: "",
      description: "",
      universityId: 0,
    },
  });

  useEffect(() => {
    if (faculty) {
      const firstUniversity = faculty.data?.[0];
      form.reset({
        name: faculty.name ?? "",
        description: faculty.description ?? "",
        universityId: firstUniversity?.id ?? 0,
      });
    }
  }, [faculty, form]);

  function onSubmit(data: FacultyCreateRequest) {
    updateFaculty(
      { id, body: data },
      {
        onSuccess: () => {
          toast.success("Faculty updated!", {
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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[85vh] gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-xl" />
          <Loader2 className="w-10 h-10 animate-spin text-primary relative" />
        </div>
        <p className="text-muted-foreground animate-pulse">Loading faculty data...</p>
      </div>
    );
  }

  if (error || !faculty) {
    return (
      <Card className="border-destructive/50 bg-destructive/5 max-w-md mx-auto mt-10">
        <CardContent className="py-10 text-center">
          <p className="text-destructive font-medium mb-4">Failed to load faculty.</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  const firstUniversity = faculty.data?.[0];

  return (
    <>
      {isUpdating && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <div className="text-center">
              <p className="font-bold text-gray-900">Updating Faculty</p>
              <p className="text-sm text-gray-500">Saving changes...</p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header with back navigation */}
        <div className="flex items-center gap-4">
          <Link href="/admin/faculties">
            <Button variant="outline" size="icon" className="shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Edit Faculty
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="secondary" className="rounded-full px-3 py-0.5">
                ID: {id}
              </Badge>
              <MoveRight className="w-3 h-3" />
              <span className="font-medium text-foreground/80">
                {firstUniversity?.name || "No university"}
              </span>
            </div>
          </div>
        </div>

        {/* Main Form Card */}
        <Card className="border-none overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600" />
          <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-6">
            <CardTitle className="text-xl font-semibold">Faculty Information</CardTitle>
            <CardDescription>
              Edit the core details and university association for this faculty.
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
                  {/* Faculty Name */}
                  <FieldGroup className="md:col-span-2">
                    <Controller
                      name="name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            Faculty Name <span className="text-red-500">*</span>
                          </FieldLabel>
                          <Input
                            {...field}
                            placeholder="e.g. Faculty of Engineering"
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
                </div>
              </div>

              <Separator className="bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

              {/* Description Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full" />
                  Faculty Description
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
                          placeholder="Provide an overview of the faculty, its departments, and academic focus..."
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
                  disabled={isUpdating || loadingUniversities}
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
                      Update Faculty
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

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, Save, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

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

import { useAllUniversities, useCreateFaculty } from "@/hooks/use-queries-hook";
import {
  facultyCreateSchema,
  FacultyCreateRequest,
} from "@/lib/schema/faculty";
import SingleSelectControlComponent from "./SingleSelectControlComponent";

export default function CreateFacultyPage() {
  const router = useRouter();
  const { mutate: createFaculty, isPending: isCreating } = useCreateFaculty();
  const { data: universities, isLoading: loadingUniversities } =
    useAllUniversities();

  const universityOptions =
    universities?.map((uni: any) => ({
      value: uni.id.toString(),
      label: uni.name,
    })) ?? [];

  const resolver = zodResolver(
    facultyCreateSchema,
  ) as Resolver<FacultyCreateRequest>;
  const form = useForm<FacultyCreateRequest>({
    resolver,
    defaultValues: {
      name: "",
      description: "",
      universityId: universityOptions[0]?.value
        ? parseInt(universityOptions[0].value)
        : undefined,
    },
  });

  function onSubmit(data: FacultyCreateRequest) {
    createFaculty(data, {
      onSuccess: () => {
        toast.success("Faculty created successfully!", {
          description: `${data.name} has been added.`,
        });
        form.reset();
        router.push("/admin/faculties");
      },
      onError: (error: any) => {
        toast.error("Failed to create faculty", {
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
              <p className="font-bold text-gray-900">Creating Faculty</p>
              <p className="text-sm text-gray-500">Saving to database...</p>
            </div>
          </div>
        </div>
      )}

      <Card className="w-full px-5 shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create New Faculty
          </CardTitle>
          <CardDescription>
            Add a new faculty under an existing university.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Faculty Name - full width */}
              <FieldGroup className="md:col-span-1">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel>Faculty Name *</FieldLabel>
                      <Input
                        {...field}
                        placeholder="e.g. Faculty of Engineering"
                        className="rounded h-8"
                      />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>

              {/* University Selection */}
              <FieldGroup className="md:col-span-1">
                <SingleSelectControlComponent
                  control={form.control}
                  name="universityId"
                  label="University"
                  options={universityOptions}
                  placeholder="Select a university"
                  size="middle"
                />
              </FieldGroup>

              <Separator className="md:col-span-2" />

              {/* Description - full width */}
              <FieldGroup className="md:col-span-2">
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel>Faculty Description</FieldLabel>
                      <Textarea
                        {...field}
                        rows={4}
                        className="rounded"
                        placeholder="Optional details about the faculty..."
                      />
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
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
              <Button
                type="submit"
                disabled={isCreating || loadingUniversities}
                className="px-8"
              >
                {isCreating ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Faculty
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

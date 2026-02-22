"use client";

import { zodResolver } from "@hookform/resolvers/zod";
<<<<<<< HEAD
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
=======
import { Controller, Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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
import {
  scholarshipSchema,
  ScholarshipTask,
} from "@/app/lib/schema/scholarship";
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
import { DatePickerScholarship } from "./DatePicker";
import { Textarea } from "@/components/ui/textarea";
import { UploadFile } from "antd";
import CheckboxScholarship from "./CheckboxScholarship";
import MultipleSelectControlComponent from "./MultipleSelectControlComponent";
import UploadImageControl from "./UploadImage";
import { usePrograms } from "@/hooks/admin-custom-hook";
import { programsToOptions } from "@/app/lib/formatters";
import IncrementNumbers from "./IncredementNumbers";

const currencyOpts = [
  { label: "USD($)", value: "usd" },
  { label: "RIEL(៛) ", value: "riel" },
] as const;
const statusOpts = [
  { label: "Open", value: "open" },
  { label: "Closed", value: "closed" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Extended", value: "extended" },
] as const;
const awardType = [
  { label: "Full", value: "full" },
  { label: "Partial", value: "partial" },
  { label: "Tuition", value: "tuition" },
  { label: "Stipend", value: "stipend" },
] as const;
const educationLevel = [
  { label: "Undergraduate", value: "undergraduate" },
  { label: "Graduate", value: "graduate" },
  { label: "Phd", value: "phd" },
  { label: "Diploma", value: "diploma" },
] as const;
const categories = [
  { label: "Academic", value: "academic" },
  { label: "Sports", value: "sports" },
  { label: "Arts", value: "arts" },
  { label: "Stem", value: "stem" },
  { label: "Need-based", value: "need-based" },
  { label: "Merit", value: "merit" },
  { label: "Minority", value: "minority" },
  { label: "Community", value: "community" },
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

export function FormCreateScholarship() {
  const { isLoading, data, error } = usePrograms();

  const form = useForm<ScholarshipTask>({
    resolver: zodResolver(scholarshipSchema),
=======

import UploadImageControl from "./UploadImage";
import { DatePickerScholarship } from "./DatePicker";

import {
  scholarshipSchemaValidate,
  ScholarshipType,
} from "@/lib/schema/scholarship";
import { UploadFile } from "antd";
import { useAllPrograms, useAllUniversities, useCreateScholarship } from "@/hooks/use-queries-hook";
import { ScholarshipMultipartPayload } from "@/types/nextstepedu";
import SingleSelectControlComponent from "./SingleSelectControlComponent";

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
  const { data: universities, isLoading: loadingUniversities } = useAllUniversities()
  const { data: programs, isLoading: loadingPrograms } = useAllPrograms();
  const resolver = zodResolver(scholarshipSchemaValidate) as Resolver<ScholarshipType>;

  const form = useForm<ScholarshipType>({
    resolver,
>>>>>>> kimsan
    defaultValues: {
      name: "",
      description: "",
      level: 1, // default to Undergraduate
      benefits: "",
      requirements: "",
      howToApply: "",
      applyLink: "",
      deadline: "",
      programId: 1,
      universityId: 1,
      status: "ACTIVE",
      logo: [] as UploadFile[],
      coverImage: [] as UploadFile[],
    },
  });

<<<<<<< HEAD
  function onSubmit(data: ScholarshipTask) {
    console.log("Data", data);
=======
  function onSubmit(formData: ScholarshipType) {
    const { logo, coverImage, ...rest } = formData;
>>>>>>> kimsan

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
<<<<<<< HEAD
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
        <CardTitle>Create Scholarships</CardTitle>
        <CardDescription>Create scholarship information below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-3">
            {/*
             ** @Field Title
             */}
            <FieldGroup className="col-span-1">
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel
                      htmlFor="form-rhf-input-username"
                      className="flex items-center"
                    >
                      Title<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="Title"
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
             ** @Field Provider
             */}
            <FieldGroup className="col-span-1">
              <Controller
                name="provider"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel
                      htmlFor="form-rhf-input-provider"
                      className="flex items-center"
                    >
                      Provider<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-provider"
                      aria-invalid={fieldState.invalid}
                      placeholder="Provider"
                      autoComplete="username"
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
             ** @File Provider Logo
             */}
            <FieldGroup className="col-span-1">
              <UploadImageControl
                name="providerLogo"
                id="form-rhf-input-provider-logo"
                label="Provider Logo"
                control={form.control}
                multiple={false}
              />
            </FieldGroup>

            {/*
             ** @File Cover Image
             */}
            <FieldGroup className="col-span-1">
              <UploadImageControl
                name="coverImage"
                id="form-rhf-input-cover-image"
                label="Cover Image"
                control={form.control}
                multiple={false}
              />
            </FieldGroup>

            {/*
             ** @Select Field Amount
             */}
            <FieldGroup className="col-span-1">
              <Controller
                name="amount"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor="form-rhf-input-amount">
                      Amount
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-amount"
                      aria-invalid={fieldState.invalid}
                      placeholder="Amount"
                      autoComplete="username"
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
             ** @Select Field Status
             */}
            <FieldGroup className="col-span-1">
              <Controller
                name="status"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <div className="w-full flex flex-col gap-1">
                      <FieldLabel htmlFor="form-rhf-select-status">
                        Status
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="form-rhf-select-status"
                          aria-invalid={fieldState.invalid}
                          className="w-[34.1rem] rounded"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>

                        <SelectContent position="item-aligned">
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectSeparator />
                          {statusOpts.map((status) => (
                            <SelectItem key={status.value} value={status.value}>
                              {status.label}
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
             ** @Select Field Category
             */}
            <FieldGroup className="col-span-1">
              <Controller
                name="category"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <div className="w-full flex flex-col gap-1">
                      <FieldLabel htmlFor="form-rhf-select-category">
                        Category
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
                          {categories.map((category) => (
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
             ** @Date Field Deadline
             */}
            <FieldGroup className="col-span-1">
              <DatePickerScholarship
                id="form-rhf-select-deadline"
                placeholder="Pick a date"
                name="deadline"
                control={form.control}
              />
            </FieldGroup>

            {/*
             ** @Field Max Applicants
             */}
            <FieldGroup className="col-span-1">
              <IncrementNumbers
                control={form.control}
                placeholder="Set maximum accept applicant"
                max={500}
                label="Set Maximun accept applicants"
                name="maxApplicants"
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
             ** @Selects control component Slugs field
             */}
            <FieldGroup className="col-span-1">
              <MultipleSelectControlComponent
                id="form-rhf-select-slugs"
                control={form.control}
                label="Slug"
                mode="tags"
                placeholder="Select slugs or Type enter"
                name="slug"
                size="large"
                options={[{ value: "bse", label: "B-S-E" }]}
              />
            </FieldGroup>

            {/*
             ** @Selection Award Type
             */}
            <FieldGroup className="col-span-1">
              <Controller
                name="awardType"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <div className="w-full flex flex-col gap-1">
                      <FieldLabel htmlFor="form-rhf-select-award">
                        Award Type
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="form-rhf-select-award"
                          aria-invalid={fieldState.invalid}
                          className="w-[34.1rem] rounded"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>

                        <SelectContent position="item-aligned">
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectSeparator />
                          {awardType.map((award) => (
                            <SelectItem key={award.value} value={award.value}>
                              {award.label}
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
             ** @Selection Education Level
             */}
            <FieldGroup className="col-span-1">
              <Controller
                name="educationLevel"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <div className="w-full flex flex-col gap-1">
                      <FieldLabel htmlFor="form-rhf-select-education-level">
                        Education Level
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="form-rhf-select-education-level"
                          aria-invalid={fieldState.invalid}
                          className="w-[34.1rem] rounded"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>

                        <SelectContent position="item-aligned">
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectSeparator />
                          {educationLevel.map((language) => (
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
             ** @Checkbox Renewable control component Scholarship
             */}
            <FieldGroup className="col-span-1">
              <CheckboxScholarship
                id="form-rhf-checkbox-renewable"
                title="Renewable"
                name="renewable"
                control={form.control}
              />
            </FieldGroup>

            {/*
             ** @Program Field
             */}
            <FieldGroup className="col-span-1">
              <Controller
                name="program"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <div className="w-full flex flex-col gap-1">
                      <FieldLabel
                        id="form-rhf-select-program"
                        className="flex items-center"
                      >
                        Program<span className="text-red-500">*</span>
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="form-rhf-select-program"
                          aria-invalid={fieldState.invalid}
                          className="w-[34.1rem] rounded"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>

                        <SelectContent position="item-aligned">
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectSeparator />
                          {programsToOptions(data).map((award) => (
                            <SelectItem key={award.value} value={award.value}>
                              {award.label}
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
             ** @Field Website
             */}
            <FieldGroup className="col-span-1">
              <Controller
                name="website"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel
                      htmlFor="form-rhf-input-web-url"
                      className="flex items-center"
                    >
                      Website URL<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-web-url"
                      aria-invalid={fieldState.invalid}
                      placeholder="Website URL"
                      autoComplete="username"
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
             ** @Checkbox control component Featured
             */}
            <FieldGroup className="col-span-1">
              <CheckboxScholarship
                title="Featured"
                name="featured"
                control={form.control}
              />
            </FieldGroup>

            {/*
             ** @Checkbox control component Application Fee
             */}
            <FieldGroup className="col-span-1">
              <CheckboxScholarship
                title="Application Fee"
                id="form-rhf-checkbox-application-fee"
                name="applicationFee"
                control={form.control}
              />
            </FieldGroup>
            {/*
             ** @Multiple Select control component Tags fields
             */}
            <FieldGroup className="col-span-1">
              <MultipleSelectControlComponent
                id="form-rhf-select-tags"
                control={form.control}
                label="Tags"
                mode="tags"
                name="tags"
                size="large"
                options={[{ value: "new-oppunity", label: "New Oppunity" }]}
              />
            </FieldGroup>
            {/*
             ** @Checkbox control component International
             */}
            <FieldGroup className="col-span-1">
              <CheckboxScholarship
                id="form-rhf-checkbox-international"
                title="International Scholarship"
                name="international"
                control={form.control}
              />
            </FieldGroup>

            {/*
             ** @Multiple Select control component Document fields
             */}
            <FieldGroup className="col-span-1">
              <MultipleSelectControlComponent
                id="form-rhf-select-document"
                control={form.control}
                label="Document Required"
                name="documentsRequired"
                size="large"
                options={[{ value: "ielts", label: "IELTS" }]}
              />
            </FieldGroup>

            {/*
             ** @Location Field
             */}
            <FieldGroup className="col-span-1">
              <Controller
                name="location"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor="form-rhf-input-location">
                      Location
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-location"
                      aria-invalid={fieldState.invalid}
                      placeholder="Location"
                      autoComplete="username"
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
             ** @Description Field
             */}
            <FieldGroup className="col-span-2">
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="textarea-description">
                      Description
                    </FieldLabel>
                    <FieldDescription>
                      Enter your description below.
                    </FieldDescription>
                    <Textarea
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id="textarea-description"
                      placeholder="Type your message here."
                    />
                  </Field>
                )}
              />
            </FieldGroup>

            {/*
             ** @Action Save and Reset
             */}
            <Field orientation="horizontal">
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

  const universityOptions = universities?.map((uni: any) => ({
    value: uni.id.toString(),
    label: uni.name,
  })) ?? [];
  const programOptions = programs?.map((prog: any) => ({
    value: prog.id.toString(),
    label: prog.name,
  })) ?? [];

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

              {/* Program Selection */}
              {
                !loadingPrograms && programOptions.length > 0 ? (
                  <FieldGroup>
                    <SingleSelectControlComponent
                      control={form.control}
                      name="programId"
                      label="Program"
                      options={programOptions}
                      placeholder="Select a program"
                      size="middle"
                    />
                  </FieldGroup>
                ) : (
                  <div style={{
                    padding: '16px',
                    textAlign: 'center',
                    backgroundColor: '#f9f9f9',
                    border: '1px dashed #ccc',
                    borderRadius: '8px',
                    color: '#666',
                    fontSize: '14px',
                    minHeight: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {loadingPrograms ? (
                      <>
                        <span style={{ marginRight: '8px' }}>Loading programs</span>
                        <span className="spinner" /> {/* optional spinner */}
                      </>
                    ) : (
                      'No Program available'
                    )}
                  </div>
                )
              }

              {/* University Selection */}
              {
                !loadingUniversities && universityOptions.length > 0 ? (
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
                ) : (
                  <div style={{
                    padding: '16px',
                    textAlign: 'center',
                    backgroundColor: '#f9f9f9',
                    border: '1px dashed #ccc',
                    borderRadius: '8px',
                    color: '#666',
                    fontSize: '14px',
                    minHeight: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {loadingUniversities ? (
                      <>
                        <span style={{ marginRight: '8px' }}>Loading universities</span>
                        <span className="spinner" /> {/* optional spinner */}
                      </>
                    ) : (
                      'No universities available'
                    )}
                  </div>
                )
              }

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
>>>>>>> kimsan
  );
}

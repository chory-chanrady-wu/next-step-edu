"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { scholarshipSchema, ScholarshipTask } from "@/app/lib/schema/scholarship"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePickerScholarship } from "./DatePicker"
import { Textarea } from "@/components/ui/textarea"
import { UploadFile } from "antd"
import MultipleSelectControlComponent from "./MultipleSelectControlComponent"
import UploadImageControl from "./UploadImage"
import { useFaculties, usePrograms, useScholarships, useUniversities } from "@/hooks/admin-custom-hook"
import { facultiesToOptions, programsToOptions, universitiesToOptions } from "@/app/lib/formatters"
import IncrementNumbers from "./IncredementNumbers"
import CheckboxControlComponent from "../../common/CheckboxControlComponent"
import { ProgramSchema, ProgramSchemaType } from "@/app/lib/schema/program"
import CheckboxScholarship from "../scholarships/CheckboxScholarship"
import CheckboxProgram from "./CheckboxProgram"

const currencyOpts = [
  { label: "USD($)", value: "usd" },
  { label: "RIEL(៛) ", value: "riel" },
] as const
const statusOpts = [
  { label: "Open", value: "open" },
  { label: "Closed", value: "closed" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Extended", value: "extended" },
] as const
const awardType = [
  { label: "Full", value: "full" },
  { label: "Partial", value: "partial" },
  { label: "Tuition", value: "tuition" },
  { label: "Stipend", value: "stipend" },
] as const
const educationLevel = [
  { label: "Undergraduate", value: "undergraduate" },
  { label: "Graduate", value: "graduate" },
  { label: "Phd", value: "phd" },
  { label: "Diploma", value: "diploma" },
] as const
const categories = [
  { label: "Academic", value: "academic" },
  { label: "Sports", value: "sports" },
  { label: "Arts", value: "arts" },
  { label: "Stem", value: "stem" },
  { label: "Need-based", value: "need-based" },
  { label: "Merit", value: "merit" },
  { label: "Minority", value: "minority" },
  { label: "Community", value: "community" },
] as const

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
  { value: "student-leader", label: "Student Leader" }
];



export function FormCreateProgram() {

  const { isLoading, data, error } = usePrograms();
  const { data: universities, } = useUniversities();
  const { data: faculties, } = useFaculties();

  const form = useForm<ProgramSchemaType>({
    resolver: zodResolver(ProgramSchema),
    defaultValues: {
      id: crypto.randomUUID(), // Generate a new UUID
      university_id: "", // Should be populated from context/selection
      faculty_id: "", // Should be populated from context/selection
      name: "",
      description: "",
      eligibility: [], // Empty array, validation will require at least one
      exam_required: false,
      tuition_fee_amount: 0,
      currency: "USD", // Default to USD
      study_period_months: 48 // Typical 4-year program (48 months)

    },
  })

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
    })
  }


  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (error) {
    return <div>Something went wrong</div>
  }

  return (
    <Card className="w-full flex px-5 shadow-none border-none">
      <CardHeader>
        <CardTitle>Create Program</CardTitle>
        <CardDescription>
          Create Program information below.
        </CardDescription>
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
                    <FieldLabel htmlFor="form-rhf-input-username" className="flex items-center">
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
                          {universitiesToOptions(universities).map((category) => (
                            <SelectItem key={category.value} value={category.value}>
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
                            <SelectItem key={category.value} value={category.value}>
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
              <MultipleSelectControlComponent id="form-rhf-select-eligibility" control={form.control} label="Eligibility" placeholder="Select Eligibilities" name="eligibility" size="large" options={eligibilityOptions} />
            </FieldGroup>

            {/*
              ** @Checkbox Exam Required control component Scholarship
              */}
            <FieldGroup className="col-span-1">
              <CheckboxProgram id="form-rhf-checkbox-renewable" title="Exam Required" name="exam_required" control={form.control} />
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
                      <FieldLabel htmlFor="form-rhf-select-currency" className="flex items-center">
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
                            <SelectItem key={language.value} value={language.value}>
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
              <IncrementNumbers control={form.control} placeholder="Set Tuition Fee Amount" max={500} label="Set Tuition Fee Amount" name="tuition_fee_amount" />
            </FieldGroup>
            {/*
              ** @Field study_period_months
              */}
            <FieldGroup className="col-span-1">
              <IncrementNumbers control={form.control} placeholder="Set Study Period Months" max={500} label="Set Tuition Fee Amount" name="study_period_months" />
            </FieldGroup>

            {/*
              ** @Field Provider
              */}
            {/* <FieldGroup className="col-span-1">
              <Controller
                name="provider"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor="form-rhf-input-provider" className="flex items-center">
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
            </FieldGroup> */}

            {/*
              ** @File Provider Logo
              */}
            {/* <FieldGroup className="col-span-1">
              <UploadImageControl name="providerLogo" id="form-rhf-input-provider-logo" label="Provider Logo" control={form.control} multiple={false} />
            </FieldGroup> */}

            {/*
              ** @File Cover Image
              */}
            {/* <FieldGroup className="col-span-1">
              <UploadImageControl name="coverImage" id="form-rhf-input-cover-image" label="Cover Image" control={form.control} multiple={false} />
            </FieldGroup> */}

            {/*
              ** @Select Field Amount
              */}
            {/* <FieldGroup className="col-span-1">
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
            </FieldGroup> */}



            {/*
              ** @Select Field Status
              */}
            {/* <FieldGroup className="col-span-1">
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
            </FieldGroup> */}



            {/*
              ** @Date Field Deadline
              */}
            {/* <FieldGroup className="col-span-1">
              <DatePickerScholarship id="form-rhf-select-deadline" placeholder="Pick a date" name="deadline" control={form.control} />
            </FieldGroup> */}





            {/*
              ** @Selects control component Slugs field
              */}
            {/* <FieldGroup className="col-span-1">
              <MultipleSelectControlComponent id="form-rhf-select-slugs" control={form.control} label="Slug" mode="tags" placeholder="Select slugs or Type enter" name="slug" size="large" options={[{ value: "bse", label: "B-S-E" }]} />
            </FieldGroup> */}

            {/*
              ** @Selection Award Type
              */}
            {/* <FieldGroup className="col-span-1">
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
            </FieldGroup> */}

            {/*
              ** @Selection Education Level
              */}
            {/* <FieldGroup className="col-span-1">
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
                            <SelectItem key={language.value} value={language.value}>
                              {language.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </Field>
                )}
              />
            </FieldGroup> */}



            {/*
              ** @Program Field
              */}
            {/* <FieldGroup className="col-span-1">
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
                      <FieldLabel id="form-rhf-select-program" className="flex items-center">
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
            </FieldGroup> */}

            {/*
              ** @Field Website
              */}
            {/* <FieldGroup className="col-span-1">
              <Controller
                name="website"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor="form-rhf-input-web-url" className="flex items-center">
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
            </FieldGroup> */}

            {/*
              ** @Checkbox control component Featured
              */}
            {/* <FieldGroup className="col-span-1">
              <CheckboxControlComponent title="Featured" name="featured" control={form.control} />
            </FieldGroup> */}

            {/*
              ** @Checkbox control component Application Fee
              */}
            {/* <FieldGroup className="col-span-1">
              <CheckboxControlComponent title="Application Fee" id="form-rhf-checkbox-application-fee" name="applicationFee" control={form.control} />
            </FieldGroup> */}
            {/*
              ** @Multiple Select control component Tags fields
              */}
            {/* <FieldGroup className="col-span-1">
              <MultipleSelectControlComponent id="form-rhf-select-tags" control={form.control} label="Tags" mode="tags" name="tags" size="large" options={[{ value: "new-oppunity", label: "New Oppunity" }]} />
            </FieldGroup> */}
            {/*
              ** @Checkbox control component International
              */}
            {/* <FieldGroup className="col-span-1">
              <CheckboxControlComponent id="form-rhf-checkbox-international" title="International Scholarship" name="international" control={form.control} />
            </FieldGroup> */}

            {/*
              ** @Multiple Select control component Document fields
              */}
            {/* <FieldGroup className="col-span-1">
              <MultipleSelectControlComponent id="form-rhf-select-document" control={form.control} label="Document Required" name="documentsRequired" size="large" options={[{ value: "ielts", label: "IELTS" }]} />
            </FieldGroup> */}

            {/*
            ** @Location Field
            */}
            {/* <FieldGroup className="col-span-1">
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
            </FieldGroup> */}

            {/*
            ** @Description Field
            */}
            {/* <FieldGroup className="col-span-2">
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel htmlFor="textarea-description">Description</FieldLabel>
                    <FieldDescription>Enter your description below.</FieldDescription>
                    <Textarea {...field} aria-invalid={fieldState.invalid} id="textarea-description" placeholder="Type your message here." />
                  </Field>
                )}
              />
            </FieldGroup> */}

            {/*
            ** @Action Save and Reset
            */}
            <Field orientation="horizontal" className="col-end-2">
              <Button type="button" variant="outline" onClick={() => form.reset()}>
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
  )
}

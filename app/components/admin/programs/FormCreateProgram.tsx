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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import MultipleSelectControlComponent from "./MultipleSelectControlComponent"
import { useFaculties, usePrograms, useUniversities } from "@/hooks/admin-custom-hook"
import { facultiesToOptions, universitiesToOptions } from "@/app/lib/formatters"
import IncrementNumbers from "./IncredementNumbers"
import { ProgramSchema, ProgramSchemaType } from "@/app/lib/schema/program"
import CheckboxProgram from "./CheckboxProgram"

const currencyOpts = [
  { label: "USD($)", value: "usd" },
  { label: "RIEL(៛) ", value: "riel" },
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

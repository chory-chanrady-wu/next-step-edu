"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldContent,
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
import MultipleSelect from "./MultipleSelect"
import { Textarea } from "@/components/ui/textarea"
import UploadImage from "./UploadImage"
import { useState } from "react"
import { UploadFile } from "antd"
import CheckboxScholarship from "./CheckboxScholarship"
import MultipleSelectControlComponent from "./MultipleSelectControlComponent"
import UploadImageControl from "./UploadImage"

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

export function FormCreateScholarship() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const form = useForm<ScholarshipTask>({
    // resolver: zodResolver(scholarshipSchema),
    // defaultValues: {
    //   username: "",
    // },
  })

  function onSubmit(data: ScholarshipTask) {
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

  return (
    <Card className="w-full flex px-5 shadow-none border-none">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Update your profile information below.
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
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor="form-rhf-input-username">
                      Title
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="Title"
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
              ** @Field Provider
              */}
            <FieldGroup className="col-span-1">
              <Controller
                name="provider"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor="form-rhf-input-username">
                      Provider
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-username"
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
              <UploadImageControl name="providerLogo" label="Provider Logo" control={form.control} multiple={false} />
            </FieldGroup>

            {/*
              ** @File Cover Image
              */}
            <FieldGroup className="col-span-1">
              <UploadImageControl name="coverImage" label="Cover Image" control={form.control} multiple={false} />
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
                    <FieldLabel htmlFor="form-rhf-input-username">
                      Amount
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-username"
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
                      <FieldLabel htmlFor="form-rhf-input-username">
                        Currency
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="form-rhf-select-language"
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
                      <FieldLabel htmlFor="form-rhf-input-username">
                        Status
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="form-rhf-select-language"
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
                      <FieldLabel htmlFor="form-rhf-input-username">
                        Category
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="form-rhf-select-language"
                          aria-invalid={fieldState.invalid}
                          className="w-[34.1rem] rounded"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>

                        <SelectContent position="item-aligned">
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectSeparator />
                          {categories.map((category) => (
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
              ** @Date Field Deadline
              */}
            <FieldGroup className="col-span-1">
              <DatePickerScholarship placeholder="Pick a date" name="deadline" control={form.control} />
            </FieldGroup>

            {/*
              ** @Field Max Applicants
              */}
            <FieldGroup className="col-span-1">
              <Controller
                name="maxApplicants"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor="form-rhf-input-username" className="flex items-center">
                      Total Accept Applicants<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="applicants(etc. 200, 300"
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
              ** @Selects control component Eligibility field
              */}
            <FieldGroup className="col-span-1">
              <MultipleSelectControlComponent control={form.control} label="Eligibility" placeholder="Select Eligibilities" name="eligibility" size="large" options={[{ value: "ielts", label: "IELTS" }]} />
            </FieldGroup>

            {/*
              ** @Selects control component Slugs field
              */}
            <FieldGroup className="col-span-1">
              <MultipleSelectControlComponent control={form.control} label="Slug" mode="tags" placeholder="Select slugs or Type enter" name="slug" size="large" options={[{ value: "ielts", label: "IELTS" }]} />
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
                      <FieldLabel htmlFor="form-rhf-input-username">
                        Award Type
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="form-rhf-select-language"
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
                      <FieldLabel htmlFor="form-rhf-input-username">
                        Education Level
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="form-rhf-select-language"
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
            </FieldGroup>

            {/*
              ** @Checkbox control component Scholarship
              */}
            <FieldGroup className="col-span-1">
              <CheckboxScholarship title="Rewable" name="renewable" control={form.control} />
            </FieldGroup>

            {/*
              ** @Program Field
              */}
            <FieldGroup className="col-span-1">
              <Controller
                name="program"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor="form-rhf-input-username">
                      Program
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="Program"
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
              ** @ Website Field
              */}
            <FieldGroup className="col-span-1">
              <Controller
                name="website"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor="form-rhf-input-username">
                      Website URL
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-username"
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
              <CheckboxScholarship title="Featured" name="featured" control={form.control} />
            </FieldGroup>

            {/*
              ** @Checkbox control component Application Fee
              */}
            <FieldGroup className="col-span-1">
              <CheckboxScholarship title="Application Fee" name="applicationFee" control={form.control} />
            </FieldGroup>
            {/*
              ** @Multiple Select control component Tags fields
              */}
            <FieldGroup className="col-span-1">
              <MultipleSelectControlComponent control={form.control} label="Tags" name="tags" size="large" options={[{ value: "ielts", label: "IELTS" }]} />
            </FieldGroup>
            {/*
              ** @Checkbox control component
              */}
            <FieldGroup className="col-span-1">
              <CheckboxScholarship title="International Scholarship" name="international" control={form.control} />
            </FieldGroup>

            {/*
              ** @Multiple Select control component fields
              */}
            <FieldGroup className="col-span-1">
              <MultipleSelectControlComponent control={form.control} label="Document Required" name="documentsRequired" size="large" options={[{ value: "ielts", label: "IELTS" }]} />
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
                    <FieldLabel htmlFor="form-rhf-input-username">
                      Location
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-username"
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
                    <FieldLabel htmlFor="textarea-message">Description</FieldLabel>
                    <FieldDescription>Enter your description below.</FieldDescription>
                    <Textarea {...field} aria-invalid={fieldState.invalid} id="textarea-message" placeholder="Type your message here." />
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-input">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}

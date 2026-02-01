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

const currencyOpts = [
  { label: "USD($)", value: "usd" },
  { label: "RIEL(៛) ", value: "riel" },
] as const
const statusOpts = [
  { label: "Open", value: "open" },
  { label: "Closed", value: "closed" },
  { label: "Upcoming", value: "upcoming" },
] as const
const awardType = [
  { label: "Full", value: "full" },
  { label: "Partial", value: "partial" },
] as const
const educationLevel = [
  { label: "Undergraduate", value: "undergraduate" },
  { label: "Graduate", value: "graduate" },
  { label: "Phd", value: "phd" },
  { label: "Diploma", value: "diploma" },
] as const

export function FormCreateScholarship() {
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
            <FieldGroup className="col-span-1">
              <Controller
                name="name"
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
            <FieldGroup className="col-span-1">
              <Controller
                name="providerLogo"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor="form-rhf-input-username">
                      Provider Logo
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="Provider Logo"
                      autoComplete="username"
                      className="rounded"
                    />
                    {/* <FieldDescription>
                      This is your public display name. Must be between 3 and 10
                      characters. Must only contain letters, numbers, and
                      underscores.
                    </FieldDescription> */}
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
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
                          {statusOpts.map((language) => (
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
                          {statusOpts.map((language) => (
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
            <FieldGroup className="col-span-1">
              <Controller
                name="deadline"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col gap-1">
                    <FieldLabel htmlFor="form-rhf-input-username">
                      Deadline
                    </FieldLabel>
                    <DatePickerScholarship placeholder="Pick a date" />
                  </div>
                )}
              />
            </FieldGroup>
            <FieldGroup className="col-span-1">
              <Controller
                name="applicants"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor="form-rhf-input-username">
                      Applicants
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="applicants"
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
            <FieldGroup className="col-span-1">
              <Controller
                name="maxApplicants"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor="form-rhf-input-username">
                      Max Applicants
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-input-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="max applicants"
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
            <FieldGroup className="col-span-1">
              <Controller
                name="eligibility"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor="form-rhf-input-username">
                      Eligibility
                    </FieldLabel>
                    <MultipleSelect />
                    {/* <Input
                      {...field}
                      id="form-rhf-input-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="Eligibility"
                      autoComplete="username"
                      className="rounded"
                    /> */}
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
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
                          {awardType.map((language) => (
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
            <FieldGroup className="col-span-1">
              <Controller
                name="renewable"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="responsive"
                    data-invalid={fieldState.invalid}
                    className="w-full"
                  >
                    <div className="w-full flex flex-col gap-1">
                      <FieldLabel htmlFor="form-rhf-input-username">
                        Renew
                      </FieldLabel>

                      <Select
                        // name={field.name}
                        // value={field.value}
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

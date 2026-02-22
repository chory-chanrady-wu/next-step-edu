"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar1 } from "lucide-react";
import { Control, Controller } from "react-hook-form";
import { ScholarshipType } from "@/lib/schema/scholarship";


// Only allow fields that are strings representing dates
type DateFieldKeys = "deadline";

type DatePickerScholarshipProps = {
<<<<<<< HEAD
  placeholder?: string;
  id?: string;
  name: DateFieldKeys;
  control: Control<ScholarshipTask>;
=======
    placeholder?: string;
    id?: string;
    name: DateFieldKeys;
    control: Control<ScholarshipType>;
>>>>>>> kimsan
};

export function DatePickerScholarship({
  placeholder,
  id,
  name,
  control,
}: DatePickerScholarshipProps) {
<<<<<<< HEAD
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="w-full gap-1">
          <FieldLabel htmlFor={id} className="flex  items-center">
            Deadline<span className="text-red-500">*</span>
          </FieldLabel>
          <Popover>
            <PopoverTrigger asChild className="rounded">
              <Button
                variant="outline"
                id="date-picker-controlled"
                className="justify-start font-normal flex items-center"
              >
                <Calendar1 />
                {field.value ? (
                  format(new Date(field.value), "PPP")
                ) : (
                  <span>{placeholder}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                id={id}
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(selectedDate: Date | undefined) => {
                  if (selectedDate) {
                    field.onChange(selectedDate.toISOString()); // store as string
                  } else {
                    field.onChange(undefined); // clear value if user deselects
                  }
                }}
                defaultMonth={field.value ? new Date(field.value) : undefined}
                required={false}
              />
            </PopoverContent>
          </Popover>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
=======
    return (

        <Controller

            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="w-full gap-1">
                    <FieldLabel htmlFor={id} className="flex  items-center">
                        Deadline<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Popover >
                        <PopoverTrigger asChild className="rounded">
                            <Button
                                variant="outline"
                                id="date-picker-controlled"
                                className="justify-start font-normal flex items-center"
                            >
                                <Calendar1 />
                                {field.value
                                    ? format(new Date(field.value), "PPP")
                                    : <span>{placeholder}</span>}
                            </Button>

                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                id={id}
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(selectedDate: Date | undefined) => {
                                    if (selectedDate) {
                                        field.onChange(selectedDate.toISOString()); // store as string
                                    } else {
                                        field.onChange(undefined); // clear value if user deselects
                                    }
                                }}
                                defaultMonth={field.value ? new Date(field.value) : undefined}
                                required={false}
                            />

                        </PopoverContent>
                    </Popover>
                    {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
        />
    );
>>>>>>> kimsan
}

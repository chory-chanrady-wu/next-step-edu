"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar1 } from "lucide-react";
import { Control, Controller } from "react-hook-form";
import { ScholarshipTask } from "@/app/lib/schema/scholarship";

// Only allow fields that are strings representing dates
type DateFieldKeys = "deadline" | "lastUpdated";

type DatePickerScholarshipProps = {
    placeholder?: string;
    name: DateFieldKeys;
    control: Control<ScholarshipTask>;
};

export function DatePickerScholarship({
    placeholder,
    name,
    control,
}: DatePickerScholarshipProps) {
    return (

        <Controller

            name={name}
            control={control}
            render={({ field }) => (
                <Field className="w-full gap-1">
                    <FieldLabel htmlFor="form-rhf-input-username" className="flex  items-center">
                        Total Accept Applicants<span className="text-red-500">*</span>
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
                </Field>
            )}
        />
    );
}

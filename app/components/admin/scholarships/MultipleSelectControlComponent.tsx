"use client";

import React from "react";
import { Select } from "antd";
import { Controller, Control } from "react-hook-form";
import { ScholarshipTask } from "@/app/lib/schema/scholarship";
import { Field, FieldLabel } from "@/components/ui/field";

interface MultipleSelectProps {
    control: Control<ScholarshipTask>; // You can narrow this to your form type
    name: keyof ScholarshipTask;
    mode?: "tags" | "multiple";
    id?: string;
    options: { value: string; label: string }[];
    placeholder?: string;
    defaultValue?: string[];
    label?: string;
    size?: "small" | "middle" | "large";
}

const MultipleSelectControlComponent: React.FC<MultipleSelectProps> = ({
    control,
    name,
    id,
    label = "Label",
    mode = "multiple",
    options,
    placeholder = "Select items",
    defaultValue = [],
    size = "middle",
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor={id} className="flex items-center">
                        {label}<span className="text-red-500">*</span>
                    </FieldLabel>
                    <Select
                        {...field}
                        mode={mode}
                        id={id}
                        status={fieldState.invalid ? "error" : "success"}
                        size={size}
                        placeholder={placeholder}
                        style={{ width: "100%", borderRadius: 4 }}
                        options={options}
                        value={field.value} // controlled by react-hook-form
                        onChange={(val) => field.onChange(val)} // update RHF value
                    />
                </Field>
            )}
        />
    );
};

export default MultipleSelectControlComponent;

"use client";

import React from "react";
import { Select } from "antd";
import { Controller, Control } from "react-hook-form";
import { ScholarshipTask } from "@/app/lib/schema/scholarship";
import { Field, FieldLabel } from "@/components/ui/field";

interface MultipleSelectProps {
    control: Control<ScholarshipTask>; // You can narrow this to your form type
    name: keyof ScholarshipTask;
    options: { value: string; label: string }[];
    placeholder?: string;
    defaultValue?: string[];
    label?: string;
    size?: "small" | "middle" | "large";
}

const MultipleSelectControlComponent: React.FC<MultipleSelectProps> = ({
    control,
    name,
    label = "Label",
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
            render={({ field,fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                    <FieldLabel htmlFor="form-rhf-input-username">
                       {label}
                    </FieldLabel>
                    <Select
                        {...field}
                        mode="tags"
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

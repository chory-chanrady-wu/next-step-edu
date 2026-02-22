"use client";

import React from "react";
import { Select } from "antd";
import { Controller, Control, Path } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { ProgramCreateRequest } from "@/lib/schema/program";

interface SingleSelectProps {
  control: Control<ProgramCreateRequest>;
  name: Path<ProgramCreateRequest>;
  id?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  label?: string;
  size?: "small" | "middle" | "large";
}

const SingleSelectControlComponent: React.FC<SingleSelectProps> = ({
  control,
  name,
  id,
  label = "Label",
  options,
  placeholder = "Select an option",
  size = "middle",
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="">
          <FieldLabel htmlFor={id} className="flex items-center">
            {label}<span className="text-red-500">*</span>
          </FieldLabel>
          <Select
            {...field}
            id={id}
            status={fieldState.invalid ? "error" : undefined}
            size={size}
            placeholder={placeholder}
            style={{ width: "100%", borderRadius: 4 }}
            options={options}
            value={field.value?.toString()}
            onChange={(val) => field.onChange(val ? parseInt(val, 10) : 0)}
          />
        </Field>
      )}
    />
  );
};

export default SingleSelectControlComponent;

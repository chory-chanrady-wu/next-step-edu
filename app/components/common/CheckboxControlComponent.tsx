import React from "react";
import { Checkbox } from "antd";
import { Control, Controller } from "react-hook-form";
import { ScholarshipTask } from "@/app/lib/schema/scholarship";
import { Field, FieldLabel } from "@/components/ui/field";

interface CheckboxScholarshipProps {
  title: string;
  id?: string;
  name: keyof ScholarshipTask;
  control: Control<ScholarshipTask>;
  onChange?: (checked: boolean) => void;
}

const CheckboxControlComponent: React.FC<CheckboxScholarshipProps> = ({
  title,
  id,
  name,
  control,
  onChange,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <Field data-invalid={fieldState.invalid} className="gap-1">
        <FieldLabel htmlFor={id}>{title}</FieldLabel>
        <Checkbox
          {...field}
          checked={field.value as boolean}
          onChange={(e) => {
            field.onChange(e.target.checked);
            onChange?.(e.target.checked);
          }}
          id={id}
          className="border shadow-xs flex items-center"
          style={{ padding: "8px 10px", borderRadius: "5px" }}
        >
          {title}
        </Checkbox>
      </Field>
    )}
  />
);

export default CheckboxControlComponent;

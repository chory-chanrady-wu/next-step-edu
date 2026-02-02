import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import { Control, Controller } from 'react-hook-form';
import { ScholarshipTask } from '@/app/lib/schema/scholarship';
import { Field, FieldLabel } from '@/components/ui/field';

const onChange: CheckboxProps['onChange'] = (e) => {
    console.log(`checked = ${e.target.checked}`);
};

interface CheckboxScholarshipProps {
    title: string;
    name: keyof ScholarshipTask;
    control: Control<ScholarshipTask>;
    onChange?: (checked: boolean) => void;
}

const CheckboxScholarship: React.FC<CheckboxScholarshipProps> = ({
    title,
    name,
    control,
    onChange
}) => <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="gap-1">
                <FieldLabel htmlFor="form-rhf-input-username">
                    {title}
                </FieldLabel>
                <Checkbox
                    {...field}
                    checked={field.value as boolean}
                    onChange={(e) => {
                        field.onChange(e.target.checked);
                        onChange?.(e.target.checked);
                    }}
                    className="border shadow-xs flex items-center"
                    style={{ padding: "8px 10px", borderRadius: "5px" }}
                >
                    {title}
                </Checkbox>
            </Field>
        )}
    />

export default CheckboxScholarship;

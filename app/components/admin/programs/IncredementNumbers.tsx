import React from 'react';
import { Flex, InputNumber } from 'antd';
import { Controller, useForm, Control } from 'react-hook-form';
import { ScholarshipTask } from '@/app/lib/schema/scholarship';
import { Field, FieldLabel } from '@/components/ui/field';
import { ProgramSchemaType } from '@/app/lib/schema/program';

interface IncrementNumbersProps {
    control: Control<ProgramSchemaType>;
    label?: string;
    placeholder?: string;
    name: keyof ProgramSchemaType;
    min?: number;
    max?: number;
}

const IncrementNumbers: React.FC<IncrementNumbersProps> = ({ control,label, name,min=1,max=10,placeholder }) => {
    return (
        <Flex vertical gap="middle">
            <Controller
                control={control}
                name={name}
                defaultValue={3}
                render={({ field }) => (
                    <Field className='gap-1'>
                        <FieldLabel htmlFor="form-rhf-input-provider" className="flex items-center">
                            {label}<span className="text-red-500">*</span>
                        </FieldLabel>
                        <InputNumber
                            {...field}
                            mode='spinner'
                            min={min}
                            max={max}
                            style={{ height: 35 }}
                            placeholder={placeholder}
                            variant='filled'
                        />
                    </Field>
                )}
            />
        </Flex>
    );
};

export default IncrementNumbers;

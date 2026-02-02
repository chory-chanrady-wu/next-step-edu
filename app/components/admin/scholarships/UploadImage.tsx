"use client";

import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, Button } from "antd";
import type { UploadFile, UploadProps } from "antd";
import { Control, Controller } from "react-hook-form";
import { ScholarshipTask } from "@/app/lib/schema/scholarship";
import { Field, FieldLabel } from "@/components/ui/field";

interface UploadImageProps {
  name: keyof ScholarshipTask;
  control: Control<ScholarshipTask>;
  multiple?: boolean;
  listType?: UploadProps["listType"];
  label: string
}

const UploadImageControl: React.FC<UploadImageProps> = ({
  name,
  control,
  multiple = false,
  listType = "picture",
  label
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        // Ensure the value is always UploadFile[]
        const fileList = Array.isArray(field.value) ? field.value : [];

        return (
          <Field className="w-full gap-1">
            <FieldLabel htmlFor="form-rhf-input-username">
              {label}
            </FieldLabel>
            <Upload
              fileList={fileList as UploadFile[]} // cast to UploadFile[]
              beforeUpload={() => false} // prevent auto-upload
              onChange={({ fileList }) => field.onChange(fileList)}
              multiple={multiple}
              listType={listType}
            >
              <Button icon={<UploadOutlined />}>
                {multiple ? "Select Files" : "Select File"}
              </Button>
            </Upload>
          </Field>
        );
      }}
    />
  );
};

export default UploadImageControl;

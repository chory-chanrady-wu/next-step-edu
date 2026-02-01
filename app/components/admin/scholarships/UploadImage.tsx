"use client";

import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, Button } from "antd";
import type { UploadFile, UploadProps } from "antd";

interface UploadImageProps {
  value?: UploadFile[];
  onChange?: (files: UploadFile[]) => void;
  multiple?: boolean;
  listType?: UploadProps["listType"];
}

const UploadImage: React.FC<UploadImageProps> = ({
  value = [],
  onChange,
  multiple = false,
  listType = "picture",
}) => {
  return (
    <Upload
      fileList={value}
      beforeUpload={() => false} 
      onChange={({ fileList }) => onChange?.(fileList)}
      multiple={multiple}
      listType={listType}
    >
      <Button icon={<UploadOutlined />}>Select File(s)</Button>
    </Upload>
  );
};

export default UploadImage;

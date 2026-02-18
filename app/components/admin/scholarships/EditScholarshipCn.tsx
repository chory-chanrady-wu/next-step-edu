"use client";
// import { useScholarship } from "@/hooks/admin-custom-hook";
import dynamic from "next/dynamic";
import React from "react";

type Props = {
  id: string;
};
const FormEditScholarship = dynamic(
  () =>
    import("@/app/components/admin/scholarships/FormEditScholarship").then(
      (mod) => mod.FormEditScholarship,
    ),
  { ssr: false },
);
export const EditScholarshipCn = ({ id }: Props) => {
  // useScholarship(id);

  return <FormEditScholarship id={id} />;
};

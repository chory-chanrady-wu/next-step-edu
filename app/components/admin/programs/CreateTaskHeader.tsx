import React from "react";

const CreateTaskHeader = ({title}: {title: string}) => {
  return (
    <div className=" flex flex-col rounded gap-2 items-center py-6">
      <span className="font-bold">{title}</span>
    </div>
  );
};
export default CreateTaskHeader;

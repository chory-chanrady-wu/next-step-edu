import { ProgramSchemaType } from "./schema/program";

export const programsToOptions = (programs: ProgramSchemaType[]) => {
  return programs.map(program => ({
    label: program.name,   // what shows in dropdown
    value: program.id      // unique identifier stored
  }));
};

import { FacultySchemaType } from "./schema/faculty";
import { ProgramSchemaType } from "./schema/program";
import { UniversitySchemaType } from "./schema/university";
import { ScholarshipType } from "./types";

export const programsToOptions = (programs: ProgramSchemaType[]) => {
  return programs.map((program) => ({
    label: program.name, // what shows in dropdown
    value: program.id, // unique identifier stored
  }));
};
export const scholarshipsToOptions = (programs: ScholarshipType[]) => {
  return programs.map((program) => ({
    label: program.name, // what shows in dropdown
    value: program.id, // unique identifier stored
  }));
};
export const universitiesToOptions = (universities: UniversitySchemaType[]) =>
  universities.map((university) => ({
    label: university.name,
    value: university.id,
  }));
export const facultiesToOptions = (faculties: FacultySchemaType[]) =>
  faculties.map((faculty) => ({
    label: faculty.name,
    value: faculty.id,
  }));

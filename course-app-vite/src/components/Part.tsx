import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ coursePart }: { coursePart: CoursePart}) => {
  switch (coursePart.kind) {
    case "basic":
      return (
        <>
          <strong>{coursePart.name} {coursePart.exerciseCount}</strong><br />
          <em>{coursePart.description}</em>
        </>
      );
    case "group":
      return (
        <>
          <strong>{coursePart.name} {coursePart.exerciseCount}</strong><br />
          project exercises: {coursePart.groupProjectCount}
        </>
      );
    case "background":
      return (
        <>
          <strong>{coursePart.name} {coursePart.exerciseCount}</strong><br />
          <em>{coursePart.description}</em><br />
          background material: {coursePart.backgroundMaterial}
        </>
      );
    case "special":
      return (
        <>
          <strong>{coursePart.name} {coursePart.exerciseCount}</strong><br />
          <em>{coursePart.description}</em><br />
          required skills: {coursePart.requirements.join(", ")}
        </>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;

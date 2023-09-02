interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header = ({ name }: {name: string}) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
};

const Content = ({ courseParts }: {courseParts: CoursePart[]}) => {
  const getCourseData = (part: CoursePart) => {
    switch (part.kind) {
      case "basic":
        return (
          <p>
            <strong>{part.name} {part.exerciseCount}</strong><br />
            <em>{part.description}</em>
          </p>
        );
      case "group":
        return (
          <p>
            <strong>{part.name} {part.exerciseCount}</strong><br />
            project exercises: {part.groupProjectCount}
          </p>
        );
      case "background":
        return (
          <p>
            <strong>{part.name} {part.exerciseCount}</strong><br />
            <em>{part.description}</em><br />
            {part.backgroundMaterial}
          </p>
        );
      case "special":
        return (
          <p>
            <strong>{part.name} {part.exerciseCount}</strong><br />
            <em>{part.description}</em><br />
            required skills: {part.requirements.join(", ")}
          </p>
        );
      default:
        return assertNever(part);
    }
  };

  return (
    <div>
      {courseParts.map(part => {
        return getCourseData(part);
      })}
    </div>
  );
};

const Total = ({ courseParts }: {courseParts: CoursePart[]}) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts}></Total>
    </div>
  );
};

export default App;

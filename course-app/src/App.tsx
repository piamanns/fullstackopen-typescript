interface CourseData {
  name: string,
  exerciseCount: number
}

const Header = ({ name }: {name: string}) => {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  )
};

const Content = ({ courseParts }: {courseParts: CourseData[]}) => {
  return (
    <>
      {courseParts.map(part =>
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      )}
    </>
  )
};

const Total = ({ courseParts }: {courseParts: CourseData[]}) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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

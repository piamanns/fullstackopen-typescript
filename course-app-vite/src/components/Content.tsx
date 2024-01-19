interface courseData {
  name: string;
  exerciseCount: number;
}

const Content = ({ courseParts }: { courseParts: courseData[] }) => {
  return (
    <div>
      <ul>
        {courseParts.map(part =>
          <li key={part.name}>{part.name} ({part.exerciseCount})</li>
        )}
      </ul>
    </div>
  );
};

export default Content;

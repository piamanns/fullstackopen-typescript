import Part from "./Part";
import { CoursePart } from "../types";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map(part =>
        <p key={part.name}><Part coursePart={part} /></p>
      )}
    </div>
  );
};

export default Content;

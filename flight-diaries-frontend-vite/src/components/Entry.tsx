import { DiaryEntry } from "../types";

const Entry = ({ entry }: { entry: DiaryEntry }) => {
  return (
    <div>
      <strong>{entry.date}</strong>
      <p>
        visibility: {entry.visibility}<br />
        weather: {entry.weather}<br />
        comment: {entry.comment}
      </p>
    </div>
  );
};

export default Entry;

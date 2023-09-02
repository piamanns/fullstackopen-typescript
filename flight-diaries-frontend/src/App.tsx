import axios from 'axios';
import { useState, useEffect } from "react";
import { DiaryEntry } from "./types";

const baseUrl = 'http://localhost:3001/api/diaries';

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

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios.get(baseUrl).then(response => {
      setEntries(response.data);
    });
  }, []);

  return (
    <div>
      <h3>Diary Entries:</h3>
        {entries.map(entry =>
          <Entry key={entry.id} entry={entry} />
        )}
    </div>
  );
};

export default App;

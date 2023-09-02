import { useState, useEffect } from "react";
import { DiaryEntry, NewDiaryEntry, AddEntryFunction } from "./types";
import { getAllEntries, addNewEntry } from './services/diaryService';

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

const EntryForm = ( { createEntry }: {createEntry: AddEntryFunction}) => {
  const [newDate, setNewDate] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newComment, setNewComment] = useState('');

  const submitDiaryEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
     createEntry({
      date: newDate,
      visibility: newVisibility,
      weather: newWeather,
      comment: newComment
    });

    setNewDate('');
    setNewWeather('');
    setNewVisibility('');
    setNewComment('');
  };

  return (
    <form onSubmit={submitDiaryEntry}>
      <div>
        date:{" "}
        <input
          value={newDate}
          onChange={(event) => setNewDate(event.target.value)}
        />
      </div>
      <div>
        weather:{" "}
        <input
          value={newWeather}
          onChange={(event) => setNewWeather(event.target.value)}
        />
      </div>
      <div>
        visibility:{" "}
        <input
          value={newVisibility}
          onChange={(event) => setNewVisibility(event.target.value)}
        />
      </div>
      <div>
        comment:{" "}
        <input
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
      </div>
      <button type='submit'>add</button>
    </form>
  );
};

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then(response => {
      setEntries(response);
    });
  }, []);

  const addDiaryEntry = (entry: NewDiaryEntry) => {
    addNewEntry(entry).then(data => {
      setEntries(entries.concat(data));
    });
  };

  return (
    <div>
      <h3>Add new entry</h3>
      <EntryForm createEntry={addDiaryEntry} />
      <h3>Diary Entries</h3>
        {entries.map(entry =>
          <Entry key={entry.id} entry={entry} />
        )}
    </div>
  );
};

export default App;

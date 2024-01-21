import { useEffect, useState } from 'react';
import { getAllEntries, createEntry } from './services/entryService';
import { DiaryEntry, NewDiaryEntry } from './types';
import Form from './components/Form';
import Entry from './components/Entry';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data);
    });
  }, []);

  const submitDiaryEntry = (object: NewDiaryEntry) => {
    createEntry(object)
      .then(data => {
        setEntries(entries.concat(data));
      });
  };

  return (
    <>
      <h1>Flight Diaries</h1>
      <h2>Add Entry</h2>
      <Form submitDiaryEntry={submitDiaryEntry}/>
      <h2>Diary Entries</h2>
      {entries.map(entry =>
        <Entry key={entry.id} entry={entry} />
      )}
    </>
  );
}

export default App;

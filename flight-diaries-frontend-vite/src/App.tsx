import { useEffect, useState } from 'react';
import { getAllEntries } from './services/entryService';
import { DiaryEntry } from './types';
import Entry from './components/Entry';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data);
    });
  }, []);

  return (
    <>
      <h1>Flight Diaries</h1>
      <h2>Diary entries</h2>
      {entries.map(entry =>
        <Entry key={entry.id} entry={entry} />
      )}
    </>
  );
}

export default App;

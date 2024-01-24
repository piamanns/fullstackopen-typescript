import { useEffect, useState } from 'react';
import { getAllEntries, createEntry } from './services/entryService';
import { DiaryEntry, NewDiaryEntry } from './types';
import axios from 'axios';
import Notification from './components/Notification';
import Form from './components/Form';
import Entry from './components/Entry';

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>('');

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data);
    });
  }, []);

  const submitDiaryEntry = (object: NewDiaryEntry) => {
      createEntry(object)
      .then(data => {
        setEntries(entries.concat(data));
      })
      .catch((error: unknown) => {
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('Error: Something went wrong');
      }
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    });
  };

  return (
    <>
      <h1>Flight Diaries</h1>
      <h2>Add New Entry</h2>
      <Notification message={errorMessage}/>
      <Form submitDiaryEntry={submitDiaryEntry}/>
      <h2>Diary Entries</h2>
      {entries.map(entry =>
        <Entry key={entry.id} entry={entry} />
      )}
    </>
  );
}

export default App;

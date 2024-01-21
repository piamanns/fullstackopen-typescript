import { useState } from "react";
import { NewDiaryEntry } from "../types";

interface FormProps {
  submitDiaryEntry: (object: NewDiaryEntry) => void;
}

const Form = (props: FormProps) => {
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');

  const createNewDiaryEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();
    props.submitDiaryEntry(
      {
        date: newDate,
        visibility: newVisibility,
        weather: newWeather,
        comment: newComment,
      }
    );
    setNewDate('');
    setNewVisibility('');
    setNewWeather('');
    setNewComment('');
  };

  return (
    <div>
      <form onSubmit={createNewDiaryEntry}>
        <p>
          Date: <input value={newDate} onChange={(event) => setNewDate(event.target.value)} />
        </p>
        <p>
          Visibility: <input value={newVisibility} onChange={(event) => setNewVisibility(event.target.value)} />
        </p>
        <p>
          Weather: <input value={newWeather} onChange={(event) => setNewWeather(event.target.value)} />
        </p>
        <p>
          Comment: <input value={newComment} onChange={(event) => setNewComment(event.target.value)} />
        </p>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default Form;

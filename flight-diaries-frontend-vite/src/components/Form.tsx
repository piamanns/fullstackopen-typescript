import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather } from "../types";

interface FormProps {
  submitDiaryEntry: (object: NewDiaryEntry) => void;
}

const Form = (props: FormProps) => {
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState<Visibility>(Visibility.Great);
  const [newWeather, setNewWeather] = useState<Weather>(Weather.Sunny);
  const [newComment, setNewComment] = useState('');

  const visibilityOptions = Object.values(Visibility).map(v => ({
    value: v, label: v.toString()
  }));

  const weatherOptions = Object.values(Weather).map(v => ({
    value: v, label: v.toString()
  }));

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
    setNewVisibility(Visibility.Great);
    setNewWeather(Weather.Sunny);
    setNewComment('');
  };

  return (
    <div>
      <form onSubmit={createNewDiaryEntry}>
        <div>
          Date: <input type="date" value={newDate} onChange={(event) => setNewDate(event.target.value)} />
        </div>

        <div>
          Visibility:
          {visibilityOptions.map(option =>
            <label key={option.label}>
              <input
                type="radio"
                id={option.label}
                name="visibility"
                checked={newVisibility===option.value}
                onChange={() => setNewVisibility(option.value)}
              />
              {option.label}
            </label>
          )}
        </div>

        <div>
          Weather:
          {weatherOptions.map(option =>
            <label key={option.label}>
              <input
                  type="radio"
                  id={option.label}
                  name="weather"
                  checked={newWeather===option.value}
                  onChange={() => setNewWeather(option.value)}
                />
              {option.label}
            </label>
          )}
        </div>

        <div>
          Comment: <input value={newComment} onChange={(event) => setNewComment(event.target.value)} />
        </div>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default Form;

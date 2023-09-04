import axios from 'axios';
import { NewDiaryEntry, DiaryEntry} from '../types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllEntries = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => response.data);
};

export const addNewEntry = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then(response => response.data);
};

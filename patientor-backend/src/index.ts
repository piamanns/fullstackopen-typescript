import cors from 'cors';
import express from 'express';
import diagnosisRouter from './routes/diagnoses';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.use('/api/diagnoses', diagnosisRouter);

app.get('/api/ping', (_req, res) => {
    console.log('Someone pinged');
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

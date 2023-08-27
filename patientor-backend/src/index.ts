import cors from 'cors';
import express from 'express';
import diagnosisRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3001;

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res) => {
    console.log('Someone pinged');
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

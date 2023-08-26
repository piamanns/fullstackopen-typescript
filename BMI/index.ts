import express from 'express';
import { calculateBmi, validateBmiArgs } from './bmiCalculator';
import { calculateExercises, validateExerciseArgs } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        const params: string[] = [];
        Object.values(req.query).forEach(param => {
            params.push(param as string);
        });
        const { height, width } = validateBmiArgs(params, 2);
        const bmi = calculateBmi(height, width);
        res.json({
            width: width,
            height: height,
            bmi: bmi
        });
    } catch (error: unknown) {
        let errorMessage: string = "malformatted parameters";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(400).json({
            error: errorMessage
        });
    }
});

app.post('/exercises', (req, res) => {
    let errorMessage: string = '';
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { daily_exercises, target } = req.body;
        if (daily_exercises == undefined || target == undefined) {
            throw new Error('parameters missing');
        }
        const { targetNum, exerciseHoursNum } = validateExerciseArgs(target, daily_exercises);
        const result = calculateExercises(targetNum, exerciseHoursNum);
        res.json(result);
    } catch (error: unknown) {
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(400).json({
            error: errorMessage
        });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

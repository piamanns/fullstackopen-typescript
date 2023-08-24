import express from 'express';
import { calculateBmi, validateBmiArgs } from './bmiCalculator';

const app = express();
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        const params: string[] = [];
        Object.values(req.query).forEach(param => {
            params.push(param as string);
        })
        const { height, width } = validateBmiArgs(params, 2);
        const bmi = calculateBmi(height, width)
        res.json({
            width: width,
            height: height,
            bmi: bmi
        });
    } catch(error: unknown) {
        let errorMessage: string = "malformatted parameters";
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

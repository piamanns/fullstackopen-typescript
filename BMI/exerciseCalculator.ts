import { isInRange } from "./utils";

interface ExerciseValues {
    target: number;
    exerciseHours: number[];
}

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const validateExerciseArgs = (args: string[]): ExerciseValues => {
    if (!isInRange(args.length, 4, 368)) {
        throw new Error('Invalid amount of arguments. Enter a target, followed by training hours for 1-365 days.');
    }

    const enteredArgs = args.slice(2);
    const validArgs: number[] = [];

    enteredArgs.forEach((arg) => {
        if (isNaN(Number(arg))) {
            throw new Error('Only numbers are allowed as arguments.');
        }
        if (!isInRange(Number(arg), 0, 24)) {
            throw new Error('Argument values outside allowed range (0-24).');
        }
        validArgs.push(Number(arg));
    });

    return {
        target: validArgs[0],
        exerciseHours: validArgs.slice(1)
    };
};

const getRating = (avgHours: number, target: number): number => {
    const successRatio = avgHours / target;
    if (successRatio < 0.5) {
        return 1;
    } else if (successRatio < 1) {
        return 2;
    } else {
        return 3;
    }
};

const getRatingDescription = (rating: number): string => {
    const ratings = [
        "Not really putting in the hours, ey?",
        "You did OK",
        "Excellent work!"
    ];

    return ratings[rating-1];
};

const calculateExercises = (target: number, exerciseHours: number[]) : Result => {
    const tDays = exerciseHours.filter(hours => hours > 0).length;
    const avgHours = exerciseHours.reduce((a,b) => a + b, 0) / exerciseHours.length;
    const rating = getRating(avgHours, target);

    return {
        periodLength: exerciseHours.length,
        trainingDays: tDays,
        success: avgHours >= target,
        rating: rating,
        ratingDescription: getRatingDescription(rating),
        target: target,
        average: avgHours
    };
};

try {
    const { target, exerciseHours } = validateExerciseArgs(process.argv);
    console.log(calculateExercises(target, exerciseHours));

} catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

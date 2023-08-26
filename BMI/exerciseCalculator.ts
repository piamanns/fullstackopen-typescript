import { isInRange } from "./utils";

export interface ExerciseArgs {
    targetStr: string;
    exerciseHoursStr: string[];
}

export interface ExerciseValues {
    targetNum: number;
    exerciseHoursNum: number[];
}

export interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const parseCommandLineArgs = (args: string[]): ExerciseArgs => {
    if (!isInRange(args.length, 4, 368)) {
        throw new Error('Invalid amount of arguments. Enter a target, followed by training hours for 1-365 days.');
    }
    const [targetStr, ...exerciseHoursStr] = args.slice(2);
    return ({
        targetStr: targetStr,
        exerciseHoursStr: exerciseHoursStr
    });
};

export const validateExerciseArgs = (targetStr: unknown, exerciseHoursStr: unknown): ExerciseValues => {
    if (isNaN(Number(targetStr))
        || !isInRange(Number(targetStr), 0, 24))
    {
        throw new Error('malformatted parameters');
    }

    const validatedHours: number[] = [];
    if (Array.isArray(exerciseHoursStr)) {
        exerciseHoursStr.forEach((hour) => {
            if (isNaN(Number(hour))
                || !isInRange(Number(hour), 0, 24))
            {
                throw new Error('malformatted parameters');
            }
            validatedHours.push(Number(hour));
        });

        return {
            targetNum: Number(targetStr),
            exerciseHoursNum: validatedHours
        };
    } else {
        throw new Error('malformatted parameters');
    }
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

export const calculateExercises = (target: number, exerciseHours: number[]) : Result => {
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


if (require.main === module) {
    try {
        const { targetStr, exerciseHoursStr } = parseCommandLineArgs(process.argv);
        const { targetNum, exerciseHoursNum } = validateExerciseArgs(targetStr, exerciseHoursStr);
        console.log(calculateExercises(targetNum, exerciseHoursNum));

    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}

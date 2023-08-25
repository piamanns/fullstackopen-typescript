import { isInRange } from "./utils";

interface BmiValues {
    height: number;
    width: number;
}

export const validateBmiArgs = (args: string[], expectedArgsCount: number): BmiValues => {
    if (args.length != expectedArgsCount) {
        throw new Error('There should be two arguments, height and width.');
    }
    const [height, ...width] = args.splice(-2);

    if (isNaN(Number(height)) || isNaN(Number(width))) {
        throw new Error('Height and width values must be numbers.');
    }
    if (
        !isInRange(Number(height), 1, 1000)
        || !isInRange(Number(width), 1, 1000)
    ) {
        throw new Error('Height and weight values must be in the range 1–1000');
    }

    return {
        height: Number(height),
        width: Number(width)
    };
};

const getBmiCategory = (bmi: number): string => {
    if (bmi < 16.0) {
        return "Underweight (Severe thinness)";
    } else if (bmi < 17.0) {
        return "Underweight (Moderate thinness)";
    } else if (bmi < 18.5) {
        return "Underweight (Mild thinness)";
    } else if (bmi < 25.0) {
        return "Normal (healthy weight)";
    } else if (bmi < 30.0) {
        return "Overweight (Pre-obese)";
    } else if (bmi < 35.0) {
        return "Obese (Class I)";
    } else if (bmi < 40.0) {
        return "Obese (Class II)";
    } else {
        return "Obese (Class III)";
    }
};

export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height/100) ** 2);
    return getBmiCategory(bmi);
};

if (require.main === module) {
    try {
        const { height, width } = validateBmiArgs(process.argv, 4);
        console.log(calculateBmi(height, width));
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}

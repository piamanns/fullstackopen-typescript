interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const getRating = (avgHours: number, target: number): number => {
    const successRatio = avgHours / target;
    if (successRatio < 0.5) {
        return 1
    } else if (successRatio < 1) {
        return 2
    } else {
        return 3
    }
}

const getRatingDescription = (rating: number): string => {
    const ratings = [
        "Not your week, ey?",
        "You did OK",
        "Excellent work!"
    ]

    return ratings[rating-1];
}


const calculateExercises = (exerciseHours: number[], target: number): Result => {
    const tDays = exerciseHours.filter(hours => hours > 0).length
    const avgHours = exerciseHours.reduce((a,b) => a + b, 0) / exerciseHours.length
    const rating = getRating(avgHours, target)

    return {
        periodLength: exerciseHours.length,
        trainingDays: tDays,
        success: avgHours >= target,
        rating: rating,
        ratingDescription: getRatingDescription(rating),
        target: target,
        average: avgHours
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

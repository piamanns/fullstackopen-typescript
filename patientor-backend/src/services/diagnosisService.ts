import diagnosisData from '../../data/diagnosesData';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosisData;

const getDiagnoses = (): Diagnosis[]  => {
    return diagnoses;
};

export default {
    getDiagnoses
};

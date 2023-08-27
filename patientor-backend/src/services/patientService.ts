import patientData from '../../data/patientsData';
import { Patient, NoSsnPatient } from '../types';

const patients: Patient[] = patientData;

const getNonSensitivePatientData = (): NoSsnPatient[]  => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getNonSensitivePatientData
};

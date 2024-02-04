import { v1 as uuid } from 'uuid';
import patientData from '../../data/patientsData';
import { Patient, NoSsnPatient, NewPatient } from '../types';

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

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id)
    return patient;
}

export default {
    getNonSensitivePatientData,
    addPatient,
    getPatientById
};

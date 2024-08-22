import { v1 as uuid } from 'uuid';
import patientData from '../../data/patientsData';
import { Patient, NoSsnPatient, NewPatient, NewEntry } from '../types';

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

const addPatientEntry = (id: string, newEntry: NewEntry): Patient | undefined => {
    console.log("adding entry ", newEntry, "to patient: ", id);
    const patient = getPatientById(id);
    const entry = {
        id: uuid(),
        ...newEntry
    }
    if (patient) {
      patient.entries.push(entry)
    }
    return patient;
}

const getPatientById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

export default {
    getNonSensitivePatientData,
    addPatient,
    addPatientEntry,
    getPatientById
};

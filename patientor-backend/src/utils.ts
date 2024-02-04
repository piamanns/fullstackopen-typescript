import { NewPatient, Gender } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isSsn = (ssn: string): boolean => {
    const re = /^(?:0[1-9]|[12][0-9]|3[01])(?:0[1-9]|1[0-2])[0-9]{2}[-+A][0-9]{3}[0-9A-FHJ-NPR-Y]$/;
    return re.test(ssn);
};

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(value => value.toString()).includes(gender);
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing patient name');
    }
    return name;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date of birth');
    }
    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn) || !isSsn(ssn)) {
        throw new Error('Incorrect or missing social security number');
    }
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender data');
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation data');
    }
    return occupation;
};

const toNewPatient = (patientInfo: unknown): NewPatient => {
    if ( !patientInfo || typeof patientInfo !== 'object' ) {
        throw new Error('Incorrect or missing patient data.');
    }

    if ('name' in patientInfo && 'dateOfBirth' in patientInfo
        && 'ssn' in patientInfo && 'gender' in patientInfo
        && 'occupation' in patientInfo) {
        const newPatient: NewPatient = {
            name: parseName(patientInfo.name),
            dateOfBirth: parseDate(patientInfo.dateOfBirth),
            ssn: parseSsn(patientInfo.ssn),
            gender: parseGender(patientInfo.gender),
            occupation: parseOccupation(patientInfo.occupation),
            entries: []
        };
        return newPatient;
    }
    throw new Error('Incorrect patient data: data fields are missing.');
};

export default toNewPatient;

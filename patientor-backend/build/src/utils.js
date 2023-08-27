"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isSsn = (ssn) => {
    const re = /^(?:0[1-9]|[12][0-9]|3[01])(?:0[1-9]|1[0-2])[0-9]{2}[-+A][0-9]{3}[0-9A-FHJ-NPR-Y]$/;
    return re.test(ssn);
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).map(value => value.toString()).includes(gender);
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing patient name');
    }
    return name;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date of birth');
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn) || !isSsn(ssn)) {
        throw new Error('Incorrect or missing social security number');
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender data');
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation data');
    }
    return occupation;
};
const toNewPatient = (patientInfo) => {
    if (!patientInfo || typeof patientInfo !== 'object') {
        throw new Error('Incorrect or missing patient data.');
    }
    if ('name' in patientInfo && 'dateOfBirth' in patientInfo
        && 'ssn' in patientInfo && 'gender' in patientInfo
        && 'occupation' in patientInfo) {
        const newPatient = {
            name: parseName(patientInfo.name),
            dateOfBirth: parseDate(patientInfo.dateOfBirth),
            ssn: parseSsn(patientInfo.ssn),
            gender: parseGender(patientInfo.gender),
            occupation: parseOccupation(patientInfo.occupation)
        };
        return newPatient;
    }
    throw new Error('Incorrect patient data: data fields are missing.');
};
exports.default = toNewPatient;

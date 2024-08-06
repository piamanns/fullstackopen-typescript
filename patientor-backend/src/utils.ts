import {
    NewPatient,
    Gender,
    Entry,
    EntryType,
    Diagnosis,
    Discharge,
    SickLeave,
    HealthCheckRating
} from './types';

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

const isEntryType = (entryType: string): entryType is EntryType => {
    return Object.values(EntryType).map(value => value.toString()).includes(entryType);
};

const isDiagnosisCode = (code: string): code is Diagnosis['code'] => {
  const re = /^(?:[A-Z][0-9][0-9A-Z])\.?[0-9A-Z]{0,4}$/i;
  return re.test(code);
};

const isDischarge = (discharge: object): discharge is Discharge => {
    // should contain date and criteria
    return (Object.keys(discharge).length == 2
        && 'date' in discharge
        && 'criteria' in discharge
        && isString(discharge.date)
        && isDate(discharge.date)
        && isString(discharge.criteria)
    );
};

const isSickLeave = (sickLeave: object): sickLeave is SickLeave => {
    // should contain startDate and endDate
    return (Object.keys(sickLeave).length == 2
        && 'startDate' in sickLeave
        && 'endDate' in sickLeave
        && isString(sickLeave.startDate)
        && isString(sickLeave.endDate)
        && isDate(sickLeave.startDate)
        && isDate(sickLeave.endDate)
    );
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
    return rating in HealthCheckRating;
};

const parseId = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error('Incorrect or missing id');
  }
  return id;
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

const parseEntryType = (entryType: unknown): EntryType => {
    if (!entryType || !isString(entryType) || !isEntryType(entryType)) {
        throw new Error('Incorrect or missing entry type');
    }
    return entryType;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('Incorrect or missing entry description');
    }
    return description;
};

const parseDischarge = (discharge: unknown): Discharge | undefined => {
    if (!discharge) return undefined;
    if (typeof discharge !== 'object' || !isDischarge(discharge)) {
        throw new Error('Incorrect or missing discharge description');
    }
    return discharge;
};

const parseSickLeave = (sickLeave: unknown): SickLeave | undefined => {
    if (!sickLeave) return undefined;
    if (typeof sickLeave !== 'object' || !isSickLeave(sickLeave)) {
        throw new Error('Incorrect or missing sickleave data');
    }
    return sickLeave ;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (typeof rating !== 'number' || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect or missing healthcheck rating');
    }
    return rating ;
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis['code']> | undefined => {
    if (!codes) return undefined;

    if (!Array.isArray(codes)) {
      throw new Error('Incorrect patient entry data.');
    }
    const parsedDiagnosisCodes: Array<Diagnosis['code']> = [];
    codes.forEach(code => {
        if (!isString(code) || !isDiagnosisCode(code)) {
          throw new Error('Incorrect diagnosis code');
        }
        parsedDiagnosisCodes.push(code);
    });

    return parsedDiagnosisCodes;
};

const parseEntries = (entries: unknown): Entry[] => {
    if (!entries) {
      return [];
    }
    if (!Array.isArray(entries)) {
      throw new Error('Incorrect patient entry data.');
    }
    const parsedEntries: Array<Entry> = [];

    entries.forEach(entry => {
        const baseEntryData = {
          id: parseId(entry.id),
          date: parseDate(entry.date),
          type: parseEntryType(entry.type),
          specialist: parseName(entry.specialist),
          diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
          description: parseDescription(entry.description)
        };

        let parsedEntry;
        switch (entry.type) {
            case (EntryType.Hospital):
                parsedEntry = {
                  ...baseEntryData,
                  discharge: parseDischarge(entry.discharge)
                };
                break;
            case (EntryType.OccupationalHealthcare):
                parsedEntry = {
                    ...baseEntryData,
                    employerName: parseName(entry.employerName),
                    sickLeave: parseSickLeave(entry.sickLeave)
                };
                break;
            case (EntryType.HealthCheck):
                parsedEntry = {
                  ...baseEntryData,
                  healthCheckRating: parseHealthCheckRating(entry.healthCheckRating)
                };
                break;
        }

        if (parsedEntry) {
            parsedEntries.push(parsedEntry);
        }
    });

    return parsedEntries;
};

const toNewPatient = (patientInfo: unknown): NewPatient => {
    if (!patientInfo || typeof patientInfo !== 'object') {
        throw new Error('Incorrect or missing patient data.');
    }

    if ('name' in patientInfo && 'dateOfBirth' in patientInfo
        && 'ssn' in patientInfo && 'gender' in patientInfo
        && 'occupation' in patientInfo && 'entries' in patientInfo) {
        const newPatient: NewPatient = {
            name: parseName(patientInfo.name),
            dateOfBirth: parseDate(patientInfo.dateOfBirth),
            ssn: parseSsn(patientInfo.ssn),
            gender: parseGender(patientInfo.gender),
            occupation: parseOccupation(patientInfo.occupation),
            entries: parseEntries(patientInfo.entries)
        };
        return newPatient;
    }
    throw new Error('Incorrect patient data: data fields are missing.');
};

export default toNewPatient;

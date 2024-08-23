import {
    NewEntry,
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
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseEmployerName = (entry: unknown): string => {
  if (!entry || typeof entry !== 'object'
      || !('employerName' in entry) || !isString(entry.employerName)) {
      throw new Error('Incorrect or missing employer name')
  }
  return entry.employerName;
}

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
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
    if (!description || !isString(description) || description.length === 0) {
        throw new Error('Incorrect or missing entry description');
    }
    return description;
};

const parseDischarge = (entry: unknown): Discharge | undefined => {
    if (!entry || typeof entry !== 'object' || !('discharge' in entry)) {
        return undefined
    }
    if (entry.discharge && isDischarge(entry.discharge)) {
        return entry.discharge;
    }
    throw new Error('Incorrect discharge data');
}

const parseSickLeave = (entry: unknown): SickLeave | undefined => {
    if (!entry || typeof entry !== 'object' || !('sickLeave' in entry)) {
        return undefined;
    }
    if (entry.sickLeave && isSickLeave(entry.sickLeave)) {
        return entry.sickLeave;
    }
    throw new Error('Incorrect sickleave data');
};

const parseHealthCheckRating = (entry: unknown): HealthCheckRating => {
    if (!entry || typeof entry !== 'object' || !('healthCheckRating' in entry)) {
        throw new Error('Missing healthcheck rating');
    }
    if (typeof entry.healthCheckRating === 'number'
        && isHealthCheckRating(entry.healthCheckRating)) {
        return entry.healthCheckRating;
    }
    throw new Error('Incorrect healthcheck rating');
};

const parseDiagnosisCodes = (entry: unknown): Array<Diagnosis['code']> | undefined => {
    if (!entry || typeof entry !== 'object' || !('diagnosisCodes' in entry)) {
        return undefined;
    }
    if (!Array.isArray(entry.diagnosisCodes)) {
      throw new Error('Incorrect patient entry data.');
    }
    const parsedDiagnosisCodes: Array<Diagnosis['code']> = [];
    entry.diagnosisCodes.forEach(code => {
        if (!isString(code) || !isDiagnosisCode(code)) {
          throw new Error(`Incorrect diagnosis code: ${code}`);
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
      const parsedEntry = toNewEntry(entry) as Entry;
      parsedEntry.id = parseId(entry.id)
      parsedEntries.push(parsedEntry);
    });

    return parsedEntries;
};

export const toNewEntry = (entry: unknown): NewEntry => {
    if (!entry || typeof entry !== 'object') {
        throw new Error('Incorrect or missing entry data.');
    }

    if ('date' in entry && 'type' in entry
        && 'description' in entry && 'specialist' in entry) {
        const baseEntryData = {
            date: parseDate(entry.date),
            type: parseEntryType(entry.type),
            specialist: parseName(entry.specialist),
            description: parseDescription(entry.description),
            diagnosisCodes: parseDiagnosisCodes(entry)
        };

        let newEntry: NewEntry;
        switch (entry.type) {
            case (EntryType.Hospital):
                newEntry = {
                  ...baseEntryData,
                  discharge: parseDischarge(entry)
                };
                break;
            case (EntryType.OccupationalHealthcare):
                newEntry = {
                    ...baseEntryData,
                    employerName: parseEmployerName(entry),
                    sickLeave: parseSickLeave(entry)
                };
                break;
            case (EntryType.HealthCheck):
                newEntry = {
                  ...baseEntryData,
                  healthCheckRating: parseHealthCheckRating(entry)
                };
                break;
            default:
              throw new Error('Incorrect patient entry type.');
        }
        return newEntry;
    }
    throw new Error('Incorrect patient entry data.');
};

export const toNewPatient = (patientInfo: unknown): NewPatient => {
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

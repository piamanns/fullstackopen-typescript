import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { SyntheticEvent, useState } from "react";
import { Diagnosis, EntryFormValues, EntryType, HealthCheckRating } from "../../types";
import { assertNever } from "../../utils";


interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  diagnosesData: Diagnosis[];
}

interface EntryTypeOption {
  value: EntryType;
  label: string;
}
const typeOptions: EntryTypeOption[] = Object.values(EntryType).map(v => ({
  value: v, label: v.toString()
}));

interface HealthRatingOption {
  value: HealthCheckRating;
  label: string;
}

const healthRatingOptions: HealthRatingOption[] = Object.values(HealthCheckRating)
  .filter((v) => !isNaN(Number(v)))
  .map(v => ({
    value: Number(v),
    label: `${v.toString()} (${HealthCheckRating[Number(v)]})`
}));

const AddEntryForm = ({ onSubmit, onCancel, diagnosesData }: Props) => {
  const [type, setType] = useState(EntryType.Hospital);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState(0);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employer, setEmployer] = useState('');
  const [sickleaveStart, setSickleaveStart] = useState('');
  const [sickleaveEnd, setSickleaveEnd] = useState('');
  const [codes, setCodes] = useState<string[]>([]);

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const type = Object.values(EntryType).find(type => type.toString() === value);
      if (type) {
        setType(type);
      }
    }
  };

  const onRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    if (typeof event.target.value === "number") {
      const value = event.target.value;
      if (value in Object.values(HealthCheckRating)) {
        setRating(value);
      }
    }
  };

  const onDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    const value = event.target.value;
    setCodes(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const parseEntryDetails = () => {
    const baseEntry = {
      date,
      specialist,
      description,
      diagnosisCodes: codes,
    };

    switch (type) {
      case EntryType.HealthCheck:
        return {
          ...baseEntry,
          type,
          healthCheckRating: rating
        };
      case EntryType.Hospital:
          return {
            ...baseEntry,
            type,
            discharge: (dischargeDate.length > 0 || dischargeCriteria.length > 0)
              ? {date: dischargeDate, criteria: dischargeCriteria}
              : undefined
          };
      case EntryType.OccupationalHealthcare:
        return {
          ...baseEntry,
          type,
          employerName: employer,
          sickLeave: (sickleaveStart.length > 0 || sickleaveEnd.length > 0)
            ? {startDate: sickleaveStart, endDate: sickleaveEnd}
            : undefined
        };
      default:
        assertNever(type);
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const entryToAdd = parseEntryDetails();
    if (entryToAdd) onSubmit(entryToAdd);
  };

  return (
    <Box my={1} p={1} sx={{
      width: "100%",
      border: 1,
      borderRadius: 2,
      borderStyle: "dashed"
    }}>
      <Typography variant="h6">
        <strong>New Entry</strong>
      </Typography>
      <form onSubmit={addEntry}>
        <InputLabel style={{ marginTop: 20 }}>Date:</InputLabel>
        <Input
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Entry type:</InputLabel>
        <Select
          label="type"
          fullWidth
          value={type}
          onChange={onTypeChange}
        >
        {typeOptions.map(option =>
          <MenuItem
            key={option.label}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        )}
        </Select>
        <TextField
          label="Specialist"
          variant="standard"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Description"
          variant="standard"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        {type === "Hospital" && <>
            <InputLabel style={{ marginTop: 20 }}>Discharge date:</InputLabel>
            <Input
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge criteria"
              variant="standard"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
        </>}
        {type === "OccupationalHealthcare" && <>
            <TextField
                label="Employer name"
                variant="standard"
                fullWidth
                value={employer}
                onChange={({ target }) => setEmployer(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>Sickleave:</InputLabel>
            <Box pl={3}>
              <InputLabel style={{ marginTop: 20 }}>Start date</InputLabel>
              <Input
                type="date"
                fullWidth
                value={sickleaveStart}
                onChange={({ target }) => setSickleaveStart(target.value)}
              />
              <InputLabel style={{ marginTop: 20 }}>End date</InputLabel>
              <Input
                type="date"
                fullWidth
                value={sickleaveEnd}
                onChange={({ target }) => setSickleaveEnd(target.value)}
              />
          </Box>
        </>}
        {type === "HealthCheck" && <>
          <InputLabel style={{ marginTop: 20 }}>Healthcheck rating</InputLabel>
          <Select
            label="Healthcheck rating"
            fullWidth
            value={rating}
            onChange={onRatingChange}
          >
            {healthRatingOptions.map(rating =>
              <MenuItem
                key={rating.value}
                value={rating.value}
              >
                {rating.label}
              </MenuItem>
            )}
          </Select>
        </>}
        <InputLabel style={{ marginTop: 20 }}>Diagnosis codes:</InputLabel>
        <Select
          label="Diagnosis codes"
          fullWidth
          multiple
          value={codes}
          onChange={onDiagnosisChange}
        >
          {diagnosesData.map(diagnosis =>
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} {diagnosis.name}
            </MenuItem>
          )}
        </Select>
        <Grid container mt={1} justifyContent={"space-between"}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddEntryForm;

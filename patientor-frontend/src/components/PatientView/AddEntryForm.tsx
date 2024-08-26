import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { SyntheticEvent, useState } from "react";
import { EntryFormValues, EntryType } from "../../types";
import { assertNever } from "../../utils";


interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

interface EntryTypeOption {
  value: EntryType;
  label: string;
}
const typeOptions: EntryTypeOption[] = Object.values(EntryType).map(v => ({
  value: v, label: v.toString()
}));


const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [type, setType] = useState(EntryType.HealthCheck);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employer, setEmployer] = useState('');
  const [sickleaveStart, setSickleaveStart] = useState('');
  const [sickleaveEnd, setSickleaveEnd] = useState('');
  const [codes, setCodes] = useState('');

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const type = Object.values(EntryType).find(type => type.toString() === value);
      if (type) {
        setType(type);
      }
    }
  };

  const parseEntryDetails = (entryType: EntryType) => {
    switch (entryType) {
      case EntryType.HealthCheck:
        return {
          healthCheckRating: rating.length !== 0
          ? Number(rating)
          : NaN
        };
      case EntryType.Hospital:
        if (dischargeDate.length > 0 || dischargeCriteria.length > 0) {
          return {
            discharge: {
              date: dischargeDate,
              criteria: dischargeCriteria
            }
          };
        }
        break;
      case EntryType.OccupationalHealthcare:
        return {
          employerName: employer,
          sickLeave: (sickleaveStart.length > 0 || sickleaveEnd.length > 0)
            ? {startDate: sickleaveStart, endDate: sickleaveEnd}
            : undefined
        };
      default:
        assertNever(entryType);
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const entryDetails = parseEntryDetails(type);

    onSubmit({
      type,
      date,
      specialist,
      description,
      diagnosisCodes: codes.length !== 0
        ? codes.split(",").map(c => c.trim())
        : undefined,
      ...entryDetails
    });
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
        <TextField
          label="Date"
          variant="standard"
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
            {option.label
          }</MenuItem>
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
            <TextField
              label="Discharge date"
              variant="standard"
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
          <TextField
              label="Sickleave: startdate"
              variant="standard"
              fullWidth
              value={sickleaveStart}
              onChange={({ target }) => setSickleaveStart(target.value)}
          />
          <TextField
              label="Sickleave: enddate"
              variant="standard"
              fullWidth
              value={sickleaveEnd}
              onChange = {({ target }) => setSickleaveEnd(target.value)}
          />
        </>}
        {type === "HealthCheck" && <TextField
          label="Healthcheck rating"
          variant="standard"
          fullWidth
          value={rating}
          onChange={({ target }) => setRating(target.value)}
        />}
        <TextField
          label="Diagnosis codes"
          variant="standard"
          fullWidth
          value={codes}
          onChange={({ target }) => setCodes(target.value)}
        />
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

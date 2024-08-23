import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { SyntheticEvent, useState } from "react";
import { EntryFormValues, EntryType, HealthCheckRating } from "../../types";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState('');
  const [codes, setCodes] = useState('');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      type: EntryType.HealthCheck,
      date,
      specialist,
      description,
      healthCheckRating: rating.length !== 0 ? Number(rating) : NaN,
      diagnosisCodes: codes.length !== 0 ? codes.split(",") : []
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
        <strong>New Healtcheck Entry</strong>
      </Typography>
      <form onSubmit={addEntry}>
        <TextField
          label="Date"
          variant="standard"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
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
        <TextField
          label="Healthcheck rating"
          variant="standard"
          fullWidth
          value={rating}
          onChange={({ target }) => setRating(target.value)}
        />
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
  )
}

export default AddEntryForm;

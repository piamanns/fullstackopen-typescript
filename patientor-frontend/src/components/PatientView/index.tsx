import axios from 'axios';
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryList from "./EntryList";
import AddEntryForm from "./AddEntryForm";
import patientService from "../../services/patients";
import { Patient, Diagnosis, EntryFormValues } from "../../types";
import { useState } from "react";

interface Props {
  patient: Patient | null;
  diagnosesData: Diagnosis[];
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const PatientView = ({ patient, diagnosesData, setPatient } : Props) => {
  const [entryFormVisible, setEntryFormVisible] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const showEntryForm = (): void => {
    setEntryFormVisible(true);
  }

  const hideEntryForm = (): void => {
    setEntryFormVisible(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!patient) return;
    try {
      const updatedPatient = await patientService.addEntry(patient.id, values);
      setPatient(updatedPatient);
      hideEntryForm();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (!patient) {
    return (
      <div>
        <Typography my={3}>No such patient</Typography>
      </div>
    );
  } else {
    let genderIcon = null;
    switch (patient.gender) {
      case "female":
        genderIcon = <FemaleIcon/>;
        break;
      case "male":
        genderIcon = <MaleIcon />;
        break;
      case "other":
        genderIcon = <Typography variant="caption">other</Typography>;
    }

    return (
      <Box mt={3}>
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Typography variant="h5" my={3} mr={1}>
            <strong>{patient.name}</strong>
          </Typography>
          {genderIcon}
        </Box>
        <Typography variant="body1">
          ssn: {patient.ssn}<br />
          occupation: {patient.occupation}
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {!entryFormVisible &&
          <Button variant="contained" onClick={() => showEntryForm()} sx={{ marginTop: 1 }}>
            ADD NEW ENTRY
          </Button>
        }
        {entryFormVisible &&
          <AddEntryForm onSubmit={submitNewEntry} onCancel={hideEntryForm}/>
        }
        <Typography variant="h6" mt={3}>
          Entries:
        </Typography>
        <EntryList entries={patient.entries} diagnosesData={diagnosesData}/>
      </Box>
    );
  }
};

export default PatientView;

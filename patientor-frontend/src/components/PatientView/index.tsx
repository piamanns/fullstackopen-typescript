import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import EntryList from "./EntryList";
import { Patient, Diagnosis } from "../../types";

interface Props {
  patient: Patient | null;
  diagnosesData: Diagnosis[]
}

const PatientView = ({ patient, diagnosesData } : Props) => {
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
        <Typography variant="h6" mt={3}>
          Entries:
        </Typography>
        <EntryList entries={patient.entries} diagnosesData={diagnosesData}/>
      </Box>
    );
  }
};

export default PatientView;

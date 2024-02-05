import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Patient } from "../types";

interface Props {
  patient: Patient | null;
}

const PatientView = ({ patient } : Props) => {
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
      </Box>
    );
  }
};

export default PatientView;

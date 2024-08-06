import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Entry } from "../../types";

interface Props {
  entry: Entry
}

const PatientEntry = ({ entry }: Props) => {
  return (
    <Box>
    <Typography variant="body1">{entry.date} <i>{entry.description}</i></Typography>
    <ul>
      {entry.diagnosisCodes && entry.diagnosisCodes.map((code) => (
        <li key={code}><Typography variant="body1">{code}</Typography></li>
      ))}
    </ul>
    </Box>
  );
};

export default PatientEntry;

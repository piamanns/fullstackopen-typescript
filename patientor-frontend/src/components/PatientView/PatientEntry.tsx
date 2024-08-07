import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Diagnosis, Entry } from "../../types";

interface Props {
  entry: Entry;
  diagnosesData: Diagnosis[];
}

const PatientEntry = ({ entry, diagnosesData }: Props) => {
  const parsedDiagnosisCodes : Diagnosis[] = [];
  if (entry.diagnosisCodes) {
    entry.diagnosisCodes.forEach((code) => {
      const parsedCode = diagnosesData.find((diagnosis => diagnosis.code === code));
      if (parsedCode) {
        parsedDiagnosisCodes.push(parsedCode);
      }
    });
  }

  return (
    <Box>
    <Typography variant="body1">{entry.date} <i>{entry.description}</i></Typography>
    <ul>
      {parsedDiagnosisCodes && parsedDiagnosisCodes.map((diagnosis) => (
        <li key={diagnosis.code}><Typography variant="body1">{diagnosis.code} {diagnosis.name}</Typography></li>
      ))}
    </ul>
    </Box>
  );
};

export default PatientEntry;

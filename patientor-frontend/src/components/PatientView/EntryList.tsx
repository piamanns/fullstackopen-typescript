import SingleEntry from './SingleEntry';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from "@mui/material/Typography";
import { Diagnosis, Entry } from "../../types";


interface Props {
  entries: Entry[] | undefined;
  diagnosesData: Diagnosis[];
}

const EntryList = ({ entries, diagnosesData } : Props) => {
  if (!entries || entries.length === 0) {
    return <Typography variant="body1">-</Typography>;
  } else {
    const parseDiagnoses = (entry: Entry): Diagnosis[] | undefined => {
      if (!entry.diagnosisCodes) return undefined;

      const parsedData: Diagnosis[] = [];
      entry.diagnosisCodes.forEach((code) => {
        const diagnosis = diagnosesData.find(d => d.code === code);
        if (diagnosis) parsedData.push(diagnosis);
      });
      return parsedData;
    };

    return (
      <List>
        {entries.map((entry) => (
          <ListItem key={entry.id} disableGutters>
            <SingleEntry entry={entry} parsedDiagnoses={parseDiagnoses(entry)}/>
          </ListItem>
          ))}
      </List>
    );
  }
};

export default EntryList;

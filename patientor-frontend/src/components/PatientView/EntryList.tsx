import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from "@mui/material/Typography";
import PatientEntry from "./PatientEntry";
import { Diagnosis, Entry } from "../../types";

interface Props {
  entries: Entry[] | undefined;
  diagnosesData: Diagnosis[];
}

const EntryList = ({ entries, diagnosesData } : Props) => {
  if (!entries || entries.length === 0) {
    return <Typography variant="body1">-</Typography>;
  } else {
    return (
      <Typography variant="body1">
        <List>
          {entries.map((entry) => (
            <ListItem key={entry.id} disableGutters>
              <PatientEntry entry={entry} diagnosesData={diagnosesData}/>
            </ListItem>
           ))}
        </List>
      </Typography>
    );
  }
};

export default EntryList;

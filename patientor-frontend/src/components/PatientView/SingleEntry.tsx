import EntryDetails from "./EntryDetails";
import Box from "@mui/material/Box";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import Typography from "@mui/material/Typography";
import WorkIcon from '@mui/icons-material/Work';
import { Diagnosis, Entry, EntryType } from "../../types";
import { SvgIconComponent } from "@mui/icons-material";
import { assertNever } from "../../utils";



interface DateAndIconProps {
  date: string,
  Icon: SvgIconComponent | null,
  title: string,
}

const DateAndIcon = ({ date, Icon, title }: DateAndIconProps)  => {
  return (
    <>
      <Typography style={{display: "inline"}}>{date}</Typography>
      {Icon && <Icon titleAccess={title} sx={{verticalAlign: "bottom", marginLeft: 0.5}}/>}
    </>
  );
};

interface EntryNotesProps {
  description: string,
  parsedDiagnoses: Diagnosis[] | undefined;
}

const EntryNotes = ({ description, parsedDiagnoses }: EntryNotesProps) => {
  return (
    <Box my={1}>
      <Typography><i>{description}</i></Typography>
      <ul>
        {parsedDiagnoses && parsedDiagnoses.map((diagnosis) => (
          <li key={diagnosis.code}>
            <Typography variant="body1">{diagnosis.code} {diagnosis.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
};

interface Props {
  entry: Entry;
  parsedDiagnoses: Diagnosis[] | undefined;
}

const SingleEntry = ({ entry, parsedDiagnoses }: Props) => {
  let icon = null;
  let title = "Icon for entry type";

  switch (entry.type) {
    case EntryType.Hospital:
      icon = LocalHospitalIcon;
      title = "Hospital entry";
      break;
    case EntryType.OccupationalHealthcare:
      icon = WorkIcon;
      title = "Occupational healthcare entry";
      break;
    case EntryType.HealthCheck:
      icon = MonitorHeartIcon;
      title = "Healthcheck entry";
      break;
    default:
      assertNever(entry);
  }

  return (
    <Box mb={1} p={1} sx={{ width: '100%', border: 1, borderRadius: 2 }}>
      <DateAndIcon date={entry.date} Icon={icon} title={title}/>
      <EntryNotes description={entry.description} parsedDiagnoses={parsedDiagnoses} />
      <EntryDetails entry={entry} />
      <Typography variant="body1" mt={1}>diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default SingleEntry;

import Box from "@mui/material/Box";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Typography from "@mui/material/Typography";
import {
  Entry,
  HospitalEntry,
  Discharge,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  HealthCheckRating,
  EntryType,
} from "../../types";
import { assertNever } from "../../utils";

const DischargeData = ({ discharge }: {discharge: Discharge | undefined}) => {
  if (!discharge) return null;
  return (
    <Typography variant="body1">
      Discharged {discharge.date}: <i>{discharge.criteria}</i>
    </Typography>
  );
};

const HospitalDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Box>
      <DischargeData discharge={entry.discharge} />
    </Box>
  );
};

const OccupationalHealthcareDetails = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
  return (
    <Box>
      <Typography variant="body1">
        Employer: {entry.employerName}
      </Typography>
      <Typography variant="body1">
        Sickleave: {entry.sickLeave ? `${entry.sickLeave.startDate} – ${entry.sickLeave.endDate}` : '-'}
      </Typography>
    </Box>
  );
};

const HealthCheckDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  const healthColor = {
    0: "green",
    1: "gold",
    2: "orange",
    3: "red"
  };
  const iconColor = healthColor[entry.healthCheckRating];
  return (
    <Box>
      <Typography variant="body1" style={{display: "inline"}}>
        Health rating:
      </Typography>
      <FavoriteIcon
        htmlColor={iconColor}
        titleAccess={HealthCheckRating.toString()}
        sx={{verticalAlign: "bottom"}}
      />
    </Box>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case EntryType.Hospital:
      return <HospitalDetails entry={entry}/>;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcareDetails entry={entry}/>;
    case EntryType.HealthCheck:
      return <HealthCheckDetails entry={entry}/>;
    default:
      assertNever(entry);
  }
};

export default EntryDetails;

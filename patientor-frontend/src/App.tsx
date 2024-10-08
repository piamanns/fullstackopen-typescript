import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import diagnosisService from "./services/diagnoses";
import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientView from "./components/PatientView";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const match = useMatch("/patients/:id");

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    const getPatientData = async (id: string) => {
      try {
        const patient = await patientService.getById(id);
        setPatient(patient);
      } catch (e: unknown) {
        setPatient(null);
      }
    };
    if (match && match.params.id) {
      void getPatientData(match.params.id);
    }
  }, [match]);

  useEffect(() => {
    const getDiagnosesData = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses.sort((a, b) => a.code <= b.code ? -1 : 1));
    };
    void getDiagnosesData();
  }, []);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path="/patients/:id" element={<PatientView patient={patient} diagnosesData={diagnoses} setPatient={setPatient}/>} />
          <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;

import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import { StyledEngineProvider } from '@mui/material/styles';
import Diagnosis from './Diagnosis';
import SignIn from './Doctor/SignIn';
import CertificateManagement from "./Doctor/CertificateManagement";
import OutCertificate from "./Doctor/Certificate";
import CreateCertificate from  "./Doctor/CreateCertificate";
import SymptomList from "./Doctor/SymptomList";
import PatientCertificateManagement from "./Patient/PatientCertificateManagement";
import {  
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';



// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";


ReactDOM.createRoot(document.querySelector("#root")).render(
    <Router>
            <Routes>
                <Route exact path="/" element={<Diagnosis />}/>
                <Route exact path="/SignIn" element={<SignIn/>}/>
                <Route exact path="/Certificate" element={<CertificateManagement/>}/>
                <Route exact path="/PatientCertificate" element={<PatientCertificateManagement/>}/>
                <Route exact path="/CertificateRecord" element={<OutCertificate/>}/>
                <Route exact path="/CreateCertificate" element={<CreateCertificate symptom={SymptomList()}/>}/>
            </Routes>
    </Router>    
    // <React.StrictMode>
    //   <StyledEngineProvider injectFirst>
    //     <Diagnosis />
    //   </StyledEngineProvider>
    // </React.StrictMode>
  );

import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import { StyledEngineProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import store from './store/store';
import Diagnosis from './Diagnosis';
import SignIn from './Doctor/SignIn';
import CertificateManagement from "./Doctor/CertificateManagement";
import OutCertificate from "./Doctor/Certificate";
import CreateCertificate from  "./Doctor/CreateCertificate";
import SymptomList from "./Doctor/SymptomList";
import PatientCertificateManagement from "./Patient/PatientCertificateManagement";
import useEthereum from "./WEB3/useEthereum";
import {  
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';



// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

export const userWallet = React.createContext()

export const backendInfo = React.createContext()

const App = () =>{
    // console.log(SymptomList());
    return(
        <Provider store={store}>
            <userWallet.Provider value={useEthereum()}>
<<<<<<< HEAD
            <Router>
                <Routes>
                    <Route exact path="/" element={<Diagnosis />}/>
                    <Route exact path="/SignIn" element={<SignIn/>}/>
                    <Route exact path="/Certificate" element={<CertificateManagement/>}/>
                    <Route exact path="/PatientCertificate" element={<PatientCertificateManagement/>}/>
                    <Route exact path="/CertificateRecord" element={<OutCertificate/>}/>
                    <Route exact path="/CreateCertificate/:account" element={<CreateCertificate/>}/>
                </Routes>
            </Router>
=======
                <backendInfo.Provider value={{baseURL: "http://diagnosis-back.host.chillmonkey.com.tw/api/", ContractAddress: "0xe02401b8b4d84189d0c013e9e20b2c87a33a5881"}}>
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
                </backendInfo.Provider>
>>>>>>> jesse
            </userWallet.Provider> 
        </Provider>
    )  
};


ReactDOM.createRoot(document.querySelector("#root")).render(
    <App></App>   
    // <React.StrictMode>
    //   <StyledEngineProvider injectFirst>
    //     <Diagnosis />
    //   </StyledEngineProvider>
    // </React.StrictMode>
  );

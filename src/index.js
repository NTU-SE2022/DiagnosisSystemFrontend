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
                <backendInfo.Provider value={{baseURL: "https://diagnosis-back.host.chillmonkey.com.tw/api", ContractAddress: "0x448f50b88d03b434cee1b7febf9f6cad51983565"}}>
                    <Router>
                        <Routes>
                            <Route exact path="/" element={<Diagnosis />}/>
                            <Route exact path="/SignIn" element={<SignIn/>}/>
                            <Route exact path="/Certificate" element={<CertificateManagement/>}/>
                            <Route exact path="/PatientCertificate" element={<PatientCertificateManagement/>}/>
                            <Route exact path="/CertificateRecord" element={<OutCertificate/>}/>
                            <Route exact path="/CreateCertificate/:room/:account" element={<CreateCertificate/>}/>
                        </Routes>
                    </Router>
                </backendInfo.Provider>
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

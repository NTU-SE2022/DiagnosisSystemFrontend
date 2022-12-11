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
import PatientCertificateManagement from "./Patient/PatientCertificateManagement";
import useEthereum from "./WEB3/useEthereum";
import {  
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import {AuthProvider} from "./Context/AuthProvider";


// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

export const userWallet = React.createContext()

export const backendInfo = React.createContext()

const App = () =>{
    const [auth, setAuth] = React.useState({});
    return(
        <Provider store={store}>
            <userWallet.Provider value={useEthereum()}>
                <backendInfo.Provider value={{baseURL: "https://diagnosis-back.host.chillmonkey.com.tw/api", ContractAddress: "0x448f50b88d03b434cee1b7febf9f6cad51983565"}}>
                    <AuthProvider>                   
                        <Router>
                            <Routes>
                                <Route path="/" element={<Diagnosis />}/>
                                <Route path="/SignIn" element={<SignIn/>}/>
                                <Route path="/Certificate" element={<CertificateManagement/>}/>
                                <Route path="/PatientCertificate" element={<PatientCertificateManagement/>}/>
                                <Route path="/CertificateRecord" element={<OutCertificate/>}/>
                                <Route path="/CreateCertificate/:room/:account" element={<CreateCertificate/>}/>
                            </Routes>
                        </Router>
                    </AuthProvider>
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

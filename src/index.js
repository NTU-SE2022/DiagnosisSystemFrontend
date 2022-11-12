

import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import { StyledEngineProvider } from '@mui/material/styles';
import Diagnosis from './Diagnosis';
import SignIn from './Doctor/SignIn';
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
                {/* <Route exact path="/connect" element={<Connect/>}/> */}
            </Routes>
    </Router>    
    // <React.StrictMode>
    //   <StyledEngineProvider injectFirst>
    //     <Diagnosis />
    //   </StyledEngineProvider>
    // </React.StrictMode>
  );

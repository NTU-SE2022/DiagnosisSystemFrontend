// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import "bootstrap/dist/css/bootstrap.min.css";
// import BasicExample from './alert';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     {/* <App /> */}
//     <BasicExample />
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom";
// import Diagnosis from "./Diagnosis";
// import MyApp from "./MyApp";
// import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import Diagnosis from './Diagnosis';

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// ReactDOM.render(<Diagnosis />, document.getElementById("root"));
// ReactDOM.render(<Diagnosis />, document.getElementById("root"));
ReactDOM.createRoot(document.querySelector("#root")).render(
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <Diagnosis />
      </StyledEngineProvider>
    </React.StrictMode>
  );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

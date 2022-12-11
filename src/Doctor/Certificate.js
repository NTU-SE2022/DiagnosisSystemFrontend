import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ButtonAppBar from './AppBar';
import { TextareaAutosize } from '@mui/material';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';
import { Box } from '@mui/system';
import { useLocation, Link } from "react-router-dom";
const theme = createTheme();

const content ={
    "ID":"4",
    "Wallet Address":"123",
    "症狀":"123"
};

// const string_content = (content)=>{
//     return JSON.stringify(content);
// };

// const string_content = '1'

export default function OutCertificate(props){
    const location = useLocation();
    // const content = {
    //     "ID":"4",
    //     "Wallet Address":"123",
    //     "症狀":"123"
    // }
    const content = location.state;
    const levels = content.levels.split(',')
    console.log(content)
    return(
        <React.Fragment>
            <ButtonAppBar></ButtonAppBar>
            {/* <Typography value={JSON.stringify(content)}>{JSON.stringify(content)}</Typography> */}
            <Box sx={{border:1 ,p:3}}>
            <Typography >ID:{content.id}</Typography>
            <Typography >Address:{content.patientAddress}</Typography>
            <Typography >Symptoms:
            {content.symptoms.split(',').map((symptom,index)=>(
                <Box key={symptom} component='li'>{symptom}:{transLevel(levels[index])}</Box>
            ))}</Typography>
            </Box>
            <Box sx={{textAlign:'right',p:2}}>
                <Button href='Certificate'>Back</Button>
            </Box>
            
        </React.Fragment>
    );
}

function transLevel(level){
    let trans = ""
    switch (level) {
      case '0':
        trans = 'HEALTH';
        break
      case '1':
        trans = "LOW";
        break
      case '2':
        trans = "MEDIUM";
        break
      case '3':
        trans = "HIGH";
        break
    }
    return(
      trans
    )
  }


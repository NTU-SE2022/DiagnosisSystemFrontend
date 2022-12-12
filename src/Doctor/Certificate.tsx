import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ButtonAppBar from './AppBar';
import { TextareaAutosize } from '@mui/material';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';
import { Box } from '@mui/system';
import { useLocation, Link } from "react-router-dom";
const theme = createTheme();

// const string_content = (content)=>{
//     return JSON.stringify(content);
// };

// const string_content = '1'

export default function OutCertificate(props: any){
    const location = useLocation();
    // const content = {
    //     "ID":"4",
    //     "Wallet Address":"123",
    //     "症狀":"123"
    // }
    const content = location.state;
    const levels = content.levels.split(',')
    return(
        <React.Fragment>
            <ButtonAppBar></ButtonAppBar>
            {/* <Typography value={JSON.stringify(content)}>{JSON.stringify(content)}</Typography> */}
            <Box sx={{border:1 ,p:3}}>
            <Typography >ID:{content.id}</Typography>
            <Typography >Address:{content.patientAddress}</Typography>
            <Typography >Symptoms:
            {content.symptoms.split(',').map((symptom:string,index:string)=>(
                <Box key={symptom} component='li'>{symptom}: {transDescription(levels[index])}</Box>
            ))}</Typography>
            </Box>
            <Box sx={{textAlign:'right',p:2}}>
            <Link to='/Certificate'>Back</Link>
            </Box>
            
        </React.Fragment>
    );
}

var levelTransitions:{[index: string]:string} = {
  'Healthy': '0',
  'Low': '1',
  'Medium': '2',
  'High': '3',
}

var descriptionTransitions:{[index: number]:string} = {
  0 : 'Healthy',
  1 : 'Low',
  2 : 'Medium',
  3 : 'High',
}

export function transDescription(level:number){
  let desc = descriptionTransitions[level]
  return(
    desc
  )
}

export function transLevel(desc:string){
  let level = levelTransitions[desc]
  return level
}


import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ButtonAppBar from './AppBar';
import { TextareaAutosize } from '@mui/material';
import Typography from '@mui/material/Typography';
import {Button} from '@mui/material';
import { Box } from '@mui/system';
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

export default class OutCertificate extends React.Component{
    state={
        content :{
            "ID":"4",
            "Wallet Address":"123",
            "症狀":"123"
        },
        temp:'1'
    };
    render(){
        return(
            <React.Fragment>
                <ButtonAppBar></ButtonAppBar>
                <Typography value={JSON.stringify(this.state.content)}>{JSON.stringify(this.state.content)}</Typography>
                <Box sx={{textAlign:'right',p:2}}>
                    <Button href='Certificate'>Back</Button>
                </Box>
            </React.Fragment>
        );
    }
}



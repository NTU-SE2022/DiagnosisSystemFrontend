import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { Pagination, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import DateTimePicker from '../Doctor/DateTimePicker';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import ButtonAppBar from './AppBar';
import {Stack} from '@mui/material';
import PropTypes from 'prop-types';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const theme = createTheme();
export default function PatientCertificateManagement(){

    const [page, setPage] = React.useState(1);
    const [medicalRecord,setmedicalRecord] = React.useState([0,1,2,3,4,5,6,7,8,9,10]);
    const [showMedicalRecord,setshowMedicalRecord] = React.useState(medicalRecord.slice(0,4));
    console.log(showMedicalRecord)
    const pageCount = 5;
    const handleChange = (event, value) => {
        setshowMedicalRecord(medicalRecord.slice((value-1)*pageCount,value*pageCount-1));
    };
    return(
        <ThemeProvider theme={theme}>
            <Container>
            
            <Grid xs={12} container rowSpacing={6} columnSpacing={6} justifyContent="center" sx={{p:2,flexGrow:1}}>
                <Grid item xs={12}>
                    <Item><ButtonAppBar title="Certificate Management" username="王大美"></ButtonAppBar></Item>
                </Grid>
                <Grid item xs = {6} sx={{textAlign:'center'}}>
                    <DateTimePicker fullWidth></DateTimePicker>
                </Grid>
                <Grid item xs = {6} sx={{textAlign:'center'}}>
                    <TextField fullWidth id="Symptom" label="Symptom"/>
                </Grid>
                <Grid item xs = {6} sx={{textAlign:'center'}}>
                    <TextField fullWidth id="Key Word" label="Key Word"/>
                </Grid>
                <Grid item xs = {6} sx={{textAlign:'center',height:'100%'}}>
                    <Button variant="contained">Search</Button>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{display: 'flex',flexDirection: 'row',p: 1,m: 1,bgcolor: 'background.paper',borderRadius: 1,justifyContent: 'space-between'}}>
                        {showMedicalRecord.map((record)=>(
                            <BorderBox id={record} value={record}></BorderBox>
                        ))}
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Stack alignItems="center">
                    <Pagination count={Math.ceil(medicalRecord.length/pageCount)} variant="outlined" onChange={handleChange} shape="rounded" sx={{margin: "auto"}}/>
                    </Stack>
                </Grid>
            </Grid>
            </Container>
        </ThemeProvider>
    );
}

function BorderBox(props){

    return(
        <Box
        sx={{
        boxShadow: 3,
        width: '12rem',
        height: '10rem',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        p: 1,
        m: 1,
        borderRadius: 2,
        textAlign: 'center',
        fontSize: '0.875rem',
        fontWeight: '700',
        }}
        >
        {props.value}
        </Box>
    )
}



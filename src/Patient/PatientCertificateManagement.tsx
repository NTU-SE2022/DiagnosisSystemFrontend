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
import { userWallet } from '..';
import { useNavigate } from 'react-router';
import axios from "axios";
import { AllMedicalCertificate, MedicalCertificate, Symptom } from '../store/MedicalCertificate';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const theme = createTheme();

export default function PatientCertificateManagement(){
    const {
        isMetaMaskInstalled,
        provider,
        accounts,
        web3,
        enable,
        disable
    } = React.useContext(userWallet);

    const nav = useNavigate()
    React.useEffect(()=>{
        if(accounts.length == 0){
            disable();
            nav('/');
        }
    }, [])

    const pageCount = 2;
    const [pageNum,setpageNum] = React.useState(1);
    const allCertificate: MedicalCertificate[] = AllMedicalCertificate();
    const [showCertificate, setshowCertificate] = React.useState<MedicalCertificate[]>(allCertificate);
    const [refresh, setrefresh] = React.useState(false);
    const [symptom, setsymptom] = React.useState('');
    const [level, setlevel] = React.useState('');
    const [search, setsearch] = React.useState(false);

    React.useEffect(()=>{
        setshowCertificate(allCertificate);
    }, [allCertificate.length, refresh])
    
    const Search = () => {
        setsearch(true);
        setpageNum(1);
        setshowCertificate(allCertificate.filter((certificate: MedicalCertificate) => certificate.symptoms.some((item) => item.symptom.toLowerCase().includes(symptom.toLowerCase()) && item.level.includes(level))));
        setsearch(false);
    }

    // React.useEffect(() => {
    //     setshowCertificate(allCertificate.filter((certificate: MedicalCertificate) => certificate.symptoms.some((item) => item.symptom.toLowerCase().includes(symptom.toLowerCase()) && item.level.includes(level))));
    // }, [search])

    // console.log(showCertificate);
    // console.log(allCertificate);
    const handleChange = (event:any, value:any) => {
        setpageNum(value);
        setrefresh(true);
    };

    return(
        <ThemeProvider theme={theme}>
            <Container>
            
            <Grid xs={12} container rowSpacing={6} columnSpacing={6} justifyContent="center" sx={{p:2,flexGrow:1}}>
                <Grid xs={12}>
                    <Item><ButtonAppBar title="Certificate Management" username={accounts}></ButtonAppBar></Item>
                </Grid>
                <Grid xs = {5} sx={{textAlign:'center'}}>
                    <TextField fullWidth id="Symptom" label="Symptom" onChange = {(ev) => {setsymptom(ev.target.value)}}/>
                </Grid>
                <Grid xs = {5} sx={{textAlign:'center'}}>
                    <TextField fullWidth id="SeverityScale" label="Severity scale (0~3)" onChange = {(ev) => {setlevel(ev.target.value)}}/>
                </Grid>
                <Grid sx={{textAlign:'center', height:'100%'}}>
                    <Button variant="contained" disabled={search} onClick={Search} >Search</Button>
                </Grid>
                <Grid xs={12}>
                    <Box sx={{display: 'flex',flexDirection: 'row',p: 1,m: 1,bgcolor: 'background.paper',borderRadius: 1,justifyContent: 'flex-start'}}>
                        { showCertificate.slice((pageNum-1)*pageCount,pageNum*pageCount).map((certificate) => <BorderBox value={{id:certificate.id,symptoms:certificate.symptoms}} onclick ={()=>{}} />) }
                    </Box>
                </Grid>
                <Grid xs={12}>
                    <Stack alignItems="center">
                        <Pagination count={Math.ceil(showCertificate.length/pageCount)} page={pageNum} variant="outlined" onChange={handleChange} shape="rounded" sx={{margin: "auto"}}/>
                    </Stack>
                </Grid>
            </Grid>
            </Container>
        </ThemeProvider>
    );
}



function BorderBox(props:any){

    return(
        <Box
        sx={{
        boxShadow: 3,
        width: '40rem',
        height: '25rem',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
        color: (theme) =>
            theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        p: 1,
        m: 1,
        borderRadius: 2,
        textAlign: 'center',
        }}
        >
            <BorderBoxContent value={props.value}/>
        </Box>
    )
}

function BorderBoxContent(props:any){
    const symptoms: Symptom[] = props.value.symptoms;
    var colors: {[index: string]:string} = {
        '0': 'success.dark',
        '1': 'info.dark',
        '2': 'warning.dark',
        '3': 'error.dark',
    };

    var levelDescriptions:{[index: string]:string} = {
        '0': '(Healthy, 0)',
        '1': '(Low, 1)',
        '2': '(Medium, 2)',
        '3': '(High, 3)',
    }

    return(
        <Box flex={1} sx={{height:'100%',textAlign:'left' ,overflow:"auto"}}>
        <Box component="h4" sx={{ display: 'block', fontweight: 'bold'}}>
            <Box sx={{ color: 'text.primary', display: 'inline',}}>Certificate ID: </Box>
            <Box sx={{ color: 'secondary.dark', display: 'inline',}}>{props.value.id}</Box>
        </Box>
        {/* <Box component="p" sx={{ display: 'block' }}>
            <Box sx={{ color: 'text.primary', fontsize:15, fontweight: 'bold', display: 'inline',}}>Patient: {props.value.address}</Box>
            <Box sx={{ color: 'secondary.dark', fontsize:10, display: 'inline',}}>{props.value.id}</Box>
        </Box> */}
        <Box component="h4" sx={{ color: 'text.primary', fontsize:40, fontweight:'bold'}}>Symptoms:</Box>
        <Box component="h6" sx={{display: 'block'}}>
            {symptoms.map((symptom) => {return <Box sx={{display: 'block', color:colors[symptom.level]}}>{symptom.symptom} {levelDescriptions[symptom.level]}</Box>})}
        </Box>
        {/* <Box component="p">symptoms:{props.value.symptoms}</Box>
        <Box component="p">levels:{props.value.levels}</Box> */}
        {/* <Box component="p">Category:{props.value.category}</Box>
        <Box component='p'>Feature:{props.value.feature.map((policy=>(<Box component='li'>{policy}</Box>)))}</Box>
        <Box component='p'>Coverage:{props.value.coverage.map((policy=>(<Box component='li'>{policy}</Box>)))}</Box> */}
        </Box>
    )
}
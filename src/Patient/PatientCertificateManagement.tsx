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
import axios from "axios";
import { AllMedicalCertificate, ContractImplementation, MedicalCertificate } from '../store/MedicalCertificate';



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

    const pageCount = 2;
    const [page, setPage] = React.useState(1);
    // TODO: get all patient certificates
    const [allCertificateId, setallCertificateId] = React.useState<string[]>([]);
    const [allCertificate, setallCertificate] = React.useState<JSX.Element[]>([]);
    const [pageNum,setpageNum] = React.useState(1);
    const testFunc: MedicalCertificate[] = ContractImplementation({address:"0xe02401b8b4d84189d0c013e9e20b2c87a33a5881",patient:accounts[0]});


    // React.useEffect(() => {
    //     setallCertificateId(["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]);
    //     // setallCertificate(AllMedicalCertificate({address:"0xe02401b8b4d84189d0c013e9e20b2c87a33a5881",ids:test(),patientAddress:accounts}));
    // }, []);
    
    // console.log(showMedicalRecord)
    
    const handleChange = (event:any, value:any) => {
        setpageNum(value);
    };
    return(
        <ThemeProvider theme={theme}>
            <Container>
            
            <Grid xs={12} container rowSpacing={6} columnSpacing={6} justifyContent="center" sx={{p:2,flexGrow:1}}>
                <Grid xs={12}>
                    <Item><ButtonAppBar title="Certificate Management" username={accounts}></ButtonAppBar></Item>
                </Grid>
                <Grid xs = {6} sx={{textAlign:'center'}}>
                    <DateTimePicker fullWidth></DateTimePicker>
                </Grid>
                <Grid xs = {6} sx={{textAlign:'center'}}>
                    <TextField fullWidth id="Symptom" label="Symptom"/>
                </Grid>
                <Grid xs = {6} sx={{textAlign:'center'}}>
                    <TextField fullWidth id="Key Word" label="Key Word"/>
                </Grid>
                <Grid xs = {6} sx={{textAlign:'center',height:'100%'}}>
                    <Button variant="contained">Search</Button>
                </Grid>
                <Grid xs={12}>
                    <Box sx={{display: 'flex',flexDirection: 'row',p: 1,m: 1,bgcolor: 'background.paper',borderRadius: 1,justifyContent: 'flex-start'}}>
                        { testFunc.slice((pageNum-1)*pageCount,pageNum*pageCount).map((certificate) => <BorderBox value={{id:certificate.id,address:certificate.address,symptoms:certificate.symptoms,levels:certificate.levels}} onclick ={()=>{}} />) }
                        {/* { AllMedicalCertificate({address:"0xe02401b8b4d84189d0c013e9e20b2c87a33a5881",ids:allCertificateId.slice((pageNum-1)*pageCount,pageNum*pageCount),patientAddress:accounts}) } */}
                    </Box>
                </Grid>
                <Grid xs={12}>
                    <Stack alignItems="center">
                    <Pagination count={Math.ceil(testFunc.length/pageCount)} variant="outlined" onChange={handleChange} shape="rounded" sx={{margin: "auto"}}/>
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
        width: '30rem',
        height: '25rem',
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
            <BorderBoxContent value={props.value}/>
        </Box>
    )
}

function BorderBoxContent(props:any){
    return(
        <Box flex={1} sx={{height:'100%',textAlign:'left' ,overflow:"auto"}}>
        <Box component="p">id:{props.value.id}</Box>
        <Box component="p">address:{props.value.address}</Box>
        <Box component="p">symptoms:{props.value.symptoms}</Box>
        <Box component="p">levels:{props.value.levels}</Box>
        {/* <Box component="p">Category:{props.value.category}</Box>
        <Box component='p'>Feature:{props.value.feature.map((policy=>(<Box component='li'>{policy}</Box>)))}</Box>
        <Box component='p'>Coverage:{props.value.coverage.map((policy=>(<Box component='li'>{policy}</Box>)))}</Box> */}
        </Box>
    )
}
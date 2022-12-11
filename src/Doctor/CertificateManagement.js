import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import DateTimePicker from './DateTimePicker';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import DataGridDemo from './DataGridDemo';
import ButtonAppBar from './AppBar';
import axios from "axios";
import { AuthContext } from '../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';

// const rows: GridRowsProp = [
//   { id: 1, col1: "Hello", col2: "World" },
//   { id: 2, col1: "MUI X", col2: "is awesome" },
//   { id: 3, col1: "Material UI", col2: "is amazing" },
//   { id: 4, col1: "MUI", col2: "" },
//   { id: 5, col1: "Joy UI", col2: "is awesome" },
//   { id: 6, col1: "MUI Base", col2: "is amazing" }
// ];

// const columns: GridColDef[] = [
//   { field: "id", hide: true },
//   { field: "col1", headerName: "Column 1", width: 150 },
//   { field: "col2", headerName: "Column 2", width: 150 }
// ];


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const client = axios.create({
    baseURL: "https://diagnosis-back.host.chillmonkey.com.tw/api" 
  });

const theme = createTheme();
export default function CertificateManagement(){
    const navigate = useNavigate();
    const {auth} = React.useContext(AuthContext);
    const [patientAddress,setPatientAddress] = React.useState([]);
    const [customFilter,setCustomFilter] = React.useState([]);
    const [patientAddressKeyword,setPatientAddressKeyword] = React.useState('');
    const [symptomsKeyword,setSymptomsKeyword] = React.useState('');
    const [loading,setLoading] = React.useState(true);
    const [addressList,setAddressList] = React.useState([])
    const [nowAccount,setNowAccount] = React.useState("");
    const [addressListRoom2,setAddressListRoom2] = React.useState([])
    const [nowAccountRoom2,setNowAccountRoom2] = React.useState("");
    React.useEffect(()=>{
        console.log('=========================');
        console.log(auth);
        console.log('=========================');
    },[auth])

    if(auth.status != 'login'){
        alert('尚未登入')
        navigate('/SignIn')
    }

    React.useEffect(() => {
        client.get('/medicalCertificates').then(response => {
            setPatientAddress(response.data.data.medicalCertificatesList);
            console.log(response.data.data.medicalCertificatesList);
        }).catch(error =>{
          console.log(error);
        });
      }, []);

    React.useEffect(()=>{
        client.get('/clinic/1').then(response=>{
            setAddressList(address => [...address,response.data.data])
        }).catch(error =>{
            console.log(error);
        });
    },[])

    React.useEffect(()=>{
        client.get('/clinic/2').then(response=>{
            setAddressListRoom2(address => [...address,response.data.data])
        }).catch(error =>{
            console.log(error);
        });
    },[])

    React.useEffect(() =>{
        console.log(addressList)
        if(addressList.length != 0){
            if(nowAccount == ""){
                setNowAccount(addressList[0].patient)
            }
            else{
                const nowpos = addressList.findIndex(obj=>obj.patient == nowAccount)
                if(nowpos + 1 < addressList.length){
                    setNowAccount(addressList[nowpos + 1].patient);
                }
                else{
                    setNowAccount("")
                }
            }
        }
    },[addressList])

    React.useEffect(() =>{
        if(addressListRoom2.length != 0){
            if(nowAccount == ""){
                setNowAccountRoom2(addressListRoom2[0].patient)
            }
            else{
                const nowpos = addressListRoom2.findIndex(obj=>obj.patient == nowAccountRoom2)
                if(nowpos + 1 < addressListRoom2.length){
                    setNowAccountRoom2(addressListRoom2[nowpos + 1].patient);
                }
                else{
                    setNowAccountRoom2("")
                }
            }
        }
    },[addressListRoom2])

    const setFilter = () =>{
        setCustomFilter([])
        if(patientAddressKeyword != ''){
            setCustomFilter(custom=>[...custom,{id:0,columnField:'patientAddress',operatorValue: 'contains', value: patientAddressKeyword}])
        }
        if(symptomsKeyword != ''){
            setCustomFilter(custom=>[...custom,{id:1,columnField:'symptoms',operatorValue: 'contains', value: symptomsKeyword}])
        }
    }
    return(
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sx" sx={{ flexGrow: 1,boxShadow: 1, borderRadius: 2, backgroundColor: '#E0E0E0', p: 2}}>
            <CssBaseline />
            <Grid container rowSpacing={6} >
                <Grid item xs={12} >
                    <Item><ButtonAppBar></ButtonAppBar></Item>
                    {/* <Item>
                        <Box sx={{position: 'relative',textAlign: 'center' }}>
                            <h1>Certificate Management</h1>
                            <Box sx={{position: 'absolute', textAlign: 'right' , right : '0px',top:'50%'}}>
                                <Box component="span" sx={{ p: 2 }}>王大美</Box>
                                <Box component="span" sx={{ p: 2 }}><Button href = "SignIn">Sign Out</Button></Box>
                            </Box>
                        </Box>
                    </Item> */}
                </Grid>
                <Grid item xs={12} container>
                    <Grid item xs={6} container columnSpacing={6} sx={{backgroundColor: '#fff',boxShadow:1,borderRadius: 2,p:2,m:2}}>
                        <Grid item xs = {6}>
                            <TextField fullWidth id="patientAddress" label="Patient Address" value={patientAddressKeyword} onChange={(newValue) => setPatientAddressKeyword(newValue.target.value)}/>
                        </Grid>
                        {/* <Grid item xs = {6}>
                            <DateTimePicker></DateTimePicker>
                        </Grid> */}
                        <Grid item xs = {6}>
                            <TextField fullWidth id="symptoms" label="Symptoms" value={symptomsKeyword} onChange={(newValue) => setSymptomsKeyword(newValue.target.value)}/>
                        </Grid>
                        {/* <Grid item xs = {3}>
                            <TextField fullWidth id="關鍵字" label="關鍵字"/>
                        </Grid> */}
                        <Grid item xs = {3}>
                            <Button fullWidth variant="contained" onClick={setFilter}>Search</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs container rowSpacing={3} sx={{backgroundColor: '#fff',boxShadow:1,borderRadius: 2,p:2,m:2,textAlign: 'center'}}>
                        <Grid item xs ={12}>
                            <Box component="h1" sx={{display:'block'}}>
                                ROOM 1
                            </Box>
                        </Grid>
                        <Grid item xs ={12}>
                            <Box component="p"  sx={{display:'block'}}>
                                {nowAccount}
                            </Box>
                        </Grid>
                        <Grid item xs ={12}>
                            <Button fullWidth variant="contained" sx={{backgroundColor: 'red'}} href={`CreateCertificate/1/${nowAccount}`}>Create</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs container rowSpacing={3} sx={{backgroundColor: '#fff',boxShadow:1,borderRadius: 2,p:2,m:2,textAlign: 'center'}}>
                        <Grid item xs ={12}>
                            <Box component="h1" sx={{display:'block'}}>
                                ROOM 2
                            </Box>
                        </Grid>
                        <Grid item xs ={12}>
                            <Box component="p"  sx={{display:'block'}}>
                                {nowAccountRoom2}
                            </Box>
                        </Grid>
                        <Grid item xs ={12}>
                            <Button fullWidth variant="contained" sx={{backgroundColor: 'red'}} href={`CreateCertificate/2/${nowAccountRoom2}`}>Create</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} container>
                    <Box sx={{flexGrow:1 ,boxShadow: 1,backgroundColor: '#fff',boxShadow:1,borderRadius: 2,p:2,m:2}}>               
                        <DataGridDemo rows={patientAddress} filter ={customFilter}></DataGridDemo>
                    </Box>
                </Grid>   
            </Grid>
            </Container>
        </ThemeProvider>

    );
}

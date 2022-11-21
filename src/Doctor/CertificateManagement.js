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

const rows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "MUI X", col2: "is awesome" },
  { id: 3, col1: "Material UI", col2: "is amazing" },
  { id: 4, col1: "MUI", col2: "" },
  { id: 5, col1: "Joy UI", col2: "is awesome" },
  { id: 6, col1: "MUI Base", col2: "is amazing" }
];

const columns: GridColDef[] = [
  { field: "id", hide: true },
  { field: "col1", headerName: "Column 1", width: 150 },
  { field: "col2", headerName: "Column 2", width: 150 }
];

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const theme = createTheme();
export default function CertificateManagement(){
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
                    <Grid item xs={9} container columnSpacing={6} sx={{backgroundColor: '#fff',boxShadow:1,borderRadius: 2,p:2,m:2}}>
                        <Grid item xs = {6}>
                            <TextField fullWidth id="Wallet Address" label="Wallet Address"/>
                        </Grid>
                        <Grid item xs = {6}>
                            <DateTimePicker></DateTimePicker>
                        </Grid>
                        <Grid item xs = {6}>
                            <TextField fullWidth id="症狀" label="症狀"/>
                        </Grid>
                        <Grid item xs = {3}>
                            <TextField fullWidth id="關鍵字" label="關鍵字"/>
                        </Grid>
                        <Grid item xs = {3}>
                            <Button fullWidth variant="contained">Search</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs container rowSpacing={3} sx={{backgroundColor: '#fff',boxShadow:1,borderRadius: 2,p:2,m:2,textAlign: 'center'}}>
                        <Grid item xs ={12}>
                            <Box component="h1" sx={{display:'block'}}>
                                現在診間病人
                            </Box>
                        </Grid>
                        <Grid item xs ={12}>
                            <Box component="p"  sx={{display:'block'}}>
                                123456789
                            </Box>
                        </Grid>
                        <Grid item xs ={12}>
                            <Button fullWidth variant="contained" sx={{backgroundColor: 'red'}} href='CreateCertificate'>Create</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} container>
                    <Box sx={{flexGrow:1 ,boxShadow: 1,backgroundColor: '#fff',boxShadow:1,borderRadius: 2,p:2,m:2,}}>               
                        <DataGridDemo></DataGridDemo>
                    </Box>
                </Grid>   
            </Grid>
            </Container>
        </ThemeProvider>

    );
}

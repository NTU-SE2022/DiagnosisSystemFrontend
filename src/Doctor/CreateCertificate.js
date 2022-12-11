import * as React from 'react';
import ButtonAppBar from './AppBar';
import { Typography,Button,Box } from '@mui/material';
import {Autocomplete} from '@mui/material';
import {TextField} from '@mui/material';
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useRef,useEffect } from 'react';
import RowRadioButtonsGroup from './RadioButtonGroup';
import CreateCertificateButton from './CreateCertifiacteButton';
import Grid from '@mui/material/Unstable_Grid2';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const config = {
    baseURL: "https://diagnosis-back.host.chillmonkey.com.tw/api/symptoms",
    // baseURL:"http://localhost:3000/testdata/testSymptom.json"
}


export default function CreateCertificate(props){
    // state={
    //     content :{
    //         "ID":"4",
    //         "Wallet Address":"123",
    //     },
    //     symptom:[
    //         { label: 'The Shawshank Redemption', year: 1994 },
    //         { label: 'The Godfather', year: 1972 },
    //     ],
    //     has_symptom:[
    //         { label: 'The Shawshank Redemption', year: 1994 },
    //         { label: 'The Godfather', year: 1972 },
    //     ],
    //     temp:'1',
    // };
    let { account,room } = useParams();
    let content = props.content;
    const [symptomList ,setSymptomList] = React.useState([])
    React.useEffect(() =>{
        axios(config).then((response) =>{
            console.log(response)
            let data = response.data.data.symptomsList;
            data.map((symptom) => symptom['level'] = "HEALTH");
            setSymptomList(data)
        }).catch((error)=>{
            console.log(error);
        })
    },[]);

    // const symptomRef = useRef();
    const [nowSymptom ,setnowSymptom] = React.useState()
    const [hasSymptom ,sethasSymptom] = React.useState([]);
    const AddSymptom = (addSymptom)=>{
        // console.log(hasSymptom.some(s=>s.label===addSymptom.label))
        if(addSymptom != null & typeof(addSymptom) !== 'undefined'){
            if(!hasSymptom.some(s=>s.name===addSymptom.name)){
                sethasSymptom(hasSymptom => [...hasSymptom, addSymptom]);
            }
        }
    };
    const DeleteSymptom=(deleteSymptom)=>{
        console.log('deleteSymptom'+ deleteSymptom);
        sethasSymptom(current=>current.filter(
            hasSymptom =>{return hasSymptom.name !== deleteSymptom;}
        ))
    }

    const UpdateSymptomLevel=(updateSymptom,symptomLevel)=>{
        console.log(`${updateSymptom.name} ${updateSymptom.level} => ${symptomLevel}`);
        sethasSymptom(current=>current.map(
            hasSymptom =>{
                if(hasSymptom.name == updateSymptom.name){
                    return {...hasSymptom,level:symptomLevel}
                }
                return hasSymptom;
            }
        ))
    }
    const handleCheck= (data) =>{
        console.log(data)
        setnowSymptom(data)
    }

    return(
        <React.Fragment >
            <ButtonAppBar></ButtonAppBar>
            <Typography value={JSON.stringify(content)}>{JSON.stringify(content)}</Typography>
            <Grid container sx={{ p: 2 }}>
                <Grid item xs={6} >
                    <Typography sx={{ display: 'flex',justifyContent: 'flex-start'}}>
                        Patient Address:{account}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{display: 'flex',justifyContent: 'flex-end',textAlign:'right'}}>

                        {/* <Button href='Certificate'>Save</Button> */}
                        <CreateCertificateButton room={room} account={account} hasSymptoms={hasSymptom} allSymptoms={symptomList}></CreateCertificateButton>
                        <Button href='/Certificate'>Back</Button>
                    </Box>
                </Grid> 
            </Grid>
            <Box sx={{p:2 ,border:1}}>
            <Box component="div" sx={{ display: 'flex',flexDirection: 'row'}}>
                <ComboBox id = '1' value={symptomList} Change={handleCheck}></ComboBox>
                <Button onClick={()=>AddSymptom(nowSymptom)}>Add Symptom</Button>
            </Box>
            {/* <Button onClick={AddSymptom}>Add  Symptom</Button> */}
            <SymptomGroup value={hasSymptom} onDelete={DeleteSymptom} onUpdate={UpdateSymptomLevel}></SymptomGroup>
            </Box>
        </React.Fragment>
    );
}
export function ComboBox(props){
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={props.value}
        getOptionLabel={(option) => option.name || ""}
        sx={{ width: 300 }}
        onChange={(event, newValue)=>props.Change(newValue)}
        renderInput={(params) => <TextField {...params} label="Symptom" />}
      />
    );
  };

  export function SymptomGroup (props){
    if(props.value.length == 0){
        return <Box></Box>
    }
    return(
            <Box>
                {props.value.map(symptom=>(
                    <Box sx={{ flexGrow: 1}}>
                        <RowRadioButtonsGroup key = {symptom.name} value={symptom} sx={{display:"block"}} onDelete={props.onDelete} onUpdate={props.onUpdate}>{symptom.name}</RowRadioButtonsGroup>
                    </Box>
                ))}
            </Box>
        
    )
};

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
    let content = props.content;
    let symptom = props.symptom;
    // const symptomRef = useRef();
    const [nowSymptom ,setnowSymptom] = React.useState()
    const [hasSymptom ,sethasSymptom] = React.useState([]);
    const AddSymptom = (addSymptom)=>{
        // console.log(hasSymptom.some(s=>s.label===addSymptom.label))
        if(addSymptom != null & typeof(addSymptom) !== 'undefined'){
            if(!hasSymptom.some(s=>s.label===addSymptom.label)){
                sethasSymptom(hasSymptom => [...hasSymptom, addSymptom]);
            }
        }
    };
    const DeleteSymptom=(deleteSymptom)=>{
        console.log('deleteSymptom'+deleteSymptom);
        sethasSymptom(current=>current.filter(
            hasSymptom =>{return hasSymptom.label !== deleteSymptom;}
        ))
    }

    const UpdateSymptomLevel=(updateSymptom,symptomLevel)=>{
        console.log(`${updateSymptom.label} ${updateSymptom.level} => ${symptomLevel}`);
        sethasSymptom(current=>current.map(
            hasSymptom =>{
                if(hasSymptom.label == updateSymptom.label){
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
        <React.Fragment>
            <ButtonAppBar></ButtonAppBar>
            <Typography value={JSON.stringify(content)}>{JSON.stringify(content)}</Typography>
            <Grid container>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <Box sx={{display: 'flex',justifyContent: 'flex-end',textAlign:'right',p:2}}>

                        {/* <Button href='Certificate'>Save</Button> */}
                        <CreateCertificateButton></CreateCertificateButton>
                        <Button href='Certificate'>Back</Button>
                    </Box>
                </Grid> 
            </Grid>
            <Box component="div" sx={{ display: 'flex',flexDirection: 'row' }}>
                <ComboBox id = '1' value={symptom} Change={handleCheck}></ComboBox>
                <Button onClick={()=>AddSymptom(nowSymptom)}>Add Symptom</Button>
            </Box>
            {/* <Button onClick={AddSymptom}>Add  Symptom</Button> */}
            <SymptomGroup value={hasSymptom} onDelete={DeleteSymptom} onUpdate={UpdateSymptomLevel}></SymptomGroup>
        </React.Fragment>
    );
}
export function ComboBox(props){
    return (
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={props.value}
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
                        <RowRadioButtonsGroup key = {symptom.label} value={symptom} sx={{display:"block"}} onDelete={props.onDelete} onUpdate={props.onUpdate}>{symptom.label}</RowRadioButtonsGroup>
                    </Box>
                ))}
            </Box>
        
    )
};

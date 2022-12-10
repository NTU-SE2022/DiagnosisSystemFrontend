import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";

export default function CreateCertificateButton(props) {
  const [open, setOpen] = React.useState(false);
  const [context,setContext] =React.useState("生成及發送 NFT 至病人錢包中...")
  const config = {
    // baseURL: "https://diagnosis-back.host.chillmonkey.com.tw/api/createCertificate",
    // baseURL:"http://localhost:3000/testdata/test.json"
  }

  const handleClickOpen = () => {
      const {symptom,level} = setSymptomAndLevel(props.allSymptoms,props.hasSymptoms)
      const send_body = {
        patientAddress:props.account,
        symptoms:symptom,
        levels:level
      }
      console.log(send_body);
      setOpen(true);
      setContext("生成及發送 NFT 至病人錢包中...");
      axios.post(config.baseURL,send_body).then(response => {
        if(response.data.status == 200){
          setContext("發送完成")
        }else{
          setContext("發送失敗")
        }
    }).catch(error =>{
      console.log(error);
      setContext("發送失敗");
    });
    // setOpen(true);
    // setContext("生成及發送 NFT 至病人錢包中...");
    // setTimeout(() => {
    //     setContext("發送完成")
    // }, 3000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Save and Create
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {context}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function setSymptomAndLevel(allSymptoms,hasSymptoms){

  let symptom ="";
  let level = "";
  allSymptoms.forEach(element => {
    symptom = symptom.concat(',',element.name)
    if(hasSymptoms.some((s => s.name == element.name))){
      const hasSymptom = hasSymptoms.filter(s => s.name == element.name)
      level = level.concat(',',transLevel(hasSymptom[0].level))
    }else{
      level = level.concat(',',transLevel(element.level))
    }
    
  });
  level = level.substring(1)
  symptom = symptom.substring(1)
  return(
    {
      symptom:symptom,
      level:level
    }
  )
}

// 0 (HEALTH
//   1 (LOW
//   2 (MEDIUM
//   3 (HIGH
function transLevel(level){
  let trans = ""
  switch (level) {
    case 'HEALTH':
      trans = "0";
      break
    case 'LOW':
      trans = "1";
      break
    case 'MEDIUM':
      trans = "2";
      break
    case 'HIGH':
      trans = "3";
      break
  }
  return(
    trans
  )
}
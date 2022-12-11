import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DiaglogContent from '@mui/material/DialogContent';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Box } from '@mui/system';
import { userWallet, backendInfo } from '..';
import axios from "axios";

function Popup(pros) {
  const {title, content, open, setopen } = pros;

  function handleClose() {
    setopen(false);
  }
  
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <div>{title}</div>
      </DialogTitle>
      <DiaglogContent>
        <div>{content}</div>
      </DiaglogContent>
    </Dialog>
  )
}

function SimpleDialog(props) {
    const { onClose, open } = props;
    const roomnumber = [1,2]
    const handleClose = () => {
      onClose(0);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
  
    return (
      <Dialog onClose={handleClose} open={open} >
        <DialogTitle>Select Room Number</DialogTitle>
        <List sx={{ pt: 0 }}>
          {roomnumber.map((room) => (
            <ListItem button onClick={() => handleListItemClick(room)} key={room} elevation={12}>
              <ListItemText primary={room} sx={{textAlign:'center'}}/>
            </ListItem>
          ))}
        </List>
      </Dialog>
    );
  }
  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };

export default function EnterRoomButton(props){
  const{
    baseURL
  } = React.useContext(backendInfo);

  const {
    isMetaMaskInstalled,
    provider,
    accounts,
    web3,
    enable,
    disable
} = React.useContext(userWallet);

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();

  const [title, settitle] = React.useState("");
  const [content, setcontent] = React.useState("");
  const [openPopup, setopenPopup] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    console.log("value: " + value)
    if (value > 0){
      const client = axios.create({
        baseURL: baseURL
      })
      setSelectedValue(value);
      console.log(baseURL+"/clinic/" + value + "/" + accounts[0]);
      client.put('/clinic/' + value + '/' + accounts[0])
        .then((response) => {
          console.log(response.status)
          if (response.status == 201){
            settitle("Successful")
            setcontent("You have entered the clinic room no." + value)
          }else{
            settitle("Failed")
            setcontent("The clinic room no." + value + " is full!")
          }
          setopenPopup(true)
        })
        .catch((error) => console.log("clinic error: " + error))
    }
    setOpen(false);
  };

  return(
      <Box>
      <Button variant="outlined" onClick={handleClickOpen} sx={{backgroundColor:"#fff"}}>
          Enter Room
      </Button>
      <SimpleDialog open={open} onClose={handleClose}></SimpleDialog>
      <Popup title={title} content={content} open={openPopup} setopen={setopenPopup} />
      </Box>
  )
}
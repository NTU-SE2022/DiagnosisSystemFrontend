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
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Box } from '@mui/system';

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
    const roomnumber = [1,2]
    const handleClose = () => {
      onClose(selectedValue);
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
              {/* <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar> */}
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
    
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState();
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
    };
    return(
        <Box>
        <Button variant="outlined" onClick={handleClickOpen} sx={{backgroundColor:"#fff"}}>
            Enter Room
        </Button>
        <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose}></SimpleDialog>
        </Box>
    )
}
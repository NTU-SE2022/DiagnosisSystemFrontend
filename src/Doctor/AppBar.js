import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AuthContext from '../Context/AuthProvider';
export default function ButtonAppBar(props) {
  // const {setLogin} = React.useContext(AuthContext);
  return (
    <Box sx={{ flexGrow: 2 ,boxShadow: 1,borderRadius:2}}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 ,textAlign: 'left',p:2}}>
            Certificate Management
          </Typography>
          <Typography variant="p" component="div" sx={{ flexGrow: 1 ,textAlign: 'right',p:1}}>
            {props.username}
          </Typography>
          <Button color = "inherit" href = "SignIn">Sign Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
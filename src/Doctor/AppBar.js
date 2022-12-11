import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AuthContext } from '../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
export default function ButtonAppBar() {
  const {setAuth} = React.useContext(AuthContext);
  const navigate = useNavigate();
  const logout =() =>{
    setAuth({'account':'','status':'logout'})
    navigate('/SignIn')
  }
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
            王大美
          </Typography>
          <Button color = "inherit" onClick={logout}>Sign Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { userWallet } from '.';
import { useNavigate } from 'react-router';

const ONBOARD_TEXT = 'Click here to install MetaMask!';
// 當 USER 未下載 **MetaMask Chrome extension**
const CONNECT_TEXT = 'Welcome Back to Dino Club!';
// 當 USER 已下載 **MetaMask Chrome extension**
const CONNECTED_TEXT = 'Connected';
// 當 USER 已經連接到 Ethereum 帳戶

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const LoginButton = ({
  isMetaMaskInstalled,
  provider,
  accounts,
  web3,
  enable,
  disable
}) => {
console.log(accounts)
return(
  <Button
      variant="contained"
      style={{margin: '0 auto', display: "flex"}}
      onClick={() => {
        enable();
      }}
      disabled={Boolean(web3)}
  >
      Connect
  </Button>
)

}

// const card = (
//   <React.Fragment>
//     <CardContent>
//       <Typography variant="h5" component="div">
//         <FontAwesomeIcon icon={faUsers} fontSize="100px"/>
//       </Typography>
//       <Typography sx={{ mb: 1.5 }} color="text.secondary">
//         Patients
//       </Typography>
//       <Typography variant="body2">
//         Connect your wallet.
//       </Typography>
//     </CardContent>
//     <CardActions>
//       <Button variant="contained" style={{margin: '0 auto', display: "flex"}} href="PatientCertificate">Connect</Button>
//     </CardActions>
//   </React.Fragment>
// );

const card = () => {
  const {
    isMetaMaskInstalled,
    provider,
    accounts,
    web3,
    enable,
    disable
  } = React.useContext(userWallet);
  const navigate = useNavigate();
  React.useEffect(()=>{
    if(!accounts.length == 0){
      console.log(`Wallet:${accounts}`)
      navigate('/PatientCertificate')
    }
  },[accounts]);
  return (
    <React.Fragment>
      <CardContent>
        <Typography variant="h5" component="div">
          <FontAwesomeIcon icon={faUsers} fontSize="100px"/>
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Patients
        </Typography>
        <Typography variant="body2">
          Connect your wallet.
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Button variant="contained" style={{margin: '0 auto', display: "flex"}} href="PatientCertificate">Connect</Button> */}
        <LoginButton
          accounts={accounts}
          disable={disable}
          enable={enable}
          isMetaMaskInstalled={isMetaMaskInstalled}
          provider={provider}
          web3={web3}>
        </LoginButton>
      </CardActions>
    </React.Fragment>
  )
};

export default function OutlinedCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card()}</Card>
    </Box>
  );
}

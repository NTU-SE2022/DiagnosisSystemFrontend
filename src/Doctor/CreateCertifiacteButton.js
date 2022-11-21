import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateCertificateButton() {
  const [open, setOpen] = React.useState(false);
  const [context,setContext] =React.useState("生成及發送 NFT 至病人錢包中...")

  const handleClickOpen = () => {
    setOpen(true);
    setContext("生成及發送 NFT 至病人錢包中...")
    setTimeout(() => {
        setContext("發送完成")
    }, 3000);
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

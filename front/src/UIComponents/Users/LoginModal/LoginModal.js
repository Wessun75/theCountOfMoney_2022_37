import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoginForm from './LoginForm';
const LoginModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        
        <div>
            <Button variant="outlined" style ={{color: 'rgba(246, 36, 89, 1)'}} onClick={handleClickOpen}>
                See more
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Please enter your information:</DialogTitle>
                <LoginForm close = {handleClose}/>

                
            </Dialog>
        </div>
    );
}
export default LoginModal;
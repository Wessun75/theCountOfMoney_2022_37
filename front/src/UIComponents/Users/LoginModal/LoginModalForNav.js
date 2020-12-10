import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoginForm from './LoginForm';
const LoginModalForNav = () => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        
        <div>
            <Button variant="outlined" style ={{color: 'white'}} onClick={handleClickOpen}>
                Login / Register
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Please enter your information:</DialogTitle>
                <LoginForm close = {handleClose}/>
            </Dialog>
        </div>
    );
}
export default LoginModalForNav;
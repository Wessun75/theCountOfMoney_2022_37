import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import RegisterModal from './RegisterModal/RegisterModal';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GmailIcon from '@material-ui/icons/Mail'
import { makeStyles } from '@material-ui/core/styles';
const LoginModal = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const logoStyle = makeStyles({
        root: {
            width: 60,
            height: 60,
        },
       
    });
    const styleLogo = logoStyle();
    return (
        
        <div>
            <Button variant="outlined" style ={{color: 'rgba(246, 36, 89, 1)'}} onClick={handleClickOpen}>
                See more
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Please enter your information:</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="pass"
                        label="Password"
                        type="password"
                        fullWidth
                    />
                </DialogContent>
                    Log in with:
                <DialogContent >
                    <FacebookIcon className = {styleLogo.root}/> 
                    <TwitterIcon className = {styleLogo.root}/>
                    <GmailIcon className = {styleLogo.root}/>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Login
                    </Button>
                    <RegisterModal close = {handleClose} />
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default LoginModal;
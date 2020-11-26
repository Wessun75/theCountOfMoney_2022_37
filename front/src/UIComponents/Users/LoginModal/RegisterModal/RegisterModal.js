import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GmailIcon from '@material-ui/icons/Mail'
import { makeStyles } from '@material-ui/core/styles';
const RegisterModal = (props) => {
    const [ouvert, setOuvert] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    const handleClickOpen = () => {
        setOuvert(true);
    };

    const handleClose = () => {
        props.close();
        setOuvert(false);
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
                Register
            </Button>
            <Dialog open={ouvert} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Register:</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name"
                        type="email"
                        fullWidth
                    />
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
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Confirm password"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                Or register with:
                <DialogContent >
                    <FacebookIcon className = {styleLogo.root}/> 
                    <TwitterIcon className = {styleLogo.root}/>
                    <GmailIcon className = {styleLogo.root}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button style ={{color: 'rgba(149, 165, 166, 1)'}}>
                        Register
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default RegisterModal;
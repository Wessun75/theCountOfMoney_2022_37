import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import RegisterForm from './RegisterForm'
const RegisterModal = (props) => {
    const [ouvert, setOuvert] = React.useState(false);

    const handleClickOpen = () => {
        setOuvert(true);
    };

    const handleClose = () => {
        props.close();
        setOuvert(false);
    };
    return (
        <div>
            <Button variant="outlined" style ={{color: 'rgba(246, 36, 89, 1)'}} onClick={handleClickOpen}>
                Register
            </Button>

            <Dialog open={ouvert} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Register:</DialogTitle>

                <RegisterForm close = {handleClose}/>

            </Dialog>
        </div>
    );
}
export default RegisterModal;
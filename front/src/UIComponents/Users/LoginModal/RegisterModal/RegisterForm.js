import React from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import {useState} from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GmailIcon from '@material-ui/icons/Mail'
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const RegisterForm = (props) => {
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [errorMailAlert,setErrorMailAlert] = useState("");
    const [errorMailForm,setErrorMailForm] = useState(false);
    const [errorPasswordForm,setErrorPasswordForm] = useState(false);
    const [errorPasswordAlert,setErrorPasswordAlert] = useState("");

    const handleChangeMail = event => 
    {
        setErrorMailForm(false)
        setErrorMailAlert("")
        setMail(event.currentTarget.value)
    };

    const handleChangePassword = event => 
    {
        setErrorPasswordAlert("")
        setPassword(event.currentTarget.value)
        setErrorPasswordForm(false)
    };
    
    const handleChangeConfirmedPassword = event => 
    {
        setConfirmedPassword(event.currentTarget.value)
    };

    const validateEmail = (email) =>{
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      };

    const handleClose = () => {
        props.close();
    };

    const fakeRegister= () => {

        if(validateEmail(mail) && password === confirmedPassword && password !== ""){
            alert("ça marche")
        }

        else{

            if(!validateEmail(mail)){
                setErrorMailAlert("Error: Mail must be in form example@example.com")
                setErrorMailForm(true)
            }

            if(password !== confirmedPassword){
                setErrorPasswordAlert("Error: passwords must match")
                setErrorPasswordForm(true)
            }
            
            if(password === ""){
                setErrorPasswordAlert("Error: you need a password")
                setErrorPasswordForm(true)
            }
        }
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
            <DialogContent>

                <TextField autoFocus margin="dense" label="Name" type="text" fullWidth/>

                <TextField error = {errorMailForm} helperText={errorMailAlert} onChange={handleChangeMail} autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth/>

                <TextField error = {errorPasswordForm} helperText={errorPasswordAlert} onChange={handleChangePassword} autoFocus margin="dense" id="pass" label="Password" type="password" fullWidth/>

                <TextField error = {errorPasswordForm} onChange= {handleChangeConfirmedPassword} autoFocus margin="dense" label="Confirm password" type="password" fullWidth/>

            </DialogContent>
            Or you can register with:
            <DialogContent >

                <FacebookIcon className = {styleLogo.root}/>

                <TwitterIcon className = {styleLogo.root}/>

                <GmailIcon className = {styleLogo.root}/>

            </DialogContent>

            <DialogActions>

                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>

                <Button onClick = {fakeRegister} style ={{color: 'rgba(149, 165, 166, 1)'}}>
                    Register
                </Button>

            </DialogActions>
        </div>
    )
}

export default RegisterForm;
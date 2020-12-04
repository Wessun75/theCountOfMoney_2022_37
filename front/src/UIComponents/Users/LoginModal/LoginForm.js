import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import {useState} from 'react';
import RegisterModal from './RegisterModal/RegisterModal';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import GmailIcon from '@material-ui/icons/Mail'
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const LoginForm = (props) => {
    const [logMail, setLogMail] = useState("");
    const [logPassword, setLogPassword] = useState("");

    const [errorLogMailAlert,setErrorLogMailAlert] = useState("");
    const [errorLogMailForm,setErrorLogMailForm] = useState(false);

    const [errorLogPasswordAlert,setErrorLogPasswordAlert] = useState("");
    const [errorLogPasswordForm,setErrorLogPasswordForm] = useState(false);

    const handleChangeLogMail = event => 
    {
        setErrorLogMailForm(false)
        setErrorLogMailAlert("")
        setLogMail(event.currentTarget.value)
    };
    
    const handleChangeLogPassword = event => 
    {
        setErrorLogPasswordForm(false)
        setErrorLogPasswordAlert("")
        setLogPassword(event.currentTarget.value)
    };

    const fakeLogin = () => {
        setErrorLogMailForm(true)
        setErrorLogPasswordForm(true)

        setErrorLogMailAlert("Unknown email")
        setErrorLogPasswordAlert("Wrong password")
    }

    const logoStyle = makeStyles({
        root: {
            width: 60,
            height: 60,
        },
       
    });

    const styleLogo = logoStyle();

    return(
        <div>
            <DialogContent>
                <TextField error = {errorLogMailForm} helperText={errorLogMailAlert} onChange = {handleChangeLogMail} autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth/>
                <TextField error = {errorLogPasswordForm} helperText={errorLogPasswordAlert} onChange = {handleChangeLogPassword} autoFocus margin="dense" id="pass" label="Password" type="password" fullWidth/>
            </DialogContent>

                Log in with:
            <DialogContent >

                <FacebookIcon className = {styleLogo.root}/> 
                <TwitterIcon className = {styleLogo.root}/>
                <GmailIcon className = {styleLogo.root}/>

            </DialogContent>

            <DialogActions>
                    <Button onClick={props.close} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={fakeLogin} color="primary">
                        Login
                    </Button>
                    <RegisterModal close = {props.close} />
            </DialogActions>
        </div>
    )
}
export default LoginForm;
import { useState } from "react";
import { withRouter } from "react-router-dom";
import Loader from '../../loader/loader';
import axios from 'axios';
import Swal from 'sweetalert2';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function ResetPassword(props) {

    const [errorMessage, setErrorMessage] = useState('');
    const [loader, setLoaderStatus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [open, setOpen] = useState(false);
    const [password, setpassword] = useState();

    // open snakbar
    const openSnackbar = () => {
        setOpen(true);
    };
    // close snakbar
    const closeSnackbar = () => {
        setOpen(false);
    };

    const handleClickShowOldPassword = () => {
        setShowPassword(!showPassword);
    }



    const handlePasswordchange = (event) => {
        setLoaderStatus(false);
        closeSnackbar();

        setpassword({
            [event.target.name]: event.target.value,
        });
    }

    // handle form submit
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            // changing loader status
            setLoaderStatus(true);
            //  sending Ajax call
            const data = password;
            const queryDetails = props.match.params;
            await axios.post(`http://localhost:3000/api/v1/verifyforgetpassword/${queryDetails.id}/${queryDetails.otp}`, data);
            // finally changing the loader status
            setLoaderStatus(false);
            const result = await Swal.fire('password changed successfuly');
            if (result.isConfirmed) {
                props.history.push('/login')
            }
        } catch (error) {
            const errorMessage = error?.response.data.message;
            console.error(errorMessage)
            setErrorMessage(errorMessage);
            openSnackbar();
            // finally changing the loader status
            setLoaderStatus(false);
        }
    }


    return (
        <div className="container" style={{ height: '85vh' }}>
            {/* loader */}
            {
                loader === true ? <Loader></Loader> : null
            }
            <form className="row h-100 justify-content-center align-items-center" onSubmit={handleSubmit}>
                <div className="col-12 col-md-5 col-lg-4 text-center">
                    <div className="my-3">
                        <FormControl variant="outlined" className="w-100">
                            <InputLabel htmlFor="outlined-adornment-password" className="px-1 bg-white">Set New Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword === true ? 'text' : 'password'}
                                name='password'
                                onChange={handlePasswordchange}
                                required
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowOldPassword}
                                            edge="end"
                                        >
                                            {showPassword === true ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl>
                    </div>
                    {/* button section */}
                    <div className="d-flex justify-content-center mt-4">
                        <div className="mx-1">
                            <button className="btn btn-primary px-5">Reset</button>
                        </div>
                    </div>
                </div>
                {/* snakbar */}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={open}
                    autoHideDuration={5000}
                    color="error"
                    onClose={closeSnackbar}
                    message={errorMessage}
                    action={
                        <>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackbar}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </>
                    }
                />
            </form>
        </div>
    );
}

export default withRouter(ResetPassword);
import { withRouter } from "react-router-dom";
import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Swal from 'sweetalert2';
import Loader from '../loader/loader';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import TokenServe from '../../service/token';

function UpdatePassword(props) {

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loader, setLoaderStatus] = useState(false);
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState(
        {
            password: '',
            newPassword: '',
        }
    );


    const handleClickShowOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    }

    const handleClickShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    }


    // handle formvalue change

    const handleFormvaluechange = (event) => {

        try {
            setLoaderStatus(false);
            closeSnackbar();
            setErrorMessage('');
            setFormValues({
                ...formValues,
                [event.target.name]: event.target.value,
            });
        } catch (error) {
            console.error(error);
        }
    }

    // open snakbar
    const openSnackbar = () => {
        setOpen(true);
    };
    // close snakbar
    const closeSnackbar = () => {
        setOpen(false);
    };
    const goBack = () => {
        props.history.goBack();
    }

    // handle form submit
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            // changing loader status
            setLoaderStatus(true);
            //  sending Ajax call
            const data = formValues;
            const token = TokenServe.getToken();
            const payload = TokenServe.getTokenPayloadData(token);
            const userId = payload.id;
            await axios.post(`http://localhost:3000/api/v1/updatepassword/${userId}`, data);
            // finally changing the loader status
            setLoaderStatus(false);
            const result = await Swal.fire('Password updated Successfuly');
            if (result.isConfirmed) {
                props.history.push('/students')
            }
        } catch (error) {
            //  showing error message
            const errorMessage = error?.response.data.message;
            console.error(errorMessage)
            setErrorMessage(errorMessage);
            openSnackbar();
            // finally changing the loader status
            setLoaderStatus(false);
        } 
    }


    return (
        <div className="container" style={{ height: '80vh' }}>
            {/* loader */}
            {
                loader === true ? <Loader></Loader> : null
            }
            <form className="row justify-content-center h-100 align-items-center" onSubmit={handleSubmit}>
                <div className="col-12 col-md-6 col-lg-4 shadow p-4">
                    {/* old password */}
                    <div className="my-3">
                        <FormControl variant="outlined" className="w-100">
                            <InputLabel htmlFor="outlined-adornment-password" className="px-1 bg-white">Old Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showOldPassword === true ? 'text' : 'password'}
                                name='password'
                                onChange={handleFormvaluechange}
                                required
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowOldPassword}
                                            edge="end"
                                        >
                                            {showOldPassword === true ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl>
                    </div>
                    <span className="text-danger">{errorMessage}</span>
                    {/* new password */}
                    <div className="my-3">
                        <FormControl variant="outlined" className="w-100">
                            <InputLabel htmlFor="outlined-adornment-password" className="px-1 bg-white">New Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showNewPassword === true ? 'text' : 'password'}
                                name='newPassword'
                                onChange={handleFormvaluechange}
                                required
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowNewPassword}
                                            edge="end"
                                        >
                                            {showNewPassword === true ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl>
                    </div>
                    {/* button section */}
                    <div className="text-center">
                        <button className="btn btn-primary">Update</button>
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

export default withRouter(UpdatePassword);
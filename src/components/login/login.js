import { React, useState, Fragment } from 'react';
import ss from './login.module.css';
import Loader from '../loader/loader';
import axios from 'axios';
import TokenServe from '../../service/token'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';

function Login(props) {

    const [formValues, setFormValues] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [loader, setLoaderStatus] = useState(false);
    const [open, setOpen] = useState(false);


    // handle form value change
    const handleValueChange = async (event) => {
        try {
            // changing loader status
            setLoaderStatus(false);
            // closing snakbar
            closeSnackbar();
            // setting form values
            setFormValues({
                ...formValues,
                [event.target.name]: event.target.value,
            });
        } catch (error) {
            console.error(error);
        }
    }


    // handle form submit
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            // changing loader status
            setLoaderStatus(true);
            //  sending Ajax call
            const data = formValues;
            const result = await axios.post('http://localhost:3000/api/v1/login', data);
            //  save login token
            const token = result.data.token;
            TokenServe.saveToken(token);
            // finally changing the loader status
            setLoaderStatus(false);
            props.setLoggedIn(true);
        } catch (error) {
            //  showing error message
            const errorMessage = error?.response?.data?.message;
            setErrorMessage(errorMessage);
            openSnackbar();
        }
    }

    // open snakbar
    const openSnackbar = () => {
        setOpen(true);
    };
    // close snakbar
    const closeSnackbar = (event, reason) => {
        setOpen(false);
    };




    return (
        <div className="container h-100">
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-12 col-md-10">
                    {/* loader */}
                    {
                        loader === true ? <Loader></Loader> : null
                    }
                    <div className="row">
                        <div className="col-6 d-none d-lg-block">
                            <img src="/assets/login-bg-2.jpg" alt="logo" className={`${ss.login_banner} w-100 h-100`}></img>
                        </div>
                        <div className="col-12 col-lg-6 d-flex align-items-center">
                            <div className={`${ss.login_container} text-center w-100`}>
                                <h2 className="mt-2 text-white fw-bold">Login</h2>
                                <form className="mt-5" onSubmit={handleSubmit}>
                                    {/* form unputs */}
                                    <div className="mt-5">
                                        <span className="input-wrapper bg-white py-3 px-3 rounded">
                                            <span><i className="bi bi-person-bounding-box me-1 text-warning"></i></span>
                                            <input type="email" placeholder="Email" name="email" className={`${ss.login_input} border-0`} onChange={handleValueChange} required></input>
                                        </span>
                                    </div>
                                    <div className="mt-5">
                                        <span className="input-wrapper bg-white py-3 px-3 rounded">
                                            <span><i className="bi bi-lock-fill me-1 text-warning"></i></span>
                                            <input type="password" placeholder="Password" name="password" className={`${ss.login_input} border-0`} onChange={handleValueChange} required></input>
                                        </span>
                                    </div>

                                    {/* forget password */}
                                    <div className="mt-4 d-flex justify-content-center">
                                        <div className="d-flex justify-content-between" style={{ width: "280px" }}>
                                            <div className="text-white">
                                                <input type="checkbox" className="me-2" id="remember"></input>
                                                <label htmlFor="remember">Remember me</label>
                                            </div>
                                            <a className="text-white" href="/">Forget Password</a>
                                        </div>
                                    </div>
                                    {/* login button */}
                                    <div className="mt-5">
                                        <button className="px-5 py-2 rounded bg-warning text-white fw-bold border-0">Login</button>
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
                                            <Fragment>
                                                <IconButton size="small" aria-label="close" color="inherit" onClick={closeSnackbar}>
                                                    <CloseIcon fontSize="small" />
                                                </IconButton>
                                            </Fragment>
                                        }
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}


const login = withRouter(Login);

export default login;
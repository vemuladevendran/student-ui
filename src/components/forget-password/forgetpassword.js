import { useState } from "react";
import { withRouter } from "react-router-dom";
import Loader from '../loader/loader';
import axios from 'axios';
import Swal from 'sweetalert2';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function ForgetPassword(props) {

    const [errorMessage, setErrorMessage] = useState('');
    const [loader, setLoaderStatus] = useState(false);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState();

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


    const handleEmailChange = (event) => {
        setLoaderStatus(false);
        closeSnackbar();

        setEmail({
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
            const data = email;
            await axios.post(`http://localhost:3000/api/v1/forgetpassword/`, data);
            // finally changing the loader status
            setLoaderStatus(false);
            const result = await Swal.fire('Reset Link is send to your register Email Id');
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
                    <div>
                        <p>Enter your Email Id</p>
                        <input type="email" placeholder="Email" name="email" className="border border-dark rounded px-4 py-2" onChange={handleEmailChange} />
                    </div>
                    {/* button section */}
                    <div className="d-flex justify-content-center mt-4">
                        <div className="mx-1">
                            <button className="btn btn-secondary" onClick={goBack}>Back</button>
                        </div>
                        <div className="mx-1">
                            <button className="btn btn-primary">Send Reset Link</button>
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

export default withRouter(ForgetPassword);
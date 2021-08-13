import { React, useState } from 'react';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Loader from '../../loader/loader';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';


function AddUser(props) {

    const [errorMessage, setErrorMessage] = useState('');
    const [loader, setLoaderStatus] = useState(false);
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        isAdmin: false,
    });

    // handle formvalue change

    const handleFormvaluechange = (event) => {

        try {
            setLoaderStatus(false);
            closeSnackbar();
            setFormValues({
                ...formValues,
                [event.target.name]: event.target.value,
            });
        } catch (error) {
            console.error(error);
        }
    }

    // handle checkbox change

    const handleCheckBoxChange = () => {
        setFormValues({ ...formValues, isAdmin: !formValues.isAdmin })
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
            await axios.post('http://localhost:3000/api/v1/users', data);
            const result = await Swal.fire('New User Added Successfuly');
            // finally changing the loader status
            setLoaderStatus(false);
            if (result.isConfirmed) {
                props.history.push('/users')
            }
        } catch (error) {
            //  showing error message
            const errorMessage = error?.response.data.message;
            setErrorMessage(errorMessage);
            openSnackbar();
            // finally changing the loader status
            setLoaderStatus(false);
        } 
    }

    return (
        <div className="container h-100">
            {/* loader */}
            {
                loader === true ? <Loader></Loader> : null
            }
            <form className="row h-100 justify-content-center align-items-center" onSubmit={handleSubmit}>
                <section className="col-12 col-md-6 shadow p-4">
                    <TextField id="outlined-basic" label="First Name" onChange={handleFormvaluechange} name="firstName" variant="outlined" className="w-100 my-3" required />
                    <TextField id="outlined-basic" label="Last Name" onChange={handleFormvaluechange} name="lastName" variant="outlined" className="w-100 my-3" required />
                    <TextField id="outlined-basic" label="email" onChange={handleFormvaluechange} name="email" type="email" variant="outlined" className="w-100 my-3" required />
                    <TextField id="outlined-basic" label="Mobile" type="tel" onChange={handleFormvaluechange} name="mobileNumber" variant="outlined" className="w-100 my-3" required />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formValues.isAdmin}
                                onChange={handleCheckBoxChange}
                                name="isAdmin"
                                color="primary"
                            />
                        }
                        label="Is Admin"
                    />
                    {/* button section */}
                    <div className="d-md-flex justify-content-center">
                        <div className="m-2">
                            <button type="button" className="btn btn-light border border-dark px-5 w-100" onClick={goBack}>Cancel</button>
                        </div>
                        <div className="m-2">
                            <button className="btn btn-primary px-5 w-100">Save</button>
                        </div>
                    </div>
                </section>
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


export default withRouter(AddUser)

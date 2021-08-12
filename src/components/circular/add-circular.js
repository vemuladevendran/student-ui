import { React, useState } from 'react';
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { FormControl } from '@material-ui/core';
import Loader from '../loader/loader';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';



function AddCircular(props) {
    const [errorMessage, setErrorMessage] = useState('');
    const [loader, setLoaderStatus] = useState(false);
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        circularTitle: '',
        circularDate: '',
        circularFor: '',
        circularContent: '',
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
            console.log(data);
            await axios.post('http://localhost:3000/api/v1/circular', data);
            const result = await Swal.fire('New User Added Successfuly');
            setLoaderStatus(false);
            if (result.isConfirmed) {
                props.history.push('/users')
            }
        } catch (error) {
            //  showing error message
            const errorMessage = error?.response.data.message;
            setErrorMessage(errorMessage);
            openSnackbar();
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
                    <TextField id="outlined-basic" label="Circular Title" onChange={handleFormvaluechange} name="circularTitle" variant="outlined" className="w-100 my-3" required />
                    <TextField id="outlined-basic" label="Circular Date" onChange={handleFormvaluechange} name="circularDate" type="date" variant="outlined" className="w-100 my-3" required />
                    <FormControl variant="outlined" className="w-100 my-3" required>
                        <InputLabel id="demo-simple-select-outlined-label" className="bg-white">Branch</InputLabel>
                        <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" onChange={handleFormvaluechange} name="branch" label="Branch" >
                            <MenuItem value={'all'}>All</MenuItem>
                            <MenuItem value={'it'}>Information Technology</MenuItem>
                            <MenuItem value={'cse'}>Computer Science</MenuItem>
                        </Select>
                    </FormControl>
                    <textarea placeholder="Address" onChange={handleFormvaluechange} name="address" className="w-100 my-3" style={{ height: '100px' }} required />
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




export default withRouter(AddCircular);
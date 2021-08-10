import { React, useRef, useState } from 'react';
import ss from './add-edit-student.module.css'
import Swal from 'sweetalert2';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { FormControl } from '@material-ui/core';
import Loader from '../../loader/loader';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';

// image uppload
const ProfileUpload = () => {
    const defaultImageUrl = '/assets/default-profile.png'
    const [imageUpload, setImageUpload] = useState(defaultImageUrl);
    const imageInput = useRef();
    // open image selection
    const openImageSelection = (event) => {
        // checking image selected or not and setting default image
        if (imageUpload !== defaultImageUrl) {
            setImageUpload(defaultImageUrl);
            return;
        }
        // triggering input element
        imageInput.current.click()
    }

    // handle image change

    const handleImageChange = (event) => {
        // creating image previewurl
        const imageFile = event.target.files;
        const previewUrl = URL.createObjectURL(imageFile[0]);
        setImageUpload(previewUrl)
    }
    return (
        <div>
            <input className="d-none" name="profileImage" onChange={handleImageChange} ref={imageInput} type="file" />
            <div className="position-relative">
                <img className={`${ss.profile_image}`} src={imageUpload} alt="profile" />
                <div className="w-100 position-absolute" style={{ bottom: '2px' }}>
                    <button type="button" className="px-5 py-2 border-0 bg-white text-dark fw-bold rounded" onClick={openImageSelection}>{`${imageUpload === defaultImageUrl ? 'Upload Profile' : 'Cancel'}`}</button>
                </div>
            </div>
        </div>
    );
}

function AddEditStudent(props) {

    const [errorMessage, setErrorMessage] = useState('');
    const [loader, setLoaderStatus] = useState(false);
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        dob: '',
        mobileNumber: '',
        fatherName: '',
        motherName: '',
        address: '',
        yearOf10: '',
        yearOf12: '',
        markPercentageOf10: '',
        markPercentageOf12: '',
        nameOf10School: '',
        nameOf12School: '',
        yearOfCollegeJoined: '',
        currentStudingyear: '',
        rollNumber: '',
        examNumber: '',
        branch: '',
        section: '',
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
    // handle form submit
    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            // changing loader status
            setLoaderStatus(true);
            //  sending Ajax call
            const data = formValues;
            console.log(data);
            await axios.post('http://localhost:3000/api/v1/student', data);
            const result = await Swal.fire('New Student Added Successfuly');
            if (result.isConfirmed) {
                props.history.push('/students')
            }
        } catch (error) {
            //  showing error message
            const errorMessage = error?.response;
            console.error(errorMessage)
            // setErrorMessage(errorMessage);
            openSnackbar();
        } finally {
            // finally changing the loader status
            setLoaderStatus(false);
        }
    }



    return (
        <div className="container-fluid">
            {/* loader */}
            {
                loader === true ? <Loader></Loader> : null
            }
            <form className="row" onSubmit={handleSubmit}>
                <p className="text-end text-danger">Fields are marked in * is required</p>
                <section className="col-12 col-lg-6 shadow-lg rounded p-4">
                    <h4>Personal Details</h4>
                    {/* name details */}
                    <div className="row">
                        {/* profile photo */}
                        <div className="col-12 col-md-6">
                            <FormControl variant="outlined" className="w-100 my-3" required>
                                <InputLabel id="demo-simple-select-outlined-label" className="bg-white">Title</InputLabel>
                                <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" onChange={handleFormvaluechange} name="title" label="Title" >
                                    <MenuItem value='Mr'>Mr</MenuItem>
                                    <MenuItem value='Mrs'>Mrs</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField id="outlined-basic" label="First Name" onChange={handleFormvaluechange} name="firstName" variant="outlined" className="w-100 my-3" required />
                            <TextField id="outlined-basic" label="Last Name" onChange={handleFormvaluechange} name="lastName" variant="outlined" className="w-100 my-3" required />
                        </div>
                        <div className="col-12 col-md-6 text-center">
                            {/* image upload */}
                            <ProfileUpload></ProfileUpload>
                        </div>
                    </div>
                    {/* email details */}
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <TextField id="outlined-basic" label="email" onChange={handleFormvaluechange} name="email" type="email" variant="outlined" className="w-100 my-3" required />
                        </div>
                        <div className="col-12 col-md-6">
                            <FormControl variant="outlined" className="w-100 my-3" required>
                                <InputLabel id="demo-simple-select-outlined-label" className="bg-white">Gender</InputLabel>
                                <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" onChange={handleFormvaluechange} name="gender" label="Gender" >
                                    <MenuItem value={'male'}>Male</MenuItem>
                                    <MenuItem value={'female'}>Female</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    {/* data of bith */}
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <TextField id="outlined-basic" label="DOB" onChange={handleFormvaluechange} name="dob" type="date" variant="outlined" className="w-100 my-3" required />
                        </div>
                        <div className="col-12 col-md-6">
                            <TextField id="outlined-basic" label="Mobile" type="tel" onChange={handleFormvaluechange} name="mobileNumber" variant="outlined" className="w-100 my-3" required />
                        </div>
                    </div>
                    {/* family details */}
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <TextField id="outlined-basic" label="Father's Name" onChange={handleFormvaluechange} name="fatherName" variant="outlined" className="w-100 my-3" required />
                        </div>
                        <div className="col-12 col-md-6">
                            <TextField id="outlined-basic" label="Mothers's Name" onChange={handleFormvaluechange} name="motherName" variant="outlined" className="w-100 my-3" required />
                        </div>
                    </div>
                    {/* address */}
                    <div className="col-12">
                        <textarea placeholder="Address" onChange={handleFormvaluechange} name="address" className="w-100 my-3" style={{ height: '70px' }} required />
                    </div>
                </section>
                {/* education details */}
                <section className="col-12 col-lg-6 shadow-lg rounded p-4">
                    <h4>Education Details</h4>
                    {/* school details */}
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <TextField id="outlined-basic" type="number" InputProps={{ inputProps: { min: 1000, max: new Date().getFullYear() } }} label="Year of 10th" onChange={handleFormvaluechange} name="yearOf10" variant="outlined" className="w-100 my-3" required />
                        </div>
                        <div className="col-12 col-md-6">
                            <TextField id="outlined-basic" type="number" InputProps={{ inputProps: { min: 1000, max: new Date().getFullYear() } }} label="Year of 12th" onChange={handleFormvaluechange} name="yearOf12" variant="outlined" className="w-100 my-3" required />
                        </div>
                    </div>
                    {/* marks details */}
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <TextField id="outlined-basic" type="number" InputProps={{ inputProps: { min: 1, max: 100 } }} label="10th marks percentage" onChange={handleFormvaluechange} name="markPercentageOf10" variant="outlined" className="w-100 my-3" required />
                        </div>
                        <div className="col-12 col-md-6">
                            <TextField id="outlined-basic" type="number" InputProps={{ inputProps: { min: 1, max: 100 } }} label="12th marks percentage" onChange={handleFormvaluechange} name="markPercentageOf12" variant="outlined" className="w-100 my-3" required />
                        </div>
                    </div>
                    {/* school name */}
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <TextField id="outlined-basic" label="10th School Name" onChange={handleFormvaluechange} name="nameOf10School" variant="outlined" className="w-100 my-3" />
                        </div>
                        <div className="col-12 col-md-6">
                            <TextField id="outlined-basic" label="12th School Name" onChange={handleFormvaluechange} name="nameOf12School" variant="outlined" className="w-100 my-3" />
                        </div>
                    </div>
                    <h4>College Details</h4>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <TextField id="outlined-basic" label="Year of college joined" onChange={handleFormvaluechange} name="yearOfCollegeJoined" type="number" InputProps={{ inputProps: { min: 1000, max: new Date().getFullYear() } }} variant="outlined" className="w-100 my-3" />
                        </div>
                        <div className="col-12 col-md-6">
                            <FormControl variant="outlined" className="w-100 my-3" required>
                                <InputLabel id="demo-simple-select-outlined-label" className="bg-white">Current Studing Year</InputLabel>
                                <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" onChange={handleFormvaluechange} name="currentStudingyear" label="Current Studing Year" >
                                    <MenuItem value={1}>First Year</MenuItem>
                                    <MenuItem value={2}>Second Year</MenuItem>
                                    <MenuItem value={3}>Third Year</MenuItem>
                                    <MenuItem value={4}>Fourth Year</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    {/* roll number details */}
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <TextField id="outlined-basic" label="Roll Number" onChange={handleFormvaluechange} name="rollNumber" variant="outlined" className="w-100 my-3" required />
                        </div>
                        <div className="col-12 col-md-6">
                            <TextField id="outlined-basic" label="Exam Number" onChange={handleFormvaluechange} name="examNumber" variant="outlined" className="w-100 my-3" required />
                        </div>
                    </div>
                    {/* branch details */}
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <FormControl variant="outlined" className="w-100 my-3" required>
                                <InputLabel id="demo-simple-select-outlined-label" className="bg-white">Branch</InputLabel>
                                <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" onChange={handleFormvaluechange} name="branch" label="Branch" >
                                    <MenuItem value={'it'}>Information Technology</MenuItem>
                                    <MenuItem value={'cse'}>Computer Science</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="col-12 col-md-6">
                            <FormControl variant="outlined" className="w-100 my-3" required>
                                <InputLabel id="demo-simple-select-outlined-label" className="bg-white">Section</InputLabel>
                                <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" onChange={handleFormvaluechange} name="section" label="Section" >
                                    <MenuItem value={"a"}>A</MenuItem>
                                    <MenuItem value={"b"}>B</MenuItem>
                                    <MenuItem value={"c"}>C</MenuItem>
                                    <MenuItem value={"d"}>D</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    {/* button section */}
                    <div className="d-md-flex justify-content-center">
                        <div className="m-2">
                            <button type="button" className="btn btn-light border border-dark px-5 w-100">Cancel</button>
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


const addEditStudent = withRouter(AddEditStudent)

export default addEditStudent;
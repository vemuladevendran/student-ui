import { React, useRef, useState } from 'react';
import ss from './add-edit-student.module.css'
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { FormControl, TextareaAutosize } from '@material-ui/core';

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



export default function AddEditStudent() {
    return (
        <div className="container-fluid">
            <div className="col-12 col-md-12 col-lg-6">
                <h4>Personal Details</h4>
                {/* name details */}
                <div className="row">
                    {/* profile photo */}
                    <div className="col-12 col-md-6">
                        <FormControl variant="outlined" className="w-100 my-3" required>
                            <InputLabel id="demo-simple-select-outlined-label" className="bg-white">Title</InputLabel>
                            <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" name="title" label="title" >
                                <MenuItem value={'Mr'}>Mr</MenuItem>
                                <MenuItem value={'Mrs'}>Mrs</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField id="outlined-basic" label="First Name" name="firstName" variant="outlined" className="w-100 my-3" required />
                        <TextField id="outlined-basic" label="Last Name" name="lastName" variant="outlined" className="w-100 my-3" required />
                    </div>
                    <div className="col-12 col-md-6 text-center">
                        {/* image upload */}
                        <ProfileUpload></ProfileUpload>
                    </div>
                </div>
                {/* email details */}
                <div className="row">
                    <div className="col-12 col-md-6">
                        <TextField id="outlined-basic" label="email" name="email" type="email" variant="outlined" className="w-100 my-3" required />
                    </div>
                    <div className="col-12 col-md-6">
                        <FormControl variant="outlined" className="w-100 my-3" required>
                            <InputLabel id="demo-simple-select-outlined-label" className="bg-white">Gender</InputLabel>
                            <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" name="gender" label="Gender" >
                                <MenuItem value={10}>Male</MenuItem>
                                <MenuItem value={20}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                {/* data of bith */}
                <div className="row">
                    <div className="col-12 col-md-6">
                        <TextField id="outlined-basic" label="DOB" name="dob" type="date" variant="outlined" className="w-100 my-3" required />
                    </div>
                    <div className="col-12 col-md-6">
                        <TextField id="outlined-basic" label="Mobile" type="tel" name="mobileNumber" variant="outlined" className="w-100 my-3" required />
                    </div>
                </div>
                {/* family details */}
                <div className="row">
                    <div className="col-12 col-md-6">
                        <TextField id="outlined-basic" label="Father's Name" name="fatherName" variant="outlined" className="w-100 my-3" required />
                    </div>
                    <div className="col-12 col-md-6">
                        <TextField id="outlined-basic" label="Mothers's Name" name="motherName" variant="outlined" className="w-100 my-3" required />
                    </div>
                </div>
                {/* address */}
                <div className="col-12">
                    <textarea placeholder="Address" name="address" className="w-100 my-3" style={{ height: '70px' }} required />
                </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6"></div>
        </div>
    );
}
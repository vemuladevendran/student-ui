import axios from "axios";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import TokenServe from '../../service/token/token';
import IconButton from '@material-ui/core/IconButton';
import Loader from '../loader/loader';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

function Profile(params) {
    const [errorMessage, setErrorMessage] = useState('');
    const [loader, setLoaderStatus] = useState(false);
    const [open, setOpen] = useState(false);
    const [profileData, setProfileData] = useState();

    // open snakbar
    const openSnackbar = () => {
        setOpen(true);
    };
    // close snakbar
    const closeSnackbar = () => {
        setOpen(false);
    };

    async function getdata() {
        try {
            const token = TokenServe.getToken();
            const payload = TokenServe.getTokenPayloadData(token);
            const userId = payload.id;
            setLoaderStatus(true);
            const data = await axios.get(`http://localhost:5000/api/v1/users/${userId}`);
            setLoaderStatus(false);
            setProfileData(data.data);
            console.log(profileData)
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

    useEffect(() => {
        getdata();
    }, []);
    return (
        <div className="container" style={{ height: '80vh' }}>
            {/* loader */}
            {
                loader === true ? <Loader></Loader> : null
            }
            <div className="row justify-content-md-center h-100 align-items-center">
                <div className="col-12 col-md-5 col-lg-4 shadow p-md-4">
                    <h3 className="fw-bold">Profile Details</h3>
                    <p className="h5 fw-bold mt-4">
                        Name: <span className="text-info">{profileData?.firstName}</span> 
                        <span className="text-info">{profileData?.lastName}</span>
                    </p>
                    <p className="h5 fw-bold mt-4">
                        Email: <span className="text-info">{profileData?.email}</span>
                    </p>
                    <p className="h5 fw-bold mt-4">
                        Mobile: <span className="text-info">{profileData?.mobileNumber}</span>
                    </p>
                    <p className="h5 fw-bold mt-4">
                        IsAdmin: <span className="text-info">{profileData?.isAdmin}</span>
                    </p>
                    <p className="h5 fw-bold mt-4">
                        CreatedAt: <span className="text-info">{profileData?.createdAt}</span>
                    </p>
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
            </div>
        </div>
    );
}

export default withRouter(Profile);